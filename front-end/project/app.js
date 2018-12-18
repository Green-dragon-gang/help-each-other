//app.js
App({
  onLaunch: function() {
    // get userinfo
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
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
            },
            fail: res => {
              console.log('Login failed!');
            }
          })
        }
      },
    });

    // get tasks
    wx.request({
      url: 'http://129.204.29.200:8080/help/getTasks',
      method: 'GET',
      success: function(res) {
        console.log(res.data);
        // let data = JSON.parse(res.data.replace(/'/g, "\"")); // ok => res.data
        // console.log(data);
      }
    });
  },
  globalData: {
    userInfo: null,
    tasks: null
  },

})