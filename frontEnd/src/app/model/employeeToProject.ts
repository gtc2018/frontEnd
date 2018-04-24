import { ParentEntity } from './parentEntity.model';

export class EmployeeToProject extends ParentEntity{

  public empleadoId : string;
  public nombreEmpleado :string;
  public apellidoEmpleado :string;
  public fotoEmpleado :string;
  public proyectoId : string;
  public fechaCreacion : string;
  public usuarioCreacion : string;
  public fechaModificacion : string;
  public usuarioModificacion : string;

}
