<template>
    <div>
         <!-- 正在加载中 -->
        <div tabindex="-1" role="dialog" aria-modal="true" aria-label="dialog" class="el-message-box__wrapper" style="z-index: 2003;" v-if="option">
            <img src="../assets/img/1.gif" alt="">
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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="150px" class="demo-ruleForm">
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                    <!-- element-ui表单验证 -->
                                    <el-form-item label="请输入收货人姓名：" prop="accept_name">
                                        <el-input v-model.trim="ruleForm.accept_name" style="width:500px"></el-input>
                                    </el-form-item>
                                    <!-- 省市联动 -->
                                    <el-form-item label="所属区域:" prop="area">
                                        <v-distpicker @selected='areaChange' :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="请输入详细地址：" prop="address">
                                        <el-input v-model.trim="ruleForm.address" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="请输入手机号码：" prop="mobile">
                                        <el-input v-model.trim="ruleForm.mobile" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="请输入邮箱：" prop="email">
                                        <el-input v-model.trim="ruleForm.email" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="请输入邮政编码：" prop="post_code">
                                        <el-input v-model.trim="ruleForm.post_code" style="width:100px"></el-input>
                                    </el-form-item>

                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                        <span class="info"> 费用：0.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio @change="ruleForm.expressMoment=0" v-model="ruleForm.express_id" label="1">圆通</el-radio>
                                        <span class="info"> 费用：0.00元&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <el-radio @change="ruleForm.expressMoment=0" v-model="ruleForm.express_id" label="2">韵达</el-radio>
                                        <span class="info"> 费用：0.00元&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <el-radio @change="ruleForm.expressMoment=20" v-model="ruleForm.express_id" label="3">顺丰</el-radio>
                                        <span class="info"> 费用：20.00元&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="item in goodList" :key="item.id">
                                            <td width="68">
                                                <!-- <a target="_blank" href="/goods/show-89.html"> -->
                                                <router-link :to="'/detail/'+item.id">
                                                    <img :src="item.img_url" class="img">
                                                </router-link>
                                                <!-- </a> -->
                                            </td>
                                            <td>
                                                <router-link :to="'/detail/'+item.id">{{item.title}} </router-link>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price*item.buycount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" v-model="ruleForm.message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">1</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{ruleForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{ruleForm.goodsAmount+ruleForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link class="btn button" to="/shopCart">返回购物车</router-link>
                                            <a id="btnSubmit" @click="payOrder" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

        <audio controls="controls" style="display: none;"></audio>
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
export default {
    components: { VDistpicker },
    name: 'order',
    // 发送请求，判断是否登录了(在main.js导航守卫中)
    // beforeCreate(){
    //     this.$axios.get('site/account/islogin').then(res=>{
    //         // console.log(res);
    //         if(res.data.code=='nologin'){
    //             // 没有登录，打回登录页码
    //             // this.$router.push('/login')
    //         }
    //     })
    // }
    data: function () {
        // 自定义正则（手机号）
        let validateMobile = (rule, value, callback) => {
            let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
            setTimeout(() => {
                if (value == "") {
                    callback(new Error('请输入手机号'));
                } else if (reg.test(value) == false) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            }, 1000);
        }
        // 自定义正则（邮箱）
        let validateEmail = (rule, value, callback) => {
            let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            if (reg.test(value) == false) {
                callback(new Error('请输入正确的邮箱'));
            } else {
                callback();
            }
        }
        // 自定义正则（邮政编码）
        let validatePostCode = (rule, value, callback) => {
            let reg = /^[1-9]\d{5}(?!\d)$/;
            if (reg.test(value) == false) {
                callback(new Error('请输入正确的邮政编码'));
            } else {
                callback();
            }
        }
        return {
            option:true,
            ruleForm: {
                accept_name: '阿良',
                address: '',
                mobile: '18073893395',
                email: '',
                post_code: '',
                // 省市联动
                area: {
                    province: {
                        code: '110105',
                        value: '北京市'
                    },
                    city: {
                        code: '110110',
                        value: '北京城区'
                    },
                    area: {
                        code: '110000',
                        value: '朝阳区'
                    }
                },
                // 支付方式
                payment_id: '6',
                // 配送方式
                express_id: '1',
                // 商品id
                goodsids: '',
                // 购买的商品对象
                cargoodsobj: {},
                // 订单备注信息
                message: '',
                // 商品总额
                goodsAmount: 0,
                // 快递费
                expressMoment: 0,
            },
            goodList: [],
            rules: {
                area: [
                    { required: true }
                ],
                accept_name: [
                    // 规则：required：必填，message：提示信息；trigger：触发时机
                    { required: true, message: '请输入名字', trigger: 'blur' },
                    { min: 2, message: '最少两个字符', trigger: 'blur' },
                ],
                address: [
                    // 规则：required：必填，message：提示信息；trigger：触发时机
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                    { min: 3, message: '最少三个字符', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, validator: validateMobile, trigger: 'change' },
                    { validator: validateMobile, trigger: 'blur' }
                ],
                email: [
                    { validator: validateEmail, trigger: 'blur' }
                ],
                post_code: [
                    { validator: validatePostCode, trigger: 'blur' }
                ],
            }
        }
    },
    created() {
        // console.log(this.$route);
        this.ruleForm.goodsids = this.$route.params.ids;
        // let tmpobj={};
        this.$axios.get(`site/validate/order/getgoodslist/${this.ruleForm.goodsids}`).then(res => {
            // console.log(res)
            res.data.message.forEach(v => {
                v.buycount = this.$store.state.shopCartData[v.id];
                // 购买的商品对象
                this.ruleForm.cargoodsobj[v.id] = v.buycount;
                // 商品总额
                this.ruleForm.goodsAmount += v.sell_price * v.buycount;
            })
            this.goodList = res.data.message;
            this.option=false;
        })
    },
    methods: {
        // 省市联动
        areaChange(data) {
            // console.log(data);
            this.ruleForm.area = data;
        },
        payOrder() {
            let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
            if (this.ruleForm.accept_name.length<2) {
                this.$message.error('请输入姓名');
            } else if (reg.test(this.ruleForm.mobile) == false) {
                if(this.ruleForm.mobile==''){
                    this.$message.error('请输入手机号')
                }else{
                    this.$message.error('请输入正确的手机号')
                }
            } else if (this.ruleForm.address.length < 3) {
                if(this.ruleForm.address.length==0){
                  this.$message.error('请输入详细地址');  
                }else{
                    this.$message.error('请输入正确的地址')
                }
            } else {
                this.$axios.post('site/validate/order/setorder', this.ruleForm).then(res => {
                    // console.log(res);
                    if (res.data.status == 0) {
                        // 订单创建成功
                        this.$message.success("订单创建成功");
                        // 删除购物车里面的数据
                        this.goodList.forEach(v => {
                            this.$store.commit('upDelete', v.id);
                        })
                        // 跳转到订单详情页
                        this.$router.push('/payOrder/' + res.data.message.orderid)
                    } else {
                        this.$message.error('订单创建失败')
                    }
                })
            }
        }
    }
}
</script>
<style>
.info {
  color: #666;
  font-size: 12px;
}
</style>


