import { showToast } from '../../utils/wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {}, // 地址数据
    cart: [], // 购物车数据
    allChecked: false, // 全选按钮的状态
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
    const cart = wx.getStorageSync('cart') || []
    this.setData({
      address
    })
    this.updataCart(cart)
  },
  // 点击添加收货地址
  handleChooseAddress () {
    wx.getSetting({
      success: (res) => {
        const scopeAddress = res.authSetting["scope.address"]
        if (scopeAddress == true || scopeAddress == undefined) {
          wx.chooseAddress({
            success: (result) => {
              wx.setStorageSync('address', result)
            }
          })
        } else {
          wx.openSetting({
            success: (res) => {
              wx.chooseAddress({
                success: (result) => {
                  wx.setStorageSync('address', result)
                }
              })
            }
          })
        }
      }
    })
  },
  //修改购物车商品的checkbox的选中和不选择
  handleItemChange (e) {
    const goods_id = e.target.dataset.index
    const cart = wx.getStorageSync('cart') || []
    cart.map(item => {
      if (goods_id == item.goods_id) {
        item.checked = !item.checked
      }
    })
    this.updataCart(cart)
  },
  // 全选和反选
  handleAllChange () {
    let {allChecked, cart} = this.data
    allChecked = !allChecked
    cart.map(item => item.checked = allChecked)
    this.updataCart(cart)
  },
  // 商品数量的加减功能
  handleModifyNum (e) {
    const that = this
    const {index,id} = e.target.dataset
    const {cart} = this.data
    cart.map(item => {
      if (item.goods_id == index) {
        item.num +=(id*1)
        if (item.num == 0) { // 商品数量为1时候还点击-号
          item.num -=(id*1)
          wx.showModal({
            title: '提示',
            content: '您是否要删除？',
            success: function (res) {
              if (res.confirm) {
                let newCart = cart.filter(item => item.goods_id != index)
                that.setData({
                  cart: newCart
                })
                wx.setStorageSync('cart',newCart)
              }
            }
          })
        }
      }
    })
    this.updataCart(cart)
  },
  /**
   * 修改购物车的状态的时候，从新计算总价格，总数量和全选状态
   * 我们只要将修改好的购物车的数据，放到这个函数里面就可以对购物车状态，总价格，总数量和全选按钮进行修改了
   */
  updataCart (cart) {
    const allChecked = cart.length > 0 ? cart.every(item => item.checked) : false // 所有返回为true,结果为true，为空数组也是true
    let totalPrice = 0
    let totalNum = 0
    cart.map(item => {
      if (item.checked) { // 选中的
        totalPrice += item.goods_price * item.num
        totalNum += item.num
      }
    })
    wx.setStorageSync('cart',cart)
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
  },
  // 点击结算按钮
  handlePay () {
    const { address, totalNum } = this.data
    if (!Object.keys(address).length) {
      return showToast({title:'您还未选择收货地址'})
    }
    if (!totalNum) {
      return showToast({title:'您还未选购商品'})
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})