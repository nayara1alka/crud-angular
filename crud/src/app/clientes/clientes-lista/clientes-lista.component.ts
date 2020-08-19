import { Component, OnInit, ViewChild } from '@angular/core';
import { Clientes2Service } from './../clientes2.service';
import { Observable, empty, Subject, EMPTY } from 'rxjs'
import { Cliente } from './../cliente';
import { catchError, take, switchMap } from 'rxjs/operators';
import { AlertModalService } from './../../shared/alert-modal.service'
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.scss'],
  preserveWhitespaces: true
})
export class ClientesListaComponent implements OnInit {

  clientes$: Observable<Cliente[]>;

  error$ = new Subject<boolean>();

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  clienteSelecionado : Cliente;

  constructor(private service:Clientes2Service,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh(){
    this.clientes$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.handleError();
        return empty();
      })
    )
  }

  onEdit(id){
      this.router.navigate(['editar', id], {relativeTo: this.route})
  }
 
  handleError(){
      this.alertModalService.showAlertDanger('Erro ao carregar. Tente novamente mais tarde');
  }

  onDelete(cliente){
    this.clienteSelecionado = cliente;
   const result$ = this.alertModalService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse cliente?');
   result$.asObservable()
   .pipe(
     take(1),
     switchMap(result => result ? this.service.remove(cliente.id): EMPTY)
   )
   .subscribe(
    success => {
      this.onRefresh()
     }, 
     errror => {
      this.alertModalService.showAlertDanger('Erro ao remover. Tente novamente mais tarde') 
     }
   )
  }

  onConfirmDelete(){
     this.service.remove(this.clienteSelecionado.id).subscribe(
       success => {
        this.onRefresh(),
        this.deleteModalRef.hide()
       }, 
       errror => {
        this.alertModalService.showAlertDanger('Erro ao remover. Tente novamente mais tarde'),
        this.deleteModalRef.hide() 
       } 
     )
  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }

}
