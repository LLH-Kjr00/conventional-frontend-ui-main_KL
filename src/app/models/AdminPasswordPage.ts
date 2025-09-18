export class AdminPasswordPage{
  displayed: boolean;
  closeCountdown : number;
  closeCountdownHandler : any | undefined;

  inputPassword : string;
  password : string;

  retryLimit : number;
  retryTimeLeft: number;

  lock: boolean;
  lockCountdownHandler : any | undefined;

  constructor(closeCountdown: number) {
    this.displayed = false;
    this.closeCountdown = closeCountdown;

    this.inputPassword = ""
    this.password = "881930";

    this.retryLimit = 3;
    this.retryTimeLeft = 3;

    this.lock = false;
  }

}
