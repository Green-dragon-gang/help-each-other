const app = getApp();
const util = require('../../utils/util.js')

Page({
  data: {
    tags: [{
      tag: '外卖',
      value: 0
    }, {
      tag: '取快递',
      value: 1
    }, {
      tag: '占座',
      value: 2
    }, {
      tag: '其他',
      value: 3
    }],
    tag: {
      tag: '',
      value: -1
    },
    imgUrl: '/img/uploadTask/imgAdd.png',
    title: '',
    date: '',
    time: '',
    address: '',
    reward: 0,
    content: '',
    balance: -1,
  },

  onShow: function () {
    let username = app.globalData.userInfo.nickName;
    wx.request({
      url: `http://129.204.29.200:8080/help/getSelfInfo/${username}`,
      method: "GET",
      success: res => {
        let data = res.data
        console.log('Get my information successfully! ', data);
        this.setData({
          balance: data.user_account,
        })
      },
    })
    this.setData({
      show: true
    })
  },

  onUnload: function () {
    this.setData({
      show: false
    })
  },

  // ========================
  // bind change
  // ========================
  bindDateChange: function (e) {
    const date = e.detail.value.replace(/-/g, "/")
    console.log('date change:', date)
    this.setData({
      date: date
    })
  },
  bindTimeChange: function (e) {
    console.log('time change:', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  bindTitleChange: function (e) {
    console.log('title change:', e.detail.value)
    this.setData({
      title: e.detail.value
    });
  },

  bindRewardChange: function (e) {
    console.log('reward change:', e.detail.value)
    this.setData({
      reward: e.detail.value
    });
  },

  bindContentChange: function (e) {
    console.log('content change:', e.detail.value)
    this.setData({
      content: e.detail.value
    });
  },

  bindTagChange: function (e) {
    console.log('tag change:', e.detail.value)
    this.setData({
      tag: this.data.tags[e.detail.value]
    })
  },

  chooseImg: function () {
    console.log('chooseImg');
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed', 'original'],
      sourceType: ['album'],
      success: res => {
        console.log(res);
        this.setData({
          imgUrl: res.tempFilePaths[0]
        });
      },
    })
  },

  chooseLocation: function () {
    wx.chooseLocation({
      success: (res) => {
        console.log('location changed:', res);
        this.setData({
          address: res.address,
        })
      }
    });
  },

  checkInput: function () {
    let attr = null;

    if (this.data.title == '') attr = '标题不能为空'
    else if (this.data.date == '') attr = '期限日期不能为空'
    else if (this.data.time == '') attr = '期限时间不能为空'
    else if (this.data.address == '') attr = '地点不能为空'
    else if (this.data.reward == '') attr = '赏金不能为空'
    else if (parseInt(this.data.reward) == NaN || parseInt(this.data.reward) < 0) attr = '赏金格式不正确'
    else if (parseInt(this.data.reward) > this.data.balance) attr = '赏金不能超过您的当前余额'
    else if (this.data.tag.value == -1) attr = '标签不能为空'
    else if (this.data.content == '') attr = '任务详情不能为空'

    if (attr) {
      wx.showToast({
        icon: 'none',
        title: `${attr}`,
        duration: 1000,
      })
      return false;
    } else
      return true
  },

  release: function () {
    if (!app.globalData.userInfo) { // 登陆校验
      wx.showToast({
        icon: 'none',
        title: '请先登陆',
        duration: 1000,
      })
      return;
    }

    if (!this.checkInput()) return

    // 显示 loading 提示
    wx.showLoading({
      title: '发布中',
    })

    if (this.data.imgUrl != '/img/uploadTask/imgAdd.png') {
      wx.uploadFile({
        url: 'http://129.204.29.200:8080/help/uploadPicture',
        filePath: this.data.imgUrl,
        name: 'picture',
        success: res => {
          console.log("Upload picture succesfully!", res);
          let imgUrl = JSON.parse(res.data).url; // 由于 uploadFile 无法自动解析 json
          this.uploadTask(imgUrl);
        },
        fail: this.uploadFailed
      })
    } else {
      this.uploadTask(null);
    }

    // 发布成功 进入任务详情页面
  },

  // TODO:
  uploadTask: function (imgUrl) {
    const dataTest = {
      sender_name: 'Virgil',
      title: "代练",
      content: "kda达到5",
      location: "上海市浦东新区世纪大道2001号",
      start_time: util.formatTime(new Date()),
      end_time: "2018-12-14 15:09:00",
      reward: 100,
      tag: 3,
      picture: imgUrl,
      target_person_name: "null"
    }
    const data = {
      sender_name: app.globalData.userInfo.nickName,
      title: this.data.title,
      content: this.data.content,
      location: this.data.address,
      start_time: util.formatTime(new Date()),
      end_time: `${this.data.date} ${this.data.time}:00`,
      reward: parseInt(this.data.reward),
      tag: this.data.tag.value,
      picture: imgUrl,
      target_person_name: "null" // TODO
    }

    wx.request({
      url: 'http://129.204.29.200:8080/help/addTask',
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: res => {
        console.log("add task", res);
        app.refreshTasks(() => {
          wx.hideLoading()
          wx.reLaunch({
            url: '/pages/index/index',
            success: () => {
              wx.showToast({
                title: '发布成功',
                duration: 1000,
              })
            }
          })
        });
      },
      failed: this.uploadFailed
    })
  },

  uploadFailed: function () {
    wx.hideLoading()
    wx.showToast({
      icon: 'none',
      title: '发布失败',
      duration: 1000,
    })
  }


})