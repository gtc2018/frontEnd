import { ParentEntity } from './parentEntity.model';

export class SistemaModel extends ParentEntity{
   

  public descripcion: string;
  public fechaCreacion: string;
  public usuarioCreacion: string;
  public fechaModificacion: string;
  public usuarioModificacion: string; 
}
