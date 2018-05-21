import { AlcanceModule } from './alcance.module';

describe('AlcanceModule', () => {
    let alcanceModule: AlcanceModule;

    beforeEach(() => {
        alcanceModule = new AlcanceModule();
    });

    it('should create an instance', () => {
        expect(alcanceModule).toBeTruthy();
    });
});
