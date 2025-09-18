import {AppController} from "./AppController";
import {OctopusEnquiryDialog} from "../models/OctopusEnquiryDialog";

export class OctopusEnquiryController{
  app: AppController;
  octopusEnquiryDialog: OctopusEnquiryDialog | undefined
  constructor(app: AppController) {
    this.app = app;
  }

  openEnquiryDialog(){
    this.octopusEnquiryDialog = new OctopusEnquiryDialog(this.app.projectConfig.ui.octopusEnquiryDialogCountdownValue)

    this.app.websocketController.sendMessage({
      action: "OCT_ENQUIRY"
    });

    this.octopusEnquiryDialog.countdownHandler = setInterval(()=>{
        if (this.octopusEnquiryDialog ){
         this.octopusEnquiryDialog.countdown -=1;
         if (this.octopusEnquiryDialog.countdown < 0){
            this.closeEnquiryDialog()
         }
        }
    }, 1000)
  }

  tryToCloseEnquiryDialog(){
    this.app.websocketController.sendMessage({
      action: 'OCT_ENQUIRY_CANCEL'
    })
  }
  closeEnquiryDialog(){
    clearInterval(this.octopusEnquiryDialog?.countdownHandler)
    this.octopusEnquiryDialog = undefined;
  }

  handleEnquiryStatusResponse(resp: OctopusEnquiryStatusResp){
    if (this.octopusEnquiryDialog){
      if (resp.dataObj.retry){
        this.octopusEnquiryDialog.askRetry = true;
      }

      // TODO lock logic

      this.octopusEnquiryDialog.message = resp.dataObj.message;
      this.octopusEnquiryDialog.messageChi = resp.dataObj.messageChi;
      this.octopusEnquiryDialog.inited = false;
    }
  }
  handleEnquiryResponse(resp: OctopusEnquiryResp){
    if (this.octopusEnquiryDialog){
      this.octopusEnquiryDialog.enquiryResult = resp.dataObj;
      this.octopusEnquiryDialog.inited = true;
    }
  }

  handleEnquiry3Retry(){
    this.app.websocketController.sendMessage({action: 'OCT_3_RETRY'})
    if (this.octopusEnquiryDialog){
      this.octopusEnquiryDialog.askRetry = false;
      this.octopusEnquiryDialog.message = "Please tap card again.";
      this.octopusEnquiryDialog.messageChi = "\u8acb\u518d\u6b21\u62cd\u5361";
    }
  }

  handleEnquiry3notRetry(){
    this.app.websocketController.sendMessage({action: 'OCT_3_NOT_RETRY'})
    this.closeEnquiryDialog()
  }
}
