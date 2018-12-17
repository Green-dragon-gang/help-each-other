// pages/task_submit/task_submit.js

// const QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
// var qqmapsdk;

Page({

  data: {
    imgUrl: '/img/imgAdd.png',
    title: '',
    date: '',
    address: '',
    locationDetail: {

    },
    money: 0,
  },


  // var demo = new QQMapWX({
  //   key: '开发密钥（key）' // 必填
  // });

  bindTimeChange: function(e) {
    console.log('date change:', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindTitleChange: function(e) {
    console.log('title change:', e.detail.value)
    this.setData({
      title: e.detail.value
    });
  },

  bindMoneyChange: function(e) {
    console.log('money change:', e.detail.value)
    this.setData({
      money: e.detail.value
    });
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

  chooseLocation: function() {
    let that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          address: res.address
        })
      }
    });
  },

  release: function() {
    wx.navigateBack({
      delta: 1
    })

    // 发布

    // 发布成功 进入任务详情页面
  },

  cancel: function() {
    wx.navigateBack({
      delta: 1
    })
  },

})