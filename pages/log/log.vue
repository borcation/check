<template>
	<view class="bg">
		<view class="log-list" v-for="(item, index) in log_list.reverse()" :key="item.log_id">
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
			log_list: [{
				log_id: -1,
				log_timestamp: "2023-09-15 12:00:00",
				log_from: "system",
				log_event: "初始状态",
				is_takeback: true,
				log_data: {
					key_data: {
						score: {
							name: "积分",
							num_all: 0,
							num_day: 0,
							num_week: 0
						},
						flower: {
							name: "花花",
							num_all: 0,
							num_day: 0,
							num_week: 0
						},
						diamond: {
							name: "钻石",
							num_all: 0,
							num_day: 0,
							num_week: 0
						}
					},
					regular_target_list: [{
							target_id: 0,
							target_name: "☀️早起",
							target_description: "今天你几点起床的呀？",
							target_score_list: ["九点后", "九点", "八点半", "八点", "七点半"],
							target_checked: false,
							target_week: {
								description: "每周早睡达到20分",
								score_request: 20,
								score_now: 0,
								award: {
									item: "flower",
									number: 1
								},
								target_checked: false,
							}
						},
						{
							target_id: 1,
							target_name: "📚学习",
							target_description: "你今天学习了多久？",
							target_score_list: ["0h", "1-2h", "3-4h", "5-6h", "7-8h", ">8h"],
							target_checked: false,
							target_week: {
								description: "每周学习达到20分",
								score_request: 20,
								score_now: 0,
								award: {
									item: "flower",
									number: 1
								},
								target_checked: false,
							}
						},
						{
							target_id: 2,
							target_name: "🌙早睡",
							target_description: "你昨晚什么时候入睡的呢？",
							target_score_list: ["熬夜失眠", "十二点半", "十二点", "十一点半", "十一点"],
							target_checked: false,
							target_week: {
								description: "每周早睡达到20分",
								score_request: 20,
								score_now: 0,
								award: {
									item: "flower",
									number: 1
								},
								target_checked: false,
							}
						},
						{
							target_id: 3,
							target_name: "🎮娱乐",
							target_description: "你今天玩了多久手机?",
							target_score_list: ["超过3小时", "3小时", "2小时", "1小时", "半小时"],
							target_checked: false,
							target_week: {
								description: "每周娱乐达到20分",
								score_request: 20,
								score_now: 0,
								award: {
									item: "flower",
									number: 1
								},
								target_checked: false,
							}
						},
						{
							target_id: 4,
							target_name: "🏋️‍♂️锻炼",
							target_description: "你今天运动了吗",
							target_score_list: ["没锻炼", "1h", "2h", "3h", "4h"],
							target_checked: false,
							target_week: {
								description: "每周锻炼积8分",
								score_request: 8,
								score_now: 0,
								award: {
									item: "flower",
									number: 1
								},
								target_checked: false,
							}
						},
						{
							target_id: 5,
							target_name: "🥰情绪",
							target_description: "你今天心情怎么样",
							target_score_list: ["心情烦闷", "略显疲惫", "无风无浪", "小小喜悦", "干劲十足"],
							target_checked: false,
							target_week: {
								description: "每周情绪达到20分",
								score_request: 20,
								score_now: 0,
								award: {
									item: "flower",
									number: 1
								},
								target_checked: false,
							}
						}
					],
					day_target_list: [{
						target_id: 0,
						target_description: "每日达到20分",
						target_watch: "score.num_day",
						target_reqeust: 20,
						target_now: 20,
						award: {
							item: "flower",
							number: 1
						},
						target_checked: false,
					}],
					week_target_list: [{
						target_id: 0,
						target_description: "每周拿到10个花花",
						target_watch: "flower.num_week",
						target_reqeust: 10,
						target_now: 0,
						award: {
							item: "diamond",
							number: 1
						},
						target_checked: false
					}]
				}
			}]

		}
	},
	onLoad() {
		this.log_download();
	},
	methods: {
		async log_download() {
			const LM = uniCloud.importObject("log_manager");
			const res = await LM.get_log_list();
			console.log(res);
			this.log_list = res;
		},
		async log_upload(type,event){
			const LM = uniCloud.importObject("log_manager");
			let log_timestamp = new Date().toLocaleString();
			let data = getApp().globalData.userInfo.data;
			const res = await LM.log_add(log_timestamp, type, event, data);
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
			}

			.log-time {
				font-size: 14px;
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
