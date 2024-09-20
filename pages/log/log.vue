<template>
	<view class="bg">
		<view class="log-list" v-for="(item, index) in log_list" :key="item.log_id">
			<view class="log-item">
				<view class="block_1">
					<view class="log-event">{{ item.log_event }}</view>
					<view class="log-time">{{ item.log_timestamp }}</view>
				</view>
				<view class="block_2">
					<view class="log-score">当前积分:{{ item.log_data.key_data.score.num_all }}</view>
					<view class="log-flower">花花:{{ item.log_data.key_data.flower.num_all }}</view>
					<view class="log-diamond">钻石:{{ item.log_data.key_data.diamond.num_all }}</view>
				</view>
				<view class="log-score-number">
					<view class="log-score-number-item" v-for="(value, key) in item.log_data.day_target_list" :key="key">
						<text>-{{ value.target_description }}:{{ value.target_now }}/{{ value.target_reqeust }}</text>
					</view>
					<view class="log-score-number-item" v-for="(value, key) in item.log_data.regular_target_list" :key="key">
						<text>-{{ value.target_week.description }}:{{ value.target_week.score_now }}/{{ value.target_week.score_request }}</text>
					</view>
					<view class="log-score-number-item" v-for="(value, key) in item.log_data.week_target_list" :key="key">
						<text>-{{ value.target_description }}:{{ value.target_now }}/{{ value.target_reqeust }}</text>
					</view>
				</view>
				<view class="log-takeback" v-if="item.is_takeback">收回</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			log_list: []
		}
	},
	onLoad() {
		console.log("log page")
		this.log_download(getApp().globalData.device);
	},
	methods: {
		async log_download(device) {
			const LM = uniCloud.importObject("log_manager");
			const res = await LM.get_log_list(device);
			console.log(res);
			this.log_list = res;
		},
		async log_upload(type,event){
			const LM = uniCloud.importObject("log_manager");
			let log_timestamp = new Date().toLocaleString();
			let data = getApp().globalData.userInfo.data;
			const res = await LM.log_add(log_timestamp, type, event, data, getApp().globalData.device);
			console.log(res);
			uni.setStorageSync('userInfo', getApp().globalData.userInfo);
		},
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

.log-list {
	width: 100%;
	// background-color: burlywood;
	display: flex;
	flex-direction: column;
	align-items: center;

	.log-item {
		width: 88%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 10px;
		padding: 5px 10px;
		background-color: #ffffff;
		border-radius: 10px;

		.block_1 {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.log-event {
				font-size: 14px;
				font-weight: bold;
				width: 40%;
				// background-color: #98e9ff; 
			}

			.log-time {
				font-size: 14px;
				width: 60%;
				// background-color: blanchedalmond;
				text-align: right;
			}
		}

		.block_2 {
			width: 100%;
			display: flex;
			justify-content: space-between;
			color: gray;

			.log-score {
				font-size: 14px;
				width: 50%;
			}

			.log-flower {
				font-size: 14px;
				width: 20%;
			}

			.log-diamond {
				font-size: 14px;
				width: 20%;
			}
		}

		.log-score-number {
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.log-score-number-item {
				width: 50%;
				color: gray;
				font-size: 14px;
			}
		}

		.log-takeback {
			font-size: 14px;
			color: red;
		}
	}
}
</style>
