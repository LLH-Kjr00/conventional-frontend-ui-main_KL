import {Component, HostListener} from '@angular/core';
import {AppController} from "../controllers/AppController";
import {ProjectConfig} from "../models/ProjectConfig";
import {FileService} from "../service/file.service";

import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {QRCodeModule} from "angularx-qrcode";
import {LongPressModule} from "../directive/long-press.module";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    FontAwesomeModule,
    DatePipe,
    NgClass,
    NgIf,
    NgForOf,
    NgOptimizedImage,
    TranslateModule,
    QRCodeModule,
    LongPressModule,
    FormsModule
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent extends AppController{
  constructor(public translate: TranslateService,  public override fileService: FileService) {
    super(new ProjectConfig(
      'default',
      'zh',
      // ['octopus'],
      { groupCells: true,
        productDialogWaitForBEResponseValue: 30,
        productDialogCountdownValue: 30,
        receiptDialogCountdownValue: 60,
        receiptDialogClosableValue: 50,
        octopusCountdown: 60,
        octopus3Countdown: 180,
        octopusEnquiryDialogCountdownValue : 60,
        alipayCountdown: 130,
        wechatCountdown: 130,
        adminPasswordLockValue: 600,    // 60 * 10 = 10 mins
        adminPasswordCloseCountdown : 60,
        adminPanelCloseCountdown: 60
      },
      'ws://127.0.0.1:8080/svm/Vending'), translate, fileService);
  }

  @HostListener('window:keydown.M', ['$event'])
  @HostListener('dragstart', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.keyboardController.onHostInput(event);
  }
}

