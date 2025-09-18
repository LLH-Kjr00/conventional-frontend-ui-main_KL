import {AppController} from './AppController';

export class Test {
  app: AppController;
  constructor(app: AppController) {
    this.app = app;
  }
  videoTesting(){
    this.app.videoController.setReadyToPlay(!this.app.videoController.videos.readyToPlay);
    if(this.app.videoController.videos.readyToPlay){
      this.app.videoController.setVideos([0]);
    }
  }
  clearProduct(){
    // Update Video Information
    this.app.videoController.setReadyToPlay(false)
    // Update TAB Information
    this.app.uiController.tabs = undefined;
  }

  selectProductSuccessResponse(){
    if (this.app.productController.productDialog){
      const respObj = {
        'success': true,
        'msgCode': 'SELECT_PRODUCT',
        'dataObj':{
          'octopusPayment': true,
          'aliPayment': true,
          'wechatPayment': true
        }
      }
      this.app.productController.handleSelectProductResponse(respObj)
    }
  }

  selectProductSuccessResponseOctopusOnly(){
    if (this.app.productController.productDialog){
      const respObj = {
        'success': true,
        'msgCode': 'SELECT_PRODUCT',
        'dataObj':{
          'octopusPayment': true,
          'aliPayment': false,
          'wechatPayment': false
        }
      }
      this.app.productController.handleSelectProductResponse(respObj)
    }
  }

  selectProductErrorResponse(){
    if (this.app.productController.productDialog){
      const respObj = {
        'success': false,
        'msgCode': 'SELECT_PRODUCT',
        'dataObj':{
          'error': 'Machine out of order. Please contact staff for assistance. ',
          'errorChi': '機器故障。請與本店職員聯絡。'
        }
      }
      this.app.productController.handleSelectProductErrorResponse(respObj)
    }
  }

  selectProductPaymentSuccessResponse(){
    if (this.app.productController.paymentSelected){
      const respObj = {
        'success': true,
        'msgCode': 'SELECT_PRODUCT_PAYMENT',
      }
      this.app.productController.handleSelectProductPaymentResponse(respObj)
    }
  }

  selectProductPaymentErrorResponse(){
    if (this.app.productController.paymentSelected){
      const respObj = {
        'success': false,
        'msgCode': 'SELECT_PRODUCT_PAYMENT',
        'dataObj':{
          'error': 'Payment not supported ',
          'errorChi': '支付方法不支持'
        }
      }
      this.app.productController.handleSelectProductPaymentErrorResponse(respObj)
    }
  }

  unselectProductResponse(){
    if (this.app.productController.paymentSelected){
      const respObj = {
        'success': true,
        'msgCode': 'UNSELECT_PRODUCT_PAYMENT',
      }
      this.app.productController.closePayment();
    }
  }

  octopusReaderNotNormalError(){
    if (this.app.productController.paymentSelected){
      const respObj = {
        'success': true,
        'msgCode': 'OCT_TRAN_STATUS',
        'dataObj':{
          'newDialog': true,
          'lockDialog': false,
          'resetCountdown': false,
          'readerNormal' : false,
          'message': 'Octopus Error 1: Cannot connect with octopus',
          'messageChi': '八达通错误1: 无法连接八达通。',
          'retry': false,
          'waitTime' : 0
        }
      }
      this.app.productController.handlePaymentOctopusResponse(respObj)
    }
  }
  octopusResetLockDialogCountdown(){
    if (this.app.productController.paymentSelected){
      const respObj = {
        'success': true,
        'msgCode': 'OCT_TRAN_STATUS',
        'dataObj':{
          'newDialog': true,
          'lockDialog': true,
          'resetCountdown': true,
          'readerNormal' : true,
          'message': 'Octopus Error 2',
          'messageChi': '八达通错误2',
          'retry': false,
          'waitTime' : 0
        }
      }
      this.app.productController.handlePaymentOctopusResponse(respObj)
    }
  }

  octopusLockDialogCountdown(){
    if (this.app.productController.paymentSelected){
      const respObj = {
        'success': true,
        'msgCode': 'OCT_TRAN_STATUS',
        'dataObj':{
          'newDialog': true,
          'lockDialog': true,
          'resetCountdown': false,
          'readerNormal' : true,
          'message': 'Octopus Lock Error',
          'messageChi': '八达通 Lock Error',
          'retry': false,
          'waitTime' : 0
        }
      }
      this.app.productController.handlePaymentOctopusResponse(respObj)
    }
  }

