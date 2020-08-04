import request from '../../request/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },

  // 根据id获取商品详情的数据
  async getGoodsDetail (id) {
    const resData = await request({
      url:'goods/detail',
      data:{goods_id:id}
    })
    if(resData.data.meta.status) {
      this.setData({
        goodsDetail: resData.data.message
      })
    }
  },

  handleImg (e) {
    const res = this.data.goodsDetail.pics.map(item => item.pics_big)
    const currentImg = e.currentTarget.dataset.index
    wx.previewImage({
      current: res[currentImg],
      urls: res,
    })
  },
  // 加入购物车
  handleCartAdd () {
    let cart = wx.getStorageSync("cart") || []
    let index = cart.findIndex(v => {
      return v.goods_id == this.data.goodsDetail.goods_id
    })
    if (index == -1) {
      this.data.goodsDetail.num = 1
      this.data.goodsDetail.checked = false
      cart.push(this.data.goodsDetail)
    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({ // 弹框
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  }
})