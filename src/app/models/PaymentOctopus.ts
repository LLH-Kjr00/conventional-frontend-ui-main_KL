import {Payment} from "./Payment";

export class PaymentOctopus extends Payment{

  constructor(countdown: number) {
    super('octopus', countdown, false);
  }

}
