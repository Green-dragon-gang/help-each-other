// pages/rcv_task/rcv_task.js
Page({

  data: {
    tasks: [{
      task_id: 1,
      title: '打败拿破仑',
      picture: '/img/test/cj.jpg',
      end_time: 'Dec-15-2018 15:09:00',
      sender_name: '亚历山大一世',
      sender_avatar: '/img/test/boss.png',
      status: 1,
      left_time: '3 小时',
    }, {
      task_id:2,
      title: '打尼玛拿破仑',
      picture: '/img/test/cj.jpg',
      end_time: 'Dec-15-2018 15:09:00',
      sender_name: '亚历山大二世',
      sender_avatar: '/img/test/boss.png',
      status: 1,
      left_time: '4 小时',
    }]
  },

  onLoad: function() {

  },

  taskClick:function() {
    wx.navigateTo({
      url: '/pages/task_detail/task_detail',
    })
  }
})