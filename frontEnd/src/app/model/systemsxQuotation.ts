import { ParentEntity } from './parentEntity.model';
import { SistemaModel } from './sistema.model';
import { HerramientaModel } from './herramienta.model';

export class SystemsxQuotationModel extends ParentEntity{

  public cotizacionId:number;
  public sistema:HerramientaModel;
  public sistemaName:string;

}
