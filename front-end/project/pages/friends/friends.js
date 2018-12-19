// pages/friends/friends.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    friends: [{
      name: "TestName",
      avatarUrl: '/img/test/t1.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.refreshFollows()
  },

  onDeleteClick: function(e) {
    const name = e.target.id
    wx.vibrateShort()
    const that = this
    wx.showActionSheet({
      itemList: ['取消关注'],
      itemColor: '#E22D2D',
      success: function(res) {
        console.log(res.tapIndex)
        wx.vibrateShort()

        wx.request({
          url: `http://129.204.29.200:8080/help/unfollow`,
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            user_name: app.globalData.userInfo.nickName,
            follow_name: name
          },
          success: res => {
            wx.showToast({
              icon: res.data.success == "true" ? 'success' : 'none',
              title: res.data.success == "true" ? '取消关注成功' : '取消关注失败',
              duration: 1000,
            })
            that.refreshFollows()
          }
        })
      },
    })
  },

  // refresh follows from host, fetch avatar urls, and put them into data
  refreshFollows: function() {
    if (app.globalData.userInfo) {
      const nickName = app.globalData.userInfo.nickName
      wx.request({
        url: `http://129.204.29.200:8080/help/getFriends/${nickName}`,
        method: "GET",
        success: res => {
          this.setData({
            friends: []
          })
          if (res.data != '()')
            res.data.forEach(item => {
              const name = item.follow_name
              wx.request({
                url: `http://129.204.29.200:8080/help/getAvatar/${name}`,
                method: "GET",
                success: res => {
                  let friends = this.data.friends
                  friends.push({
                    name: name,
                    avatarUrl: res.data.avatar
                  })
                  this.setData({
                    friends
                  })
                }
              })
            })
        }
      });
    }
  },

})