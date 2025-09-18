export class Payment {
  name: string;

  inited: boolean;

  countdown: number;

  qrCodePayment: boolean;
  qrcode: any | undefined;

  lockDialog: boolean;
  lockDialogCountdown: number;
  lockDialogHandler: any | undefined;

  successful : boolean;



  constructor(name:string, countdown: number, qrCodePayment: boolean) {
    this.name=name;
    this.inited = false;

    this.countdown = countdown;

    this.qrCodePayment = qrCodePayment;

    this.lockDialog = false;
    this.lockDialogCountdown=0;

    this.successful = false;
  }
}
