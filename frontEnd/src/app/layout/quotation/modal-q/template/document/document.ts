import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { routerTransition } from '../../../../../router.animations';
import { PresupuestoModel } from '../../../../../model/presupuesto.model';
import { PresupuestoService } from '../../../../presupuestos/presupuesto.service';
import { OK } from '../../../../../messages/httpstatus';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'document-component',
  templateUrl: './document.html',
  animations: [routerTransition()],
    providers: [PresupuestoService] 
})
export class DocumentComponent implements OnInit {
    // @Input() title;
    // @Input() seleccionados;
    propuestas: PresupuestoModel[];
    presupuestoForm: PresupuestoModel;
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
    @Input() cotizacion: number;

  constructor(private presupuestoService: PresupuestoService,
    private toastr: ToastrService,){

    this.presupuestoForm = new PresupuestoModel;
    this.openDocument = new PresupuestoModel;
  }

  ngOnInit() {
    this.loadPropuestas();
  }

  //Funciones **************************************************************************************************************************
  
  //Carga las propuestas anexadas a la cotizacion
  loadPropuestas(){
    this.presupuestoService.getDocumentByQuotation(this.cotizacion).subscribe(res => {

      this.propuestas = res;

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

    this.presupuestoService.saveOrUpdate(this.presupuestoForm).subscribe(res => {
  
      this.toastr.success('Transacción satisfactoria', 'Gestión de InHouse');
      this.loadPropuestas();
      this.clean();
  
    },(error)=>{ //Controlando posible error
  
      this.toastr.error(error.error.message,"Error en la transacción");
    });
  }
  //antes de guardar
  save(){
    
    this.isValid = this.validate(this.presupuestoForm);

    if (this.isValid){

      this.presupuestoForm.cotizacionId = this.cotizacion;
      if(this.file !==null && this.file.name !==null){
        this.presupuestoForm.archivo = this.file.name;
      }

      this.saveOrUpdate();

    }else{
      this.message= 'Los campos con * son obligatorios!';
    }

  }

  //Modificar un registro
  upload(model){
    this.presupuestoForm = model;
    this.nameUpload = this.presupuestoForm.archivo.substr(25);
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

      this.presupuestoService.deletePropuesta(id).subscribe(res => {

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
    this.presupuestoForm.archivo = reader.result;
    this.docTemp =  reader.result;
    this.presupuestoForm.docBits = this.docTemp.split(/,(.+)/)[1];
  }
  //FIN DE CARGAR ARCHIVO ***************************************************************************

  //Validar que los campos esten llenos
  public validate(presupuestoForm: PresupuestoModel): boolean {
    
    if(!presupuestoForm.nombre){
      return false;
    }
    if(!presupuestoForm.descripcion){
      return false;
    }
    if(!presupuestoForm.archivo){
      return false;
    }
      
    return true;
  }

  //Limpiar
  clean(){
    this.presupuestoForm = new PresupuestoModel;
    this.docTemp = undefined;
    this.nameUpload = "Subir documento";
  }

}
