import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Seguridad } from './seguridad';

@Component({
    selector: 'app-seguridad',
    templateUrl: './seguridad.component.html',
    styleUrls: ['./seguridad.component.scss'],
    animations: [routerTransition()]
})
export class SeguridadComponent implements OnInit {

     private security: Seguridad[];

    constructor() {

        this.security = [
            {nombre:"Administrador", security:true, recact:true, report:true, employe:true, client:true, recbug:true, project:true, quotation:true,
                                     param:true, user:true},
            {nombre:"Analista", security:false, recact:true, report:false, employe:false, client:false, recbug:false, project:false, quotation:false,
                                param:false, user:false},
            {nombre:"lider", security:false, recact:true, report:true, employe:true, client:false, recbug:false, project:true, quotation:false,
                             param:true, user:false}                                                   
            
        ]

    }

    ngOnInit() {}
}
