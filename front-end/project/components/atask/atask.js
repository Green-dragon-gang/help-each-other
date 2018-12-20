// components/atask/atask.js
const app = getApp()
const defaultUrl = '/img/test/default.jpg'
const util = require('../../utils/util.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    taskId: {
      type: Number,
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title:'',
    picture:'',
    sender_name:'',
    left_time:''
  },

  lifetimes: {
    attached() {
      const task = app.globalData.tasks[this.properties.taskId];
      if (task) {
        const left_seconds = new Date(task.end_time) - new Date()
        this.setData({
          title: task.title,
          picture: task.picture == "null" ? defaultUrl : task.picture,
          sender_name: task.sender_name,
          left_time: left_seconds > 0 ? util.msToString(left_seconds) : '已过期',
        })
      }                                           
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    taskTap: function () {
      wx.navigateTo({
        url: `/pages/task_detail/task_detail?task_id=${this.properties.taskId}`
      })
    }
  }
})
