import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CrudService } from './../shared/crud-service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Clientes2Service extends CrudService<Cliente> {

  constructor(protected http: HttpClient ) { 
    super(http, `${environment.API}clientes`)
  }
}
