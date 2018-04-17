import { ParentEntity } from './parentEntity.model';
import { RolModel } from './rol.model';
import { MenusModel } from './menus.model';
import { ItemsModel } from './items.model';


export class PermisoModel extends ParentEntity{

  //public menuId: MenusModel;
  public item_id: string;
  public rolId: string;
  public menu_id: string;
  public usuarioCcreacion: string;
  public estado: number;
  public crear: number;
  public editar: number;
  public leer: number;
  public eliminar: number;
  public usuarioModificacion: string;




}
