import { ParentEntity } from './parentEntity.model';
import { EnterpriseModel } from './enterprise';
import { EmployeeModel } from './employee';

export class InHouseModel extends ParentEntity{

  public empleadoId: Number;
  public clienteId: Number;

  public empelado: EmployeeModel;
  public cliente: EnterpriseModel;

  public observacion: String;
  public costo: number;
  public desde: string;
  public hasta: string;

  public fechaCreacion: String;
  public usuarioCreacion: String;
  public fechaModificacion: String;
  public usuarioModificacion: String; 
}
