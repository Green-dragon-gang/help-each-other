// pages/authorization /authorization.js
const app = getApp()

Page({
  data: {

  },

  onLoad: function(options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'])
          this.gotoIndex()
      },
    });
  },

  tap: function() {
    app.login(this.gotoIndex)
  },

  gotoIndex: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }



})