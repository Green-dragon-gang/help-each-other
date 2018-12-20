// pages/rcv_task/rcv_task.js
const app = getApp()

Page({
  data: {
    tasks: [{
      task_id: 1,
      title: '打败拿破仑',
      picture: '/img/test/cj.jpg',
      end_time: 'Dec-15-2018 15:09:00',
      sender_name: '亚历山大一世',
      status: 1,
      left_time: '3 小时',
    }, {
      task_id: 2,
      title: '打尼玛拿破仑',
      picture: '/img/test/cj.jpg',
      end_time: 'Dec-15-2018 15:09:00',
      sender_name: '亚历山大二世',
      status: 1,
      left_time: '4 小时',
    }]
  },

  // TODO:
  onLoad: function() {
    if (app.globalData.userInfo) {
      const nickName = app.globalData.userInfo.nickName
      wx.request({
        url: `http://129.204.29.200:8080/help/getTasksByReceiver/${nickName}`,
        method: "GET",
        success: res => {
          console.log(res)
        }
      })
    }
  },

  taskClick: function() {
    wx.navigateTo({
      url: '/pages/task_detail/task_detail',
    })
  }
})