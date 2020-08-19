import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClientesFormComponent, ClientesListaComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule { }
