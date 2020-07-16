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
      cid: '5',
      pagenum: 1,
      pagesize: 10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.params.cid = options.cid
    // this.setData({
    //   params
    // })
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
    const resData = await request({url:'goods/search/',data:{query:'',cid:'5',pagenum:1,pagesize:10}})
    console.log(resData);
  }
})