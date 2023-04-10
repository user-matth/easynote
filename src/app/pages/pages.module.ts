import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        PagesRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        HomeComponent
    ],
})
export class PagesModule { }
