import { AdministratorService } from '../../src/services/user/administrator.service'; 
import { MockUserRepository } from './mock.user.repository'; 



describe('EditorService', () => {
    let administratorService: AdministratorService;
    let userRepository: MockUserRepository;
  
    beforeEach(() => {
    userRepository = new MockUserRepository();
    administratorService = new AdministratorService(userRepository);
    userRepository.setFakeIdToTest();
    });

    //isAdministrator
    it('shoud return true, user is administrator', () => {     
        const adminUser = administratorService.isAdmin(3)
        expect(adminUser).toBeTruthy();
    });

    //isAdministrator
    it("shoud return false, user isn't administrator", () => {
        const AuthorUser = administratorService.isAdmin(1)
        expect(AuthorUser).toBeFalsy();
    });


    it("should change the role of user id 1 from 1 to 2", () => {       
        administratorService.changeRole(3, 1, 2);
        expect(userRepository.getUserById(1).getRole()).toEqual(2);
    })

});

