<template>
    <div class="bg-wrap" style="min-height: 765px;">
         <!-- 正在加载中 -->
        <div tabindex="-1" role="dialog" aria-modal="true" aria-label="dialog" class="el-message-box__wrapper" style="z-index: 2003;" v-if="option">
            <img src="../../assets/img/2.gif" alt="">
        </div>
        <div class="v-modal" tabindex="0" style="z-index: 2003;" v-if="option"></div>
        <div class="sub-tit">
            <a href="javascript:void(0)" class="add" @click="$router.back()">
                <i class="iconfont icon-reply"></i>返回</a>
            <ul>
                <li class="selected">
                    <a href="javascript:;">查看订单</a>
                </li>
            </ul>
        </div>
        <div class="order-progress">
            <ul>
                <li class="first active">
                    <div class="progress">下单</div>
                    <div class="info">{{orderinfo.complete_time|addTime('YYYY-MM-DD HH:mm:ss')}}</div>
                </li>
                <li :class="orderinfo.status>=2?'active':''">
                    <div class="progress">已付款</div>
                    <div class="info">{{orderinfo.confirm_time|addTime('YYYY-MM-DD HH:mm:ss')}}</div>
                </li>
                <li :class="orderinfo.status>=3?'active':''">
                    <div class="progress">已经发货</div>
                    <div class="info">{{orderinfo.express_time|addTime('YYYY-MM-DD HH:mm:ss')}}</div>
                </li>
                <li class="last" :class="orderinfo.status==4?'active':''">
                    <div class="progress">已完成</div>
                    <div class="info">{{orderinfo.payment_time|addTime('YYYY-MM-DD HH:mm:ss')}}</div>
                </li>
            </ul>
        </div>
        <div class="form-box accept-box form-box1">
            <dl class="head form-group">
                <dd>
                    订单号：{{orderinfo.order_no}}
                    <router-link v-if="orderinfo.status=='1'" :to="'/payOrder/'+orderinfo.id" class="btn-pay">
                        去付款
                    </router-link>
                    <a v-if="orderinfo.status>=2 && orderinfo.status<4" class="btn-pay" @click="confirm">
                        签收
                    </a>
                    <!---->
                </dd>
            </dl>
            <dl class="form-group">
                <dt>订单状态：</dt>
                <dd>
                    {{orderinfo.statusName}}
                </dd>
            </dl>
            <dl class="form-group">
                <dt>快递单号：</dt>
                <dd>

                </dd>
            </dl>
            <dl class="form-group">
                <dt>支付方式：</dt>
                <dd>{{orderinfo.paymentTitle}}</dd>
            </dl>
        </div>
        <div class="table-wrap">
            <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
                <tbody>
                    <tr>
                        <th align="left">商品信息</th>
                        <th width="60%">名称</th>
                        <th width="10%">单价
                        </th>
                        <th width="10%">数量</th>
                        <th width="10%">金额</th>
                    </tr>
                    <tr v-for="item in goodslist" :key="item.id">
                        <td width="60">
                            <img :src="item.imgurl" class="img">
                        </td>
                        <td align="left">
                            <router-link :to="'/detail/'+item.goods_id">
                                {{item.goods_title}}
                            </router-link>
                        </td>
                        <td align="center">
                            <s>￥{{item.goods_price}}</s>
                            <p class="red">￥{{item.real_price}}</p>
                        </td>
                        <td align="center">{{item.quantity}}</td>
                        <td class="red" align="center">￥{{item.quantity*item.real_price}}</td>
                    </tr>
                    <tr>
                        <td colspan="7" align="right">
                            <p>商品金额：
                                <b class="red">￥{{orderinfo.real_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                                <b class="red">￥{{orderinfo.express_fee}}</b>
                            </p>
                            <p style="font-size: 22px;">应付总金额：
                                <b class="red">￥{{orderinfo.order_amount}}</b>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="form-box accept-box">
            <dl class="head form-group">
                <dd>收货信息</dd>
            </dl>
            <dl class="form-group">
                <dt>顾客姓名：</dt>
                <dd>{{orderinfo.accept_name}}</dd>
            </dl>
            <dl class="form-group">
                <dt>送货地址：</dt>
                <dd>{{orderinfo.area+orderinfo.address}} </dd>
            </dl>
            <dl class="form-group">
                <dt>联系电话：</dt>
                <dd>1{{orderinfo.mobile}} </dd>
            </dl>
            <dl class="form-group">
                <dt>电子邮箱：</dt>
                <dd> {{orderinfo.email}}</dd>
            </dl>
            <dl class="form-group">
                <dt>备注留言：</dt>
                <dd>{{orderinfo.message}}</dd>
            </dl>
        </div>
    </div>
</template>
<script>
export default {
    name: 'orderDetail',
    data() {
        return {
            option:true,
            // 订单id
            orderid: '',
            // 商品列表
            goodslist: [],
            // 订单状态
            orderinfo: {}
        }
    },
    created() {
        // 获取id
        this.orderid = this.$route.params.orderid;
        this.send();
    },
    methods: {
        send() {
            this.$axios.get("site/validate/order/getorderdetial/" + this.orderid).then(res => {
                this.option=false;
                // console.log(res);
                this.goodslist = res.data.message.goodslist;
                this.orderinfo = res.data.message.orderinfo;
            })
        },
        confirm() {
            this.$axios.get('site/validate/order/complate/' + this.orderid).then(res => {
                // console.log(res);
                if (res.data.status == 0) {
                    this.$message.success('签收成功');
                    this.send();
                }else{
                    this.$message.success('服务器繁忙，请稍后再试！')
                }
            })
        }
    }
}
</script>
<style>
.sub-tit {
  height: auto;
}
.red {
  color: red;
}
</style>


