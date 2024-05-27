import { EditorService } from '../../src/services/user/editor.service'; 
import { MockUserRepository } from './mock.user.repository'; 



describe('EditorService', () => {
    let editorService: EditorService;
    let mockUserRepository: MockUserRepository;
  
    beforeEach(() => {
      mockUserRepository = new MockUserRepository();
      editorService = new EditorService(mockUserRepository);
      mockUserRepository.setFakeIdToTest();
    });

    //isEditor
    it('shoud return true, user is editor', () => {
        const EditorUser = editorService.isEditor(2)
        expect(EditorUser).toBeTruthy();
    });

    //isEditor
    it("shoud return false, user isn't editor", () => {
        const EditorUser = editorService.isEditor(1)
        expect(EditorUser).toBeFalsy();
    });
});

