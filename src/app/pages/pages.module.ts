import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    imports: [
        BrowserModule,
        PagesRoutingModule
    ],
    declarations: [
        HomeComponent
    ],
})
export class PagesModule { }
