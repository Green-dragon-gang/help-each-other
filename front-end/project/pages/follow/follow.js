// pages/focus_task/focus_task.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    taskIds: [20, 21]
  },

  friendsClick: function() {
    wx.navigateTo({
      url: '/pages/friends/friends',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      show: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      show: false
    })
  },

  onReady: function() {
    this.refreshFollows();
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
                  let t1 = new Date(app.globalData.tasks[id1].start_time)
                  let t2 = new Date(app.globalData.tasks[id2].start_time)
                  return t2 - t1
                })
                this.setData({
                  taskIds
                })
                console.log(name) // TODO: to detele
                console.log(this.data.taskIds) // TODO: to detele
              }
            })
          }
        }
      });
    }
  },

  testclick: function() {
    console.log(this.data.taskIds)
  }

})