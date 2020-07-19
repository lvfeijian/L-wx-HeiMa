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
  }
})