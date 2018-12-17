//index.js
// pages/person.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterTop: '0rpx',
    addBottom: '30rpx'
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
  topShow: 50,
  hide: false,
  onPageScroll: function(o) {
    let newPos = o.scrollTop;
    let delta = newPos - this.lastPos
    if (delta > this.thred || delta < -this.thred) {
      this.lastPos = newPos;
      if (!this.hide && newPos > this.topShow && delta > 0) { // hide filter
        this.hide = true;
        console.log('hide filter');
        this.setData({
          filterTop: '-72rpx',
          addBottom: '-100rpx'
        })
      } else if (this.hide && (newPos <= this.topShow || delta < 0)) { // show filter
        this.hide = false;
        console.log('show filter');
        this.setData({
          filterTop: '0rpx',
          addBottom: '30rpx'
        })
      }
    }
  },

  onUploadBtnClick: function() {
    wx.navigateTo({
      url: '/pages/upload_task/upload_task',
    })
  }

})