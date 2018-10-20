<template>
    <div>
        <!-- 正在加载中 -->
        <div tabindex="-1" role="dialog" aria-modal="true" aria-label="dialog" class="el-message-box__wrapper" style="z-index: 2003;" v-if="option">
            <img src="../assets/img/2.gif" alt="">
        </div>
        <div class="v-modal" tabindex="0" style="z-index: 2003;" v-if="option"></div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}} {{orderInfo.address}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <qriously :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+orderId" :size="200" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "payOrder",

    data: function () {
        return {
            option: true,
            // 订单id
            orderId: 0,
            // 订单数据
            orderInfo: {},
            // 支付定时器（发送请求，监听是否支付了）
            payId: 0
        }
    },
    created() {
        // console.log(this.$route);
        this.orderId = this.$route.params.orderid;
        this.$axios.get('site/validate/order/getorder/' + this.orderId).then(res => {
            this.option = false;
            // console.log(res);
            this.orderInfo = res.data.message[0];
        }),
            this.payId = setInterval(() => {
                this.$axios.get('site/validate/order/getorder/' + this.orderId).then(res => {
                    // console.log(res);
                    this.orderInfo = res.data.message[0];
                    // 判断是否支付成功了
                    if (this.orderInfo.status == 2) {
                        // 支付成功了
                        this.$message.success('支付成功了！');
                        this.$router.push('/paySuccess')
                    }
                })
            }, 1000)
    },
    // 操作dom元素
    mounted() {

    },
    // 关闭时
    destroyed() {
        // 关闭定时器
        clearInterval(this.payId);
    }
}

</script>
<style>
</style>


