import { ParentEntity } from './parentEntity.model';

export class request extends ParentEntity{
  
    public clienteId: string;

    public proyectoId: string;

    public numeroRq: string;

    public numeroCasoPrueba: string;

    public descripcion: string;

    public version: string;

    public estado: number;

    public fase: string;

    public fechaInicio: string;

    public fechaPlaneadaEntrega: string;

    public fechaEntrega: string;

    public numeroHallazgoBloqueante: string;

    public numeroHallazgoFuncional: string;

    public numeroHallazgoPresentacion: string;

    public centroCosto: string;

    public observacion: string;

    public gestorTecnico: string;

    public gestorProyecto: string;

    public fechaCreacion: string;
    
    public usuarioCreacion: string;

    public fechaModificacion: string;

    public usuarioModificacion: string;


}