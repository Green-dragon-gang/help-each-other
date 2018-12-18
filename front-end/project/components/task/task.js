// components/task/task.js

const app = getApp();

Component({
  properties: {
    taskId: {
      type: Number,
      value: -1
    }
  },

  ready: function(){
    const task = app.globalData.tasks[this.properties.taskId];
    this.setData({
      title: task.title,
      pictureUrl: task.picture,
      rewards: task.reward,
      username: task.sender_name,
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '代练',
    pictureUrl: '/img/test/cj.jpg',
    rewards: 10,
    username: '无名氏'
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

})