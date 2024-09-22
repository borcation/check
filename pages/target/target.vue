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
					<button :disabled="item.percent<100||item.target_checked==true" style="width: 60px;height: 40px;font-size: 16px;"
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
			regular_target_list: [],
			day_target_list: [],
			week_target_list: [],
		}
	},
	onLoad() {

	},
	mounted() {
	},
	onShow() {
		// console.log("target onShow")
		this.update_data()
	},
	methods: {
		dayChange(dayInfo) { // 点击日期
			console.log("点击日期", JSON.parse(JSON.stringify(dayInfo)));
		},
		monthChange(monthInfo) { // 切换月份
			console.log("切换月份", JSON.parse(JSON.stringify(monthInfo)));
		},
		shrinkClick(type) {
			console.log("当前日历状态", type);
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
		update_data() {
			//从全局数据（内存）中获取数据
			this.regular_target_list = getApp().globalData.userInfo.data.regular_target_list;
			this.day_target_list = getApp().globalData.userInfo.data.day_target_list;
			this.week_target_list = getApp().globalData.userInfo.data.week_target_list;
			this.week_list = [];
			var regular_target_list = this.regular_target_list;
			var day_target_list = this.day_target_list;
			var week_target_list = this.week_target_list;
			for (var i = 0; i < day_target_list.length; i++) {
				var item = day_target_list[i];
				var week_item = {};
				week_item.week_id = item.target_id+100;//每日的任务的id加100
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
				week_item.week_id = item.target_id;//常规任务的id不变
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
				week_item.week_id = item.target_id+1000;//每周的任务的id加1000
				week_item.description = item.target_description;
				week_item.score_request = item.target_reqeust;
				week_item.score_now = item.target_now;
				week_item.award_item = item.award.item;
				week_item.target_checked = item.target_checked;
				week_item.percent = 100 * week_item.score_now / week_item.score_request;
				this.week_list.push(week_item);
			}
		},
		async week_finish(id) {
			console.log("week_finish")
			console.log(id)
			if (id >= 1000) {
				console.log("week_finish,每周10个花花奖励1钻石")
				var week_id = id - 1000
				if (this.week_target_list[week_id].target_now < this.week_target_list[week_id].target_reqeust) {
					console.log("分数异常，出错啦，拒绝领奖")
					uni.showToast({
						title: '分数异常，出错啦，拒绝领奖',
						icon: 'none',
						duration: 2000
					});
					return
				}
				//更新本地数据
				this.week_target_list[week_id].target_checked = true
				//更新全局数据（内存）
				getApp().globalData.userInfo.data.week_target_list = this.week_target_list
				if(this.week_target_list[week_id].award.item=="diamond"){
					getApp().globalData.userInfo.data.key_data.diamond.num_all+=this.week_target_list[week_id].award.number
					getApp().globalData.userInfo.data.key_data.diamond.num_day+=this.week_target_list[week_id].award.number
					getApp().globalData.userInfo.data.key_data.diamond.num_week+=this.week_target_list[week_id].award.number
					//没有其他watch钻石的任务
				}
				var event = this.week_target_list[week_id].target_description
				await this.log_upload("user",event)
				uni.showToast({
					title: '领取成功,获得'+this.week_target_list[week_id].award.number+'个'+this.week_target_list[week_id].award.item,
					icon: 'success',
					duration: 2000
				});
			} else if (id<1000 && id>=100) {
				console.log("day_finish,每日20分奖励1个花花")
				var day_id = id - 100
				if (this.day_target_list[day_id].target_now < this.day_target_list[day_id].target_reqeust || getApp().globalData.userInfo.data.key_data.score.num_day<20) {
					console.log("当日分数为",getApp().globalData.userInfo.data.key_data.score.num_day)
					console.log("分数异常，出错啦，拒绝领奖")
					uni.showToast({
						title: '分数异常，出错啦，拒绝领奖',
						icon: 'none',
						duration: 2000
					});
					return
				}
				//更新本地数据
				this.day_target_list[day_id].target_checked = true
				//更新watch花花的任务
				this.week_target_list[0].target_now+=this.day_target_list[day_id].award.number
				//更新全局数据（内存）
				getApp().globalData.userInfo.data.day_target_list = this.day_target_list
				getApp().globalData.userInfo.data.week_target_list = this.week_target_list
				if(this.day_target_list[day_id].award.item=="flower"){
					getApp().globalData.userInfo.data.key_data.flower.num_all+=this.day_target_list[day_id].award.number
					getApp().globalData.userInfo.data.key_data.flower.num_day+=this.day_target_list[day_id].award.number
					getApp().globalData.userInfo.data.key_data.flower.num_week+=this.day_target_list[day_id].award.number
				}
				var event = this.day_target_list[day_id].target_description
				await this.log_upload("user",event)
				uni.showToast({
					title: '领取成功,获得'+this.day_target_list[day_id].award.number+'个'+this.day_target_list[day_id].award.item,
					icon: 'success',
					duration: 2000
				});
			} else {
				console.log("regular_finish")
				var regular_id = id
				if (this.regular_target_list[regular_id].target_week.score_now < this.regular_target_list[regular_id].target_week.score_request) {
					console.log("分数异常，出错啦，拒绝领奖")
					uni.showToast({
						title: '分数异常，出错啦，拒绝领奖',
						icon: 'none',
						duration: 2000
					});
					return
				}
				//更新本地数据
				this.regular_target_list[regular_id].target_week.target_checked = true
				this.week_target_list[0].target_now+=this.regular_target_list[regular_id].target_week.award.number
				//更新全局数据（内存）
				getApp().globalData.userInfo.data.regular_target_list = this.regular_target_list
				getApp().globalData.userInfo.data.week_target_list = this.week_target_list
				if(this.regular_target_list[regular_id].target_week.award.item=="flower"){
					getApp().globalData.userInfo.data.key_data.flower.num_all+=this.regular_target_list[regular_id].target_week.award.number
					getApp().globalData.userInfo.data.key_data.flower.num_day+=this.regular_target_list[regular_id].target_week.award.number
					getApp().globalData.userInfo.data.key_data.flower.num_week+=this.regular_target_list[regular_id].target_week.award.number
				}
				var event = this.regular_target_list[regular_id].target_week.description
				await this.log_upload("user",event)
				uni.showToast({
					title: '领取成功,获得'+this.regular_target_list[regular_id].target_week.award.number+'个'+this.regular_target_list[regular_id].target_week.award.item,
					icon: 'success',
					duration: 2000
				});
			}
			this.update_data()
		},
		async log_upload(type,event){
			const LM = uniCloud.importObject("log_manager");
			let log_timestamp = new Date().toLocaleString();
			let data = getApp().globalData.userInfo.data;
			const res = await LM.log_add(log_timestamp, type, event, data, getApp().globalData.device);
			console.log(res);
			//将内存数据同步到缓存、并上传到数据库
			uni.setStorageSync('userInfo', getApp().globalData.userInfo);
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