<template>
	<view class="bg">
		<view class="award_info">
			<view class="award_item">
				<image src="/static/flower.png" />
				<text class="award_num">{{ num_flower }}个</text>
			</view>
			<view class="award_item">
				<image src="/static/diamond.png" />
				<text class="award_num">{{ num_diamond }}个</text>
			</view>
		</view>
		<view  class="exchange_list">
			<unicloud-db v-slot:default="{data, loading, error, options}" collection="exchange_list" orderby="exchange_id asc">
				<view v-if="error">{{error.message}}</view>
				<view v-else-if="loading">正在拉取奖励信息...</view>
				<view v-else class="exchange_item" v-for="(item, index) in data" :key="item.exchange_id">
					<view class="name">
						<text>{{ item.exchange_description }}</text>
					</view>
					<view class="button" @click="exchange(data,item.exchange_id)">
						<text>兑换</text>
					</view>
				</view>
			</unicloud-db>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			num_flower: 15,
			num_diamond: 1,
		// 	exchange_list: [
		// 	{
		// 		exchange_id: 0,
		// 		exchange_description: "15个花花换1个钻石",
		// 		exchange_works: [{
		// 			object: "flower",
		// 			num: -15
		// 		},
		// 		{
		// 			object: "diamond",
		// 			num: 1
		// 		}]
		// 	},
		// 	{
		// 		exchange_id: 1,
		// 		exchange_description: "1个钻石换15个花花",
		// 		exchange_works: [
		// 		{
		// 			object: "diamond",
		// 			num: -1
		// 		},
		// 		{
		// 			object: "flower",
		// 			num: 15
		// 		}]
		// 	},
		// 	{
		// 		exchange_id: 2,
		// 		exchange_description: "1个花花换1次投喂",
		// 		exchange_works: [{
		// 			object: "flower",
		// 			num: -1
		// 		},
		// 		]
		// 	},
		// 	{
		// 		exchange_id: 3,
		// 		exchange_description: "1个花花换20元零花钱(用于水果,购物等)",
		// 		exchange_works: [{
		// 			object: "flower",
		// 			num: -1
		// 		},
		// 		]
		// 	},
		// 	{
		// 		exchange_id: 4,
		// 		exchange_description: "1个钻石换出门玩一天",
		// 		exchange_works: [{
		// 			object: "diamond",
		// 			num: -1
		// 		},
		// 		]
		// 	},
		// 	{
		// 		exchange_id: 5,
		// 		exchange_description: "2个钻石换满足你一个愿望",
		// 		exchange_works: [{
		// 			object: "diamond",
		// 			num: -2
		// 		},
		// 		]
		// 	},
		// 	{
		// 		exchange_id: 6,
		// 		exchange_description: "3个钻石换见面3天",
		// 		exchange_works: [{
		// 			object: "diamond",
		// 			num: -3
		// 		},
		// 		]
		// 	}],
		}
	},
	onLoad() {
		this.num_flower = getApp().globalData.userInfo.data.key_data.flower.num_all;
		this.num_diamond = getApp().globalData.userInfo.data.key_data.diamond.num_all;
	},
	methods: {
		async exchange(data,id) {
			console.log("兑换",id)
			let exchange = data.find(item => item.exchange_id == id)
			for (let i = 0; i < exchange.exchange_works.length; i++) {
				let work = exchange.exchange_works[i]
				if(work.object == "flower") {
					console.log("花花兑换")
					//检查保底
					if(this.num_flower + work.num < 0) {
						uni.showToast({
							title: '花花不够啦！',
							mask: true
						})
						return
					}
					this.num_flower += work.num
					//花花都是减少的
					getApp().globalData.userInfo.data.key_data.flower.num_all += work.num
					//不改变其他两项，因为是兑换，也不影响目标进度
				} else if(work.object == "diamond") {
					//检查保底
					if(this.num_diamond + work.num < 0) {
						uni.showToast({
							title: '钻石不够啦！',
							mask: true
						})
						return
					}
					console.log("钻石兑换")
					this.num_diamond += work.num
					getApp().globalData.userInfo.data.key_data.diamond.num_all += work.num
					//不改变其他两项，因为是兑换，也不影响目标进度

				}
			}
			await this.log_upload("user",exchange.exchange_description)
			uni.showToast({
				title: '成功用'+exchange.exchange_description+"(8s后消失,请截图)",
				icon: 'none',
				mask: true,
				duration: 8000
			})
		},
		async log_upload(type,event){
			const LM = uniCloud.importObject("log_manager");
			let log_timestamp = new Date().toLocaleString();
			let data = getApp().globalData.userInfo.data;
			const res = await LM.log_add(log_timestamp, type, event, data);
			console.log(res);
			uni.setStorageSync('userInfo', getApp().globalData.userInfo);
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
	background: linear-gradient(to bottom, #98e9ff, #F8F8F8);
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

		image {
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
