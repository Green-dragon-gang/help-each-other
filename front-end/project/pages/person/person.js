// pages/person.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName: "dasd",
    balance: 0,
    info_count: 0,
    orderItems: [
      {
        typeId: 0,
        name: '发布的任务',
        url: 'bill',
        imageurl: '../../img/person/fukuan.png',
        tap: "onRelease"
      },
      {
        typeId: 2,
        name: '接受的任务',
        url: 'bill',
        imageurl: '../../img/person/fahuo.png',
        tap: "onAccepted"
      },
      // {
      //   typeId: 2,
      //   name: '待收货',
      //   url: 'bill',
      //   imageurl: '../../img/person/shouhuo.png'
      // },
      // {
      //   typeId: 3,
      //   name: '待评价',
      //   url: 'bill',
      //   imageurl: '../../img/person/pingjia.png'
      // }
    ],
  },

  onLoad: function() {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        }
      })
    }

  },

  onReady: function(){
    let that = this;
    wx.request({
      url: 'http://129.204.29.200:8080/help/getSelfInfo/test1',
      method: "GET",
      dataType: "json",
      success: res => {
        console.log(res.data);
        let ddata = res.data.replace("'",'"');
        ddata = ddata.replace(" ", "");

        console.log(JSON.parse(ddata));
        that.setData({
          balance: res.data.user_account,
          info_count: res.data.new_message,
        })
      }
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onRelease: function () {

  },
  onAccepted: function (){
    wx.switchTab({
      url: '/pages/accepted_task/accepted_task',
    })
  }
})