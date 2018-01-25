import { BsComponentComponent } from './../bs-component/bs-component.component';
import { CrearUsuarioService } from './servicios/crear-usuario.service';
import { Router } from '@angular/router';
import { UsuarioModel } from './../../model/usuario/usuario.model';
import {IMyDpOptions} from 'ng4-datepicker';


import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UsuarioService } from './servicios/usuario.service';
import { OK } from '../../messages/httpstatus';



@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
    animations: [routerTransition()],
    providers: [UsuarioService, CrearUsuarioService]
})
export class UsuarioComponent implements OnInit {

    private usuarios: Array<UsuarioModel>;
    private usuario: UsuarioModel;
    private isValid: boolean = true;
    private message: string = "";

    
    
    visible = false;


    toggleDivCreateUsers() {
        this.visible = !this.visible;
    }
    
    //DatePick
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    public model: any = { date: { year: 2018, month: 10, day: 9 } };

    


    constructor(
        private usuarioService: UsuarioService,
        private crearUsuarioService: CrearUsuarioService,
        private router: Router,
        private toastr: ToastrService
    ) {
         
        if (sessionStorage.getItem("usuario")) {
            this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
            
        } else {
            this.usuario = new UsuarioModel();
        }
        //this.usuario = new UsuarioModel();
    }

    ngOnInit() {
        this.loadUsuarios();

    }

    /**
     * Metodo consultar todos los usuarios.
     */
    private loadUsuarios(): void {
        this.usuarioService.getUsuarios().subscribe(res => {
            this.usuarios = res;
           
        });

    }


    /**
     * Metodo guardar o actualizar
     */
    public saveOrUpdate(): void {
        this.isValid = this.crearUsuarioService.validate(this.usuario);

        if (this.isValid) {

            this.crearUsuarioService.saveOrUpdate(this.usuario).subscribe(res => {
                if (res.responseCode == OK) {
                    console.log(this.router.navigate(['/usuarios']));
                    
        console.log(this.router.url);

                } else {
                    this.message = res.message;
                    this.isValid = false;
                }

            });

        } else {
            this.message = "Los campos con * son obligatorios";
            this.toastr.warning('Los campos con * son obligatorios.!', 'Creación de Usuarios');
        }
    }

    /**
     * Metodo editar usuarios:
     */

    public edit(usuario: UsuarioModel): void {
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        this.usuario = JSON.parse(sessionStorage.getItem("usuario"));
        this.visible = true;
       
    }

}
