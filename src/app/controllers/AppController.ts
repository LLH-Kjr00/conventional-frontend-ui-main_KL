import {HostListener, Injectable, OnInit} from '@angular/core';
import { faMoon, faSun, faChevronLeft, faClockRotateLeft, faXmark, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

// controllers
import { VideoController } from './VideoController';
import { MediaController } from './MediaController';
import {ProjectConfig} from '../models/ProjectConfig';
import {WebSocketController} from './WebSocketController';
import {environment} from '../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {UIController} from './UIController';
import {Test} from './Test';
import {FileService} from "../service/file.service";
import {ProductController} from "./ProductController";
import {ReceiptController} from "./ReceiptController";
import {VendingMachineController} from "./VendingMachineController";
import {AdminController} from "./AdminController";
import {OctopusEnquiryController} from "./OctopusEnquiryController";
import {KeyboardController} from "./KeyboardController";

@Injectable({
  providedIn: 'root', // This makes the service available application-wide
})
export class AppController implements OnInit {
  devMode: boolean;
  loaded: boolean;
  projectConfig: ProjectConfig;
  translateService: TranslateService;
  fileService: FileService;

  uiController: UIController;
  mediaController: MediaController;
  videoController: VideoController;
  productController : ProductController;
  receiptController : ReceiptController;
  vendingMachineController: VendingMachineController;
  octopusEnquiryController: OctopusEnquiryController;
  adminController: AdminController;
  keyboardController : KeyboardController;
  websocketController: WebSocketController;
  test: Test;

  faMoon = faMoon;
  faSun = faSun;
  faChevronLeft = faChevronLeft;
  faClockRotateLeft = faClockRotateLeft;
  faXmark = faXmark;
  faDeleteLeft = faDeleteLeft;

  constructor(projectConfig: ProjectConfig, translateService: TranslateService, fileService: FileService) {
    console.log('App Controller Constructor');
    // Project Configuration
    this.devMode = !environment.production;
    this.loaded = false;
    this.projectConfig = projectConfig;
    this.translateService = translateService;
    this.fileService = fileService;
    // controllers
    this.uiController = new UIController(this);
    this.mediaController = new MediaController(this);
    this.videoController = new VideoController(this);
    this.productController = new ProductController(this);
    this.receiptController = new ReceiptController(this);
    this.vendingMachineController = new VendingMachineController(this);
    this.octopusEnquiryController = new OctopusEnquiryController(this);
    this.adminController = new AdminController(this);
    this.keyboardController  = new KeyboardController(this);
    this.websocketController = new WebSocketController(this);
    this.test = new Test(this);
  }

  ngOnInit(): void {
    console.log("App Init")
    this.uiController.loadDate();
  }


}
