import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-charge',
    templateUrl: './charge.html',
    styleUrls: ['./charge.scss'],
    animations: [routerTransition()]
})
export class ChargeComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
