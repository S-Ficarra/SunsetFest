# ----- THIS PROJECT IS PART OF A SCHOOL EXAM -----

This repository hosts a backend API built specifically for managing all aspects of a music festival. It's designed to handle user roles (like Authors, Editors, and Administrators), maintain band profiles with their social links, manage various festival facilities (from stages to VIP zones and shops), and support different types of publications such as informative articles, news updates, and FAQs.


The project have been realized using :

- NestJs 10.3.2
- TypeORM 0.3.20
- MariaDB 3.3.0
- Bcrypt 5.1.1
- Jest 29.5.0
- Docker 24.0.6

The MariaDB is directly dockerized in the app, it stocks the db datas in a volume on your system, and create automatically a user with all privileges on the db.
If you want to use an external SQL system, specify its host and port in the .env file.

## Installation 

1 - Clone the repository from github

```bash
git clone https://github.com/S-Ficarra/SunsetFest
```

2 - Install the dependacies

```bash
npm install
```

3 - Configurate a .env file at the project root, following this structure : 

```typescript
DB_USER: //your_db_admin_user
DB_PASSWORD: //your_db_admin_password
DB_ROOT_PASSWORD: //your_db_root_password
DB_HOST: //your_host_db
DB_PORT: //your_db_port
SALT_ROUNDS: //the_number_of_salt_round_for_password_cryption 
JWT_SECRET_KEY: //the_key_for_the_generation_of_your_jwt_token
```

(if using the db dockerized in the app)
4 - Compose the docker container
```bash
docker-compose up -d
```


## Structure

This API have been conceived with a layered architecture:

`./main.ts` boostrap the app using the `./app.module.ts`, contain itself all the modules and the connection to the databse

`src/domain` contain models and repositories interfaces

`src/services` contain all business logic methods

`src/database` contain :
- `/entities` which is the schema of the db tables as the ORM structure (please see screenshot further),
- `/mappers` function that map the objects into entities and vice-versa when saving or requesting the DB
- `/repositories` the implementation of the domain repositories through the ORM 

`src/authentification` contain the authentification service and the jwt & auth-guard configuration

`src/controllers` contain :
- `/controllers` all the endpoint to CRUD the objects of the app
- `/DTO` the DTOs for the creation or edition of the objects
- `/mappers` function that map the DTOs into objects

`src/modules` contain modules to make the app running (NestJs structure)

`./tests` contain all tests of the API


## Database schema : 

