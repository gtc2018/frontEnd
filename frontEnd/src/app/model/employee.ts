import { ParentEntity } from './parentEntity.model';

export class EmployeeModel extends ParentEntity{

  public name: string;
  public apellidos: string;
  public tipoEmpresa: string;
  public document: string;
  public telefono: string;
  public email: string;
  public estado: string;
  public foto: string;

}
