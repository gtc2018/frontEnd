import { ParentEntity } from './parentEntity.model';

export class ExternalEmployeeModel extends ParentEntity{

  public clienteId: string;

  public cargoId: string;

  public tipoEmpleado: string;

  public tipoDocumento: string;

  public numeroDocumento: string;

  public nombres: string;

  public apellidos: string;

  public email: string;

  public sexo: string;

  public estado: number;

  public direccion: string;

  public telefono: string;

  public extension: string;

  public usuarioCreacion: string;

  public fotoEmpleado: string;

  public imagen: string;

}