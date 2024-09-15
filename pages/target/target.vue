<template>
	<view class="bg">
		<view class="content">
			<view class="content-item">
				<lunc-calendar :showShrink="true" :showLunar="true" shrinkState="week" @dayChange="dayChange"
					@monthChange="monthChange" @shrinkClick="shrinkClick"></lunc-calendar>
			</view>
		</view>
		<view class="week-list">
			<view class="week-item" v-for="(item, index) in week_list" :key="item.week_id">
				<view class="week-left">
					<view class="week-name">
						{{ item.description }} ({{ item.score_now }}/{{ item.score_request }})
						<view class="week-icon" v-if="item.award_item === 'flower'">
							<image src="/static/flower.png" style="width: 16px;height: 16px;margin-left: 4px;"></image>
						</view>
						<view class="week-icon" v-else>
							<image src="/static/diamond.png" style="width: 16px;height: 16px;margin-left: 4px;"></image>
						</view>
					</view>
					<view class="week-box">
						<view class="week-progress">
							<progress :percent="item.percent" border-radius="5" active stroke-width="16" />
						</view>
					</view>
				</view>
				<view class="week-button">
					<button :disabled="item.percent<100" style="width: 60px;height: 40px;font-size: 16px;"
						@click="week_finish(item.week_id)">领奖</button>
				</view>
			</view>
			<!-- <view class="week-empty"></view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			signList: [{
				date: "2023-06-25",
				title: "生日",
				info: "张三生日"
			}],
			week_list: [],
		}
	},
	onLoad() {
		this.regular_target_list = getApp().globalData.userInfo.data.regular_target_list;
		this.day_target_list = getApp().globalData.userInfo.data.day_target_list;
		this.week_target_list = getApp().globalData.userInfo.data.week_target_list;
	},
	mounted() {
		this.update_data(this.day_target_list, this.regular_target_list, this.week_target_list)
	},
	methods: {
		dayChange(dayInfo) { // 点击日期
			console.log("点击日期", JSON.parse(JSON.stringify(dayInfo)));
		},
		monthChange(monthInfo) { // 切换月份
			console.log("切换月份", JSON.parse(JSON.stringify(monthInfo)));
		},
		shrinkClick(type) {
			console.log("当前状态", type);
		},

		addSign() { // 添加标记
			let addList = [{
				date: "2023-06-28",
				title: "休息"
			},
			{
				date: "2023-06-01",
				title: "上班"
			}
			];
			// 调用 addSignList 方法，传入需要添加的标记数组
			this.$refs.calendar.addSignList(addList);
		},
		deleteSign() { // 删除标记
			let deleteList = [{
				date: "2023-06-01",
				title: "上班"
			}];
			// 调用 deleteSignList 方法，传入需要删除的标记数组
			this.$refs.calendar.deleteSignList(deleteList);
		},
		update_data(day_target_list,regular_target_list,week_target_list) {
			for (var i = 0; i < day_target_list.length; i++) {
				var item = day_target_list[i];
				var week_item = {};
				week_item.week_id = item.target_id;
				week_item.description = item.target_description;
				week_item.score_request = item.target_reqeust;
				week_item.score_now = item.target_now;
				week_item.award_item = item.award.item;
				week_item.target_checked = item.target_checked;
				week_item.percent = 100 * week_item.score_now / week_item.score_request;
				this.week_list.push(week_item);
			}

			for (var i = 0; i < regular_target_list.length; i++) {
				var item = regular_target_list[i];
				var week_item = {};
				week_item.week_id = item.target_id;
				week_item.description = item.target_week.description;
				week_item.score_request = item.target_week.score_request;
				week_item.score_now = item.target_week.score_now;
				week_item.award_item = item.target_week.award.item;
				week_item.target_checked = item.target_week.target_checked;
				week_item.percent = 100 * week_item.score_now / week_item.score_request;
				this.week_list.push(week_item);
			}

			for (var i = 0; i < week_target_list.length; i++) {
				var item = week_target_list[i];
				var week_item = {};
				week_item.week_id = item.target_id;
				week_item.description = item.target_description;
				week_item.score_request = item.target_reqeust;
				week_item.score_now = item.target_now;
				week_item.award_item = item.award.item;
				week_item.target_checked = item.target_checked;
				week_item.percent = 100 * week_item.score_now / week_item.score_request;
				this.week_list.push(week_item);
			}

		},
		async add_week() {
			const WM = uniCloud.importObject("week_manager")
			var max_id = await WM.get_max_id()
			const week_info = {
				"week_id": max_id + 1,
				"week_name": "当周拿到10个花花",
				"week_target": -1,
				"week_current": 0,
				"week_reqest": 10,
				"week_award": "diamond",
				"week_is_done": false,
			}
			var res = await WM.week_add(week_info)
			console.log(res)
			this.$refs.wek.refresh()
		},
		async get_week() {
			const WM = uniCloud.importObject("week_manager")
			var res = await WM.week_get_all()
			console.log(res)
			this.week_list = res.data
			for (var i = 0; i < this.week_list.length; i++) {
				this.week_list[i].week_percent = 100 * this.week_list[i].week_current / this.week_list[i]
					.week_reqest
			}
		},
		week_finish(id) {
			console.log(id)
		}
	}
}
</script>

<style lang="scss">
.bg {
	width: 100%;
	height: 100vh;
	font-size: 14px;
	line-height: 24px;
	padding: 14px;
	background: linear-gradient(to bottom, #98e9ff, #F8F8F8);
	display: flex;
	flex-direction: column;
}

.content {
	.content-item {
		.lunc-calendar {
			width: calc(100% - 28px);
			border-radius: 20rpx;
		}
	}
}

.week-list {
	display: flex;
	flex-direction: column;
	width: calc(100% - 28px);
	/* background-color: #98e9ff; */
}

.week-item {
	width: calc(100% - 20px);
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin-top: 10px;
	padding: 10px;
	background-color: #ffffff;
	border-radius: 10px;
}

.week-left {
	width: 260px;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* background-color: aliceblue; */
}

.week-button {
	width: 60px;
	height: 40px;
	font-size: 20px;
	/* background-color: #98e9ff; */
}

.week-name {
	width: calc(100% - 20px);
	height: 20px;
	display: flex;
	align-items: center;
	font-size: 14px;
	font-weight: bold;
}

.week-box {
	display: flex;
	justify-content: space-between;
	width: calc(100% - 20px);
	margin-top: 5px;
	/* background-color: aqua; */
}

.week-progress {
	width: 100%;
	height: 16px;
}

.week-icon {
	height: 18px;
}

.week-empty {
	width: calc(100% - 20px);
	height: 40px;
}
</style>