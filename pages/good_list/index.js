import request from '../../request/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        name: '综合',
        isActive: true
      },
      {
        id: 1,
        name: '销量',
        isActive: false
      },
      {
        id: 2,
        name: '价格',
        isActive: false
      },
    ],
    params:{
      query: '',
      cid: '9',
      pagenum: 1,
      pagesize: 10
    },
    goodsList: [],
    totalPage:1, // 数据总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { params } = this.data
    params.cid = options.cid
    this.setData({
      params
    })
    this.getGoodsList()
  },
  // tabbar点击切换,子组件传递过来的事件
  doSwitchTab (e) {
    let tabs = this.data.tabs
    tabs.map((item,index) => index == e.detail ? item.isActive=true : item.isActive=false )
    this.setData({
      tabs
    })
  },
  async getGoodsList () {
    const resData = await request({url:'goods/search',data:this.data.params})
    const total = resData.data.message.total; // 数据总条数
    this.data.totalPage = Math.ceil(total/this.data.params.pagesize) // 数据总页数
    if (resData.data.meta.status === 200){
      this.setData({
        goodsList:[...this.data.goodsList,...resData.data.message.goods]
      })
      wx.stopPullDownRefresh() // 请求到数据以后关闭下拉刷新
    }
  },
  // 上拉加载更多
  onReachBottom () {
    if (this.data.totalPage<=this.data.params.pagenum) {
      wx.showToast({
        title: '没有数据了',
      })
    } else {
      this.data.params.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.setData({
      goodsList: [],
      "params.pagenum":1
    })
    this.getGoodsList()
  }
})