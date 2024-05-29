import { UserService } from '../../src/services/user/user.service'  
import { MockUserRepository } from './mock.user.repository'; 
import { User } from '../../src/domain/models/user/user.model';
import { AdministratorService } from '../../src/services/user/administrator.service';



describe('UserService', () => {
    let userService: UserService;
    let userRepository: MockUserRepository;
    let administratorService: AdministratorService

    beforeEach(() => {
        userRepository = new MockUserRepository();
        administratorService = new AdministratorService(userRepository);
        userService = new UserService(userRepository, administratorService);
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

    //createUser by admin
    it('Should return user just created with id 4', () => {
        const user4 = new User('Dev', 'Hill', 'dev@exemple.com', 'password', 1);
        const foundUser4 = userService.createUser(3, user4);
        expect(foundUser4).toEqual(expect.objectContaining({ _id: 4, _name: 'Dev' }));
    });

    //createUser by non admin
    it('Should return an error and Unauthorized string', () => {
        const user4 = new User('Dev', 'Hill', 'dev@exemple.com', 'password', 1);
        const createUserCall = () => userService.createUser(1, user4);
        expect(createUserCall).toThrow('Unauthorized');
        expect(createUserCall).toThrow(Error);
    });

    //editUser by admin
    it('should return user 1 with name buggs', () => {
        const editedUser = new User('buggs', 'Doe', 'bugs@exemple.com', 'password', 1);
        editedUser.setId(1);
        const foundUserEdited = userService.editUser(3, editedUser);
        expect(foundUserEdited).toEqual(expect.objectContaining({ _id: 1, _name: 'buggs', _email: 'bugs@exemple.com' }));
    });

    //editUser by non admin
    it('should return an error and Unauthorized string', () => {
        const editedUser = new User('buggs', 'Doe', 'bugs@exemple.com', 'password', 1);
        editedUser.setId(1);
        const editUserCall = () => userService.editUser(1, editedUser);
        expect(editUserCall).toThrow('Unauthorized');
        expect(editUserCall).toThrow(Error);
    });

    //deleteUser by admin 
    it('should delete the user with id 1', () => {
        userService.deleteUser(3, 1);
        const usersAfterDeletion = userService.getAllUsers();
        expect(usersAfterDeletion.some(user => user.getId() === 1)).toBeFalsy();
    });

    //deleteUSer by non admin
    it('should return an error and Unauthorized string', () => {
        const deleteUserCall = () => userService.deleteUser(1, 1);
        expect(deleteUserCall).toThrow('Unauthorized');
        expect(deleteUserCall).toThrow(Error);
    });

});