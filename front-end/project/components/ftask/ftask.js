// components/ftask/ftask.js

Component({
  properties: { // TODO: 用一个大属性来整合小属性
    title: {
      type: String,
      value: '代练' // 'Loading...'
    },
    pictureUrl: {
      type: String,
      value: '/img/test/cj.jpg' // no pic
    },
    account: {
      type: Number,
      value: 10
    },
    username: {
      type: String,
      value: '无名氏'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    deltaTime: '3 小时前',
    address: "上海市浦东新区世纪大道2001号",
    endTime: 'Dec-15-2018 15:09:00'
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