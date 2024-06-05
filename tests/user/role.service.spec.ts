import { RoleService } from '../../src/services/user/role.service';
import { MockUserRepository } from './mock.user.repository'; 



describe('EditorService', () => {
    let roleService: RoleService;
    let userRepository: MockUserRepository;
  
    beforeEach(() => {
    userRepository = new MockUserRepository();
    roleService = new RoleService();
    userRepository.setFakeIdToTest();
    });

    //isAdministrator with administrator user
    it('shoud return true, user is administrator', async () => {     
        const adminUser = roleService.isAdmin(userRepository.users[2])
        expect(adminUser).toBeTruthy();
    });

    //isAdministrator with not administrator user
    it("shoud return false, user isn't administrator", async () => {
        const AuthorUser = roleService.isAdmin(userRepository.users[0])
        expect(AuthorUser).toBeFalsy();
    });

    //changeRole
    it("should change the role of user id 1 from 1 to 2", async () => {       
        roleService.changeRole(userRepository.users[2], userRepository.users[0], 2);
        expect((await userRepository.getUserById(1)).getRole()).toEqual(2);
    })

    //isEditor with editor user
    it('shoud return true, user is editor', async () => {
        const EditorUser = roleService.isEditor(userRepository.users[1])
        expect(EditorUser).toBeTruthy();
    });

    //isEditor with not editor user
    it("shoud return false, user isn't editor", async () => {
        const EditorUser = roleService.isEditor(userRepository.users[0])
        expect(EditorUser).toBeFalsy();
    });

});

