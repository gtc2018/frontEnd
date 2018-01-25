import { ParentEntity } from './parentEntity.model';

export class UsuarioModel extends ParentEntity{

  public nombres: string;
  public apellidos: string;
  public usuarioId: string;
  public empresaId: string;
  public rolId: string;
  public email: string;
  public password: string;
  public estado: string;
  public direccion: string;
  public telefono: string;
  public fechacreacion: string;
  public usuarioCreacion: string;
  public fechaModificacion: string;
  public usuarioModificacion: string;
  public imagenUsuario: string;

}
