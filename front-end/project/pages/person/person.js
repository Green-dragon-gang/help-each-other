// pages/person.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    nickName: "dasd",
    balance: 0,
    info_count: 0,
    orderItems: [{
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
    ],
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo
          });
        }
      });
    }

  },

  onReady: function() {
    let that = this;
    let username = app.globalData.userInfo.nickName;
    let url = `http://129.204.29.200:8080/help/getSelfInfo/${username}`;
    wx.request({
      url: url,
      method: "GET",
      success: res => {
        console.log('Get my information successfully!');
        let data = res.data
        that.setData({
          balance: data.user_account,
          info_count: data.new_message,
        })
      },
    })
  },

  onRelease: function() {

  },

  onAccepted: function() {
    wx.switchTab({
      url: '/pages/accepted_task/accepted_task',
    })
  }
})