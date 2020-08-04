import { showToast } from '../../utils/wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {}, // 地址数据
    cart: [], // 购物车数据
    totalPrice: 0, // 总价格
    totalNum: 0, // 总数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow: function () {
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter(item => item.checked)
    let totalPrice = 0
    let totalNum = 0
    cart.map(item => {
      totalPrice += item.goods_price * item.num
      totalNum += item.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  }
})