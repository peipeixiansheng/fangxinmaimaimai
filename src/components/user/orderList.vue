<template>
    <div class="bg-wrap" style="min-height: 765px;">
        <div class="sub-tit">
            <ul>
                <li class="selected">
                    <a href="/user/order-list.html">交易订单</a>
                </li>
            </ul>
        </div>
        <div class="table-wrap">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                <tbody>
                    <tr>
                        <th width="16%" align="left">订单号</th>
                        <th width="10%">姓名</th>
                        <th width="12%">订单金额</th>
                        <th width="11%">下单时间</th>
                        <th width="10%">状态</th>
                        <th width="12%">操作</th>
                    </tr>
                    <tr v-for="item in pageData" :key="item.id">
                        <td>{{item.order_no}}</td>
                        <td align="left">{{item.accept_name}}</td>
                        <td align="left">
                            <strong style="color: red;">￥{{item.payable_amount}}</strong>
                            <br> {{item.paymentTitle}}
                        </td>
                        <td align="left">{{item.complete | addTime('YYYY-MM-DD HH:mm:ss')}}</td>
                        <td align="left">
                            {{item.statusName}}
                        </td>
                        <td align="left">
                            <router-link :to="'/userInfo/orderDetail/'+item.id">
                                查看订单
                            </router-link>
                            <br>
                            <router-link :to="'/payOrder/'+item.id" v-if="item.status<2">
                                |去付款
                            </router-link>
                            <!-- 取消没接口 -->
                            <!-- <br>
                            <a href="javascript:void(0)">|取消</a>
                            <br> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="page-foot">
                <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'orderList',
    data() {
        return {
            // 页码数
            pageIndex: 1,
            // 页容量
            pageSize: 10,
            // 当页数据
            pageData: [],
            // 总条目数
            total: 0
        }
    },
    created() {
        this.pageSizeData();
    },
    methods: {
        // 发送请求请求数据
        pageSizeData() {
            this.$axios.get(`site/validate/order/userorderlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res => {
                // console.log(res);
                this.pageData = res.data.message;
                this.total = res.data.totalcount;
            })
        },
        // 改变页容量时；
        sizeChange(value) {
            // console.log(value);
            this.pageSize = value;
            this.pageSizeData();
        },
        // 改变页码时
        currentChange(value) {
            this.pageIndex = value;
            this.pageSizeData();
        }
    }
}
</script>
<style>
</style>


