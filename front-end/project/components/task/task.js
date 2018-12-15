// components/task/task.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
