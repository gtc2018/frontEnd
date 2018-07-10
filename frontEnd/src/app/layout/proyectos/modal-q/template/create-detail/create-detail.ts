import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LoginService } from '../../../../../login/servicios/login.service';
import { BsComponentComponent } from './../../../../bs-component/bs-component.component';
import { CrearPorcentajePorFaseService } from '../../../../porcentajePorFase/servicios/crear-porcentajePorFase.service';
import { Router } from '@angular/router';
import { PorcentajePorFaseModel } from '../../../../../model/porcentajePorFase.model';
import { PermisoModel } from '../../../../../model/permiso.model';
 
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../../../../router.animations';
import { PorcentajePorFaseService } from '../../../../porcentajePorFase/servicios/porcentajePorFase.service';
import { OK } from '../../../../../messages/httpstatus';
import { MenuService } from '../../../../menus/servicios/menu.service';
import { ItemService } from '../../../../items/servicios/item.service';
import { ItemsModel } from '../../../../../model/items.model';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../../../../../shared/guard/auth.service';
import { EnterpriseModel } from '../../../../../model//enterprise';
import { EnterpriseService } from '../../../../enterprise/enterprise.service';

import swal from 'sweetalert2';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { FaseModel } from '../../../../../model/fase';
import { InHouseService } from '../../../../in-houses/inHouse.service';
import { InHouseModel } from '../../../../../model/in-house.model';

import { PresupuestoModel } from '../../../../../model/presupuesto.model';
import { PresupuestoService } from '../../../../presupuestos/presupuesto.service';
import { DocumentoProyectoModel } from '../../../../../model/documentoProyecto.model';
import { DocumentoProyectoService } from '../../../../documentoProyecto/documentoProyecto.service';

@Component({
  selector: 'create-detail-component',
  templateUrl: './create-detail.html',
  animations: [routerTransition()],
    providers: [PorcentajePorFaseService, CrearPorcentajePorFaseService, EnterpriseService, InHouseService, LoginService, DocumentoProyectoService] 
})
export class CreateDetailComponent implements OnInit, OnChanges {

  // Variables -----------------------------
  documentos: DocumentoProyectoModel[];
    documentoForm: DocumentoProyectoModel;
    openDocument: PresupuestoModel;
    nameUpload: string = "Subir Documento";
    styleIconUpload: string = "";
    iconUpload: string = "fa-upload";
    ruta:string = "http://25.72.193.72:8887/diccionario de datos.docx";
    documentTemp: string ="";
    private docTemp:string="";
    message: string;

    dragging: boolean = false;
    private isValid: boolean = true;

  file: File = null;


  enterprises: EnterpriseModel[];
  filterEnterprise : EnterpriseModel[];
  inHouses: InHouseModel[];
  
  inHouseForm: InHouseModel;
  private permiso: PermisoModel;

  filter: InHouseModel = new InHouseModel();

  messageEmail: string;
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  icon: string = "fa fa-caret-left";
  imageSrc: string = 'assets/images/avatar.png';
  antFechD: string;
  antFechH: string;
  ediFecD: string;
  ediFecH: string;
  dia: string;
  mes: string;
  año: string;

  stateExpand: number = 1;

  emailRegex: RegExp;

  fechaInicio; NgbDateStruct;
  fechaHasta; NgbDateStruc;

  user: any;
  items: any;
  menus: any;
  
  deleteFormHide:boolean = false;
  visible: boolean = false;
  private isValidFechas: boolean = true;

  crear = false;
  editar = false;
  eliminar = false;
  leer = false;

  @Input() empresaId: number;

  // Metodos principales----------------------------------------------------
  constructor(
    private enterpriseService: EnterpriseService,
    private inHouseService: InHouseService,
    private router: Router,
    private toastr: ToastrService,
    private login: AuthService,
    private menu: LoginService,
    private menup: LoginService,
    private documentoProyectoService: DocumentoProyectoService,
  ) {

    this.inHouseForm = new InHouseModel();
    this.inHouseForm.empleadoId = this.empresaId;

    this.documentoForm = new DocumentoProyectoModel;
    this.openDocument = new PresupuestoModel;

  }