![DB SCHEMA](https://github.com/S-Ficarra/SunsetFest/assets/131000103/025d20c6-f9d6-43a4-aa45-5e88f49fcae3)


## Class diagram schema : 

![models_diagram](https://github.com/S-Ficarra/SunsetFest/assets/131000103/c0659754-8ba1-4f53-82a0-ce6a73c41b60)


## Objects and business rules

The app have mainly 5 categories of objects : 

### Users

A user have to be a role, either an `Author`, `Editor` or `Administrator`
- the Authors can create and edit content, facilities, bands & performances 
- the Editors can also delete content & add or remove performances from programs
- the Admins can add, edit or delete users

### Publication

There is 3 types of publications : 

- `Informations`, which are inherited from Illustrated (itself inherited from Publication). It contain a Content object that have title, text and image. They'll be used for important informations concerning the music festival organisation for attendees.
- `News`, which is the same as informations, the difference will be in the business use of theses objects. News will be used as a feed to keep attendees informed of last news.
- `Faq`, composed only by a question and an answer.

### Facilities 

all Facilities have longitude and latitude attribute to integrate them in a map. Objects directly inherited from the Facility super-class are : 

- `Camping` have a capacity attribute.
- `Vip` do not have particular attribute as it will be a vip zone.
- `Stage` also have a capacity attribute.
- `Toilets` do not have gender attributes, as a toilet location point will have all genders toilets.

`Shop` object are inherited from `Facility` but are composed with `OpeningTimes` :

- `Bar` that have an opening time.
- `Restaurant` also have a foodType attribute.
- `Merchandising` have a merchType (which can be for exemple clothes, tattoos, accessories, gear etc.)


### Band

- `Band` is composed with a `Socials` object that contains all the links of the bands social plateform and website


### Program & Performance

- `Performance` contain a `Band` object, a `Stage` object and a `TimeFrame` object. Timeframe are made with a stating time and an endingtime, made with a date object to determinate the performance time.

- `Program` id is recommended to be a year, it contains the performances in an array. a `Program` cannot contains twice the same performance, it cannot also contain 2 performances of the same `Band`, or a `Performance` with another `Band` at the same `TimeFrame` and `Stage`.


To verify that there is no conflict when adding a `Performance` to a `Program` :

```typescript
    // ./src/services/program/program.services.ts
    async addPerformanceToProgram(requestingUser: User, programYear: number, performance: Performance): Promise<Performance> {
        if(this.roleService.isEditor(requestingUser) || this.roleService.isAdmin(requestingUser)){
            let program = await this.programRepository.getProgramByYear(programYear);
            if (!program) {
                program = new Program ([]);
                program.setId(programYear);
            };                            
            let isOk = this.noConflict(performance, program)
            if (isOk) {  // <--- this condition verify if the performance can be added to the program
                await this.programRepository.addPerformanceToProgram(program, performance);
                return performance;
            };
        } else {
            throw new Error ('Unauthorized');
        };
    }; 
```

2 methods are used : 

This 1st method iterate in the concerned program and use hasConflict on each performance in it :

```typescript
    // ./src/services/program/program.services.ts
    private noConflict(performance: Performance, program: Program): boolean {
        const performances = program.getPerformances();
        for (let i = 0; i < performances.length; i++) {
            const performanceA = performances[i];                        
            const performanceB = performance;
                if (this.hasConflict(performanceA, performanceB)) {
                    return false
                };
            };
        return true;
    };
```

This 2nd method compare if the performance we try to add already exist in the program. Or if the band is already planned in the program. Or if another band is already planned at this stage and time :

```typescript
    // ./src/services/program/program.services.ts
    private hasConflict(performanceA: Performance, performanceB: Performance): any {
        const sameDayStageTime = performanceA.getStage().getId() == performanceB.getStage().getId() && performanceA.getTimeFrame().getId() == performanceB.getTimeFrame().getId();        
        const sameBand = performanceA.getBand().getId() == performanceB.getBand().getId();        
        if (sameBand && sameDayStageTime) {
            throw new Error('This performance is already in the program');
        } else if (sameBand) {
            throw new Error ("This band is planned to perform more than once");
        } else if (sameDayStageTime) {
            throw new Error('Another band is already planned at this stage, time & day');
        } else {
            return false;
        }
    };
```

### Countdowns

- `Countdown` contain a starting date and ending date, the point is to display it on severla page of the website, saved in DB to make it easy to re-use it for several editions of the festival


## Controllers

All endpoint (except login) are only accessible for users logged, their session is maintened by a JWT token for 60 minutes. When the endpoint needs to know the role of the user to execute, or to register the user details, the user is extracted from the JWT :

```typescript
    // ./src/controllers/controllers/publications/faq.controller.ts
    @UseGuards(JwtAuthGuard)  // <-- stop user not logged in to access the endpoint
    @Post('faqs/createfaq')
    async createFaq(
        @Req() req: Request,
        @Body(new ValidationPipe()) createFaqDto : FaqDto): Promise <Faq | {}> {
            try {
                const userLogged = await this.authServices.getUserLogged(req); // <-- extract the user from the JWT
                const faqToCreate = mapFaqDtoToModelCreate(createFaqDto, userLogged);
                return await this.faqServices.createFaq(faqToCreate);
            } catch (error) {
                return {message : error.message};   
            };
        };
```

The JWT is recovered from the request http headers and decrypted to access the userId included in the payload :

```typescript
    // ./src/authentification/authentification.service.ts
    async getUserLogged(req: Request): Promise <User>{
      const authHeader = req.headers['authorization'];
      const token = authHeader.substring(7); // <-- remove "Bearer "
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return await this.usersService.getUserById(+decodedToken.sub) // <-- return the user
    };

```

Here's a list of all endpoints, names are planned to be self-explanatory, the first ones are getAll : 

Login


| **Users**          | **Bars**                | **Merchandisings**                     |
|--------------------|-------------------------|-------------------------|
| users              | bars                    | merchandisings                         |
| users/createuser   | bars/createbar          | merchandisings/createmerchandising     |
| users/:id          | bars/:id                | merchandisings/:id                     |
| users/:id/edit     | bars/:id/editbar        | merchandisings/:id/editmerchandising   |
| users/:id/deleteuser | bars/:id/deletebar    | merchandisings/:id/deletemerchandising |
|-|-|-
| **Restaurants**    | **Campings**            | **Stages**              |
| restaurants        | campings                | stages                  |
| restaurants/createrestaurant | campings/createcamping | stages/createstage  |
| restaurants/:id    | campings/:id            | stages/:id              |
| restaurants/:id/edit | campings/:id/editcamping | stages/:id/editstage |
| restaurants/:id/deleterestaurant | campings/:id/deletecamping | stages/:id/deletestage |
|-|-|-
| **Toilets**        | **VIPs**                | **FAQs**                |
| toilets            | vips                    | faqs                    |
| toilets/createtoilet | vips/createvip        | faqs/createfaq          |
| toilets/:id        | vips/:id                | faqs/:id                |
| toilets/:id/edittoilet | vips/:id/editvip    | faqs/:id/editfaq        |
| toilets/:id/deletetoilet | vips/:id/deletevip | faqs/:id/deletefaq     |
|-|-|-
| **Informations**   | **News**                | **Bands**               |
| informations       | news                    | bands                   |
| informations/createinformation | news/createnews | bands/createband     |
| informations/:id   | news/:id                | bands/:id               |
| informations/:id/editinformation | news/:id/editnews | bands/:id/editband |
| informations/:id/deleteinformation | news/:id/deletenews | bands/:id/deleteband |
|-|-|-
| **Countdowns**     | **Performances**        | **Programs**            |
| countdowns         | performances            | programs                |
| countdowns/createcountdown | performances/createperformance | programs/:year |
| countdowns/:id     | performances/:id        | programs/:year/addperformance |
| countdowns/:id/editcountdown | performances/:id/editperformance | programs/:year/deleteperformance |
| countdowns/:id/deletecountdown | performances/:id/deleteperformance | |


## Tests

Test have been realized with Jest. All domain logic is tested, which make a total of 16 test suite and 89 individuals tests.
MockRepository have been used to test the domain logic, they located in each object test file, exemple : `./tests/user/mock.user.repository.ts` : 

```typescript
import { User } from "../../src/domain/models/user/user.model";
import { UserRepository } from "../../src/domain/repositories/user/user.repository";

export class MockUserRepository implements UserRepository {

    public users: User[] = [
        new User('John', 'Doe', 'john@example.com', 'password', 1),
        new User('Julien', 'Deaux', 'julien@example.com', 'password', 2),
        new User('Jane', 'Doe', 'jane@example.com', 'password', 3)
    ];

    setFakeIdToTest(): void {
        this.users[0].setId(1)
        this.users[1].setId(2)
        this.users[2].setId(3)
    };

    async getUserById(id: number): Promise<User | undefined> {
        return this.users.find(user => user.getId() === id);
    };

    async getUserByEmail(email: string): Promise<User> {
        return this.users.find(user => user.getEmail() === email);
    };

    async getAllUsers(): Promise<User[]> {
        return this.users;
    };

    async createUser(user: User): Promise<User> {
        user.setId(this.users.length + 1)        
        this.users.push(user);
        return user
    };

    async editUser(user: User): Promise<User> {
        let userId = user.getId();
        this.users[userId - 1] = user;
        return user
    };

    async deleteUser(userId: number): Promise<void> {
        this.users = this.users.filter(user => user.getId() !== userId);
    };
};
```


This repository is also called if user are needed to other objects tests, exemple of a test ont it : 

```typescript
    beforeEach(() => {
        userRepository = new MockUserRepository();
        administratorService = new RoleService();
        userService = new UserService(userRepository, administratorService);
        userRepository.setFakeIdToTest();
    });

    //getAllUsers
    it('Should return all users', async () => {
        const users = await userService.getAllUsers();
        expect(users).toHaveLength(3);
        expect(users).toEqual(expect.arrayContaining([
            expect.objectContaining({ _id: 1, _name: 'John' }),
            expect.objectContaining({ _id: 2, _name: 'Julien' }),
            expect.objectContaining({ _id: 3, _name: 'Jane' })
        ]));
    });
```

Each test are made on these fake datas, the MockRepository is injected when services are initialized






