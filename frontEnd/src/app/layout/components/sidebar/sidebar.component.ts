import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    //Variables
    isActive: boolean = false;
    hideGroup1: boolean = false;
    hideGroup2: boolean = false;

    showMenu: string = '';
    icon: string = "fa-caret-left";
    iconG2: string = "fa-caret-left";

    eventGroup1(){

        this.hideGroup1= !this.hideGroup1;

        if(this.hideGroup1 === true){

            this.icon = "fa fa-caret-down";

        }else{

            this.icon= "fa fa-caret-left";

        }
    }

    eventGroup2(){

        this.hideGroup2= !this.hideGroup2;

        if(this.hideGroup2 === true){

            this.iconG2 = "fa fa-caret-down";

        }else{

            this.iconG2= "fa fa-caret-left";

        }
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    ngOnInit(){

    }
}
