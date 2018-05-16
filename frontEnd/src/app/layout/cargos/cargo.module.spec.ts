import { CargoModule } from './cargo.module';

describe('CargoModule', () => {
    let cargoModule: CargoModule;

    beforeEach(() => {
        cargoModule = new CargoModule();
    });

    it('should create an instance', () => {
        expect(cargoModule).toBeTruthy();
    });
});
