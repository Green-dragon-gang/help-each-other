// components/ftask/ftask.js

const app = getApp();
const util = require('../../utils/util.js')
Component({
  properties: { // TODO: 用一个大属性来整合小属性
    taskId: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '代练',
    pictureUrl: '/img/test/cj.jpg',
    defaultUrl: '/img/test/default.jpg',
    username: '无名氏',
    deltaTime: '3 小时前',
    address: "上海市浦东新区世纪大道2001号",
    endTime: 'Dec-15-2018 15:09:00',
    avatar: '/img/test/boss.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click: function() {
      wx.navigateTo({
        url: '../task_detail/task_detail',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },

  lifetimes: {
    attached() {
      const task = app.globalData.tasks[this.properties.taskId];
      console.log(this.properties.taskId)
      if (task) {
        this.setData({
          title: task.title,
          pictureUrl: task.picture == "null" ? this.data.defaultUrl : task.picture,
          username: task.sender_name,
          deltaTime: util.msToString(new Date() - new Date(task.start_time)),
          address: task.location,
          endTime: task.end_time
        })

        wx.request({
          url: `http://129.204.29.200:8080/help/getAvatar/${task.sender_name}`,
          success: res => {
            this.setData({
              avatar: res.data.avatar
            })
          }

        })
      }
    }
  },

})