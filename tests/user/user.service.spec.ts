import { UserService } from '../../src/services/user/user.service'  
import { MockUserRepository } from './mock.user.repository'; 
import { Role } from '../../src/domain/models/user/role.model';
import { User } from '../../src/domain/models/user/user.model';



describe('UserService', () => {
    let userService: UserService;
    let userRepository: MockUserRepository;

    beforeEach(() => {
        userRepository = new MockUserRepository();
        userService = new UserService(userRepository);
    });

    //getUserById existing user
    it('Should return a user by id', () => {
        const foundUser1 = userService.getUserById(1);
        const foundUser2 = userService.getUserById(2);
        const foundUser3 = userService.getUserById(3);
        expect(foundUser1).toEqual(expect.objectContaining({ _id: 1, _name: 'John' }));
        expect(foundUser2).toEqual(expect.objectContaining({ _id: 2, _name: 'Julien' }));
        expect(foundUser3).toEqual(expect.objectContaining({ _id: 3, _name: 'Jane' }));
    });

    //getUserById non existing user
    it("Should return undefined as user doesn't exist", () => {
        const foundUser = userService.getUserById(999);
        expect(foundUser).toBeUndefined();
    });

    //getAllUsers
    it('Should return all users', () => {
        const users = userService.getAllUsers();
        expect(users).toHaveLength(3);
        expect(users).toEqual(expect.arrayContaining([
            expect.objectContaining({ _id: 1, _name: 'John' }),
            expect.objectContaining({ _id: 2, _name: 'Julien' }),
            expect.objectContaining({ _id: 3, _name: 'Jane' })
        ]));
    });

    //createUser and return it with getUserById
    it('Should return user just created with id 666', () => {
        const user666 = new User(666,'Dev', 'Hill', 'dev@exemple.com', 'password', new Role(1, 'Author'));
        userRepository.createUser(user666);
        const foundUser666 = userService.getUserById(666);
        expect(foundUser666).toEqual(expect.objectContaining({ _id: 666, _name: 'Dev' }));
    });

    //editUser
    it('should return user 1 with name buggs', () => {
        const editedUser = new User(1, 'buggs', 'Doe', 'bugs@exemple.com', 'password', new Role(1, 'Author'));
        userService.editUser(editedUser);
        const foundUserEdited = userService.getUserById(1); 
        expect(foundUserEdited).toEqual(expect.objectContaining({ _id: 1, _name: 'buggs', _email: 'bugs@exemple.com' }));
    });

    //deleteUser
    it('should delete the user with id 1', () => {
        userService.deleteUser(1);
        const usersAfterDeletion = userService.getAllUsers();
        expect(usersAfterDeletion.some(user => user.getId() === 1)).toBeFalsy();
    });

});