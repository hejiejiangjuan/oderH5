

Vue.component('use-situation',{

})

var vm = new Vue({
    el: '#container',
    data: {
        hotelshow: true,
        ticketshow: false,
        navindex: 0,
        tabindex: 0,
        firstshow: true,
        secondshow: false,
        threeshow: false,
        fourshow: false,
        list:[],
        hasButton:true
    },
    created: function () {
        

    },
    methods: {
        nav: function (index) {
            vm.navindex = index;
            switch (index) {
                case 0:
                    vm.hotelshow = true;
                    vm.ticketshow = false;
                    break;
                case 1:
                    vm.hotelshow = false;
                    vm.ticketshow = true;
                    break;
            }

        },
        tab: function (index) {
            vm.tabindex = index;
            switch (index) {
                case 0:
                    vm.firstshow = true;
                    vm.secondshow = false;
                    vm.threeshow = false;
                    vm.fourshow = false;
                    break;
                case 1:
                    vm.firstshow = false;
                    vm.secondshow = true;
                    vm.threeshow = false;
                    vm.fourshow = false;
                    break;
                case 2:
                    vm.firstshow = false;
                    vm.secondshow = false;
                    vm.threeshow = true;
                    vm.fourshow = false;
                    break;
                case 3:
                    vm.firstshow = false;
                    vm.secondshow = false;
                    vm.threeshow = false;
                    vm.fourshow = true;
                    break;
            }

        },
        // 跳转到详情页
        getMoreDetail(event){

            window.location.href = 'detail.html?params='+JSON.stringify(event)
            console.log(event)
        },
    

    }
})


