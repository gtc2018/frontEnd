import { ProyectosModule } from './proyectos.module';

describe('ProyectosModule', () => {
    let proyectosModule: ProyectosModule; 

    beforeEach(() => {
        proyectosModule = new ProyectosModule();
    });

    it('should create an instance', () => {
        expect(proyectosModule).toBeTruthy();
    });
});
