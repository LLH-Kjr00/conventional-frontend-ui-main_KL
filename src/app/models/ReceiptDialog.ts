export class ReceiptDialog{
  cell: Cell;
  countdown: number;
  countdownHandler: any | undefined;
  closableValue : number;

  tranInfo: TransInfo;
  receiptQrCode : any ;
  printData : any;
  printDataChi : any;

  constructor(countdown: number, closableValue: number, cell : Cell, tranInfo: TransInfo, receiptQrCode: any, printData: any, printDataChi: any) {
    this.countdown = countdown;
    this.closableValue = closableValue;
    this.cell = cell;
    this.tranInfo = tranInfo;
    this.receiptQrCode = receiptQrCode
    this.printData = printData;
    this.printDataChi = printDataChi;
  }
}
