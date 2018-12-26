//index.js
const app = getApp()

Page({
  data: {
    show: false,
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
    filter: 1,
    taskIds: []
  },

  // init ids
  onLoad: function() {
    app.refreshTasks(() => {
      //====================TODO: to delete
      // wx.navigateTo({
      //   url: `/pages/notification/notification`
      // })
      //====================TODO: to delete
      const keys = Object.keys(app.globalData.tasks);
      const taskIds = this.data.taskIds;
      keys.forEach((id, index) => {
        taskIds.push({
          id: id,
          show: false
        })
      })
      this.tasksSort((a, b) => new Date(app.globalData.tasks[b.id].start_time.replace(/-/g, "/")) -
        new Date(app.globalData.tasks[a.id].start_time.replace(/-/g, "/")))
      this.setData({
        taskIds
      })
    })
  },

  //====================================
  // methods to handle filter click
  //====================================
  tasksSort: function(compare) {
    const taskIds = this.data.taskIds;
    taskIds.sort(compare)
    for (let i = 0; i < 6; i++) taskIds[i].show = true;
    this.setData({
      taskIds
    })
    console.log('index:', this.data.taskIds)
  },

  filterDefaultClick: function() {
    console.log('default');
    wx.vibrateShort()
    this.setData({
      filter: this.data.filterState.default
    })
    this.tasksSort((a, b) => new Date(app.globalData.tasks[b.id].start_time.replace(/-/g, "/")) -
      new Date(app.globalData.tasks[a.id].start_time.replace(/-/g, "/")))
  },

  filterMoneyClick: function() {
    console.log('reward');
    wx.vibrateShort()
    if (this.data.filter == this.data.filterState.moneyup) {
      this.tasksSort((a, b) => app.globalData.tasks[a.id].reward - app.globalData.tasks[b.id].reward)
      this.setData({
        filter: this.data.filterState.moneydown
      });
    } else {
      this.tasksSort((a, b) => app.globalData.tasks[b.id].reward - app.globalData.tasks[a.id].reward)
      this.setData({
        filter: this.data.filterState.moneyup
      });
    }
  },

  filterDistanceClick: function() {
    console.log('distance');
    wx.vibrateShort()
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
    wx.vibrateShort()
    const currentDate = new Date()
    if (this.data.filter == this.data.filterState.timeup) {
      this.tasksSort((a, b) => new Date(app.globalData.tasks[a.id].end_time.replace(/-/g, "/")) -
        new Date(app.globalData.tasks[b.id].end_time.replace(/-/g, "/")))
      this.setData({
        filter: this.data.filterState.timedown
      });
    } else {
      this.tasksSort((a, b) => new Date(app.globalData.tasks[b.id].end_time.replace(/-/g, "/")) -
        new Date(app.globalData.tasks[a.id].end_time.replace(/-/g, "/")))
      this.setData({
        filter: this.data.filterState.timeup
      });
    }
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

  /**
   * 页面滚动事件
   */
  lastPos: 0,
  thred: 50,
  topShow: 50,
  hide: false,
  onPageScroll: function(o) {
    let newPos = o.scrollTop;
    let delta = newPos - this.lastPos

    // handle hiding and showing event for filter and add-button during scrolling 
    if (delta > this.thred || delta < -this.thred) {
      this.lastPos = newPos;
      if (!this.hide && newPos > this.topShow && delta > 0) { // hide filter
        this.hide = true;
        console.log('hide filter');
        this.setData({
          filterTop: '-72rpx',
          addBottom: '-110rpx'
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
    this.loadPictures()
  },

  loadPictures: function() {
    const taskIds = this.data.taskIds;
    taskIds.forEach(item => {
      wx.createIntersectionObserver().relativeToViewport().observe(`#task-${item.id}`, (result) => {
        if (result.intersectionRatio > 0)
          item.show = true
      })
    })
    this.setData({
      taskIds
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

  onUploadBtnClick: function() {
    wx.vibrateShort()
    wx.navigateTo({
      url: '/pages/upload_task/upload_task',
    })
  }

})