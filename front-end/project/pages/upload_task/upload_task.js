// pages/task_submit/task_submit.js

const QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '/img/imgAdd.png'
  },

  onLoad: function() {
    qqmapsdk = new QQMapWX({
      key: 'TDCBZ-T4HCJ-BJ7FR-FWXWT-OEZRT-DVBBF'
    })
  },

  onShow: function() {
    wx.getLocation({
      success: function(res) {
        console.log(res);
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {
            console.log(res);
          },
          fail: function(res) {
            console.log(res);
          },
          complete: function(res) {
            console.log(res);
          }
        })
      },
    })
  },

  chooseImg: function() {
    console.log('chooseImg');
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: function(res) {
        console.log(res);
        that.setData({
          imgUrl: res.tempFilePaths[0]
        });
      },
    })
  },

  getLocation: function() {

  },

  cancel: function() {
    wx.navigateBack({
      delta: 1
    })
  }
})