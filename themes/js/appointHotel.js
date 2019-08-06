var app = new Vue({
  el: '#container',
  data: {
    options: [],
    value: '',
    order_no: '',
    code_id: '',
    code: '',
    hotel_id: '',
    data: {},
  },
  created() {
    this.mer_id = this.getParamString('mer_id');
    this.hotel_id = this.getParamString('hotel_id');
    this.getHotelList()
  },
  watch : {
    value : function (val, oldVal) {
      this.value = val;
      this.hotel_id = this.value;
      this.getCalendarDetail();
    }
  },
  methods: {
    getHotelList() {
      var url = 'http://' + location.host + '/hotel/getHotelListByHotelidOrMerId';
      var that = this;
      $.ajax({
        url: url,
        data: {
          'mer_id': that.mer_id,
          'hotel_id': that.hotel_id
        },
        dataType: 'json',
        type: 'POST',
        success: function (res) {
          if (res.code == 200) {
            that.options = res.datas;
            if (that.options != undefined && that.options.length > 0) {
              that.value = that.options[0].id;
              that.hotel_id = that.options[0].id;
            }
            //that.getCalendarDetail();
          } else {
            //alert(res.message)
          }

        }
      });
    },
    //获取酒店日历
    getCalendarDetail() {
      var url = 'http://' + location.host + '/hotel/getCalendarDetailByHotelId';
      var that = this;
      $.ajax({
        url: url,
        data: {
          'hotel_id': that.hotel_id
        },
        dataType: 'json',
        type: 'POST',
        success: function (res) {
          if (res.code == 200) {
        	document.getElementById("appointLimit").innerHTML = res.datas.appoint_limit;
            that.data = res.datas;
            that.createDatePick();
          } else {
            //alert(res.message)
          }

        }
      });
    },
    createDatePick() {
      $('.dropkick').dropkick();
      // 生成模拟数据
      //  var MOCK_DATA = createMockData();
      var that = this;
      var MOCK_DATA = that.data.dateList;


      // 日历设置表单字段配置
      // key 字段名
      // name 表单label
      // value 默认值
      // placeholder input[placeholder]
      var calendarConfig = [

        {
          key: 'price',
          name: '分销售价',
          type: 'text',
          placeholder: '请输入'
        }

      ]

      // 日历中显示配置
      var showConfig = [
        {
          key: 'price',
          name: '价格'
        },
        {
          key: 'add_price',
          name: '加价'
        },
        {
          key: 'room_num',
          name: '间'
        },
        {
          key: 'disable',
          name: '不可用'
        }

      ]


      // 样式颜色配置
      var styleConfig = {
        // 头部背景色
        headerBgColor: '#fff',
        // 头部文字颜色
        headerTextColor: '#31233b',
        // 周一至周日背景色，及文字颜色
        weekBgColor: '#07c1ab',
        weekTextColor: '#fff',
        // 周末背景色，及文字颜色
        weekendBgColor: '#098cc2',
        weekendTextColor: '#fff',
        // 有效日期颜色
        validDateTextColor: '#333',
        validDateBgColor: '#fff',
        validDateBorderColor: '#eee',
        // Hover
        validDateHoverBgColor: '#07c1ab',
        validDateHoverTextColor: '#fff',
        // 无效日期颜色
        invalidDateTextColor: '#ccc',
        invalidDateBgColor: '#fff',
        invalidDateBorderColor: '#eee',
        // 底部背景颜色
        footerBgColor: '#fff',
        // 重置按钮颜色
        resetBtnBgColor: '#77c351',
        resetBtnTextColor: '#fff',
        resetBtnHoverBgColor: '#55b526',
        resetBtnHoverTextColor: '#fff',
        // 确定按钮
        confirmBtnBgColor: '#098cc2',
        confirmBtnTextColor: '#fff',
        confirmBtnHoverBgColor: '#00649a',
        confirmBtnHoverTextColor: '#fff',
        // 取消按钮
        cancelBtnBgColor: '#fff',
        cancelBtnBorderColor: '#bbb',
        cancelBtnTextColor: '#999',
        cancelBtnHoverBgColor: '#fff',
        cancelBtnHoverBorderColor: '#bbb',
        cancelBtnHoverTextColor: '#666'
      }

      // 初始化日历
      var zxCalendar = $.CalendarPrice({
        el: '.container',
        startDate: that.data.start_date,
        endDate: that.data.end_date,
        data: MOCK_DATA,
        // 配置需要设置的字段名称
        config: calendarConfig,
        // 配置在日历中要显示的字段
        show: showConfig,
        // 自定义颜色
        style: styleConfig,
        hideFooterButton: true
      });

      log(zxCalendar)

      // 监听设置表单提交
      // 将阻止默认流程执行
      // 继续执行默认流程，请执行参数next()
      zxCalendar.$on('submit-form', function (data, next) {
        // data 设置的数据

        // 此处可以验证表单
        // 验证表单逻辑....
        // ....

        // 继续执行下一步
        next()
      })

      // 执行过程中错误回调
      zxCalendar.$on('error', function (err) {
        // 执行中的错误提示
        console.error('$on(error)Error:')
        console.log(err)
        //alert(err.msg);
      })

      // 切换月份
      zxCalendar.$on('month-change', function (data) {
        log('$on(month-change) 数据：');
        log(data);
      })

      // 点击有效的某一天通知
      zxCalendar.$on('valid-day', function (day, data, next) {
        log('$on(valid-day)当前点击的(有效)日期为: ' + day + ', 数据：');
        log(data);
        if (data.disable ==0 ||data.room_num == 0) {
          return;
        }
        var hotel_name = '';
        for (var i=0;i<that.options.length;i++) {
          var oid = that.options[i].id;
          if (oid == that.hotel_id) {
            hotel_name = that.options[i].hotelName
          }
        }
        return;
        location.href = 'confirmOrder.html?date='+day+"&order_no="+that.order_no+"&order_type=1&hotel_id="+that.hotel_id+"&hotel_name="+hotel_name+
        "&code="+that.code + "&code_id="+that.code_id+"&phone="+that.data.userphone;
        // 继续执行默认流程
        //next();
      })

      // 设置数据变化
      zxCalendar.$on('setup-value-change', function (data) {
        log('$on(setup-value-change)设置窗口被修改数据....');
        log(data);
        // 取消设置
        // 这里可以触发关闭设置窗口
      })

      // 点击重置按钮回调
      zxCalendar.$on('reset', function () {
        log('$on(reset)数据重置成功！');
      })

      // 点击确定按钮回调，返回当前设置数据
      zxCalendar.$on('confirm', function (data) {
        log('$on(confirm)点击确定按钮通知！');
        log(data);
      })

      // 点击取消按钮回调
      zxCalendar.$on('cancel', function () {
        log('$on(cancel)取消设置 ....');
        // 取消设置
        // 这里可以触发关闭设置窗口
      })
    },
    getParamString(key) {
      var paramUrl = window.location.search.substr(1);
      var paramStrs = paramUrl.split('&');
      var params = {};
      for (var index = 0; index < paramStrs.length; index++) {
        params[paramStrs[index].split('=')[0]] = decodeURI(paramStrs[index].split('=')[1]);
      }
      return params[key];
    }
  }
})