import {AppController} from "./AppController";

export class KeyboardController{
  app: AppController;
  constructor(app: AppController) {
    this.app = app;
  }

  onHostInput(event: KeyboardEvent){
    switch (event.type){
      case 'dragstart':
        event.preventDefault();
        break;
      case 'keydown':
        switch (event.key){
          case 'm' :
            event.preventDefault();
            this.app.adminController.openAdminPanel();
            break;
          case 'M' :
            event.preventDefault();
            this.app.adminController.openAdminPanel();
            break;
        }
    }
  }
}
