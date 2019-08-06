Vue.component('use-situation',{

})

var vm = new Vue({
    el: '#container',
    data: {
        order_code : '',
        order_type : '1' ,//类型 1酒店 2门票
        order_status : '1',//订单状态（1：全部2：待使用3：使用中4：已使用）
        order_no : '',
        hotel_id : '',
        hotel_name : '',
        houset:'',
        code : '',
        code_id : '',
        date : '',
        orderDetail : {},
        username : '',
        phone : '',
        confirmName : '确定',
        status:'1',
        appointLimit:''
    },
    mounted: function () {
        this.date = this.getParamString('date');
        this.order_no = this.getParamString('order_no');
        this.hotel_id = this.getParamString('hotel_id');
        this.hotel_name = this.getParamString('hotel_name');
        this.code = this.getParamString('code');
        this.code_id = this.getParamString('code_id');
        this.phone = this.getParamString('phone');
        this.houset = this.getParamString('houset');
        this.getOrderDetail();
    },
    methods: {
        comfirm () {
            console.log(document.getElementById('textareatext').value)
            debugger
            // var url = 'http://'+location.host+'/hotel/saveSubscribeInfo';
            var url = 'http://192.168.2.45:8081/hotel/saveSubscribeInfo';
            var that = this;
            if (that.username ==undefined || that.username == '') {
                that.$messagebox('','姓名不能为空');
                return;
            }
            if (that.phone ==undefined || that.phone == '') {
                that.$messagebox('','手机号不能为空');
                return;
            }
            var param = {
                id : that.code_id,
                hotel_id : that.hotel_id,
                hotel_name : that.hotel_name,
                username : that.username,
                phone : that.phone,
                check_date : that.date
            };
            $.ajax({
                url : url,
                data : {
                    'info' : JSON.stringify(param)
                },
                dataType : 'json',
                type : 'POST',
                success : function (res) {
                    if (res.code == 200) {
                        that.confirmName = '预约中';
                        that.$messagebox('','操作成功');
                    } else {
                        that.$messagebox('',res.message);
                    }
                    
                }
            });
        },
        //获取订单信息
        getOrderDetail () {
            // var url = 'http://'+location.host+'/hotel/getOrderDetail';
            var url = 'http://192.168.2.45:8081/hotel/getOrderDetail';
            var that = this;
            $.ajax({
                url : url,
                data : {
                    'order_no' : 'csyx11223',//that.order_no,
                    'order_type' : that.order_type
                },
                dataType : 'json',
                type : 'POST',
                success : function (res) {
                    console.log(res.datas,888)
                    if (res.code == 200) {
                        that.orderDetail = res.datas;
                        document.getElementById("appointLimit").innerHTML = res.datas.appoint_limit;
                        var code_list = that.orderDetail.code_list;
                        for (var i=0;i<code_list.length;i++) {
                            var s = code_list[i];
                            if (that.code==s.code) {
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
        getParamString (key) {
            var paramUrl = window.location.search.substr(1);
				var paramStrs = paramUrl.split('&');
				var params = {};
				for(var index = 0; index < paramStrs.length; index++) {
					params[paramStrs[index].split('=')[0]] = decodeURI(paramStrs[index].split('=')[1]);
				}
				return params[key];
        }
        

    }
})


