import { ParentEntity } from './parentEntity.model';
import { ProyectoModel } from './proyectos';
import { RequerimientoModel } from './requerimiento.model';

export class EpicaModel extends ParentEntity{

    public proyecto: ProyectoModel;

    public proyectoId: Number;
    public estadoe: number;
    
    public descripcion: string;
    public usuarioCreacion: string;
    public usuarioModificacion: string; 

}