  // Se inicia con estos metodos
  ngOnInit() {
    this.loadPropuestas();

  }

  ngOnChanges(){

  }

  //Funciones **************************************************************************************************************************
  
  //Carga las propuestas anexadas a la cotizacion
  loadPropuestas(){
    this.documentoProyectoService.getDocumentByProject(this.empresaId).subscribe(res => {

      this.documentos = res;

      console.log(this.documentos);

      /*for(let p of this.propuestas){
        p.archivo = p.archivo.substr(25);
      }*/
  
    },(error)=>{ //Controlando posible error
  
      this.toastr.error(error.error.message,"Error en la transacción");
    });
  }

  //Carga las propuestas anexadas a la cotizacion
  /*OpenDocument(model){

    this.openDocument = model;
    console.log(this.openDocument);
    this.presupuestoService.getOpenDocument(this.openDocument).subscribe(res => {

      this.toastr.success('Transacción satisfactoria', 'Gestión de InHouse');
  
    },(error)=>{ //Controlando posible error
  
      this.toastr.error(error.error.message,"Error en la transacción");
    });
  }*/

  //Para guardar
  saveOrUpdate(){

    this.documentoProyectoService.saveOrUpdate(this.documentoForm).subscribe(res => {
  
      this.toastr.success('Transacción satisfactoria', 'Gestión de InHouse');
      this.loadPropuestas();
      this.clean();
  
    },(error)=>{ //Controlando posible error
  
      this.toastr.error(error.error.message,"Error en la transacción");
    });
  }
  //antes de guardar
  save(){
    
    this.isValid = this.validate(this.documentoForm);

    if (this.isValid){

      this.documentoForm.proyectoId = this.empresaId;
      if(this.file !==null && this.file.name !==null){
        this.documentoForm.archivo = this.file.name;
      }

      this.saveOrUpdate();

    }else{
      this.message= 'Los campos con * son obligatorios!';
    }

  }

  //Modificar un registro
  upload(model){
    this.documentoForm = model;
    this.nameUpload = this.documentoForm.archivo.substr(25);
  };

  //Borrar un registro
  delete(id){

    swal({
      title: 'Esta seguro?',
      text: "El registro eliminado no podrá ser recuperado",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
  }).then((result) => {

    if (result.value) {

      this.documentoProyectoService.deleteDocumento(id).subscribe(res => {

        this.loadPropuestas();

        this.toastr.success('Registro eliminado satisfactoriamente.');
      }, (error) => {

        this.toastr.error(error.error.message,"Error en la transacción");
      });       
          
    }
  })
  }

  // CARGAR ARCHIVO ************************************************************************************************ 
  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleInputChange(e) {

    this.file = <File>e.target.files[0];

    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    console.log(file);

    var word = /word-*|excel-*|pdf-*|officedocument-*/;
    var excel = /excel-*/;
    var pdf = /pdf-*/;

    var reader = new FileReader();

    console.log(file.type);

    if (!file.type.match(word)) {
        swal(
            'Error al cargar el documento',
            'Solo se pueden cargar documentos de excel, word o pdf',
            'error'
        );
        return;
    }

    this.styleIconUpload = "green";

    this.iconUpload = "fa-check-circle";

    this.nameUpload = file.name;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    var reader = e.target;

    console.log(reader.result);
    this.documentoForm.archivo = reader.result;
    this.docTemp =  reader.result;
    this.documentoForm.docBits = this.docTemp.split(/,(.+)/)[1];
  }
  //FIN DE CARGAR ARCHIVO ***************************************************************************

  //Validar que los campos esten llenos
  public validate(documentoForm: DocumentoProyectoModel): boolean {
    
    if(!documentoForm.nombre){
      return false;
    }
    if(!documentoForm.descripcion){
      return false;
    }
    if(!documentoForm.archivo){
      return false;
    }
      
    return true;
  }

  //Limpiar
  clean(){
    this.documentoForm = new DocumentoProyectoModel;
    this.docTemp = undefined;
    this.nameUpload = "Subir documento";
  }

}
