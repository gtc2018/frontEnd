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

  public numeroCasoPrueba: Number;
  public numeroHallazgoBloqueante: number;
  public numeroHallazgoFuncional: number;
  public numeroHallazgoPresentacion: number;

  public descripcion: string;
  public version: string;
  public centroCosto: string;
  public archivo: string;
  public gestorTecnico: string;
  public gestorProyecto: string;
  public fechaInicio: string;
  public fechaPlaneadaEntrega: string;
  public fechaEntrega: string;
  public emailTecnico: string;
  public emailProyecto: string;
  public fechaCreacion: string;
  public usuarioCreacion: string;
  public fechaModificacion: string;
  public usuarioModificacion: string; 
  public documento: string;
}
