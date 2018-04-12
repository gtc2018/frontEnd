import { RolModule } from './rol.module';

describe('RolModule', () => {
    let rolModule: RolModule;

    beforeEach(() => {
        rolModule = new RolModule();
    });

    it('should create an instance', () => {
        expect(rolModule).toBeTruthy();
    });
});
