<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			console.log("checkForUpdate")
			this.checkForUpdates();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 每日更新的函数
			updateDataDayly() {
				console.log("正在更新每日数据...");

				// 执行每日更新的操作，比如从服务器获取每日数据等

				// 更新完成后，保存当前时间（本地时间）作为最新更新时间
				localStorage.setItem('lastDayUpdate', new Date().toLocaleString());
				console.log("每日数据已更新");
			},

			// 每周更新的函数
			updateWeeklyData() {
				console.log("正在更新每周数据...");

				// 执行每周更新的操作，比如从服务器获取整周数据等

				// 更新完成后，保存当前时间（本地时间）作为最新更新时间
				localStorage.setItem('lastWeekUpdate', new Date().toLocaleString());
				console.log("每周数据已更新");
			},

			// 判断是否需要每日更新
			shouldUpdateDayly(lastDayUpdate, now) {
				const isSameDay = lastDayUpdate.getDate() === now.getDate() && lastDayUpdate.getMonth() === now.getMonth() &&
					lastDayUpdate.getFullYear() === now.getFullYear();
				const isAfter4AMToday = isSameDay && lastDayUpdate.getHours() >= 4;

				// 如果不是同一天，或者同一天但上次更新在4点之前，则需要更新
				return !isAfter4AMToday;
			},

			// 判断是否需要每周更新
			shouldUpdateWeekly(lastWeekUpdate, now) {
				// 将传入的时间字符串转换为Date对象
				const lastUpdate = new Date(lastWeekUpdate);
				const current = new Date(now);

				// 获取当前日期的星期几，0代表周日，1代表周一，以此类推
				const todayIs = current.getDay();

				// 创建本周一早上4点的时间点
				const thisMondayAt4AM = new Date(current);
				// 调整时间为本周一的4点
				thisMondayAt4AM.setHours(4, 0, 0, 0);
				thisMondayAt4AM.setDate(thisMondayAt4AM.getDate() - todayIs + (todayIs > 0 ? 0 :
				7)); // 如果今天是周日，确保减去7天得到上一周的周一

				// 创建上周一早上4点的时间点
				const lastMondayAt4AM = new Date(lastUpdate);
				lastMondayAt4AM.setDate(lastMondayAt4AM.getDate() - 7); // 减去7天，得到上周一
				lastMondayAt4AM.setHours(4, 0, 0, 0); // 设置时间为4点

				// 判断逻辑：如果上次更新是在上周一之前，并且当前时间在本周一之后，则需要更新
				return lastMondayAt4AM.getTime() <= lastUpdate.getTime() && current.getTime() >= thisMondayAt4AM.getTime();
			}

			// 统一检查并更新的函数
			checkForUpdates() {
				const lastDayUpdateStr = localStorage.getItem('lastDayUpdate'); // 获取上次更新的时间（字符串形式）
				const lastWeekUpdateStr = localStorage.getItem('lastWeekUpdate'); // 获取上次更新的时间（字符串形式）
				const now = new Date();

				if (lastDayUpdateStr && lastWeekUpdateStr) {
					const lastDayUpdate = new Date(lastDayUpdateStr); // 将存储的本地时间字符串转换为 Date 对象
					const lastWeekUpdate = new Date(lastWeekUpdateStr); // 将存储的本地时间字符串转换为 Date 对象
					// 检查每日更新
					if (shouldUpdateDayly(lastDayUpdate, now)) {
						updateDataDayly();
					}

					// 检查每周更新
					if (shouldUpdateWeekly(lastWeekUpdate, now)) {
						updateWeeklyData();
					}
				} else {
					// 如果从未更新过，执行每日和每周更新
					updateDataDayly();
					updateWeeklyData();
				}
			}
		},
		globalData: {
			update_flag: false,
			userInfo: {
				user_id: 0,
				user_name: "孙玉琼",
				user_avatar: "/static/avatar.png",
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
							num_all: 50,
							num_day: 0,
							num_week: 0
						},
						diamond: {
							name: "钻石",
							num_all: 3,
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