<template>
	<view class="bg">
		<view class="calen">
			<zeng-calen  :actDay="actDay" :chooseDay="chooseDay" @onDayClick='onDayClick' headerBar="false"></zeng-calen>
		</view>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                actDay: [], //用户选择的日期
                chooseDay: ["2024-09-13", "2024-09-15", "2024-09-16", "2024-09-05"], //已被投标的数据
            }
        },
        onLoad() {

        },
        methods: {
            // 展开日历
            onDayClick(data) {
                let choose = data.date //用户点中的数据
                if (this.actDay.includes(choose)) { //如果用户点击的日期已经存在
                    // 移除元素下标
                    const index = this.actDay.indexOf(choose);
                    //删除用户点击的日期
                    this.actDay.splice(index, 1)
                } else if (this.chooseDay.includes(choose)) { //判断是否已经被投标
                    uni.showToast({
                        title: "这个日期已经被投标了",
                        icon: "none"
                    })
                } else {
                    //添加用户点击的日期
                    this.actDay.push(choose)
                }
            },
        }
    }
</script>

<style >
	.bg {
		width: 100%;
		height: 100vh;
		font-size: 14px;
		line-height: 24px;
		padding: 10px;
		background:linear-gradient(to bottom, #98e9ff, #F8F8F8);
		display: flex;
	}
	.calen {
		width: calc(100% - 20px);
	}
</style>
