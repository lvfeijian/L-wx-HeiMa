import request from '../../request/network'
let resData = [] // 请求的得到的数据
let cates = [] // 缓存数据
Page({
  data: {
    category: [], // 商品分类左侧数据
    category_right: [], // 商品分类右侧数据
    currentIndex: 0,
    scrollTop: 0, // 滚动的距离
  },
  onLoad: function (options) {
    cates = wx.getStorageSync('cates')
    if (!cates) {
      this.getShopCategory()
    } else {
      // 有旧数据
      if(Date.now() - cates.time > 1000*60*5) {  // 如果缓存时间大于5分钟，我们就从新请求数据，否则就使用缓存的数据
        this.getShopCategory()
      } else {
        resData = cates.data
        let left = resData.map(item => item.cat_name)
        let right = resData[0].children
        this.setData({
          category: left,
          category_right: right
        })
      }
    }
  },
  async getShopCategory () {
    const result = await request({url:'categories'})
      resData = result.data.message
      wx.setStorageSync('cates', {time: Date.now(),data: resData})
      let left = resData.map(item => item.cat_name)
      let right = resData[0].children
      this.setData({
        category: left,
        category_right: right
      })
  },
  // 点击左侧的切换菜单
  switchCategory (e) {
    const id = e.currentTarget.id
    let right = resData[id].children
    this.setData({
      currentIndex: id,
      category_right: right,
      scrollTop: 0
    })
  }
})