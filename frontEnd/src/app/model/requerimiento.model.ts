import { ParentEntity } from './parentEntity.model';
import { EnterpriseModel } from './enterprise';
import { FaseModel } from './fase';
import { ProyectoModel } from './proyectos';
import { EstadoModel } from './estado.model';
import { CotizacionModel } from './cotizacion.model';

export class RequerimientoModel extends ParentEntity{
   
  public clienteId: Number;
  public proyectoId: Number;
  public cotizacionId: Number;
  public faseId: Number;
  public estadoId: Number;

  public cliente: EnterpriseModel;
  public proyecto: ProyectoModel;
  public cotizacion: CotizacionModel;
  public fase:FaseModel;
  public estado:EstadoModel;

  public porcentaje: Number;
  public fechaCreacion: String;
  public usuarioCreacion: String;
  public fechaModificacion: String;
  public usuarioModificacion: String; 
}
