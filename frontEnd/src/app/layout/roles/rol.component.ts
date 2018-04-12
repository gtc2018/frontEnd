
import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearRolService } from './servicios/crear-rol.service';
import { Router } from '@angular/router';
import { RolModel } from './../../model/rol.model';
//import {IMyDpOptions} from 'ng4-datepicker';

import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { RolService } from './servicios/rol.service';
import { OK } from '../../messages/httpstatus';
import swal from 'sweetalert2';
import { AuthService } from '../../shared/guard/auth.service';

@Component({
    selector: 'app-rol',
    templateUrl: './rol.component.html',
    styleUrls: ['./rol.component.scss'],
    animations: [routerTransition()],
    providers: [RolService, CrearRolService]
})
export class RolComponent implements OnInit {

    private roles: Array<RolModel>;
    private rol: RolModel;
    private isValid: boolean = true;
    private message: string = "";

    visible = false;

    toggleDivCreateRoles() {
        this.visible = !this.visible;
    }

    constructor(
        private rolService: RolService,
        private router: Router,
        private toastr: ToastrService,
        private login: AuthService
    ) {

        this.rol = new RolModel()

    }

    ngOnInit() {
        this.loadRoles();
    }

    /**
     * Metodo consultar todos los roles.
     */
    private loadRoles(): void {
        this.rolService.getRoles().subscribe(res => {
            this.roles = res;
        });

    }

    /**
     * Metodo limipiar los modelos.
     */
    private clearModel(): void {
        this.rol.descripcion = "";

    }

    /**
     * Metodo guardar o actualizar
     */
    public saveOrUpdate(): void {


        this.isValid = this.rolService.validate(this.rol);
        if (this.isValid) {

            this.rolService.saveOrUpdate(this.rol).subscribe(res => {
                if (res.responseCode == OK) {
                    this.loadRoles();
                    this.clearModel();

                    this.toastr.success('El rol fue creado y/o actualizado satisfactoriamente.');

                } else {
                    this.message = res.message;
                    this.isValid = false;
                }

            });

        } else {
            this.message = "Los campos con * son obligatorios";
            this.toastr.warning('Los campos con * son obligatorios.!', 'Creación de Roles');
        }
    }

    /**
     * Metodo actualizar roles:
     */
    public update(rolId: String, estado: String): void {
        this.rolService.updateRol(rolId, estado).subscribe(res => {
        });
        //location.reload();       
    }

    /**
     * Metodo eliminar items:
     */

    delete(id) {

        if (id != null) {
            this.rol.id = id;
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

                this.rolService.deleteRol(id).subscribe(res => {
                    this.toastr.warning('El registro fue eliminado satisfactorio.');
                    this.loadRoles();

                }, (error) => {
                    console.log(error);

                });


            }
        })

    }

    /**
     * Metodo Editar Rol
     */

    public edit(rol: RolModel): void {
        sessionStorage.setItem('rol', JSON.stringify(rol));
        this.rol = JSON.parse(sessionStorage.getItem("rol"));
        this.visible = true;
       
    }




    private getRolById(rolJson: RolModel): void {
        this.rolService.getRolById(rolJson).subscribe(res => {
            this.rol = res;
        });
    }

    upload(model) {
        this.rol = model;
        this.visible = true;

    }
}
