Page({
  data: {
    page_top_height: 0,
    selectdate: "2023-12-23",
    selectdateTimestamp: 1699833600000,
    list: []
  },
  async onLoad() {
    const app=getApp()
    const height=app.globalData.page_top_height
    console.log(height)
    this.setData({
      page_top_height:height,
    })
    my.hideBackHome();
    my.setNavigationBar({
      backgroundColor: '#FFFFFF', // 想使用frontColor 这个字段必填
      frontColor: '#000000' // 设置文字及状态栏电量、日期等文字颜色
    })
    let now = this.formatDate(new Date().getTime(), false)
    this.setData({
      selectdate: now, // 正式使用
      selectdateTimestamp: new Date(now).getTime() - 28800000
    })
    // const context = await my.cloud.createCloudContext({
    //   env: 'env-00jx4obkh2l9'
    // });
    // await context.init();
    // my.cloudFunction = context;
    // my.setStorageSync({key: '_id', data: '658428204950fd82ff91e8d8'})
  },
  onShow(){
    this.getList()
  },
  formatDate(time, flag){
    let date = new Date(time);
    let YY = date.getFullYear();
    let MM = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1);
    let DD = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
    if(flag) { //flag为true，显示时分秒格式
      var hh = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours());
      var mm = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
      var ss = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
      //返回时间格式： 2020-11-09 13:14:52
      return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
    } else {
      //返回时间格式： 2020-11-09
      return YY + '-' + MM + '-' + DD;
    }
  },
  dateChange(e){
    console.log(e.detail);
    this.setData({
      selectdate: e.detail.value,
      selectdateTimestamp: new Date(e.detail.value).getTime() - 28800000
    })
    this.getList()
  },
  getList(){
    let id = my.getStorageSync({key: '_id'}).data
    console.log("参数", id, this.data.selectdateTimestamp, this.data.selectdateTimestamp + 86399000);
    my.cloudFunction.callFunction({
      name:"getSchedules",
      data: { 
        // userId: "658428204950fd82ff91e8d8",
        // start: 1699833600000,
        // end: 1699833600123 
        userId: id,
        start: this.data.selectdateTimestamp,
        end: this.data.selectdateTimestamp + 86399000 // 第一天23点59分59秒
      },
      success: (res) => {
        console.log('日程', res);
        res.result.data.map(item => { 
          item.time = this.formatDate(item.time, true)
        })
        console.log(res.result.data);
        this.setData({
          list: res.result.data
        })
      },
      fail: function(res) {
        console.log('日程', res);
      }
    })
  },
  addSchedule(){
    my.navigateTo({
      url: "/pages/createtodo/createtodo"
    })
  }
});
