//index.js
// pages/person.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastPos: 0,
    filterTop: '0rpx'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    //refresh
    console.log('pull down');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('reach bottom');
  },

  lastPos: 0,
  thred: 50,
  onPageScroll: function(o) {
    let newPos = o.scrollTop;
    let delta = newPos - this.lastPos
    if (delta > this.thred || delta < -this.thred) {
      this.lastPos = newPos;
      if (delta > 0 && this.data.filterTop == '0rpx') {
        // hide filter
        console.log('hide filter');
        this.setData({
          filterTop: '-70rpx'
        })
      } else if (delta < 0 && this.data.filterTop == '-70rpx') {
        // show filter
        console.log('show filter');
        this.setData({
          filterTop: '0rpx'
        })
      }
    }


  },

})