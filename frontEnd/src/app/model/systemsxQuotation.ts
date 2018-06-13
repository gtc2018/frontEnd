import { ParentEntity } from './parentEntity.model';
import { SistemaModel } from './sistema.model';

export class SystemsxQuotationModel extends ParentEntity{

  public cotizacionId:number;
  public sistema:SistemaModel;
  public sistemaName:string;

}
