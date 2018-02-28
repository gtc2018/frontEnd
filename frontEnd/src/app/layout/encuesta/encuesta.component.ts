import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Encuesta } from './encuesta';

@Component({
    selector: 'app-encuesta',
    templateUrl: './encuesta.component.html',
    styleUrls: ['./encuesta.component.scss'],
    animations: [routerTransition()]
})
export class EncuestaComponent implements OnInit {

     private security: Encuesta[];

    constructor() {

        this.security = [
            {nombre:"Experiencia de servicio al cliente", security:false, recact:true, report:true, employe:true, client:true, recbug:true, project:true, quotation:true,
                                     param:true, user:true},
            {nombre:"Entrega a tiempo", security:false, recact:true, report:false, employe:false, client:false, recbug:false, project:false, quotation:false,
                                param:false, user:false},
            {nombre:"Profesionalismo", security:false, recact:true, report:true, employe:true, client:false, recbug:false, project:true, quotation:false,
                             param:true, user:false}                                                   
            
        ]

    }

    ngOnInit() {}
}
