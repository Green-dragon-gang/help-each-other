// pages/focus_task/focus_task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
  },

  friendsClick: function() {
    wx.navigateTo({
      url: '/pages/friends/friends',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      show: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      show: false
    })
  },
})