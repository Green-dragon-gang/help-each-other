// components/task/task.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    innerText: {
      type: String,
      value: 'hello word',
    },
    pictureUrl: {
      type: String,
      value: 'https://pic2.zhimg.com/v2-688c1cdaf74350d8c6aea7145aa1084c_1200x500.jpg'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loaded:false,
    title:null,
    username:null,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
