// pages/task_detail/task_detail.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFollow: false,
    statusString: "",
    buttonEnabled: false,
    buttonLabel: "",
    receiver_name: "",
    sender_avatar: "",
    task_id: -1,
    isShown: false,
    comment: null,
    canAbandon: false
  },

  follow: function (event) {
    let url = `http://129.204.29.200:8080/help/${this.data.isFollow ? "unfollow" : "follow"}`
    let that = this
    wx.request({
      url: url,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {user_name: app.globalData.userInfo.nickName, follow_name: this.data.task.sender_name},
      success: res => {
        if (res.data.success == "true") {
          wx.showToast({
            title: that.data.isFollow ? '取消关注成功' : '关注成功',
            duration: 1000,
          })
          that.setData({
            isFollow: !that.data.isFollow
          })
        }
      }
    })
  },

  refreshTask() {
    let that = this
    wx.request({
      url: `http://129.204.29.200:8080/help/getReceiver/${that.data.task_id}`,
      method: "GET",
      dataType: "json",
      success: res => {
        that.setData({
          receiver_name: res.data.receiver_name
        })
        that.handelStatus()
      },
    })
    wx.request({
      url: `http://129.204.29.200:8080/help/getTaskById/${that.data.task_id}`,
      method: "GET",
      dataType: "json",
      success: res => {
        that.setData({
          task: res.data
        })
        app.globalData.tasks[that.data.task_id] = res.data
        that.handelStatus()
      }
    })
    wx.request({
      url: `http://129.204.29.200:8080/help/getComment/${this.data.task_id}`,
      method: "GET",
      dataType: "json",
      success: res => {
        that.setData({
          comment: Object.keys(res.data).length === 0 ? null: res.data.comment
        })
        that.handelStatus()
      },
    })
  },

  handleTask: function (event) {
    if (!this.data.buttonEnabled)
      return
    let that = this
    if (this.data.task.status === 0) {
      if (this.data.task.sender_name !== app.globalData.userInfo.nickName)
        wx.request({
          url: 'http://129.204.29.200:8080/help/acceptTask',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {task_id: this.data.task.task_id, receiver_name: app.globalData.userInfo.nickName},
          success: res => {
            if (res.data.success) {
              wx.showToast({
                title: '接任务成功',
                duration: 1000,
              })
              that.refreshTask()
            }
          },
        })
      else
        wx.request({
          url: 'http://129.204.29.200:8080/help/deleteTask',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {task_id: this.data.task.task_id},
          success: res => {
            if (res.data.success)
              app.refreshTasks(() => {
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              })
          },
        })
    }
    else
      wx.request({
        url: 'http://129.204.29.200:8080/help/finishTask',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {task_id: this.data.task.task_id},
        success: res => {
          if (res.data.success) {
            wx.showToast({
              title: '完成任务成功',
              duration: 1000,
            })
            that.refreshTask()
          }
        },
      })
  },

  comment: function (event) {
    let that = this
    wx.request({
      url: 'http://129.204.29.200:8080/help/addComment',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {task_id: this.data.task.task_id, comment: event.detail.value.input},
      success: res => {
        if (res.data.success) {
          wx.showToast({
            title: '评论成功',
            duration: 1000,
          })
          that.refreshTask()
        }
      }
    })
  },

  getTagString: function () {
    switch (this.data.task.tag) {
      case 0:
        return "外卖"
      case 1:
        return "取快递"
      case 2:
        return "占座"
      default:
        return "其他"
    }
  },

  handelStatus() {
    switch (this.data.task.status) {
      case 0:
        if (this.data.task.sender_name === app.globalData.userInfo.nickName)
          this.setData({
            statusString: "待完成",
            buttonEnabled: true,
            buttonLabel: "删除任务",
            canAbandon: false
          })
        else
          this.setData({
            statusString: "待完成",
            buttonEnabled: true,
            buttonLabel: "接受委托",
            canAbandon: false
          })
        break
      case 1:
        if (this.data.receiver_name === app.globalData.userInfo.nickName)
          this.setData({
            statusString: "进行中",
            buttonEnabled: true,
            buttonLabel: "任务已完成",
            canAbandon: true
          })
        else
          this.setData({
            statusString: "进行中",
            buttonEnabled: false,
            buttonLabel: "任务进行中",
            canAbandon: false
          })
        break
      case 2:
        this.setData({
          statusString: "已完成",
          buttonEnabled: false,
          buttonLabel: "已完成",
          canAbandon: false
        })
        break
      case 3:
        this.setData({
          statusString: "已过期",
          buttonEnabled: false,
          buttonLabel: "已过期",
          canAbandon: false
        })
    }

    this.setData({
      tagString: this.getTagString(),
      isShown: this.data.task.status === 2 && this.data.task.sender_name === app.globalData.userInfo.nickName && this.data.comment === null
    })
  },

  abandonTask() {
    let that = this
    wx.request({
      url: `http://129.204.29.200:8080/help/abandonTask/${this.data.task_id}`,
      method: "GET",
      dataType: "json",
      success: res => {
        if (res.data.success == "true") {
          wx.showToast({
            title: '放弃任务成功',
            duration: 1000,
          })
          that.refreshTask()
        }
      },
    })
  },

  onLoad: function (options) {
    this.setData({
      task_id: options.task_id,
      task: app.globalData.tasks[options.task_id],
    })

    let that = this
    wx.request({
      url: `http://129.204.29.200:8080/help/isFollow/${app.globalData.userInfo.nickName}/${ this.data.task.sender_name}`,
      method: "GET",
      dataType: "json",
      success: res => {
        that.setData({
          isFollow: res.data.success === "true"
        })
        that.handelStatus()
      },
    })

    wx.request({
      url: `http://129.204.29.200:8080/help/getReceiver/${this.data.task_id}`,
      method: "GET",
      dataType: "json",
      success: res => {
        that.setData({
          receiver_name: res.data.receiver_name
        })
        that.handelStatus()
      },
    })

    wx.request({
      url: `http://129.204.29.200:8080/help/getComment/${this.data.task_id}`,
      method: "GET",
      dataType: "json",
      success: res => {
        if (Object.keys(res.data).length !== 0)
          that.setData({
            comment: res.data.comment
          })
        that.handelStatus()
      },
    })

    wx.request({
      url: `http://129.204.29.200:8080/help/getAvatar/${that.data.task.sender_name}`,
      method: "GET",
      dataType: "json",
      success: res => {
        that.setData({
          sender_avatar: res.data.avatar
        })
      },
    })
    this.handelStatus()
  }
})