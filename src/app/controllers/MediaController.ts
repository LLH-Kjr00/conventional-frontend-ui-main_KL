import {AppController} from './AppController';



export class MediaController {
  app: AppController;
  loadPath = 'assets';
  constructor(app: AppController) {
    this.app   = app;
  }
  getMediaFilePath(fileName: string) {
    return this.loadPath + '/media/' + fileName;
  }
	getPlaylistFilePath(fileName: number | undefined) {
    return this.loadPath + '/media/playlist/' + fileName;
  }
  getTabIconFilePath(fileName: number) {
    return this.loadPath + '/media/tabIcon/' + fileName;
  }
  getProductIconPath(fileName: number){
    return this.loadPath + '/media/productIcon/' + fileName;
  }
  getProductImagePath(fileName: number){
    return this.loadPath + '/media/productImage/' + fileName;
  }
  getPaymentIconPath(fileName: string){
    return this.loadPath + '/media/payment/' + fileName;
  }

  iconExist(tab: CustomTabs | Cell, filename: string){
    this.app.fileService.fileExists(filename).subscribe(res=> {
      tab.iconDownloaded = res
    } )
  }
  productImageExist(cell: Cell, filename:string){
    this.app.fileService.fileExists(filename).subscribe(res=>{
      cell.imageDownloaded = res
    })
  }
}

