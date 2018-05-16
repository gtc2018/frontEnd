import { ParentEntity } from './parentEntity.model';
import { EnterpriseModel } from './enterprise';

export class CargoModel extends ParentEntity{
   
  public clienteId: Number;
  public cliente: EnterpriseModel;
  public descripcion: String;
  public fechaCreacion: String;
  public usuarioCreacion: String;
  public fechaModificacion: String;
  public usuarioModificacion: String; 
}
