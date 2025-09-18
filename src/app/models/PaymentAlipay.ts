import {Payment} from "./Payment";

export class PaymentAlipay extends Payment{
  constructor(countdown: number) {
    super('alipay', countdown, true);
  }

}
