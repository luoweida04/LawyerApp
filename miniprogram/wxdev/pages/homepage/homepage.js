// pages/homepage/homepage.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    page_top_height:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // const systemInfo = wx.getSystemInfoSync(); // 获取设备信息
    // const statusHeight = systemInfo.statusBarHeight // 状态栏高度
    const app=getApp()
    const height=app.globalData.page_top_height
    this.setData({
      page_top_height:height
    })
  },


  check_task_detail(){
    console.log("查看任务详细")
  },

  recent_message(){
    console.log("最近消息")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})