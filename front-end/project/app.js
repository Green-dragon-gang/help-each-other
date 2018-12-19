//app.js
App({
  onLaunch: function() {
    // get userinfo
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'])
          this.login()
      },
    });
  },

  login: function() {
    wx.getUserInfo({
      success: res => {
        this.globalData.userInfo = res.userInfo;
        console.log(this.globalData.userInfo);

        // login
        wx.request({
          url: `http://129.204.29.200:8080/help/login`,
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            user_name: res.userInfo.nickName,
            avatar: res.userInfo.avatarUrl
          },
          success: res => {
            if (res.statusCode != 400)
              console.log("Login successfully!");
          }

        });
      }
    })
  },

  refreshTasks: function(callback) {
    wx.request({
      url: 'http://129.204.29.200:8080/help/getTasks',
      method: 'GET',
      dataType: 'json',
      success: res => {
        if (res.data != "()") {
          res.data.forEach(ele => {
            this.globalData.tasks[ele.task_id] = ele
          });
          console.log("Get tasks successfully!", this.globalData.tasks);
        }
        if (callback)
          callback()
      }
    });
  },

  globalData: {
    userInfo: null,
    tasks: {},
  },

})