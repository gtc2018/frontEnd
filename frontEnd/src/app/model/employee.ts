import { ParentEntity } from './parentEntity.model';

export class EmployeeModel extends ParentEntity{

  public clienteId: string;

  public cargoId: string;

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

  public ciudad: string;

  public estado: string;

  public foto: string;

  public usuarioCreacion: string;

  public otrosBeneficios: string;

  public celular: string;

  public imagen: string;

}
