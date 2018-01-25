import { style } from '@angular/animations';
import { element } from 'protractor';
import { Directive, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core/src/metadata/directives';


@Directive({
  selector: '[blueColored]'
})



export class BlueColorDirective {

  constructor(element: ElementRef) { 
    element.nativeElement.style.color ="white";
    //console.log(element);

    

  }
  
  
  
  
}
