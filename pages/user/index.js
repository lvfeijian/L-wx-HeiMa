// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 微信扫一扫
  saoma: function () {
    const that = this
    wx.scanCode({
      success: (res) => {
        that.setData({
          show: res.result
        })
        console.log('success',res);
      },
      complete: (res) => {
        console.log('complete',res);
      },
      fail: (res) => {
        console.log('fail',res);
      }
    })
  }
})