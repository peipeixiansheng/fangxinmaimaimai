<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="it in item.subcates" :key="it.id">
                                                {{it.title}}
                                                &nbsp;
                                            </span>
                                            <!-- <span>
                                                摄影摄像&nbsp;
                                            </span>
                                            <span>
                                                存储设备&nbsp;
                                            </span> -->
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="it in item.subcates" :key="it.id">{{it.title}}</a>
                                                <!-- <a href="/goods/43.html">摄影摄像</a>
                                                <a href="/goods/43.html">存储设备</a> -->
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <el-carousel height="341px">
                                    <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                        <!-- <a href="#"> -->
                                        <router-link :to="'/detail/'+item.id">
                                            <img :src="item.img_url" alt="item.title" style="height:100%">
                                        </router-link>
                                        <!-- </a> -->
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <router-link :to="'/detail/'+item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a>{{item.title}}</a>
                                    <span>{{item.add_time|addTime("YYYY年MM月DD日")}}</span>
                                </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in orderlist" :key="item.catetitle">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="it in item.level2catelist" :key="it.subcateid" href="/goods/43.html">{{it.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="it in item.datas" :key="it.artID">
                            <!-- <a href="'detail.vue/'+it.artID" class="" > -->
                            <router-link :to="'/detail/'+it.artID">
                                <div class="img-box">
                                    <img v-lazy="it.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{it.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{it.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{it.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{it.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                            <!-- </a> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 时间转换
// import moment from 'moment';
// import moment from 'moment';
export default {
    name: 'index',
    data: function () {
        return {
            catelist: [],
            sliderlist: [],
            toplist: [],
            orderlist: []
        }
    },
    // 生命周期函数，在vue创建完毕之后，在这里才能访问到vue组件中的内容，Ajax请求
    created() {
        this.$axios.get('/site/goods/gettopdata/goods').then(response => {
            this.catelist = response.data.message.catelist;
            this.sliderlist = response.data.message.sliderlist;
            this.toplist = response.data.message.toplist
        });
        this.$axios.get('/site/goods/getgoodsgroup').then(res => {
            // console.log(res);
            this.orderlist = res.data.message;
        })
    },
    // 局部过滤器（迁移到全局中去）
    // filters:{
    //     addTime:(value)=>{
    //         // console.log(value);
    //         return moment(value).format("YYYY年MM月DD日");
    //     }
    // }
}
</script>
<style>
.el-carousel__indicator .el-carousel__button {
  background-color: #00f;
  opacity: 0.3;
}
</style>
