// pages/task_detail/task_detail.js
let app = getApp();
let nickName = "Virgil"

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
    comment: null
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
      data: {user_name: nickName, follow_name: this.data.task.sender_name},
      success: res => {
        if (res.data.success) {
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

  handleTask: function (event) {
    if (!this.data.buttonEnabled)
      return
    let that = this
    if (this.data.task.status === 0)
      wx.request({
        url: 'http://129.204.29.200:8080/help/acceptTask',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {task_id: this.data.task.task_id, receiver_name: nickName},
        success: res => {
          if (res.data.success) {
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
                console.log(res)
                that.setData({
                  task: res.data
                })
                app.globalData.tasks[that.data.task_id] = res.data
                that.handelStatus()
              }
            })
          }
        },
      })
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
          }
        },
      })
  },

  comment: function (event) {
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
        // if (this.data.task.sender_name === app.globalData.userInfo.nickName)
        if (this.data.task.sender_name === nickName)
          this.setData({
            statusString: "待完成",
            buttonEnabled: false,
            buttonLabel: "等待接单"
          })
        else
          this.setData({
            statusString: "待完成",
            buttonEnabled: true,
            buttonLabel: "接受委托"
          })
        break
      case 1:
        // if (this.data.task.receiver_name === app.globalData.userInfo.nickName)
        if (this.data.receiver_name === nickName)
          this.setData({
            statusString: "进行中",
            buttonEnabled: true,
            buttonLabel: "任务已完成"
          })
        else
          this.setData({
            statusString: "进行中",
            buttonEnabled: false,
            buttonLabel: "任务进行中"
          })
        break
      case 2:
        this.setData({
          statusString: "已完成",
          buttonEnabled: false,
          buttonLabel: "已完成"
        })
        break
      case 3:
        this.setData({
          statusString: "已过期",
          buttonEnabled: false,
          buttonLabel: "已过期"
        })

      this.setData({
        tagString: this.getTagString(),
        isShown: this.data.task.status === 2 && this.data.task.sender_name === nickName && this.data.comment === null
      })
    }
  },

  onLoad: function (options) {
    this.setData({
      task_id: options.task_id,
      task: app.globalData.tasks[options.task_id],
    })

    let that = this
    wx.request({
      url: `http://129.204.29.200:8080/help/isFollow/${nickName}/${ this.data.task.sender_name}`,
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