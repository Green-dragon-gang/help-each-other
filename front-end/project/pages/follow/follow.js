// pages/focus_task/focus_task.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    taskIds: []
  },

  friendsClick: function() {
    wx.vibrateShort()
    wx.navigateTo({
      url: '/pages/friends/friends',
    })
  },

  onShow: function() {
    this.refreshFollows();
    this.setData({
      show: true
    })
  },

  onHide: function() {
    this.setData({
      show: false
    })
  },

  refreshFollows: function() {
    if (app.globalData.userInfo) {
      const nickName = app.globalData.userInfo.nickName
      wx.request({
        url: `http://129.204.29.200:8080/help/getFriends/${nickName}`,
        method: "GET",
        success: res => {
          this.setData({
            taskIds: []
          })
          if (res.data == '()') return

          for (let item of res.data) {
            const name = item.follow_name
            wx.request({
              url: `http://129.204.29.200:8080/help/getTasksBySender/${name}`,
              method: 'GET',
              success: res => { // 从获取的tasks中 只使用 task id
                if (res.data == '()') return

                const taskIds = this.data.taskIds
                for (let item of res.data) {
                  taskIds.push(item.task_id)
                }
                taskIds.sort((id1, id2) => {
                  let t1 = new Date(app.globalData.tasks[id1].start_time.replace(/-/g, "/"))
                  let t2 = new Date(app.globalData.tasks[id2].start_time.replace(/-/g, "/"))
                  return t2 - t1
                })
                this.setData({
                  taskIds
                })
              }
            })
          }
        }
      });
    }
  },


})