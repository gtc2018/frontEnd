import { ParentEntity } from '../parentEntity.model';
import { EnterpriseModel } from '../enterprise';
import { EmployeeModel } from '../employee';
import { RolModel } from '../rol.model';

export class UsuarioModel extends ParentEntity{

  public cliente: EnterpriseModel;
  public empleado: EmployeeModel;
  public rol: RolModel;

  public clienteId: Number;
  public empleadoId: Number;
  public rolId: Number;

  public nombres: string;
  public apellidos: string;
  public email: string;
  public password: string;
  public estado: string;
  public direccion: string;
  public telefono: string;
  public fechacreacion: string;
  public usuarioCreacion: string;
  public fechaModificacion: string;
  public usuarioModificacion: string;
  public imagenUsuario: string;
  public fotoEmpleado: string;
  public fotoEmpresa: string;
  public usuarioId: string;

}
