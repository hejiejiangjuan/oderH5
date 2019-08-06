

Vue.component('use-situation',{

})

var vm = new Vue({
    el: '#container',
    data: {
        hotelshow: true,
        ticketshow: false,
        navindex: 1,
        tabindex: 0,
        list:[],
        hasButton:true,
        order_code : '',
        order_type : '1' ,//类型 1酒店 2门票
        order_status : '1',//订单状态（1：全部2：待使用3：使用中4：已使用）
    },
    created: function () {
        this.order_code = this.getParamString('code');
        this.getOrderList();

    },
    methods: {
        //获取订单信息
        getOrderList () {
            var url = 'http://'+location.host+'/hotel/getOrderList';
            var that = this;
            $.ajax({
                url : url,
                data : {
                    'order_code' : that.order_code,
                    'order_type' : that.order_type,
                    'order_status' : that.order_status
                },
                dataType : 'json',
                type : 'POST',
                success : function (res) {
                    if (res.code == 200) {
                        that.list = res.datas;
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
        nav: function (index) {
            vm.navindex = index;
            this.order_type = index;
            this.getOrderList()
        },
        //切换标签
        tab: function (index) {
            vm.order_status = index;
            this.getOrderList();
        },
        // 跳转到详情页
        getMoreDetail(event){

            console.log(event)
            window.location.href = 'detail.html?order_no='+ event.order_no + '&order_type='+this.order_type
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


