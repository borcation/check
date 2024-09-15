<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
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