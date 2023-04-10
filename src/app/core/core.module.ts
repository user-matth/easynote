import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
    imports: [
        BrowserModule,
        CoreRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        SignInComponent,
        SignUpComponent
    ],
})
export class CoreModule { }
