<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			const res = uni.getSystemInfoSync();
			console.log(res.deviceModel);
			this.globalData.device = res.deviceModel;
			console.log("checkForUpdate")
			var lastResetTimestamp = uni.getStorageSync('lastResetTimestamp');
			if (!lastResetTimestamp) {
				// 如果没有上次重置时间，说明是第一次启动，将当前时间作为重置时间
				// 假设使用 localStorage 存储
				uni.setStorageSync('lastResetTimestamp', new Date());
				lastResetTimestamp = uni.getStorageSync('lastResetTimestamp');
				console.log("第一次启动，将当前时间作为重置时间");
				uni.setStorageSync('userInfo', this.globalData.userInfo); 
				console.log("第一次启动，储存初始用户信息");
			}
			//启动时从缓存中读取信息到全局变量（操作所有数据之前）
			this.globalData.userInfo = uni.getStorageSync('userInfo')
			this.resetDataIfNeeded(lastResetTimestamp, new Date());
		},
		onShow: function() {
			console.log('App Show')

			// // 测试用例 1：每日重置 - 昨天4点之前
			// console.log('测试用例 1 - 每日重置');
			// this.resetDataIfNeeded('2024-09-14T03:00:00', '2024-09-15T05:00:00'); // 应触发每日重置

			// // 测试用例 2：每日重置 - 今天凌晨后
			// console.log('测试用例 2 - 不需要每日重置');
			// this.resetDataIfNeeded('2024-09-15T05:00:00', '2024-09-15T06:00:00'); // 不应触发重置

			// // 测试用例 3：每周重置 - 上周一凌晨之前
			// console.log('测试用例 3 - 每周重置');
			// this.resetDataIfNeeded('2024-09-09T03:00:00', '2024-09-16T05:00:00'); // 应触发每周重置

			// // 测试用例 4：每周重置 - 本周一凌晨后
			// console.log('测试用例 4 - 不需要每周重置');
			// this.resetDataIfNeeded('2024-09-16T05:00:00', '2024-09-16T06:00:00'); // 不应触发重置

			// // 测试用例 5：跨多日未启动
			// console.log('测试用例 5 - 跨多日未启动每日重置');
			// this.resetDataIfNeeded('2024-09-12T03:00:00', '2024-09-15T05:00:00'); // 应触发多次每日重置

			// // 测试用例 6：跨多周未启动
			// console.log('测试用例 6 - 跨多周未启动每周重置');
			// this.resetDataIfNeeded('2024-09-02T03:00:00', '2024-09-16T05:00:00'); // 应触发多次每周重置
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			async log_upload(type,event){
				const LM = uniCloud.importObject("log_manager");
				let log_timestamp = new Date().toLocaleString();
				let data = this.globalData.userInfo.data;
				const res = await LM.log_add(log_timestamp, type, event, data, this.globalData.device);
				console.log(res);
				uni.setStorageSync('userInfo', this.globalData.userInfo);
			},
			async resetDaylyData() {
				console.log("每日数据重置");
				this.globalData.userInfo.data.key_data.score.num_day = 0;
				this.globalData.userInfo.data.key_data.flower.num_day = 0;
				this.globalData.userInfo.data.key_data.diamond.num_day = 0;
				for (let i = 0; i < this.globalData.userInfo.data.regular_target_list.length; i++) {
					this.globalData.userInfo.data.regular_target_list[i].target_checked = false;
					console.log(this.globalData.userInfo.data.regular_target_list[i].target_id, "每日打卡重置");
				}
				for (let i = 0; i < this.globalData.userInfo.data.day_target_list.length; i++) {
					this.globalData.userInfo.data.day_target_list[i].target_checked = false;
					this.globalData.userInfo.data.day_target_list[i].target_now = 0;
					console.log(this.globalData.userInfo.data.day_target_list[i].target_id, "每日目标重置");
				}
				await this.log_upload("system","每日数据重置");
			},
			async resetWeeklyData() {
				console.log("每周数据重置");
				this.globalData.userInfo.data.key_data.score.num_week = 0;
				this.globalData.userInfo.data.key_data.flower.num_week = 0;
				this.globalData.userInfo.data.key_data.diamond.num_week = 0;
				for (let i = 0; i < this.globalData.userInfo.data.regular_target_list.length; i++) {
					this.globalData.userInfo.data.regular_target_list[i].target_week.target_checked = false;
					this.globalData.userInfo.data.regular_target_list[i].target_week.score_now = 0;
					console.log(this.globalData.userInfo.data.regular_target_list[i].target_id,"每周打卡重置");
				} 
				for (let i = 0; i < this.globalData.userInfo.data.week_target_list.length; i++) {
					this.globalData.userInfo.data.week_target_list[i].target_checked = false;
					this.globalData.userInfo.data.week_target_list[i].target_now = 0;
					console.log(this.globalData.userInfo.data.week_target_list[i].target_id,"每周目标重置");
				}
				await this.log_upload("system","每周数据重置");
			},
			getResetPoint(date, isWeekly) {
				const resetDate = new Date(date);
				resetDate.setHours(4, 0, 0, 0); // 设置为凌晨4点
				if (isWeekly) {
					// 如果是每周重置，找到最近的周一凌晨4点
					const day = resetDate.getDay(); // 获取当前是周几，0表示周日，1表示周一，依此类推
					const week = 6 //周1
					// const week = 3 //周4
					const diff = (day + week) % 7; // 计算从当前日期到上一个周一的天数
					resetDate.setDate(resetDate.getDate() - diff); // 减去多余的天数，设为周一凌晨4点
				}
				// console.log('重置时间点:', resetDate);
				return resetDate;
			},
			async resetDataIfNeeded(lastResetTimestamp, now, forced=false) {
				lastResetTimestamp = new Date(lastResetTimestamp);
				console.log('lastResetTimestamp:', lastResetTimestamp);
				console.log('now:', now);

				// 获取每日和每周的重置点
				const dailyResetPoint = this.getResetPoint(now, false);
				const weeklyResetPoint = this.getResetPoint(now, true);
				console.log('dailyResetPoint:', dailyResetPoint);
				console.log('weeklyResetPoint:', weeklyResetPoint);

				// 初始化是否需要重置数据的标志
				let needDailyReset = false;
				let needWeeklyReset = false;

				// 判断是否越过了每日重置点
				if (lastResetTimestamp < dailyResetPoint && now >= dailyResetPoint) {
					needDailyReset = true;
				}

				// 判断是否越过了每周重置点
				if (lastResetTimestamp < weeklyResetPoint && now >= weeklyResetPoint) {
					needWeeklyReset = true;
				}

				// 如果需要重置数据，执行重置逻辑
				if (needDailyReset || needWeeklyReset) {
					if (needDailyReset) {
						await this.resetDaylyData();
						console.log("数据已每日重置");
					}
					if (needWeeklyReset) {
						await this.resetWeeklyData();
						console.log("数据已每周重置");
					}
					this.globalData.update_check = true;
					this.globalData.update_target = true;
					this.globalData.update_me = true;
					// 重置数据后，更新缓存中数据
					uni.setStorageSync('lastResetTimestamp', now);
					uni.setStorageSync('userInfo', this.globalData.userInfo);
				} else if(forced){
					console.log("强制更新");
					await this.resetDaylyData();
					await this.resetWeeklyData();
					uni.setStorageSync('lastResetTimestamp', now);
					uni.setStorageSync('userInfo', this.globalData.userInfo);
				} else {
					console.log("数据不需要重置,从本地缓存获取userInfo");
					// 如果不需要重置数据，从本地缓存获取数据到内存中，后续所有数据都从内存中读取，有修改则更新内存和缓存
					this.globalData.userInfo = uni.getStorageSync('userInfo');
				}
			}
		},
		globalData: {
			update_check: false,
			update_target: false,
			update_me: false,
			device:null,
			userInfo: {
				user_id: 0,
				user_name: "玉儿宝贝",
				user_avatar: "https://mp-324f3402-0d4f-4186-9711-38d0cd552848.cdn.bspapp.com/logo.png",
				data: {
					key_data: {
						score: {
							name: "积分",
							num_all: 0,
							num_day: 0,
							num_week: 0
						},
						flower: {
							name: "花花",
							num_all: 5,
							num_day: 0,
							num_week: 0
						},
						diamond: {
							name: "钻石",
							num_all: 1,
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
								description: "每周早起达到20分",
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
							target_description: "你今天运动了吗？",
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
							target_description: "你今天心情怎么样呀？",
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
						target_now: 0,
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
			},

		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>