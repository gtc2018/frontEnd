import { ParentEntity } from './parentEntity.model';

export class EmployeeToEnterprise extends ParentEntity{

  public empleadoId : string;
  public proyectoId : string;
  public fechaCreacion : string;
  public usuarioCreacion : string;
  public fechaModificacion : string;
  public usuarioModificacion : string;

}
