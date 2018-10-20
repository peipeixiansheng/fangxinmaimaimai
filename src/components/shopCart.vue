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
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 购物车为空时显示 -->
                                <tr v-show="goodList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 购物车不为空时显示 -->
                                <tr v-show="goodList.length!=0" v-for="item in goodList" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected"></el-switch>
                                    </td>
                                    <td>
                                        <img :src="item.img_url" alt="" style="width: 65px;">
                                    </td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <!-- $event是保存原有的数据 -->
                                        <el-input-number v-model="item.buycount" @change="handleChange(item.id,$event)" :min="1" :max="10" label="描述文字"></el-input-number>
                                    </td>
                                    <td>{{item.sell_price*item.buycount}}</td>
                                    <td><button @click="deleteOne(item.id)" type="button" class="el-button el-button--danger is-circle"><i class="el-icon-delete"></i></button></td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectedNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{selectedPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/">
                                <button class="button">继续购物</button>
                            </router-link>
                            <!-- <router-link :to="'/order'+ids"> -->
                            <button @click="subOrder" class="submit">立即结算</button>
                            <!-- </router-link> -->
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "shopCart",
    data: function () {
        return {
            option:true,
            // 购物车商品数据
            goodList: [],
            ids: '',
        };
    },
    created() {
        let ids = "";
        for (const key in this.$store.state.shopCartData) {
            ids += key;
            ids += ",";
        }
        ids = ids.slice(0, -1);
        //   console.log(ids);
        this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(res => {
            this.option=false;
            // console.log(res);
            res.data.message.forEach(v => {
                v.buycount = this.$store.state.shopCartData[v.id];
                // 给加个开关
                v.selected = true;
            });
            this.goodList = res.data.message;
        });
    },
    methods: {
        // 改变数量，同时改变导航栏购物车的数量
        handleChange(id, newcount) {
            //   console.log(id,newcount);
            this.$store.commit("upCartDated", { id, newcount });
        },
        // 删除商品
        deleteOne(id) {
            this.$confirm('商品不多了，你真的要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 删除页码中的数据
                this.goodList.forEach((v, index) => {
                    if (v.id == id) {
                        this.goodList.splice(index, 1);
                    }
                });
                //删除数据
                this.$store.commit('upDelete', id);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        subOrder() {
            
            if (this.goodList.length > 0) {
                this.goodList.forEach(v => {
                    if (v.selected == true) {
                        this.ids += v.id;
                        this.ids += ',';
                    }
                })
                this.ids = this.ids.slice(0, -1);
                // console.log(this.ids);
                if (this.ids.length > 0) {
                    this.$router.push('/order/' + this.ids)
                } else {
                    this.$message.error('请先选中商品哦')
                }

            } else {
                this.$message.error('购物车空空如也！！');

            }
        }
    },
    computed: {
        // 商品购买数量
        selectedNum() {
            let num = 0;
            this.goodList.forEach(v => {
                if (v.selected == true) {
                    num += v.buycount;
                }
            })
            return num
        },
        // 商品购买总价格
        selectedPrice() {
            let priceNum = 0;
            this.goodList.forEach(v => {
                if (v.selected == true) {
                    priceNum += (v.buycount * v.sell_price)
                }
            })
            return priceNum;
        }
    }
};
</script>
<style>
</style>


