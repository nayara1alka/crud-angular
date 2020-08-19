import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Cliente } from './../cliente';
import { ClientesService } from './../clientes.service'

@Injectable({
  providedIn: 'root'
})
export class ClienteResolverGuard implements Resolve<Cliente> {

  constructor(private service: ClientesService) {}

 resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Cliente>{
  
    if(route.params && route.params['id']){
      return this.service.loadById(route.params['id'])
    }

    return of ({
      id:null,
      nome:null
    });

 }
  
}
