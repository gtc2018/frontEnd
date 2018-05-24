import { ParentEntity } from './parentEntity.model';
import { EnterpriseModel } from './enterprise';
import { FaseModel } from './fase';
import { ProyectoModel } from './proyectos';
import { EmployeeModel } from './employee';
import { RequerimientoModel } from './requerimiento.model';
import { TareaModel } from './tarea.model';
import { AreaModel } from './area.model';

export class RegistroActividadModel extends ParentEntity{
   
  public clienteId: Number;
  public proyectoId: Number;
  public requerimientoId: Number;
  public faseId: Number;
  public empleadoId: Number;
  public areaId: Number;
  public tareaId: Number;

  public cliente: EnterpriseModel;
  public proyecto: ProyectoModel;
  public requerimiento: RequerimientoModel;
  public fase:FaseModel;
  public empleado:EmployeeModel;
  public area:AreaModel;
  public tarea:TareaModel;

  public descripcion: String;
  public horaInicio: string;
  public horaFin: string;
  public duracion: string;
  public fechaTrabajo: String;
  public diaTotal: String;
  public fechaCreacion: String;
  public usuarioCreacion: String;
  public fechaModificacion: String;
  public usuarioModificacion: String; 
}
