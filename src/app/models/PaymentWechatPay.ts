import {Payment} from "./Payment";

export class PaymentWechatPay extends Payment{
  constructor(countdown:number) {
    super('wechat', countdown, true);
  }

}
