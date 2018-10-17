<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box" v-if="images.normal_size.length!=0">
                                <ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyNum" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addCart" ref="fiyByCart" class="add">加入购物车</button>

                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- iview吸顶（图钉） -->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click="selectIndex=0" href="javascript:;" :class="{selected:selectIndex==0}">商品介绍</a>

                                        </li>
                                        <li>
                                            <a @click='selectIndex=1' href="javascript:;" :class="{selected:selectIndex==1}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-show="selectIndex==0" v-html="goodsinfo.content">
                                内容
                            </div>
                            <div class="tab-content" v-show="selectIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " v-model.trim="comment" @keyup.13="getComment" datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="getComment" id="btnSubmit" name="submit" type="submit" class="submit" value="提交评论">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="pageSize==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | addTime("YYYY年MM月DD日 HH:mm:ss")}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <!-- element-ui分页 -->
                                            <!-- <el-pagination
                                                @size-change="handleSizeChange"
                                                @current-change="handleCurrentChange"
                                                :current-page="pageIndex"
                                                :page-sizes="[2, 4, 6, 8]"
                                                :page-size="pageSize"
                                                layout="total, sizes, prev, pager, next, jumper"
                                                :total="pageSizes">
                                            </el-pagination> -->

                                            <!-- iview-ui分页 -->
                                            <Page @on-change='pageChange' @on-page-size-change="currentChange" :current='pageIndex' :show-total="true" :total="pageSizes" placement='top' :page-size-opts="[10,20,30]" :page-size="pageSize" show-elevator show-sizer />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                                <!-- </a> -->
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class="">                                                                                                                         -->
                                            <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <!-- </a> -->
                                            <span>{{item.add_time | addTime("YYYY年MM月DD日")}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <el-table v-loading="loading" :data="tableData" style="width: 100%"> -->
        <!--iview返回顶部 -->
        <BackTop :height="100" :bottom="50">
            <div class="top">返回顶端</div>
        </BackTop>
        <!-- 加入购物车时飞的图片 -->
        <img class="fiy-img" ref="fiyImg" :src="imglist.length==0?'':imglist[0].original_path" alt="">
    </div>
</template>
<script>
import $ from 'jquery';
export default {
    name: "detail",
    data: function () {
        return {
            ID: "",
            goodsinfo: {},
            hotgoodslist: [],
            imglist: [],
            buyNum: 1,
            //   商品介绍跟评论切换
            selectIndex: 0,
            // 评论当前页显示的条数
            pageSize: 10,
            // 评论总共条数
            pageSizes: 0,
            // 当前页码
            pageIndex: 1,
            // 评论的内容
            comments: [],
            // 提交评论的内容
            comment: '',
            // 放大镜
            images: {
                normal_size: [],
            },
            zoomerOptions: {
                zoomFactor: 4,
                pane: 'container-round',
                hoverDelay: 300,
                namespace: 'inline-zoomer',
                move_by_click: true,
                scroll_items: 5,
                choosed_thumb_border_color: "#bbdefb"
            }
        }
    },
    methods: {
        // 根据商品id来获取数据
        goodsIdDetail() {
            // 每次发请求之前把images.normal_size清空
            this.images.normal_size = [];
            // 每次开始的时候显示商品介绍
            this.selectIndex = 0;
            this.$axios.get("/site/goods/getgoodsinfo/" + this.ID).then(res => {
                // console.log(res);
                this.goodsinfo = res.data.message.goodsinfo;
                this.hotgoodslist = res.data.message.hotgoodslist;
                this.imglist = res.data.message.imglist;
                // 声明一个变量来存储图片路径跟图片id
                let tmpNormal_size = [];
                this.imglist.forEach(v => {
                    tmpNormal_size.push({
                        id: v.id,
                        url: v.thumb_path
                    })
                });
                // 把图片数字赋值给this.images.normal_size
                this.images.normal_size = tmpNormal_size;
            });
        },
        // 发送请求，请求评论数据
        getComments() {
            this.$axios.get(`site/comment/getbypage/goods/${this.ID}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res => {
                this.comments = res.data.message;
                this.pageSize = res.data.pageSize;
                this.pageSizes = res.data.totalcount;
                this.pageIndex = res.data.pageIndex;
            })
        },
        //  element-ui的
        //  每页条数改变的回调
        // handleSizeChange(val){
        //     // console.log(val);component
        //     this.pageSize=val;
        //     this.pageIndex=1;
        //     this.getComments();       
        // },
        // // 页码改变时的回调
        // handleCurrentChange(val){
        //     this.pageIndex=val;
        //     this.getComments();
        // }

        // iview-ui的
        // 页码改变的回调
        pageChange(val) {
            this.pageIndex = val;
            this.getComments();
        },
        // 每页数量改变的回调
        currentChange(val) {
            this.pageSize = val;
            this.getComments();
        },
        // 提交评论
        getComment() {
            if (this.comment != '') {
                this.$axios.post('site/validate/comment/post/goods/' + this.ID,
                    { commenttxt: this.comment }).then(() => {
                        //  console.log(res)
                        this.pageIndex = 1;
                        this.getComments();
                        this.comment = '';
                        this.$Message.success('评论成功');
                    })
            } else {
                this.$Message.warning('亲爱的，写点什么吧！');
            }
        },
        // 加入购物车
        addCart() {
            // 加入购物车按钮的位置
            let startPos = $(this.$refs.fiyByCart).offset();
            // console.log(startPos);
            // 父组件App.vue里面的购物车（数量）的位置
            let byCart = $(this.$parent.$refs.byCart).offset();
            // console.log(byCart);
            // console.log($(this.$refs.fiyImg));
            $(this.$refs.fiyImg).stop().showgit().addClass('animate').css(startPos).animate({ left: byCart.left, top: byCart.top }, 1000, () => {
                $(this.$refs.fiyImg).hide().removeClass('animate');
                this.$store.commit('addCart', {
                    // 商品id
                    id: this.ID,
                    // 商品数量
                    shopNum: this.buyNum
                });
            })
        }

    },
    created() {
        //   获取地址栏参数
        this.ID = this.$route.params.ID;
        this.goodsIdDetail();
        this.getComments();
    },
    //   观察路由数据改变
    watch: {        '$route'(to) {
            //   console.log(to);
            this.ID = to.params.ID;
            this.goodsIdDetail();
            this.getComments();
            this.buyNum = 1;
        }
    }
};
</script>
<style>
.tab-content.entry img {
  display: block;
}
/* 约束放大镜父盒子的高度 */
.pic-box {
  width: 300px;
  /* height: 320px; */
}
.thumb-list .responsive-image {
  width: 50px;
}
.control {
  position: relative;
}
.control .fa-chevron-right {
  position: absolute;
  right: 0;
}
/*返回顶部样式*/
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
/*
加入购物车飞的图片样式
*/
.fiy-img {
  position: absolute;
  width: 50px;
  height: 50px;
  display: none;
}
.fiy-img.animate {
  opacity: 0;
  transform: rotate(3600deg) scale(0.4, 0.4);
   transition: transform 1s, opacity 2s;
}
</style>