  octopus3waitTime(){
    if (this.app.productController.paymentSelected){
      const respObj = {
        'success': true,
        'msgCode': 'OCT_TRAN_STATUS',
        'dataObj':{
          'newDialog': true,
          'lockDialog': true,
          'resetCountdown': true,
          'readerNormal' : true,
          'message': 'Octopus Error 2',
          'messageChi': '八达通错误2',
          'retry': false,
          'waitTime' : 180
        }
      }
      this.app.productController.handlePaymentOctopusResponse(respObj)
    }
  }

  octopus3retry(){
    if (this.app.productController.paymentSelected){
      const respObj = {
        'success': true,
        'msgCode': 'OCT_TRAN_STATUS',
        'dataObj':{
          'newDialog': true,
          'lockDialog': false,
          'resetCountdown': false,
          'readerNormal' : true,
          'message': 'Retry Transaction?',
          'messageChi': '是否重試？',
          'retry': true,
          'waitTime' : 0
        }
      }
      this.app.productController.handlePaymentOctopusResponse(respObj)
    }
  }

  octopus3processing(){
    if (this.app.productController.paymentSelected){
      const respObj = {
        'success': true,
        'msgCode': 'OCT_TRAN_STATUS',
        'dataObj':{
          'newDialog': true,
          'lockDialog': false,
          'resetCountdown': false,
          'readerNormal' : true,
          'message': 'Processing Error',
          'messageChi': 'Processing Error',
          'retry': false,
          'waitTime' : 0
        }
      }
      this.app.productController.handlePaymentOctopusResponse(respObj)
    }
  }

  octopus3SchemeEnquiryResult(){
    if (this.app.adminController){
      const respObj = {
        'success': true,
        'msgCode': 'OCT_3_SCHEME_ENQUIRY',
        'dataObj':{
          'result': [
            ["JoyYou Promotion", "樂悠卡優惠"],
            ["Breakfast Promotion", "早餐優惠"],
          ]
        }
      }
      this.app.adminController.handleOctopusV3SchemeEnquiryResult(respObj)
    }
  }

  wechatQRCode(){
    if (this.app.productController.paymentSelected){
      const respObj = {
        'success': true,
        'msgCode': 'WECHAT_QR_CODE',
        'dataObj':{
          'qrCode': 'Wechat QR Code',
          'timeout': 120,
          'message': '',
          'messageChi': ''
        }
      }
      this.app.productController.handlePaymentQRCodeResponse(respObj)
    }
  }
  alipayQRCode(){
    if (this.app.productController.paymentSelected){
      const respObj = {
        'success': true,
        'msgCode': 'ALIPAY_QR_CODE',
        'dataObj':{
          'qrCode': 'Alipay QR Code',
          'timeout': 120,
          'message': '',
          'messageChi': ''
        }
      }
      this.app.productController.handlePaymentQRCodeResponse(respObj)
    }
  }

  alipayQRCodeError(){
    if (this.app.productController.paymentSelected){
      const respObj = {
        'success': true,
        'msgCode': 'ALIPAY_QR_CODE',
        'dataObj':{
          'qrCode': '',
          'timeout': 120,
          'message': 'The system is busy',
          'messageChi': 'The system is busy'
        }
      }
      this.app.productController.handlePaymentQRCodeResponse(respObj)
    }
  }

  washingMachineWait1(){
    const respObj = {
      'success': true,
      'msgCode': 'VEND_WAITING_WASHING_MACHINE',
      'dataObj':{
        'count': 1,
        'message': 'Please Wait.',
        'messageChi': '请稍等'
      }
    }
    this.app.vendingMachineController.handleWaitingWashingMachineResp(respObj)
  }
  washingMachineFail(){
    const respObj = {
      'success': true,
      'msgCode': 'VEND_WASHING_MACHINE_FAIL',
      'dataObj':{
        'message': 'Init Failed.',
        'messageChi': '启动失败，请联系职员。'
      }
    }
    this.app.vendingMachineController.handleWashingMachineInitFailResp(respObj)
  }
  washingMachineSuccess(){
    const respObj = {
      'success': true,
      'msgCode': 'VEND_WASHING_MACHINE_SUCCESS',
      'dataObj':{
        'message': 'Init Succeed',
        'messageChi': '启动成功。'
      }
    }
    this.app.vendingMachineController.handleWashingMachineInitSuccessResp(respObj)
  }

