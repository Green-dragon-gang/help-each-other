// components/task/task.js

const app = getApp();

Component({
  properties: {
    taskId: {
      type: Number,
      value: -1
    },
    show: {
      type: Boolean,
      value: false
    }
  },

  lifetimes: {
    attached() {
      const task = app.globalData.tasks[this.properties.taskId];
      if (task)
        this.setData({
          title: task.title,
          pictureUrl: task.picture,
          rewards: task.reward,
          username: task.sender_name,
        })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: "Loading...",
    pictureUrl: '/img/test/default.jpg',
    rewards: 0,
    username: "Loading...",
    defaultUrl: '/img/test/default.jpg'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click: function() {
      wx.navigateTo({
        url: `../task_detail/task_detail?task_id=${this.properties.taskId}`,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },

})