// pages/task_detail/task_detail.js
let app = getApp();
let statusString, buttonEnabled, buttonLabel;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  follow: function(event) {
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

  handelStatus() {
    let nickName = "亚历山大一世"
    switch (this.data.task.status) {
      case 0:
        statusString = "待完成"
        // if (this.data.task.sender_name === app.globalData.userInfo.nickName) {
        if (this.data.task.sender_name === nickName) {
          buttonEnabled = false
          buttonLabel = "等待接单"
        } else {
          buttonEnabled = true
          buttonLabel = "抢单"
        }
        break
      case 1:
        statusString =  "进行中"
        // if (this.data.task.receiver_name === app.globalData.userInfo.nickName) {
        if (this.data.task.receiver_name === nickName) {
          buttonEnabled = true
          buttonLabel = "任务已完成"
        } else {
          buttonEnabled = false
          buttonLabel = "任务进行中"
        }
        break
      case 2:
        statusString =  "已完成"
        buttonEnabled = false
        buttonLabel = "已完成"
      case 3:
        statusString =  "已过期"
        buttonEnabled = false
        buttonLabel = "已过期"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    this.setData({
      task: {
        task_id: 1,
        sender_name: "亚历山大一世",
        sender_avatar: "/img/test/boss.png", //waiting for db name
        title: "打败拿破仑",
        content: "拿破仑战争（法文：Guerres Napoléoniennes，英文：Napoleonic Wars，德文：Napoleons Kriege，俄文：Наполеоновские войны）是指1803年—1815年爆发的各场战争，这些战事可说是自1789年法国大革命所引发的战争的延续。它促使了欧洲的军队和火炮发生重大变革，特别是军事制度，因为实施全民征兵制，使得战争规模庞大、史无前例。法国国势迅速崛起，雄霸欧洲；但在1812年侵俄惨败后，国势一落千丈。拿破仑建立的帝国最终战败，让波旁王朝得于1814年和1815年两度复辟。随着拿破仑在滑铁卢败北，各交战国签订巴黎条约后，拿破仑战争于1815年11月20日结束。",
        location: "莫斯科",
        start_time: "Dec-15-2018 15:09:00",
        end_time: "Dec-15-2018 15:09:00",
        reward: 100,
        tag: 3,
        picture: '/img/test/cj.jpg',
        status: 1
      },
    })
    this.handelStatus()
    this.setData({
      isFollow: false,
      tagString: this.getTagString(),
      statusString: statusString,
      buttonLabel: buttonLabel,
      buttonEnabled: buttonEnabled
    })
  }

})