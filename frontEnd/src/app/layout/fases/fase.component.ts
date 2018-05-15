import { FaseModel } from './../../model/fase';
import { FaseService } from './servicios/fase.service';
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';


import { OK } from '../../messages/httpstatus';
import swal from 'sweetalert2';


@Component({
    selector: 'app-fase',
    templateUrl: './fase.component.html',
    styleUrls: ['./fase.component.scss'],
    animations: [routerTransition()],
    providers: [FaseService]
})
export class FaseComponent implements OnInit {

    private isValid: boolean = true;
    private message: string = "";
    private fase: FaseModel;
    private fases: Array<FaseModel>;
    grupos = [];
    contador: number = 0;

    visible = false;

    toggleDivCreateMenus() {
        this.visible = !this.visible;
    }

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private faseService: FaseService
    ) {
        this.fase = new FaseModel();
    }

    ngOnInit() {
        this.loadFases();

    }

    private loadFases(): void {
        this.faseService.getFases().subscribe(res => {
            this.fases = res;
        });

    }


    private clearModel(): void {
        this.fase.descripcion = "";
    }


    public saveOrUpdate(fase): void {
        console.log("==============FASES=================")
        console.log(fase);
        if (this.isValid) {
            this.faseService.saveOrUpdate(this.fase).subscribe(res => {
                this.toastr.success('Transacción realizada satisfactoriamente.');
                this.loadFases();
                this.clearModel();

            }, (error) => {
                console.log(error);
                this.toastr.error(error.error.message, "Error al guardar o actulizar la fase.");

            });
        }else{
            this.message = "Los campos con * son obligatorios.";
        }



    }

    delete(id) {

        if (id != null) {
            this.fase.id = id;
        }

        swal({
            //title: 'Esta seguro que desea eliminar el registro?',
            text: "Está seguro que desea eliminar el registro?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {

            if (result.value) {

                this.faseService.deleteFase(this.fase).subscribe(res => {
                    this.toastr.success('El registro fue eliminado satisfactorio.');
                    this.loadFases();

                }, (error) => {
                    this.toastr.error('Falló la eliminacion del registro.');
                    console.log(error);

                });


            }
        })

    }


    public edit(fase: FaseModel): void {
        sessionStorage.setItem('fase', JSON.stringify(fase));
        this.fase = JSON.parse(sessionStorage.getItem("fase"));
        this.visible = true;

    }

    private getRolById(c): void {

    }

    upload(model) {

    }

    public validate(enterprise: FaseModel): boolean {
        let isValid = true;
        if (!this.fase.descripcion) {
            isValid = false;
        }
        return isValid;

    }
}
