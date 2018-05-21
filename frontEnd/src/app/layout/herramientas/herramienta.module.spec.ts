import { HerramientaModule } from './herramienta.module';

describe('HerramientaModule', () => {
    let herramientaModule: HerramientaModule;

    beforeEach(() => {
        herramientaModule = new HerramientaModule();
    });

    it('should create an instance', () => {
        expect(herramientaModule).toBeTruthy();
    });
});
