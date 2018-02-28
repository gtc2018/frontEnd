import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.html',
    styleUrls: ['./employee.scss'],
    animations: [routerTransition()]
})
export class EmployeeComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