  octopusEnquiryStatusResponse(){
    const respObject = {
      'success': true,
      'msgCode': 'OCT_ENQUIRY_STATUS',
      'dataObj':{
        'message': 'Please tap octopus card',
        'messageChi': '请拍八达通卡。',
        'retry': false,
        'lockDialog': false
      }
    }
    this.app.octopusEnquiryController.handleEnquiryStatusResponse(respObject)
  }
  octopusEnquiryResultResponse() {
    const respObject = {
      "success": true,
      "msgCode": "OCT_ENQUIRY",
      "dataObj": {
        "cardID": "54311244",
        "cardType": 0,
        "remainingValue": 2307.5,
        "historys": [
          {
            "sameDevice": true,
            "tranDttm": "2020/06/17 13:21:13",
            "amount": "-$0.1",
            "devId": "FFA2"
          },
          {
            "sameDevice": true,
            "tranDttm": "2020/06/16 15:19:21",
            "amount": "-$0.1",
            "devId": "FFA2"
          },
          {
            "sameDevice": true,
            "tranDttm": "2020/06/16 14:46:23",
            "amount": "-$0.1",
            "devId": "FFA2"
          },
          {
            "sameDevice": true,
            "tranDttm": "2020/06/16 14:44:55",
            "amount": "-$0.1",
            "devId": "FFA2"
          }
        ]
      }
    }
    this.app.octopusEnquiryController.handleEnquiryResponse(respObject)
  }

transactionComplete(){
  const respObj = {
   'success': true,
   'msgCode': 'TRAN_COMPLETE',
   'dataObj':{
     "tranInfo":{
       "tranUuid": "41f7d22a-d231-4a94-9be1-73080b1106b8",
       "tranDttmMs": 1592381867272,
       "tranTypeId": 1,
       "vmcStatusCode": "0",
       "payMethodCode": 1,
       "payStatusCode": 1,
       "productId": 630,
       "cellId": 1429,
       "itemNo": 22,
       "qty": 1,
       "price": 0.1,
       "amount": 90.0,
       "remainingValue": 123.0,
       "octDeviceNo": "56FFA2",
       "octCardNo": "38353501",
       "octCardType": 2,
       "octReceiptNo": 118,
       "octLavDate": "2019-05-09",
       "octLavType": 4,
       "octLavDeviceNo": "56FFA5",
       "stockQty": 9911,
       "remark": "2020-06-17 16:17:47",
       "receiptNo": "1000010118",
       "sid": 0,
       "transactionId": "111111",
       "schemeName" : ["Octopus x Merchant Scheme"],
       "discount" : 10.0
     },
     "qrCode": "https://svm.365vending.net:443/svm/tran?id\u003d41f7d22a-d231-4a94-9be1-73080b1106b8",
     "seq": 0,
     "printData": "Here is the print data returned by octopus.<br>Here is the print data returned by octopus.",
     "printDataChi": "Here is the print data returned by octopus.<br>Here is the print data returned by octopus."
   }
  }
  this.app.productController.handleTransactionCompleteResp(respObj)
}

test1() {
const respObj = {
 'success': true,
 'msgCode': 'GET_VM_INFO',
 'dataObj': {
   'globalVideo': [
     5305,
     5362,
     5363,
     6072,
     6577
   ],
   'allTab': {
     'label': 'All',
     'labelChi': '所有產品',
     'rows': [
       {
         'cells': [
           {
             'productId': 1846,
             'icon': 5702,
             'image': 5701,
             'price': 18.00,
             'vipPrice': 18.00,
             'name': 'Sanrio - 可愛較剪 D',
             'nameChi': 'Sanrio - 可愛較剪 D',
             'description': 'Sanrio - 可愛較剪 D',
             'descriptionChi': 'Sanrio - 可愛較剪 D',
             'enabled': true,
             'notInUse': false,
           },
           {
             'productId': 1845,
             'icon': 5944,
             'image': 5943,
             'price': 18.00,
             'vipPrice': 18.00,
             'name': 'Sanrio - 可愛較剪 C',
             'nameChi': 'Sanrio - 可愛較剪 C',
             'description': 'Sanrio - 可愛較剪 C',
             'descriptionChi': 'Sanrio - 可愛較剪 C',
             'enabled': true,
             'notInUse': false,
           },
           {
             'productId': 1862,
             'icon': 5736,
             'image': 5735,
             'price': 45.00,
             'vipPrice': 45.00,
             'name': '角落生物-超可愛單肩帆布包包 A',
             'nameChi': '角落生物-超可愛單肩帆布包包 A',
             'description': '角落生物-超可愛單肩帆布包包 A',
             'descriptionChi': '角落生物-超可愛單肩帆布包包 A',
             'enabled': true,
             'notInUse': false,
           }
         ]
       },
       {
         'cells': [
           {
             'productId': 1857,
             'icon': 5726,
             'image': 5725,
             'price': 68.00,
             'vipPrice': 68.00,
             'name': 'Sanrio - 流沙精美星星梳 D',
             'nameChi': 'Sanrio - 流沙精美星星梳 D',
             'description': 'Sanrio - 流沙精美星星梳 D',
             'descriptionChi': 'Sanrio - 流沙精美星星梳 D',
             'enabled': true,
             'notInUse': false,
           },
           {
             'productId': 1854,
             'icon': 5722,
             'image': 5721,
             'price': 68.00,
             'vipPrice': 68.00,
             'name': 'Sanrio - 流沙精美星星梳 A',
             'nameChi': 'Sanrio - 流沙精美星星梳 A',
             'description': 'Sanrio - 流沙精美星星梳 A',
             'descriptionChi': 'Sanrio - 流沙精美星星梳 A',
             'enabled': true,
             'notInUse': false,
           },
           {
             'productId': 1856,
             'icon': 5724,
             'image': 5723,
             'price': 68.00,
             'vipPrice': 68.00,
             'name': 'Sanrio - 流沙精美星星梳 C',
             'nameChi': 'Sanrio - 流沙精美星星梳 C',
             'description': 'Sanrio - 流沙精美星星梳 C',
             'descriptionChi': 'Sanrio - 流沙精美星星梳 C',
             'enabled': true,
             'notInUse': false,
           }
         ]
       },
       {
         'cells': [
           {
             'productId': 1620,
             'icon': 5080,
             'image': 5079,
             'price': 65.00,
             'vipPrice': 65.00,
             'name': '精緻迷你手指木琴 - 心型 ',
             'nameChi': '精緻迷你手指木琴 - 心型  ',
             'description': '精緻迷你手指木琴 - 心型',
             'descriptionChi': '精緻迷你手指木琴 - 心型 ',
             'enabled': false,
             'notInUse': false,
           },
           {
             'productId': 1621,
             'icon': 5082,
             'image': 5081,
             'price': 65.00,
             'vipPrice': 65.00,
             'name': '精緻迷你手指木琴 - 橢圓型 ',
             'nameChi': '精緻迷你手指木琴 - 橢圓型  ',
             'description': '精緻迷你手指木琴 - 橢圓型 ',
             'descriptionChi': '精緻迷你手指木琴 - 橢圓型 ',
             'enabled': true,
             'notInUse': false,
           },
           {
             'productId': 1622,
             'icon': 5084,
             'image': 5083,
             'price': 65.00,
             'vipPrice': 65.00,
             'name': '精緻迷你手指木琴 - 小熊  ',
             'nameChi': '精緻迷你手指木琴 - 小熊  ',
             'description': '精緻迷你手指木琴 - 小熊 ',
             'descriptionChi': '精緻迷你手指木琴 - 小熊 ',
             'enabled': true,
             'notInUse': false,
           }
         ]
       },
       {
         'cells': [
           {
             'productId': 1623,
             'icon': 5086,
             'image': 5085,
             'price': 65.00,
             'vipPrice': 65.00,
             'name': '精緻迷你手指木琴 - 方形  ',
             'nameChi': '精緻迷你手指木琴 - 方形 ',
             'description': '精緻迷你手指木琴 - 方形 ',
             'descriptionChi': '精緻迷你手指木琴 - 方形 ',
             'enabled': true,
             'notInUse': false,
           },
           {
             'productId': 1624,
             'icon': 5088,
             'image': 5087,
             'price': 65.00,
             'vipPrice': 65.00,
             'name': '精緻迷你手指木琴 - 一片雲 ',
             'nameChi': '精緻迷你手指木琴 - 一片雲 ',
             'description': '精緻迷你手指木琴 - 一片雲 ',
             'descriptionChi': '精緻迷你手指木琴 - 一片雲 ',
             'enabled': true,
             'notInUse': false,
           },
           {
             'productId': 1625,
             'icon': 5090,
             'image': 5089,
             'price': 65.00,
             'vipPrice': 65.00,
             'name': '精緻迷你透明手指琴 - 橢圓型  ',
             'nameChi': '精緻迷你透明手指琴 - 橢圓型  ',
             'description': '精緻迷你透明手指琴 - 橢圓型 ',
             'descriptionChi': '精緻迷你透明手指琴 - 橢圓型 ',
             'enabled': true,
             'notInUse': false,
           }
         ]
       },
       {
         'cells': [
           {
             'productId': 1626,
             'icon': 5092,
             'image': 5091,
             'price': 65.00,
             'vipPrice': 65.00,
             'name': '精緻迷你透明手指琴 - 心型 ',
             'nameChi': '精緻迷你透明手指琴 - 心型 ',
             'description': '精緻迷你透明手指琴 - 心型 ',
             'descriptionChi': '精緻迷你透明手指琴 - 心型 ',
             'enabled': true,
             'notInUse': false
           },
           {
             'productId': 1627,
             'icon': 5094,
             'image': 5093,
             'price': 65.00,
             'vipPrice': 65.00,
             'name': '精緻迷你透明手指琴 - 貓貓  ',
             'nameChi': '精緻迷你透明手指琴 - 貓貓  ',
             'description': '精緻迷你透明手指琴 - 貓貓 ',
             'descriptionChi': '精緻迷你透明手指琴 - 貓貓 ',
             'enabled': true,
             'notInUse': false
           },
           {
             'productId': 1628,
             'icon': 5096,
             'image': 5095,
             'price': 65.00,
             'vipPrice': 65.00,
             'name': '精緻迷你透明手指琴 - 小熊  ',
             'nameChi': '精緻迷你透明手指琴 - 小熊  ',
             'description': '精緻迷你透明手指琴 - 小熊 ',
             'descriptionChi': '精緻迷你透明手指琴 - 小熊 ',
             'enabled': true,
             'notInUse': false
           }
         ]
       },
       {
         'cells': [
           {
             'productId': 2033,
             'icon': 6438,
             'image': 6437,
             'price': 8.00,
             'vipPrice': 8.00,
             'name': '童星闊條麵 - 雞肉味 37g',
             'nameChi': '童星闊條麵 - 雞肉味 37g',
             'enabled': true,
             'notInUse': false
           },
           {
             'productId': 2034,
             'icon': 6440,
             'image': 6439,
             'price': 13.00,
             'vipPrice': 13.00,
             'name': '華園柱侯齋燒鵝 40g',
             'nameChi': '華園柱侯齋燒鵝 40g',
             'enabled': true,
             'notInUse': false
           },
           {
             'productId': 2017,
             'icon': 6406,
             'image': 6405,
             'price': 8.00,
             'vipPrice': 8.00,
             'name': '太平梳打餅 - 奶鹽味100g',
             'nameChi': '太平梳打餅 - 奶鹽味100g',
             'enabled': true,
             'notInUse': false
           }
         ]
       },
       {
         'cells': [
           {
             'productId': 2016,
             'icon': 6404,
             'image': 6403,
             'price': 9.00,
             'vipPrice': 9.00,
             'name': '丹麥藍罐曲奇 50g',
             'nameChi': '丹麥藍罐曲奇 50g',
             'enabled': true,
             'notInUse': false,
           },
           {
             'productId': 2032,
             'icon': 6436,
             'image': 6435,
             'price': 9.00,
             'vipPrice': 9.00,
             'name': '盒裝愉快動物餅 - 紫菜味 37g',
             'nameChi': '盒裝愉快動物餅 - 紫菜味 37g',
             'enabled': true,
             'notInUse': false,
           },
           {
             'productId': 2028,
             'icon': 6428,
             'image': 6427,
             'price': 25.00,
             'vipPrice': 25.00,
             'name': '金龜嘜萬里望中脆花生160g',
             'nameChi': '金龜嘜萬里望中脆花生160g',
             'enabled': true,
             'notInUse': false,
           }
         ]
       },
       {
         'cells': [
           {
             'productId': 2013,
             'icon': 6398,
             'image': 6397,
             'price': 8.00,
             'vipPrice': 8.00,
             'name': 'Orion 魚仔餅-紫菜味 33g',
             'nameChi': 'Orion 魚仔餅-紫菜味 33g',
             'enabled': true,
             'notInUse': false,
           },
           {
             'productId': 2012,
             'icon': 6396,
             'image': 6395,
             'price': 8.00,
             'vipPrice': 8.00,
             'name': 'Orion 魚仔餅-烤雞味 33g',
             'nameChi': 'Orion 魚仔餅-烤雞味 33g',
             'enabled': true,
             'notInUse': false,
           },
           {
             'productId': 2014,
             'icon': 6400,
             'image': 6399,
             'price': 10.00,
             'vipPrice': 10.00,
             'name': 'Pringles 品客薯片-洋蔥味48g',
             'nameChi': 'Pringles 品客薯片-洋蔥味48g',
             'enabled': true,
             'notInUse': false,
           }
         ]
       },
       {
         'cells': [
           {
             'productId': 2015,
             'icon': 6402,
             'image': 6401,
             'price': 10.00,
             'vipPrice': 10.00,
             'name': 'Pringles 品客薯片-原味 48g',
             'nameChi': 'Pringles 品客薯片-原味 48g',
             'enabled': true,
             'notInUse': false,
           }
         ]
       }
     ]
   },
   'tabs': [
     {
       'label': 'Beautiful Stationery',
       'labelChi': '精美得意文具',
       'icon': 5688,
       'rows': [
         {

           'cells': [
             {
               'productId': 1846,
               'icon': 5702,
               'image': 5701,
               'price': 18.00,
               'vipPrice': 18.00,
               'name': 'Sanrio - Cute Scissor',
               'nameChi': 'Sanrio - 可愛較剪 D',
               'description': 'You can use it for cutting anything but be careful when using it as it is very sharp. Children under 6 please use it under monitor and instructions of parent or adult.',
               'descriptionChi': '你可以用它剪任何东西。',
               'enabled': true,
               'notInUse': false,
             },
             {
               'productId': 1845,
               'icon': 5944,
               'image': 5943,
               'price': 18.00,
               'vipPrice': 18.00,
               'name': 'Sanrio - 可愛較剪 C',
               'nameChi': 'Sanrio - 可愛較剪 C',
               'description': 'Sanrio - 可愛較剪 C',
               'descriptionChi': 'Sanrio - 可愛較剪 C',
               'enabled': true,
               'notInUse': true
             },
             {
               'productId': 1862,
               'icon': 5736,
               'image': 5735,
               'price': 45.00,
               'vipPrice': 45.00,
               'name': '角落生物-超可愛單肩帆布包包 A',
               'nameChi': '角落生物-超可愛單肩帆布包包 A',
               'description': '角落生物-超可愛單肩帆布包包 A',
               'descriptionChi': '角落生物-超可愛單肩帆布包包 A',
               'enabled': true,
               'notInUse': false
             }
           ]
         },
         {

           'cells': [
             {
               'productId': 1857,
               'icon': 5726,
               'image': 5725,
               'price': 68.00,
               'vipPrice': 68.00,
               'name': 'Sanrio - 流沙精美星星梳 D',
               'nameChi': 'Sanrio - 流沙精美星星梳 D',
               'description': 'Sanrio - 流沙精美星星梳 D',
               'descriptionChi': 'Sanrio - 流沙精美星星梳 D',
               'enabled': true,
               'notInUse': false,
             },
             {
               'productId': 1854,
               'icon': 5722,
               'image': 5721,
               'price': 68.00,
               'vipPrice': 68.00,
               'name': 'Sanrio - 流沙精美星星梳 A',
               'nameChi': 'Sanrio - 流沙精美星星梳 A',
               'description': 'Sanrio - 流沙精美星星梳 A',
               'descriptionChi': 'Sanrio - 流沙精美星星梳 A',
               'enabled': true,
               'notInUse': false
             },
             {
               'productId': 1856,
               'icon': 5724,
               'image': 5723,
               'price': 68.00,
               'vipPrice': 68.00,
               'name': 'Sanrio - 流沙精美星星梳 C',
               'nameChi': 'Sanrio - 流沙精美星星梳 C',
               'description': 'Sanrio - 流沙精美星星梳 C',
               'descriptionChi': 'Sanrio - 流沙精美星星梳 C',
               'enabled': true,
               'notInUse': false
             }
           ]
         }
       ]
     },
     {
       'label': 'Beautiful Carlimba',
       'labelChi': '精美優雅手指琴',
       'icon': 5062,
       'rows': [
         {

           'cells': [
             {
               'productId': 1620,
               'icon': 5080,
               'image': 5079,
               'price': 65.00,
               'vipPrice': 65.00,
               'name': '精緻迷你手指木琴 - 心型 ',
               'nameChi': '精緻迷你手指木琴 - 心型  ',
               'description': '精緻迷你手指木琴 - 心型',
               'descriptionChi': '精緻迷你手指木琴 - 心型 ',
               'enabled': false,
               'notInUse': false,
             },
             {
               'productId': 1621,
               'icon': 5082,
               'image': 5081,
               'price': 65.00,
               'vipPrice': 65.00,
               'name': '精緻迷你手指木琴 - 橢圓型 ',
               'nameChi': '精緻迷你手指木琴 - 橢圓型  ',
               'description': '精緻迷你手指木琴 - 橢圓型 ',
               'descriptionChi': '精緻迷你手指木琴 - 橢圓型 ',
               'enabled': true,
               'notInUse': false,
             },
             {
               'productId': 1622,
               'icon': 5084,
               'image': 5083,
               'price': 65.00,
               'vipPrice': 65.00,
               'name': '精緻迷你手指木琴 - 小熊  ',
               'nameChi': '精緻迷你手指木琴 - 小熊  ',
               'description': '精緻迷你手指木琴 - 小熊 ',
               'descriptionChi': '精緻迷你手指木琴 - 小熊 ',
               'enabled': true,
               'notInUse': false,
             }
           ]
         },
         {

           'cells': [
             {
               'productId': 1623,
               'icon': 5086,
               'image': 5085,
               'price': 65.00,
               'vipPrice': 65.00,
               'name': '精緻迷你手指木琴 - 方形  ',
               'nameChi': '精緻迷你手指木琴 - 方形 ',
               'description': '精緻迷你手指木琴 - 方形 ',
               'descriptionChi': '精緻迷你手指木琴 - 方形 ',
               'enabled': true,
               'notInUse': false,
             },
             {
               'productId': 1624,
               'icon': 5088,
               'image': 5087,
               'price': 65.00,
               'vipPrice': 65.00,
               'name': '精緻迷你手指木琴 - 一片雲 ',
               'nameChi': '精緻迷你手指木琴 - 一片雲 ',
               'description': '精緻迷你手指木琴 - 一片雲 ',
               'descriptionChi': '精緻迷你手指木琴 - 一片雲 ',
               'enabled': true,
               'notInUse': false
             },
             {
               'productId': 1625,
               'icon': 5090,
               'image': 5089,
               'price': 65.00,
               'vipPrice': 65.00,
               'name': '精緻迷你透明手指琴 - 橢圓型  ',
               'nameChi': '精緻迷你透明手指琴 - 橢圓型  ',
               'description': '精緻迷你透明手指琴 - 橢圓型 ',
               'descriptionChi': '精緻迷你透明手指琴 - 橢圓型 ',
               'enabled': true,
               'notInUse': false,
             }
           ]
         },
         {

           'cells': [
             {
               'productId': 1626,
               'icon': 5092,
               'image': 5091,
               'price': 65.00,
               'vipPrice': 65.00,
               'name': '精緻迷你透明手指琴 - 心型 ',
               'nameChi': '精緻迷你透明手指琴 - 心型 ',
               'description': '精緻迷你透明手指琴 - 心型 ',
               'descriptionChi': '精緻迷你透明手指琴 - 心型 ',
               'enabled': true,
               'notInUse': false
             },
             {
               'productId': 1627,
               'icon': 5094,
               'image': 5093,
               'price': 65.00,
               'vipPrice': 65.00,
               'name': '精緻迷你透明手指琴 - 貓貓  ',
               'nameChi': '精緻迷你透明手指琴 - 貓貓  ',
               'description': '精緻迷你透明手指琴 - 貓貓 ',
               'descriptionChi': '精緻迷你透明手指琴 - 貓貓 ',
               'enabled': true,
               'notInUse': false,
             },
             {
               'productId': 1628,
               'icon': 5096,
               'image': 5095,
               'price': 65.00,
               'vipPrice': 65.00,
               'name': '精緻迷你透明手指琴 - 小熊  ',
               'nameChi': '精緻迷你透明手指琴 - 小熊  ',
               'description': '精緻迷你透明手指琴 - 小熊 ',
               'descriptionChi': '精緻迷你透明手指琴 - 小熊 ',
               'enabled': true,
               'notInUse': false
             }
           ]
         }
       ]
     },
     {
       'label': 'Snack',
       'labelChi': '零食',
       'icon': 6392,
       'rows': [
         {

           'cells': [
             {
               'productId': 2033,
               'icon': 6438,
               'image': 6437,
               'price': 8.00,
               'vipPrice': 8.00,
               'name': 'Baby Star Noodle - Chicken 37g',
               'nameChi': '童星闊條麵 - 雞肉味 37g',
               'enabled': true,
               'notInUse': false,

             },
             {
               'productId': 2034,
               'icon': 6440,
               'image': 6439,
               'price': 13.00,
               'vipPrice': 13.00,
               'name': 'WAHYUEN Fried Dough BBQ Flavor 40 g',
               'nameChi': '華園柱侯齋燒鵝 40g',
               'enabled': true,
               'notInUse': false,
             },
             {
               'productId': 2017,
               'icon': 6406,
               'image': 6405,
               'price': 8.00,
               'vipPrice': 8.00,
               'name': 'Pacific Saltine Cracker 100g',
               'nameChi': '太平梳打餅 - 奶鹽味100g',
               'enabled': true,
               'notInUse': false,
             }
           ]
         },
         {

           'cells': [
             {
               'productId': 2016,
               'icon': 6404,
               'image': 6403,
               'price': 9.00,
               'vipPrice': 9.00,
               'name': 'Chocolate Chip Cookies 50g',
               'nameChi': '丹麥藍罐曲奇 50g ',
               'enabled': true,
               'notInUse': false,
             },
             {
               'productId': 2032,
               'icon': 6436,
               'image': 6435,
               'price': 9.00,
               'vipPrice': 9.00,
               'nameChi': '盒裝愉快動物餅 - 紫菜味 37g',
               'name': 'FOUR SEAS Animal Shaped Biscuit Sticks Seaweed Flavor',
               'enabled': true,
               'notInUse': false
             },
             {
               'productId': 2028,
               'icon': 6428,
               'image': 6427,
               'price': 25.00,
               'vipPrice': 25.00,
               'nameChi': '金龜嘜萬里望中脆花生160g',
               'name': 'Ladybird Roasted & Salted Peanut',
               'enabled': true,
               'notInUse': false
             }
           ]
         },
         {

           'cells': [
             {
               'productId': 2013,
               'icon': 6398,
               'image': 6397,
               'price': 8.00,
               'vipPrice': 8.00,
               'name': 'Orion 魚仔餅-紫菜味 33g',
               'nameChi': 'Orion 魚仔餅-紫菜味 33g',
               'enabled': true,
               'notInUse': false
             },
             {
               'productId': 2012,
               'icon': 6396,
               'image': 6395,
               'price': 8.00,
               'vipPrice': 8.00,
               'name': 'Orion 魚仔餅-烤雞味 33g',
               'nameChi': 'Orion 魚仔餅-烤雞味 33g',
               'enabled': true,
               'notInUse': false
             },
             {
               'productId': 2014,
               'icon': 6400,
               'image': 6399,
               'price': 10.00,
               'vipPrice': 10.00,
               'name': 'Pringles 品客薯片-洋蔥味48g',
               'nameChi': 'Pringles 品客薯片-洋蔥味48g',
               'enabled': true,
               'notInUse': false
             }
           ]
         },
         {
           'cells': [
             {
               'productId': 2015,
               'icon': 6402,
               'image': 6401,
               'price': 10.00,
               'vipPrice': 10.00,
               'name': 'Pringles 品客薯片-原味 48g',
               'nameChi': 'Pringles 品客薯片-原味 48g',
               'enabled': true,
               'notInUse': false
             }
           ]
         }
       ]
     }
   ]
 }
};
this.app.websocketController.handleVmInfoResponse(respObj);
}
}
