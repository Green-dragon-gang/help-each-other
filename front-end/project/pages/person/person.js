// pages/person.js
const app = getApp()

Page({
  data: {
    balance: 0,
    info_count: 0,
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
        let data = res.data
        console.log('Get my information successfully! ', data);
        that.setData({
          balance: data.user_account,
          info_count: data.new_message,
        })
      },
    })
  },


  onAccepted: function() {
    wx.switchTab({
      url: '/pages/accepted_task/accepted_task',
    });
  },

  onNotification: function() {
    wx.navigateTo({
      url: '/pages/notification/notification',
    });
  },

  onDeveloping: function() {
    wx.showToast({
      icon: 'none',
      title: `页面暂未开发`,
      duration: 1000,
    });
  }


})