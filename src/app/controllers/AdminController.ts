import {AppController} from "./AppController";
import {AdminPanel} from "../models/AdminPanel";
import {AdminPasswordPage} from "../models/AdminPasswordPage";

export class AdminController{
  app : AppController;
  adminPanel: AdminPanel;
  passwordPage: AdminPasswordPage;
  constructor(app: AppController) {
    this.app = app;
    this.adminPanel = new AdminPanel(this.app.projectConfig.ui.adminPanelCloseCountdown);
    this.passwordPage = new AdminPasswordPage(this.app.projectConfig.ui.adminPasswordCloseCountdown);
  }

  openPasswordPage (){
    this.passwordPage.displayed = true;
    if (!this.passwordPage.lock){
      this.passwordPage.closeCountdownHandler = setInterval(()=>{
        this.passwordPage.closeCountdown -= 1;
        if (this.passwordPage.closeCountdown <=0){
          this.closePasswordPage()
        }
      }, 1000)
    }
  }
  closePasswordPage(){
    this.passwordPage.displayed = false;

    this.passwordPage.closeCountdown = this.app.projectConfig.ui.adminPasswordCloseCountdown;
    clearInterval(this.passwordPage.closeCountdownHandler)
    this.passwordPage.closeCountdownHandler = undefined;

    this.passwordPage.inputPassword = "";
    this.passwordPage.retryTimeLeft = this.passwordPage.retryLimit;
  }

  inputPassword(char: string){
    this.passwordPage.inputPassword += char;
  }
  deletePassword(){
    this.passwordPage.inputPassword = this.passwordPage.inputPassword.slice(0,-1)
  }
  clearPassword(){
    this.passwordPage.inputPassword = ""
  }
  validatePassword(){
    if (!this.passwordPage.lock){
      if (this.passwordPage.inputPassword == this.passwordPage.password){
        this.closePasswordPage()
        this.openAdminPanel()
      } else{
        this.passwordPage.retryTimeLeft -= 1;

        if (this.passwordPage.retryTimeLeft == 0){
          this.passwordPage.lock = true;
          this.passwordPage.lockCountdownHandler = setTimeout(()=>{
            this.unlockPasswordPage()
          }, this.app.projectConfig.ui.adminPasswordLockValue * 1000)
        }
      }
    }

  }
  private unlockPasswordPage(){
    this.passwordPage.lock = false;
    this.passwordPage.retryTimeLeft = this.passwordPage.retryLimit;
    clearTimeout(this.passwordPage.lockCountdownHandler);
    this.passwordPage.lockCountdownHandler = undefined;
  }

  getHiddenPassword(){
    let hiddenPassword = ""
    for(let key of this.passwordPage.inputPassword ){
      hiddenPassword += '*'
    }
    return hiddenPassword;
  }

  public openAdminPanel(){
    this.adminPanel.displayed = true;
    this.adminPanel.closeCountdownHandler = setInterval(()=>{
      this.adminPanel.closeCountdown -=1
      if (this.adminPanel.closeCountdown <= 0){
        this.closeAdminPanel()
      }
    }, 1000)
  }
  closeAdminPanel(){
    this.adminPanel.displayed = false;
    this.adminPanel.closeCountdown = this.app.projectConfig.ui.adminPanelCloseCountdown;
    clearInterval(this.adminPanel.closeCountdownHandler);
    this.adminPanel.closeCountdownHandler = undefined;
    this.adminPanel.octopus3CustomMessageTextBar = false;
    this.adminPanel.octopus3SchemeEnquiryResult = undefined;
  }

  handleOctopusEnquiry(){
    this.closeAdminPanel();
    this.app.octopusEnquiryController.openEnquiryDialog();
  }

  handleUnlockWashingMachine(){
    this.closeAdminPanel();
    this.app.websocketController.sendMessage({
      action: 'UNLOCK'
    });
  }

  handleReboot(){
    this.app.websocketController.sendMessage({
      action: 'REBOOT'
    })
  }

  handlePowerOff(){
    this.app.websocketController.sendMessage({
      action: 'POWER_OFF'
    })
  }

  octopusV2(){
    this.app.websocketController.sendMessage({
      action: 'OCT_2'
    })
    this.app.projectConfig.ui.octopusCountdown = 60
  }

  octopusV3(){
    this.app.websocketController.sendMessage({
      action: 'OCT_3'
    })
  }

  openTextBarForInputCustomMessage(){
    this.adminPanel.octopus3CustomMessageTextBar = true;
  }
  setCustomMessageId(id: string){
    this.app.websocketController.sendMessage({
      action: 'OCT_3_CUSTOM_MESSAGE',
      id : id
    })
  }

  octopusV3SchemeEnquiry(){
    this.app.websocketController.sendMessage({
      action: 'OCT_3_SCHEME_ENQUIRY'
    })

    console.log("here")
    this.app.test.octopus3SchemeEnquiryResult()
  }

  handleOctopusV3SchemeEnquiryResult(resp: OctopusSchemeEnquiryResp){
    this.adminPanel.octopus3SchemeEnquiryResult = resp.dataObj.result
  }
}
