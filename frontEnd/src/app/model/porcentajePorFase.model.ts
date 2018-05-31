import { ParentEntity } from './parentEntity.model';
import { EnterpriseModel } from './enterprise';
import { FaseModel } from './fase';

export class PorcentajePorFaseModel extends ParentEntity{
   
  public clienteId: number;
  public fasesId: Number;
  public cliente: EnterpriseModel;
  public fases: FaseModel;
  public porcentaje: number;
  public fechaCreacion: String;
  public usuarioCreacion: String;
  public fechaModificacion: String;
  public usuarioModificacion: String; 
}
