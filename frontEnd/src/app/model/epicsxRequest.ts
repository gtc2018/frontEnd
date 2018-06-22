import { ParentEntity } from './parentEntity.model';
import { EpicaModel } from './epica.model';

export class EpicsxRequestModel extends ParentEntity{

  public requerimientoId:number;
  public epica:EpicaModel;
  public epicaDescripcion:string;
  public usuarioCreacion: string;
    public usuarioModificacion: string;
}