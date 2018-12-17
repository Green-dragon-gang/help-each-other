//index.js
// pages/person.js
//获取应用实例
const app = getApp()

Page({

  data: {
    filterTop: '0rpx',
    addBottom: '30rpx',
    filterState: Object.freeze({
      "default": 1,
      "moneyup": 2,
      "moneydown": 3,
      "distanceup": 4,
      "distancedown": 5,
      "timeup": 6,
      "timedown": 7,
    }),
    filter: 1
  },

  //====================================
  // methods to handle filter click
  //====================================
  filterDefaultClick: function() {
    console.log('default');
    this.setData({
      filter: this.data.filterState.default
    })
  },

  filterMoneyClick: function() {
    console.log('money');
    if (this.data.filter == this.data.filterState.moneyup)
      this.setData({
        filter: this.data.filterState.moneydown
      });
    else
      this.setData({
        filter: this.data.filterState.moneyup
      });
  },

  filterDistanceClick: function() {
    console.log('distance');
    if (this.data.filter == this.data.filterState.distanceup)
      this.setData({
        filter: this.data.filterState.distancedown
      });
    else
      this.setData({
        filter: this.data.filterState.distanceup
      });
  },

  filterTimeClick: function() {
    console.log('time');
    if (this.data.filter == this.data.filterState.timeup)
      this.setData({
        filter: this.data.filterState.timedown
      });
    else
      this.setData({
        filter: this.data.filterState.timeup
      });
  },
  //====================================
  // end
  //====================================


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

  // handle hiding and showing event for filter and add-button during scrolling 
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