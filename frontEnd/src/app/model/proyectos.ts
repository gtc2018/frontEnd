import { ParentEntity } from './parentEntity.model';
import { EnterpriseModel } from './enterprise';

export class ProyectoModel extends ParentEntity{

  public proyectoId: string;
  public clienteId: string;
  public cliente: EnterpriseModel;
  public nombre: string;
  public gerente: string;
  public presupuesto: string;
  public descripcion: string;
  public tipo: string;
  public urlCarpeta: number;
  public fechaCreacion: string;
  public usuarioCreacion: string;
  public fechaModificacion: string;
  public usuarioModificacion: string;
  
  public docBits: string;
  public documento :string;

}
