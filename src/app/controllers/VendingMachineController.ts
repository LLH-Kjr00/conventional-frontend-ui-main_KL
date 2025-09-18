import {AppController} from "./AppController";
import {VendingSuccessDialog} from "../models/VendingSuccessDialog";
import {VendingFailDialog} from "../models/VendingFailDialog";
import {VendingWaitingDialog} from "../models/VendingWaitingDialog";

export class VendingMachineController{
  app: AppController
  successDialog : VendingSuccessDialog  | undefined;
  failDialog : VendingFailDialog | undefined;
  waitingDialog : VendingWaitingDialog| undefined;


  constructor(app: AppController) {
    this.app = app
  }

  handleWaitingWashingMachineResp(resp: WashingMachineWaitingResp){
    this.waitingDialog = new VendingWaitingDialog()
    this.waitingDialog.message = resp.dataObj.message + " (" + resp.dataObj.count + ")";
    this.waitingDialog.messageChi = resp.dataObj.messageChi + " (" + resp.dataObj.count + ")";
  }

  handleWashingMachineInitFailResp(resp: VendingFailResp){
    this.waitingDialog = undefined;
    this.successDialog = undefined;
    this.failDialog = new VendingFailDialog()
    this.failDialog.message = resp.dataObj.message;
    this.failDialog.messageChi = resp.dataObj.messageChi;
  }

  handleWashingMachineInitSuccessResp(resp: VendingSuccessResp){
    this.waitingDialog = undefined;
    this.failDialog = undefined;
    this.successDialog = new VendingSuccessDialog()
    this.successDialog.message = resp.dataObj.message;
    this.successDialog.messageChi = resp.dataObj.messageChi;
  }

  resetVendingStatus(){
    this.successDialog = undefined;
    this.failDialog = undefined;
    this.waitingDialog = undefined;
  }

}
