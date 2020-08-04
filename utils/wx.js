/**
 * 显示消息提示框
 */
export const showToast = ({title,icon}) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: icon || 'none',
            duration: 2000
        })
    })
}