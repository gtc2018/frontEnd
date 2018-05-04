import { FaseModule } from './fase.module';

describe('FaseModule', () => {
    let faseModule: FaseModule;

    beforeEach(() => {
        faseModule = new FaseModule();
    });

    it('should create an instance', () => {
        expect(faseModule).toBeTruthy();
    });
});
