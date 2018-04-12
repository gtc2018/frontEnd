import { ParentEntity } from './parentEntity.model';

export class ProyectoModel extends ParentEntity{

  public proyectoId: string;
  public clienteId: string;
  public nombre: string;
  public descripcion: string;
  public tipo: string;
  public urlCarpeta: number;
  public fechaCreacion: string;
  public usuarioCreacion: string;
  public fechaModificacion: string;
  public usuarioModificacion: string;

}
