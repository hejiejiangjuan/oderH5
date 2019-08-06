var app = new Vue({
    el: '#detail',
    data: {
        order_no : '',
        order_type : '',
        orderDetail : {}
    },
    created() {
        this.order_no = this.getParamString('order_no');
        this.order_type = this.getParamString('order_type');
        this.getOrderDetail()
    },
    methods: {
        toAppointMent(item) {
            if (item.status == 1 || item.status == 4) {
                window.location.href = 'appointTime.html?order_no='+this.order_no+'&code_id='+item.id+'&code='+item.code
            }
        },
        getOrderDetail () {
            var url = 'http://'+location.host+'/hotel/getOrderDetail';
            var that = this;
            $.ajax({
                url : url,
                data : {
                    'order_no' : that.order_no,
                    'order_type' : that.order_type
                },
                dataType : 'json',
                type : 'POST',
                success : function (res) {
                    console.log(res.datas);
                    if (res.code == 200) {
                    	document.getElementById("appointLimit").innerHTML = res.datas.appoint_limit;
                        that.orderDetail = res.datas;
                    } else {
                        alert(res.message)
                    }
                    
                }
            });
        },
        orderStatus : function (item) {
            var status = '';
            if (0 == item.use_num) {
                status = '待使用';
            } else if (item.com_num == item.use_num) {
                status = '已使用';
            } else {
                status = '使用中';
            }
            return status;
        },
        codeStatus : function (item) {
            var status = '';
            if (item.status == 1) {
                status = '立即预约';
            } else if (item.status == 2) {
                status = '预约中';
            } else if (item.status == 3) {
                status = '预约成功';
            } else {
                status = '重新预约';
            }
            return status;
        },
        codeStatusStyle : function (item) {
            var style = '';
            if (item.status == 1) {
                style = 'appointMentRightNow';
            } else if (item.status == 2) {
                style = 'center-appointMent';
            } else if (item.status == 3) {
                style = 'success';
            } else {
                style = 'appointMentRightNow';
            }
            return style;
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