interface Cell {
  productId: number;
  icon: number;
  iconDownloaded?: boolean ;      // Not in response, it is appended in UI
  image: number;
  imageDownloaded?:boolean;       // Not in response, it is appended in UI
  price: number;
  vipPrice: number | null;
  name: string;
  nameChi: string;
  // colSpan: number;  // Unknown variable
  description?: string;
  descriptionChi?: string;
  nutrition?: string;
  nutritionChi?: string;
  enabled: boolean;
  // discountProduct: boolean;
  notInUse: boolean;
  // colErr: boolean;
  // priceEditable: boolean;   // Unknown variable
  // field1Required: boolean;  // Unknown variable
  // field2Required: boolean;  // Unknown variable
  // field3Required: boolean;  // Unknown variable
  // field4Required: boolean;  // Unknown variable
  // field5Required: boolean;  // Unknown variable
  // width: number;
}
interface Row {
  cells: Cell[];
}

interface AllTabs {
  label: string;
  labelChi: string;
  rows: Row[];
}
interface CustomTabs {
  label: string;
  labelChi: string;
  icon: number;
  iconDownloaded?: boolean ;
  rows: Row[];
}

interface LocalBackendResp{
  msgCode: string;
  success: boolean;
}
interface VmInfoResp extends LocalBackendResp{
  dataObj: {
    globalVideo: number[];
    allTab: AllTabs;
    tabs: CustomTabs[];
  };
}

interface SelectProductResp  extends LocalBackendResp{
  dataObj: {
    octopusPayment: boolean;
    aliPayment: boolean;
    wechatPayment: boolean;
  };
}
interface MessageDataObject {
  message: string;
  messageChi: string;
}
interface OctopusStatusResp extends LocalBackendResp{
  dataObj: MessageDataObject & {
    newDialog: boolean;       // Indicate that there is any error
    lockDialog: boolean;      // When there are 100022 or 100025 error (Incomplete Transaction)
    resetCountdown: boolean;  // When the remaining countdown is less than 25 but the dialog need to be locked for 25, the countdown will be reset
    readerNormal : boolean;
    retry : boolean;
    waitTime: number;
  }
}
interface QRCodeResp extends LocalBackendResp{
  dataObj :MessageDataObject & {
    qrCode : any;
    timeout: number;
  }
}

interface TransInfo {
  "cardId"?: string;            // Unknown
  "tranUuid": string,
  "tranDttmMs": number,
  "tranTypeId": number,         // Unknown    6: free vending?
  "vmcStatusCode"? : string;    // Unknown
  "payMethodCode": number,      // Unknown,     1 and 7 : Octopus, 6 : free vending?
  "payStatusCode": number,      // Unknown, seem 1 means ok
  "productId": number,
  "cellId": number,
  "itemNo": number,
  "qty": number,
  "price": number,
  "amount": number,
  "remainingValue"?: number,
  "octDeviceNo"?: string,
  "octCardNo"?: string,
  "octCardType"?: number,     // Unknown, if =1 no remaining value
  "octReceiptNo": number,
  "octLavDate": string,
  "octLavType": number,       // Last adding value method
  "octLavDeviceNo": string,
  "stockQty": number,
  "remark": string,
  "receiptNo"?: string,
  "tranInfo"?: string ,
  "payRefNo"?: string,
  "sid": number,
  "transactionId": string,
  "schemeName"?: string[],
  "discount"?: number

}
interface TransCompleteResp extends LocalBackendResp{
  dataObj : {
    tranInfo: TransInfo,
    "qrCode": string,
    printData?: string,
    printDataChi?: string,
    "seq": number
  },
}
interface TransCompleteFailResp extends  LocalBackendResp{
  dataObj : MessageDataObject;
}

interface WashingMachineWaitingResp extends LocalBackendResp{
  dataObj : MessageDataObject & {
    count : number
  }
}
interface VendingFailResp extends LocalBackendResp{
  dataObj : MessageDataObject;
}
interface VendingSuccessResp extends LocalBackendResp{
  dataObj : MessageDataObject;
}
interface ErrorResp extends LocalBackendResp{
  dataObj: {
    error: string;
    errorChi: string;
  }
}

interface OctopusEnquiryStatusResp extends LocalBackendResp{
  dataObj:MessageDataObject &{
    retry : boolean;
    lockDialog: boolean;
  };
}
interface TransactionHistory {
  sameDevice: boolean;
  tranDttm: string;
  amount : string;
  devId: string
}
interface OctopusEnquiryResp extends  LocalBackendResp{
  dataObj : {
    cardID : string;
    cardType: number;
    remainingValue: number;
    historys: TransactionHistory[]
  }
}

interface OctopusSchemeEnquiryResp extends  LocalBackendResp {
  dataObj : {
    result : string[][]
  }
}
