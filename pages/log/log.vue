<template>
	<view class="bg">
		<view class="log-list" v-for="(item, index) in log_list" :key="item.award_id">
			<view class="log-item">
				<view class="block_1">
					<view class="log-event">{{ item.log_event }}</view>
					<view class="log-time">{{ item.log_time }}</view>
				</view>
				<view class="block_2">
					<view class="log-score">现有积分:{{ item.day_score }}</view>
					<view class="log-flower">花花:{{ item.flower_number }}</view>
					<view class="log-diamond">钻石:{{ item.diamond_number }}</view>
				</view>
				<view class="log-score-number">
					<view class="log-score-number-item" v-for="(score, key) in item.score_number" :key="key">
						<text>{{ key }}:{{ score }}</text>
					</view>
				</view>
				<view class="log-takeback" v-if="item.is_takeback">收回</view>
			</view>
		</view>
	</view>
</template>
<!-- - log_id
- log_time
- log_from：触发来自用户or来自系统
- log_event
- day_score：当天总分
- score_number：json字符串
- flower_number
- diamond_number
- is_takeback：是否允许收回 -->
<script>
	export default {
		data() {
			return {
				log_list: [
					{
						log_id: 1,
						log_time: "2023-06-25 12:00:00",
						log_from: "user",
						log_event: "完成任务",
						day_score: 100,
						score_number: {
							"任务1": 100
						},
						flower_number: 1,
						diamond_number: 0,
						is_takeback: false
					},
					{
						log_id: 2,
						log_time: "2023-06-25 12:00:00",
						log_from: "system",
						log_event: "系统奖励",
						day_score: 100,
						score_number: {
							"系统奖励": 100
						},
						flower_number: 1,
						diamond_number: 0,
						is_takeback: false
					},
					{
						log_id: 3,
						log_time: "2023-06-25 12:00:00",
						log_from: "user",
						log_event: "完成任务",
						day_score: 100,
						score_number: {
							"任务1": 100
						},
						flower_number: 1,
						diamond_number: 0,
						is_takeback: true
					}
				]
				
			}
		},
		methods: {
			
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
	.log-list {
		width: 100%;
		// background-color: burlywood;
		display: flex;
		flex-direction: column;
		align-items: center;
		.log-item{
			width: 80%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 20px;
			padding: 5px 20px;
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
					width: 30%;
				}
				.log-flower {
					font-size: 14px;
					width: 30%;
				}
				.log-diamond {
					font-size: 14px;
					width: 30%;
				}
			}
			.log-score-number {
				width: 100%;
				display: flex;
				justify-content: space-between;
				color: gray;
				.log-score-number-item {
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
