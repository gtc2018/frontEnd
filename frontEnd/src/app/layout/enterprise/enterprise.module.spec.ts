import { EnterpriseModule } from './Enterprise.module';

describe('EnterpriseModule', () => {
  let enterpriseModule: EnterpriseModule;

  beforeEach(() => {
    enterpriseModule = new EnterpriseModule();
  });

  it('should create an instance', () => {
    expect(enterpriseModule).toBeTruthy();
  });
});
