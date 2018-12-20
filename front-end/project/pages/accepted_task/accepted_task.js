// pages/rcv_task/rcv_task.js
const app = getApp()

Page({
  data: {
    taskIds: []
  },

  // TODO: sort by left_time
  onLoad: function() {
    if (app.globalData.userInfo) {
      const nickName = app.globalData.userInfo.nickName
      wx.request({
        url: `http://129.204.29.200:8080/help/getTasksByReceiver/${nickName}`,
        method: "GET",
        success: res => {
          this.setData({
            taskIds: []
          })
          const taskIds = this.data.taskIds
          for (let task of res.data) {
            taskIds.push(task.task_id)
          }
          this.setData({
            taskIds
          })
        }
      })
    }
  },

})