<template>
	<view class="bg">
		<view class="award_info">
			<view class="award_item">
				<image src="/static/flower.png" />
				<text class="award_num">{{ num_flower }}个</text>
			</view>
			<view class="award_item">
				<image src="/static/diamond.png"/>
				<text class="award_num">{{ num_diamond }}个</text>
			</view>
		</view>
		<view class="exchange_list">
			<view class="exchange_item" v-for="(item, index) in rules" :key="item.award_id">
				<view class="name">
					<text>{{ item.award_name }}</text>
				</view>
				<view class="button" @click="exchange(item.award_id)">
					<text>兑换</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				num_flower: 15,
				num_diamond: 1,
				rules:[
					{
						award_id:1,
						award_name:"15个花花兑换1个钻石",
						award_type:"exchange",
						award_exchange_lost_item:"flower",
						award_exchange_lost_number:15,
						award_exchange_gain_item:"diamond",
						award_exchange_gain_number:1
					},
					{
						award_id:2,
						award_name:"1个花花换20元零花钱(可用于水果、购物)",
						award_type:"pay",
						award_pay_item:"flower",
						award_pay_number:1,
					},
					{
						award_id:3,
						award_name:"1个花花换一次投喂",
						award_type:"pay",
						award_pay_item:"flower",
						award_pay_number:1,
					},
					{
						award_id:4,
						award_name:"1个钻石换出门玩一天",
						award_type:"pay",
						award_pay_item:"diamond",
						award_pay_number:1,
					},
					{
						award_id:5,
						award_name:"2个钻石换满足你的一个愿望",
						award_type:"pay",
						award_pay_item:"diamond",
						award_pay_number:2,
					},
					{
						award_id:6,
						award_name:"3个钻石换见面三天",
						award_type:"pay",
						award_pay_item:"diamond",
						award_pay_number:3,
					},
				],
			}
		},
		methods: {
			exchange(){
				console.log("兑换")
			}
		}
	}
</script>

<style lang="scss">
	.bg {
		width: 100%;
		height: 100vh;
		font-size: 16px;
		line-height: 24px;
		background:linear-gradient(to bottom, #98e9ff, #F8F8F8);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.award_info {
		background-color: white;
		width: 600rpx;
		height: 80px;
		margin-top: 50rpx;
		border-radius: 10px;
		display: flex;
		justify-content: space-evenly;
		padding: 20rpx;
		.award_item {
			/* background-color: aqua; */
			height: 80px;
			display: flex;
			flex-direction: row;
			align-items: center;
			.award_num {
				font-size: 20px;
				font-weight: bold;
				margin-left: 20px;
			}
			image{
				width: 50px;
				height: 50px;
			}
		}
	}
	.exchange_list {
		width: 640rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		.exchange_item {
			/* background-color: aqua; */
			background-color: white;
			margin-top: 20rpx;
			border-radius: 10px;
			height: 60px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #f0f0f0;
			.name {
				width: 480rpx;
				margin-left: 30rpx;
			}
			.button {
				// width: 80rpx;
				margin-right: 20rpx;
				border: 1px solid #98e9ff;
				border-radius: 5px;
				padding: 5px;
				font-size: 18px;
			}
		}
	}
</style>
