import { ParentEntity } from './parentEntity.model';
import { EnterpriseModel } from './enterprise';
import { FaseModel } from './fase';

export class PorcentajePorFaseModel extends ParentEntity{
   
  public clienteId: Number;
  public fasesId: Number;
  public cliente: EnterpriseModel;
  public fases: FaseModel;
  public porcentaje: Number;
  public fechaCreacion: String;
  public usuarioCreacion: String;
  public fechaModificacion: String;
  public usuarioModificacion: String; 
}
