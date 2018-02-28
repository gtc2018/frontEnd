import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ActivityModule } from './activity.module';
import { ActivityComponent } from './activity.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ActivityModule
  ],
  bootstrap: [ActivityComponent]
})
export class BootstrapModule {}

platformBrowserDynamic().bootstrapModule(BootstrapModule);
