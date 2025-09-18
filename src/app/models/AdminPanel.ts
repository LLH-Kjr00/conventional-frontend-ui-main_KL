export class AdminPanel {
  displayed: boolean;

  closeCountdown : number;
  closeCountdownHandler : any | undefined;

  octopus3CustomMessageTextBar : boolean;
  octopus3CustomMessageId : string;

  octopus3SchemeEnquiryResult : string[][] | undefined;

  constructor(countdown : number) {
    this.displayed = false;
    this.closeCountdown = countdown;
    this.octopus3CustomMessageTextBar = false;
    this.octopus3CustomMessageId = "";
  }
}
