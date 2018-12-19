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
      if (task){
        this.setData({
          title: task.title,
          pictureUrl: task.picture == "null" ? this.data.defaultUrl : task.picture,
          rewards: task.reward,
          username: task.sender_name,
        })

        wx.request({
          url: `http://129.204.29.200:8080/help/getAvatar/${task.sender_name}`,
          success: res =>{
            this.setData({
              avatar: res.data.avatar
            })
          }
      
        })
        
      }
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
    defaultUrl: '/img/test/default.jpg',
    avatar: '/img/test/boss.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click: function () {
      console.log(`../task_detail/task_detail?task_id=${this.properties.taskId}`)
      wx.navigateTo({
        url: `../task_detail/task_detail?task_id=${this.properties.taskId}`,
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    }
  },

})