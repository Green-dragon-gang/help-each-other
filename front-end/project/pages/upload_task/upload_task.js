const app = getApp();

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

  onShow: function () {
    this.setData({
      show: true
    })
  },

  onUnload: function () {
    this.setData({
      show: false
    })
  },

  bindDateChange: function (e) {
    console.log('date change:', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('time change:', e.detail.value)
    this.setData({
      time: e.detail.value
    })
    console.log()
  },

  bindTitleChange: function (e) {
    console.log('title change:', e.detail.value)
    this.setData({
      title: e.detail.value
    });
  },

  bindMoneyChange: function (e) {
    console.log('money change:', e.detail.value)
    this.setData({
      money: e.detail.value
    });
  },

  bindContentChange: function (e) {
    console.log('content change:', e.detail.value)
    this.setData({
      content: e.detail.value
    });
  },

  chooseImg: function () {
    console.log('chooseImg');
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: function (res) {
        console.log(res);
        that.setData({
          imgUrl: res.tempFilePaths[0]
        });
      },
    })
  },

  chooseLocation: function () {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log('location changed:', res);
        that.setData({
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    });
  },

  release: function () {
    let that = this;
    if (this.data.imgUrl != '/img/uploadTask/imgAdd.png') {
      wx.uploadFile({
        url: 'http://129.204.29.200:8080/help/uploadPicture',
        filePath: this.data.imgUrl,
        name: 'picture',
        success: function (res) {
          console.log("Upload picture succesfully!", res);
          let imgUrl = JSON.parse(res.data).url;
          that.uploadTask(imgUrl);
        }
      })
    } else {
      this.uploadTask(null);
    }

    // 发布成功 进入任务详情页面
  },

  // TODO:
  uploadTask: function (imgUrl) {
    const data = {
      sender_name: 'Virgil',
      title: "代练", //this.data.title,
      content: "kda达到5", //this.data.content
      location: "上海市浦东新区世纪大道2001号", //this.data.address,
      start_time: "2018-12-14 12:09:00", // now
      end_time: "2018-12-14 15:09:00", // `${this.date} ${this.time}:00`,
      reward: 100, //this.data.money,
      tag: 3,
      picture: imgUrl,
      target_person_name: "null"
    }

    wx.request({
      url: 'http://129.204.29.200:8080/help/addTask',
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: res => {
        // TODO:return ID
        console.log(res);
        app.refreshTasks(() => {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        });
      },
      failed: function (res) {
        console.log("upload failed!")
      }
    })
  },


})