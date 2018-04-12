import { PermisoModule } from './permiso.module';

describe('PermisoModule', () => {
    let permisoModule: PermisoModule;

    beforeEach(() => {
        permisoModule = new PermisoModule();
    });

    it('should create an instance', () => {
        expect(permisoModule).toBeTruthy();
    });
});
