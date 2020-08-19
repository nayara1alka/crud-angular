import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Clientes2Service } from './../clientes2.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.scss'],
  preserveWhitespaces:true
})
export class ClientesFormComponent implements OnInit {

  form: FormGroup;

  submitted = false;

  constructor(private fb: FormBuilder,
    private service: Clientes2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {

     const cliente = this.route.snapshot.data['cliente']

    this.form = this.fb.group({
      id: [cliente.id],
      nome: [cliente.nome,[Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
    })
  }

 hasError(field: string){
    return this.form.get(field).errors;
 }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value)
    if(this.form.valid){
      console.log("submit");

      let msgSucess = 'Curso criado com sucesso';
      let msgError = 'Erro ao criar curso. Tente novamente';
      if(this.form.value.id){
        msgSucess = 'Curso atualizado com sucesso';
        msgError = 'Erro ao atualizar curso. Tente novamente';
      }
      this.service.save(this.form.value).subscribe(
        sucess => {
          this.modal.showAlertSuccess(msgSucess),
            this.location.back();
        },
        errror => { error => this.modal.showAlertDanger(msgError)}
      )
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
  }
  }

