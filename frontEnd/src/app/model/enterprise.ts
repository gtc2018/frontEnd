import { ParentEntity } from './parentEntity.model';

export class EnterpriseModel extends ParentEntity{

  public empresaId: string;
  public descripcion: string;
  public tipoCliente: string;
  public urlCarpeta: string;
  public numeroDocumento: string;
  public tipoDocumento: string;
  public nombreContacto: string;
  public email: string;
  public telefono: string;
  public estado: number;
  public direccion: string;
  public imagen: string;
  public fechaCreacion: string;
  public usuarioCreacion: string;
  public usuarioModificacion: string;
  public imagenEmpresa: string;


}
