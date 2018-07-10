import { ParentEntity } from './parentEntity.model';
import { ProyectoModel } from './proyectos';

export class DocumentoProyectoModel extends ParentEntity{

  public proyectoId: number;

  public proyecto: ProyectoModel;

  public nombre: string;
  public descripcion: string;
  public archivo: string;
  
  public fechaCreacion: string;
  public usuarioCreacion: string;
  public fechaModificacion: string;
  public usuarioModificacion: string; 

  public docBits: string;
  //public documento :string;
}
