Page({
  data: {
    imgUrl: '/img/uploadTask/imgAdd.png',
    title: '',
    date: '',
    time: '',
    address: '',
    money: 0,

    latitude: -1,
    longitude: -1,
  },

  bindDateChange: function(e) {
    console.log('date change:', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('time change:', e.detail.value)
    this.setData({
      time: e.detail.value
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
        console.log('location changed:', res);
        that.setData({
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude,
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