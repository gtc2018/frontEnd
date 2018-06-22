import { ParentEntity } from './parentEntity.model';
import { FaseModel } from './fase';
import { CotizacionModel } from './cotizacion.model';

export class DetalleCotizacionModel extends ParentEntity{

  public proceso: string;
  public componente: string;
  public descripcion:string;
  public fechaCreacion: string;
  public usuarioCreacion: string;
  public fechaModificacion: string;
  public usuarioModificacion: string; 

  public cotizacionId: number;

}