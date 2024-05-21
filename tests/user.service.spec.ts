import { UserService } from '../src/services/user/user.service'  
import { MockUserRepository } from './mockUserRepository'; 



describe('UserService', () => {
    let userService: UserService;
    let userRepository: MockUserRepository;

    beforeEach(() => {
        userRepository = new MockUserRepository();
        userService = new UserService(userRepository);
    });

    it('Should return a user by id', () => {
        const foundUser1 = userService.getUserById(1);
        const foundUser2 = userService.getUserById(2);
        const foundUser3 = userService.getUserById(3);
        expect(foundUser1).toEqual(expect.objectContaining({ _id: 1, _name: 'John' }));
        expect(foundUser2).toEqual(expect.objectContaining({ _id: 2, _name: 'Julien' }));
        expect(foundUser3).toEqual(expect.objectContaining({ _id: 3, _name: 'Jane' }));
    });

    it("Should return undefined as user doesn't exist", () => {
        const foundUser = userService.getUserById(999);
        expect(foundUser).toBeUndefined();
    });

    it('Should return all users', () => {
        const users = userService.getAllUsers();
        expect(users).toHaveLength(3);
        expect(users).toEqual(expect.arrayContaining([
            expect.objectContaining({ _id: 1, _name: 'John' }),
            expect.objectContaining({ _id: 2, _name: 'Julien' }),
            expect.objectContaining({ _id: 3, _name: 'Jane' })
        ]));
    });
});