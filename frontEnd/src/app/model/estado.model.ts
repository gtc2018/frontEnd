import { ParentEntity } from './parentEntity.model';

export class EstadoModel extends ParentEntity{
   

  public descripcion: String;
  public fechaCreacion: String;
  public usuarioCreacion: String;
  public fechaModificacion: String;
  public usuarioModificacion: String; 
}
