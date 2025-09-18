export class ProductDialog {
  cell: Cell;
  waitForHandler: any;
  inited: boolean;
  countdown: number;
  countdownHandler: any;

  error : boolean;
  errorMsg : string;
  errorMsgChi : string;

  otherError: boolean;

  askRetry: boolean;
  octopus3 : boolean;
  constructor(cell: Cell, countdown: number) {
    this.cell = cell;
    this.inited = false;
    this.countdown = countdown;
    this.error = false;
    this.errorMsg = '';
    this.errorMsgChi = '';
    this.otherError = false;
    this.askRetry = false;
    this.octopus3 = false;
  }
}
