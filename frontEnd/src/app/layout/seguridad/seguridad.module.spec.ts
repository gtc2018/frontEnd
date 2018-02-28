import { SeguridadModule } from './seguridad.module';

describe('SeguridadModule', () => {
    let seguridadModule: SeguridadModule;

    beforeEach(() => {
        seguridadModule = new SeguridadModule();
    });

    it('should create an instance', () => {
        expect(seguridadModule).toBeTruthy();
    });
});
