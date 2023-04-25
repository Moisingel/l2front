import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {MainComponent} from "./componente/main/main.component";
import {ReactiveFormsModule} from "@angular/forms";
import { MainCardComponent } from './componente/main-card/main-card.component';

@NgModule({
  declarations: [
    MainComponent,
    MainCardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
