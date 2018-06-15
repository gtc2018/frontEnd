import { ParentEntity } from './parentEntity.model';
import { EnterpriseModel } from './enterprise';
import { CargoModel } from './cargo.model';
import { AreaModel } from './area.model';
import { DaneModel } from './dane.model';

export class EmployeeModel extends ParentEntity{

  public cliente: EnterpriseModel;
  public cargo: CargoModel;
  public area: AreaModel;
  public pais: number;
  public departamento: number;

  public clienteId: Number;
  public cargoId: Number;
  public areaId: Number;

  public tipoEmpleado: string;
  public tipoDocumento: string;
  public numeroDocumento: string;
  public nombres: string;
  public apellidos: string;
  public email: string;
  public direccion: string;
  public telefono: string;
  public sueldo: string;
  public sexo: string;
  public ciudad: number;
  public estado: number;
  public foto: string;
  public usuarioCreacion: string;
  public usuarioModificacion: string;
  public otrosBeneficios: string;
  public celular: string;
  public imagen: string;

}
