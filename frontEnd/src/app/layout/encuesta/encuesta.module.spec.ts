import { EncuestaModule } from './encuesta.module';

describe('EncuestaModule', () => {
    let encuestaModule: EncuestaModule;

    beforeEach(() => {
        encuestaModule = new EncuestaModule();
    });

    it('should create an instance', () => {
        expect(encuestaModule).toBeTruthy();
    });
});
