var app = new Vue({
  el: '#housetype',
  data: {
    housetype: [],
    order_type: '1',//类型 1酒店 2门票
    order_no: 'csyx11223',
    orderDetail: {},
    confirmName: '确定',
    picked: false,
    str: {}
  },
  created() {
    // 获取房型信息
    this.gethouseTypelist()
    this.getOrderDetail()
  },
  // 获取上个页面的URL参数。
  mounted: function () {
    // this.date = this.getParamString('date');
    // this.order_no = this.getParamString('order_no');
    // this.hotel_id = this.getParamString('hotel_id');
    // this.hotel_name = this.getParamString('hotel_name');
    // this.code = this.getParamString('code');
    // this.code_id = this.getParamString('code_id');
    // this.phone = this.getParamString('phone');
    // this.houset = this.getParamString('houset');
    // this.getOrderDetail();
  },
  methods: {
    // 点击单选按钮
    housetyLock(event) {
      console.log(event);
      for (var i in this.housetype) {
        if (this.housetype[i].number == event) {
          this.str.number = event;
          this.str.name = this.housetype[i].name;
        }
      }
      console.log(this.str)
      this.picked = true;
    },
    // 点击下一步
    okhouster() {

    },
    // 获取房型信息
    gethouseTypelist() {
      //var url = 'http://'+location.host+'/hotel/getRoomTypeList';
      var url = 'http://192.168.2.45:8081/hotel/getRoomTypeList';
      var that = this;
      $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        success: function (res) {
          console.log(res.datas);
          if (res.code == 200) {
            that.housetype = res.datas;
          } else {
            alert(res.message)
          }

        }
      });

    },
    //获取订单信息
    getOrderDetail() {
      var url = 'http://192.168.2.45:8081/hotel/getOrderDetail';
      var that = this;
      $.ajax({
        url: url,
        data: {
          'order_no': that.order_no,
          'order_type': that.order_type
        },
        dataType: 'json',
        type: 'POST',
        success: function (res) {
          console.log(res.datas, 8888)
          if (res.code == 200) {
            that.orderDetail = res.datas;
            document.getElementById("appointLimit").innerHTML = res.datas.appoint_limit;
            var code_list = that.orderDetail.code_list;
            for (var i = 0; i < code_list.length; i++) {
              var s = code_list[i];
              if (that.code == s.code) {
                that.status = s.status;
                that.username = s.username;
                if (that.status == 2) {
                  that.confirmName = '预约中';
                }
              }
            }

          } else {
            alert(res.message)
          }

        }
      });
    },

  }
})