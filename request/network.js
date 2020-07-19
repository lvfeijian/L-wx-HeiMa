import { baseUrl } from './config.js'
let count = 0

export default function(options){
    count++
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    return new Promise((resolve,reject) => {
        wx.request({
            url: baseUrl+options.url,
            data: options.data || {},
            method: options.method || 'GET',
            success: resolve,
            fail:reject,
            complete:() => {
                count--
                if (count == 0) {
                    wx.hideLoading()
                }
            }
        });
    })
}