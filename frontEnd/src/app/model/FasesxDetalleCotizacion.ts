import { ParentEntity } from './parentEntity.model';
import { CotizacionModel } from './cotizacion.model';
import { FaseModel } from './fase';

export class FasesxDetalleCotizacionModel extends ParentEntity{
  
  public detalleCotizacionId:string;
  public fase: FaseModel;
  public faseName:string;
}