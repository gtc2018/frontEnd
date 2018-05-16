import { PorcentajePorFaseModule } from './porcentajePorFase.module';

describe('PorcentajePorFaseModule', () => {
    let porcentajePorFaseModule: PorcentajePorFaseModule;

    beforeEach(() => {
        porcentajePorFaseModule = new PorcentajePorFaseModule();
    });

    it('should create an instance', () => {
        expect(porcentajePorFaseModule).toBeTruthy();
    });
});
