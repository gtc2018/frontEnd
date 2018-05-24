import { TareaModule } from './tarea.module';

describe('TareaModule', () => {
    let tareaModule: TareaModule;

    beforeEach(() => {
        tareaModule = new TareaModule();
    });

    it('should create an instance', () => {
        expect(tareaModule).toBeTruthy();
    });
});
