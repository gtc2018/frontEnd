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
  public sistema: SistemaModel;
  public herramienta: HerramientaModel;
  public estado: EstadoModel;
  public alcance: AlcanceModel;

  public clienteId: Number;
  public fasesId: Number;
  public proyectoId: Number;
  public sistemaId: Number;
  public herramientaId: Number;
  public estadoId: Number;
  public alcanceId: Number;

  public codigoRequerimiento: String;
  public descripcion: String; 
  public valorHora: Number;
  public numeroRecurso: Number;
  public fechaSolicitud: String;
  public fechaEntrega: String;
  public horasFase: Number;
  public horasRqm: Number;
  public valorRqm: Number;
  public fechaAproxEntrega: String;
  public valorAcordado: Number;
  public fechaCreacion: String;
  public usuarioCreacion: String;
  public fechaModificacion: String;
  public usuarioModificacion: String; 
}
