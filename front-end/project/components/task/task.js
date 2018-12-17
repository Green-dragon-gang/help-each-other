// components/task/task.js
Component({
  properties: { // TODO: 用一个大属性来整合小属性
    title: {
      type: String,
      value: '代练' // 'Loading...'
    },
    pictureUrl: {
      type: String,
      value: '/img/cj.jpg' // no pic
    },
    account: {
      type: Number,
      value: 10
    },
    username: {
      type: String,
      value: '无名氏'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

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