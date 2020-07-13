import request from '../../request/network.js'
Page({
  data: {
    swiperList: [], // 轮播图数据
    cateList: [], // 导航分类的数据
    floorData: [], // 楼层数据
  },
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorData()
  },
  // 获取轮播图数据
  getSwiperList () {
    request({
      url: 'home/swiperdata'
    }).then(result => {
      const resData = result.data
      this.setData({
        swiperList: resData.message
      })
    })
  },
  // 获取导航数据
  getCateList () {
    request({
      url: 'home/catitems'
    }).then(result => {
      const resData = result.data
      this.setData({
        cateList: resData.message
      })
    })
  },
  // 获取楼层数据
  getFloorData () {
    request({
      url: 'home/floordata'
    }).then(result => {
      const resData = result.data
      this.setData({
        floorData: resData.message
      })
    })
  }
})