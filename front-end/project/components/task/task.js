// components/task/task.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: 'Loading...'
    },
    pictureUrl: {
      type: String,
      value: 'https://pic2.zhimg.com/v2-688c1cdaf74350d8c6aea7145aa1084c_1200x500.jpg' // no pic
    },
    account: {
      type: Number,
      value: -1
    },
    username: {
      type: String,
      value: 'Nobody'
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
