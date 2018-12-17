// pages/task_detail/task_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: {
      task_id: 1,
      sender_name: "亚历山大一世",
      sender_avatar: "/img/boss.png", //waiting for db name
      title: "打败拿破仑",
      content: "拿破仑战争（法文：Guerres Napoléoniennes，英文：Napoleonic Wars，德文：Napoleons Kriege，俄文：Наполеоновские войны）是指1803年—1815年爆发的各场战争，这些战事可说是自1789年法国大革命所引发的战争的延续。它促使了欧洲的军队和火炮发生重大变革，特别是军事制度，因为实施全民征兵制，使得战争规模庞大、史无前例。法国国势迅速崛起，雄霸欧洲；但在1812年侵俄惨败后，国势一落千丈。拿破仑建立的帝国最终战败，让波旁王朝得于1814年和1815年两度复辟。随着拿破仑在滑铁卢败北，各交战国签订巴黎条约后，拿破仑战争于1815年11月20日结束。",
      location: "莫斯科",
      start_time: "Dec-15-2018 15:09:00",
      end_time: "Dec-15-2018 15:09:00",
      reward: 100,
      tag: 3,
      picture: '/img/cj.jpg',
      status: 0
    },
    isFollow: false,
  },

  follow: function(event) {
    // if (isFollow)
    //   return
    // else
    //   return
    this.setData({
      isFollow: !this.data.isFollow
    })
    wx.showToast({
      title: this.data.isFollow ? '关注成功' : '取消关注成功',
      duration: 1000,
    })
  },

  getTagString: function() {
    switch (this.data.task.tag) {
      case 0:
        return "外卖"
      case 1:
        return "取快递"
      case 2:
        return "占座"
      default:
        return "其他" 
    }
  },

  getStatusString: function() {
    switch (this.data.task.status) {
      case 0:
        return "待完成"
      case 1:
        return "进行中"
      case 2:
        return "已完成"
      case 3:
        return "已过期"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tagString: this.getTagString(),
      statusString: this.getStatusString()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})