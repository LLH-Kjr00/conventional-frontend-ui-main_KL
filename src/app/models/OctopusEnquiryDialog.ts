export class OctopusEnquiryDialog{
  countdown: number;
  countdownHandler: any;

  inited: boolean;

  message: string;
  messageChi : string;

  askRetry : boolean;

  enquiryResult : { cardID: string; cardType: number; remainingValue: number; historys: TransactionHistory[] } | undefined;
  constructor(countdown: number) {
    this.countdown = countdown;
    this.message = '';
    this.messageChi = '';
    this.inited = false;
    this.askRetry = false;
  }
}
