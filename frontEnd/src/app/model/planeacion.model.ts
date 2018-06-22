import { ParentEntity } from './parentEntity.model';
import { EnterpriseModel } from './enterprise';
import { ProyectoModel } from './proyectos';
import { RequerimientoModel } from './requerimiento.model';
import { EpicaModel } from './epica.model';


export class PlaneacionModel extends ParentEntity{
   
  public clienteId: Number;
  public proyectoId: Number;
  public requerimientoId: Number;
  public epicaId: Number;

  public cliente: EnterpriseModel;
  public proyecto: ProyectoModel;
  public requerimiento: RequerimientoModel;
  public epica:EpicaModel; 

  public titulo: string;
  public descripcion: string;
  public fechaInicio: string;
  public fechaFin: string;
  public fechaCreacion: string;
  public usuarioCreacion: string;
  public fechaModificacion: string;
  public usuarioModificacion: string; 
  public estado: Number;
}