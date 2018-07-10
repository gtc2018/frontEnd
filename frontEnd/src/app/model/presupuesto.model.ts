import { ParentEntity } from './parentEntity.model';
import { CotizacionModel } from './cotizacion.model';

export class PresupuestoModel extends ParentEntity{

  public cotizacionId: number;

  public cotizacion: CotizacionModel;

  public nombre: string;
  public descripcion: string;
  public archivo: string;
  
  public fechaCreacion: string;
  public usuarioCreacion: string;
  public fechaModificacion: string;
  public usuarioModificacion: string; 

  public docBits: string;
  //public documento :string;
}
