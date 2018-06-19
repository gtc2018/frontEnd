import { ParentEntity } from './parentEntity.model';
import { FaseModel } from './fase';

export class DetalleCotizacionModel extends ParentEntity{
  
  public detalleCotizacionId:string;
  public fase: FaseModel;
  public faseName:string;

}