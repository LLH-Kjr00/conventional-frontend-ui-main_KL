import {AppController} from './AppController';
import {Tabs} from '../models/Tabs';

export class UIController {
  app: AppController;

  tabs: Tabs | undefined;

  currentTab: AllTabs | CustomTabs | undefined;

  language: string;
  i18n: string;

  date: Date = new Date;

  displayMode = '';


  constructor(app: AppController) {
    console.log('UI Controller Constructor');
    this.app = app;
    this.language = this.app.projectConfig.defaultLang;
    this.i18n = this.language === 'zh' ? 'Chi' : '';
    this.app.translateService.setDefaultLang(this.language);
    this.app.translateService.use(this.language);
  }

  /**
   * Change the Display Mode (light or dark)
   */
  changeDisplayMode() {
    this.displayMode = this.displayMode === ""? "Dark" : "";
  }

  /**
   * Change Language
   * @param language
   */
  changeLanguage(language: string) {
    this.language = language;
    this.app.translateService.use(this.language);
    this.i18n = this.language === 'zh' ? 'Chi' : '';
  }

  /**
   * Update Date at each second
   */
  loadDate(): void {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  /**
   * Set Current Tab
   * @param tab
   */
  loadTab(tab?: AllTabs | CustomTabs) {
   if (!tab) {
     if (this.tabs) this.currentTab = this.tabs.customTabs ? this.tabs.customTabs[0] : this.tabs.allTab;
     else console.error("No Tab to load")
   } else {
     this.currentTab = tab;
   }
  }

  /**
   * Set All Tab
   * @param allTabs
   */
  setAllTabs(allTabs: AllTabs | undefined) {
    if (!this.tabs) this.tabs = new Tabs();
    this.tabs.allTab = allTabs;
    if (allTabs){
      for (const row of allTabs.rows){
        for (const cell of row.cells){
          this.app.mediaController.iconExist(cell, this.app.mediaController.getProductIconPath(cell.icon))
        }
      }
    }
    // TODO 需要先記下現在的Tab的label，在更新Tabs後，要轉回原有的那一頁

  }

  /**
   * Set Custom Tabs
   * @param customTabs
   */
  setCustomTabs(customTabs: CustomTabs[] | undefined) {
    if (!this.tabs) this.tabs = new Tabs();
    this.tabs.customTabs = customTabs;
    if (customTabs) {
      // After update tab, check each tab icon exist
      for (const tab of customTabs){
        tab.iconDownloaded= false;
        this.app.mediaController.iconExist(tab, this.app.mediaController.getTabIconFilePath(tab.icon))
        for (const row of tab.rows){
          for (const cell of row.cells){
            this.app.mediaController.iconExist(cell, this.app.mediaController.getProductIconPath(cell.icon))
          }
        }
      }
      this.tabs.totalNumberOfTabs += customTabs.length;
    }
    // TODO 需要先記下現在的Tab的label，在更新Tabs後，要轉回原有的那一頁
  }
}
