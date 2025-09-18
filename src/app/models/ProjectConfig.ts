export class ProjectConfig {
  name: string;
  defaultLang: string;
  // displayPayment: string[];
  ui: {
    groupCell: boolean; // If two products are in the same column, group it as a one product
    productDialogWaitForBEResponseValue: number; // This is for waiting response from local backend
    productDialogCountdownValue: number;
    receiptDialogCountdownValue: number;
    receiptDialogClosableValue: number;
    octopusCountdown: number;
    octopus3Countdown: number;
    octopusEnquiryDialogCountdownValue: number;
    alipayCountdown: number;
    wechatCountdown: number;
    adminPasswordLockValue: number;
    adminPasswordCloseCountdown: number;
    adminPanelCloseCountdown: number;
  };
  localServerURL: string;

  // constructor(name: string, defaultLang: string, displayPayment: string[], ui : any, localServerURL: string) {
    constructor(name: string, defaultLang: string, ui : any, localServerURL: string) {
    this.name = name;
    this.defaultLang = defaultLang;
    // this.displayPayment = displayPayment;
    this.ui = ui;
    this.localServerURL = localServerURL;
  }
}
