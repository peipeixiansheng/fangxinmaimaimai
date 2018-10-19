<template>
    <div class="center">
            <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="goodsinfo routeanimate">
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
                                        <div class="msg-tips">
                                            <div class="icon">
                                                <i class="iconfont icon-check"></i>
                                            </div>
                                            <div class="info">
                                                <strong>订单已支付成功！<span>还有 <i class="timeTo">{{timeTo}}s</i> 跳转到首页</span></strong>
                                                <p>您可以点击这里进入
                                                    <router-link to="/userInfo">会员中心</router-link>查看订单状态！</p>
                                                <p>如有其它问题，请立即与我们客服人员联系。</p>
                                            </div>
                                        </div>
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
    name:'paySuccess',
    data(){
        return {
            // 倒计时
            timeTo:5,
            timeId:0
        }
    },
    created(){
        this.timeId=setInterval(()=>{
            this.timeTo--;
            if(this.timeTo==0){
                this.$router.push('/')
            }
            // console.log(111); 
        },1000)
    },
    destroyed(){
        clearInterval(this.timeId);
    }
}
</script>
<style>
    .timeTo{
        font-size: 20px;
        font-weight: 700;
        color: red;
    }
</style>


