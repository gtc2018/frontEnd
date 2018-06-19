import { ParentEntity } from './parentEntity.model';
import { CotizacionModel } from './cotizacion.model';

export class FasesxDetalleCotizacionModel extends ParentEntity{

  public proceso: string;
  public componente: string;
  public descripcion:string;
  public fechaCreacion: string;
  public usuarioCreacion: string;
  public fechaModificacion: string;
  public usuarioModificacion: string; 

  public cotizacion: CotizacionModel;
}