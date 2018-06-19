import { ParentEntity } from './parentEntity.model';
import { HerramientaModel } from './herramienta.model';

export class ToolsxQuotationModel extends ParentEntity{

  public cotizacionId:number;
  public herramienta:HerramientaModel;
  public herramientaName:string;

}