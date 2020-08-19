import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component'
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClienteResolverGuard} from './guard/cliente-resolver.guard'

const routes: Routes = [
  { path: '', component: ClientesListaComponent },
  { path:'novo', component: ClientesFormComponent, resolve: {cliente: ClienteResolverGuard} },
  { path: 'editar/:id', component: ClientesFormComponent , resolve: {cliente: ClienteResolverGuard} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
