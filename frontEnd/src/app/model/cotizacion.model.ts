import { ParentEntity } from './parentEntity.model';
import { EnterpriseModel } from './enterprise';
import { FaseModel } from './fase';
import { ProyectoModel } from './proyectos';
import { EstadoModel } from './estado.model';
import { SistemaModel } from './sistema.model';
import { HerramientaModel } from './herramienta.model';
import { AlcanceModel } from './alcance.model';

export class CotizacionModel extends ParentEntity{
  
  public cliente: EnterpriseModel;
  public fases: FaseModel;
  public proyecto: ProyectoModel;

  public clienteId: string;
  public proyectoId: string;

  public estado:string;
  public alcance:string;

  public codigoRqm: string;
  public descripcionRqm: string; 
  public valueHour: number;
  public numeroRecursos: number;
  public fechaSolicitud: string;
  public fechaEntrega: string;
  public horasFase: number;
  public horasTotal: number;
  public valorTotal: number;
  public fechaEntregaRqm: string;
  public valorAcordado: number;
  public fechaCreacion: string;
  public usuarioCreacion: string;
  public fechaModificacion: string;
  public usuarioModificacion: string; 
}
