import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum alertTypes{
    DANGER = 'danger',
    SUCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  
  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: alertTypes, dismistimeout?: number){
    const bsbModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsbModalRef.content.type=type;
    bsbModalRef.content.message = message;

    if(dismistimeout){
      setTimeout(() => bsbModalRef.hide(), dismistimeout)
    }

  }

  showAlertDanger(message: string){
     this.showAlert(message, alertTypes.DANGER)
  }

  showAlertSuccess(message: string){
    this.showAlert(message, alertTypes.SUCESS, 2000)
  }

  showConfirm(title: string, msg: string, cancelTxt?: string, okTxt?: string){
    const bsModalRef : BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if(cancelTxt){
        bsModalRef.content.cancelTxt = cancelTxt;
    }

    if(okTxt){
      bsModalRef.content.okTxt = okTxt;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }

}
