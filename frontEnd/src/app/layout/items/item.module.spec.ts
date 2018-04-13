import { ItemsModule } from './item.module';

describe('ItemModule', () => {
    let itemModule: ItemsModule;

    beforeEach(() => {
        itemModule = new ItemsModule();
    });

    it('should create an instance', () => {
        expect(itemModule).toBeTruthy();
    });
});
