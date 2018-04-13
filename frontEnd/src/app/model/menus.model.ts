import { ParentEntity } from './parentEntity.model';

export class MenusModel extends ParentEntity{

  public descripcion: string;
  public url: string;
  public icono: string;
  public parent: string;
  public grupo: string;
  public usuario: string;

}