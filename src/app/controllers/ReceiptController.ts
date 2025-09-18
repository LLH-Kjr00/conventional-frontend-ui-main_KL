import {ReceiptDialog} from "../models/ReceiptDialog";
import {AppController} from "./AppController";

export class ReceiptController{
  app: AppController;
  receiptDialog : ReceiptDialog | undefined;


  constructor(app: AppController) {
    this.app = app;
  }

  openReceiptDialog(cell: Cell, tranInfo: TransInfo, receiptQrCode: any, printData: any, printDataChi: any){
    this.receiptDialog = new ReceiptDialog(this.app.projectConfig.ui.receiptDialogCountdownValue,
      this.app.projectConfig.ui.receiptDialogClosableValue, cell, tranInfo, receiptQrCode, printData, printDataChi);
    this.receiptDialog.countdownHandler  = setInterval(()=>{
      if (this.receiptDialog){
        this.receiptDialog.countdown -=1
        if (this.receiptDialog.countdown < 0){
          this.closeReceiptDialog();
        }
      }
    }, 1000)
  }

  closeReceiptDialog(){
    clearInterval(this.receiptDialog?.countdownHandler)
    this.receiptDialog = undefined;
    // Reset the vending status (if has)
    this.app.vendingMachineController.resetVendingStatus();
  }
}
