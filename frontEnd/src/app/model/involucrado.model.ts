import { ParentEntity } from './parentEntity.model';
import { EmployeeModel } from './employee';
import { RequerimientoModel } from './requerimiento.model';

export class InvolucradoModel extends ParentEntity{

  public empleadoId: number;
  public requerimientoId: number;

  public empleado: EmployeeModel;
  public requerimiento: RequerimientoModel;

  public descripcion: String;
  public fechaCreacion: String;
  public usuarioCreacion: String;
  public fechaModificacion: String;
  public usuarioModificacion: String; 
}
