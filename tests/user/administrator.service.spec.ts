import { AdministratorService } from '../../src/services/user/administrator.service'; 
import { MockUserRepository } from './mock.user.repository'; 



describe('EditorService', () => {
    let administratorService: AdministratorService;
    let mockUserRepository: MockUserRepository;
  
    beforeEach(() => {
      mockUserRepository = new MockUserRepository();
      administratorService = new AdministratorService(mockUserRepository);
      mockUserRepository.setFakeIdToTest();
    });

    //isAdministrator
    it('shoud return true, user is administrator', () => {     
        const adminUser = administratorService.isAdmin(3)
        expect(adminUser).toBeTruthy();
    });

    //isAdministrator
    it("shoud return false, user isn't administrator", () => {
        const EditorUser = administratorService.isAdmin(1)
        expect(EditorUser).toBeFalsy();
    });
});

