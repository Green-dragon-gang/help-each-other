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

              const url = `http://129.204.29.200:8080/help/login/${this.globalData.userInfo.nickName}/${this.globalData.userInfo.avatarUrl}`
              console.log(url);

              // login
              wx.request({
                url: url,
                method: "GET",
                success: res => {
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

    wx.request({
      url: 'http://129.204.29.200:8080/help/getTasks',
      method: 'GET',
      success: function(res) {
        console.log
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