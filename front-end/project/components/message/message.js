// components/message/message.js
const app = getApp()

Component({
  /**
   * Component properties
   */
  properties: {
    messageId: {
      type: Number,
      value: -1
    },
  },

  /**
   * Component initial data
   */
  data: {
    title: "",
    content: "",
    isReaded: false
  },

  lifetimes: {
    attached() {
      const message = app.globalData.messages[this.properties.messageId]
      if (message)
        this.setData({
          title: message.title,
          content: message.content,
          isReaded: message.status === 1
        })
    }
  },

  /**
   * Component methods
   */
  methods: {
    click: function () {
      wx.request({
        url: 'http://129.204.29.200:8080/help/readMessage',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {message_id: this.properties.messageId},
        success: res => {
          if (res.data.success) {
            app.globalData.messages[this.properties.messageId].status = 1,
            wx.showToast({
              title: '消息已读',
              duration: 1000,
            })
            this.setData({
              isReaded: true
            })
          }
        },
      })
    }
  }
})
