import { ParentEntity } from './parentEntity.model';

export class DaneModel extends ParentEntity{
   

  public padre: string;
  public codigo: string;
  public descripcion: string;
  public tipo: string;
  public padreId: number; 
}
