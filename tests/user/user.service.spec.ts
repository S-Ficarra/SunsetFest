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
        userRepository.setFakeIdToTest();
    });

    //getUserById existing user
    it('Should return a user by id', () => {
        const foundUser1 = userService.getUserById(1);
        expect(foundUser1).toEqual(expect.objectContaining({ _id: 1, _name: 'John' }));
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
    it('Should return user just created with id 4', () => {
        const user4 = new User('Dev', 'Hill', 'dev@exemple.com', 'password', new Role(1, 'Author'));
        const foundUser4 = userService.createUser(user4);
        expect(foundUser4).toEqual(expect.objectContaining({ _id: 4, _name: 'Dev' }));
    });

    //editUser
    it('should return user 1 with name buggs', () => {
        const editedUser = new User('buggs', 'Doe', 'bugs@exemple.com', 'password', new Role(1, 'Author'));
        editedUser.setId(1);
        const foundUserEdited = userService.editUser(editedUser);
        expect(foundUserEdited).toEqual(expect.objectContaining({ _id: 1, _name: 'buggs', _email: 'bugs@exemple.com' }));
    });

    //deleteUser
    it('should delete the user with id 1', () => {
        userService.deleteUser(1);
        const usersAfterDeletion = userService.getAllUsers();
        expect(usersAfterDeletion.some(user => user.getId() === 1)).toBeFalsy();
    });

});