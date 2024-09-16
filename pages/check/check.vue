<template>
	<view class="container">
		<view class="top-box">
			<view class="nowtime">
				<view>{{ date }}</view>
				<view>{{ time }}</view>
			</view>
			<view class="countdown">距离考研初试还有{{ d_remain }}天</view>
			<view class="slogan" style="text-align: center;">-- {{ slogan }} --</view>
		</view>

		<view class="target-box">
			<view class="target-item" v-for="(item, index) in regular_target_list" :key="item.target_id"
				@click="pop(item.target_id, item.target_name, item.target_description, item.target_score_list,item.target_checked)">
				<view class="target-item-block"></view>
				<view class="target-item-name">
					{{ item.target_name }}
				</view>
				<view v-if="item.target_checked" class="target-item-status">
					<uni-icons type="checkbox-filled" size="35" color="green"></uni-icons>
				</view>
				<view v-else class="target-item-status">
					<uni-icons type="circle" size="35" color="red"></uni-icons>
				</view>
			</view>
			<view class="target-item-add" @click="add()">
				<uni-icons type="plusempty" size="20" color="gray"></uni-icons>
				<text style="font-size: 16px;color: gray;">添加目标</text>
			</view>
			<view class="target-item-empty" v-if="regular_target_list.length % 2 === 0"></view>
		</view>

		<uni-popup ref="popup" type="center">
			<view class="target-pop">
				<view class="pop-name">
					<text>{{ pop_data.name }}</text>
				</view>
				<view class="pop-description">{{ pop_data.description }}</view>
				<view class="pop-list">
					<radio-group @change="radioChange">
						<label class="pop-lable" v-for="(item, index) in pop_data.options" :key="index">
							<view class="pop-lable-index">{{ index }}分:</view>
							<view class="pop-lable-text">{{ item }}</view>
							<view class="pop-lable-select">
								<radio :value="index" :checked="index === pop_data.current_score"/>
							</view>
						</label>
					</radio-group>
				</view>
				<!-- <view v-for="(item, index) in pop_data.options" :key="index">
					<view>{{ item }}</view>
				</view> -->
				<view class="pop-button">
					<button :disabled="pop_data.current_score==-1||pop_data.status==true" size="default" type="default" plain="true" style="width: 120px;height: 50px;" @click="check">打卡</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// date: new Date().toISOString().slice(0,10),
			date: '',
			time: new Date().toLocaleTimeString(),
			d_remain: Math.ceil((new Date('2024-12-21') - new Date()) / (1000 * 60 * 60 * 24)),
			slogan: '每天自律一点点',
			regular_target_list:[
				{
						target_id: 0,
						target_name: "☀️早起",
						target_description: "今天你几点起床的呀？",
						target_score_list: ["九点后", "九点", "八点半", "八点", "七点半"],
						target_checked: true,
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
			],
			pop_data: {
				id: 0,
				name: '',
				description: '',
				options: {},
				current_score: -1,
				status: false
			}
		}
	},
	onLoad() {
		this.regular_target_list = getApp().globalData.userInfo.data.regular_target_list;
		// var time = new Date().toLocaleTimeString()
		// console.log("当前时间",time)
	},
	mounted() {
		this.date = this.get_date();
		this.updateTime();
		setInterval(this.updateTime, 1000);
	},
	methods: {
		updateTime() {
			this.time = new Date().toLocaleTimeString();
		},
		get_date() {
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			return year + '-' + month + '-' + day;
		},
		pop(id, name, description, options,status) {
			this.pop_data.id = id;
			this.pop_data.name = name;
			if(status==true){
				this.pop_data.description = '你今天已经打过卡啦！';
			}else{
				this.pop_data.description = description;
			}
			this.pop_data.options = Object.values(options);  // 确保 options 是数组
			this.pop_data.current_score = -1;
			this.pop_data.status = status;
			this.$refs.popup.open();
		},
		radioChange: function (evt) {
			console.log(evt.detail);
			this.pop_data.current_score = evt.detail.value;
		},
		async check() {
			console.log('check')
			console.log(this.pop_data.id, this.pop_data.current_score)
			//修改当前目标状态
			this.regular_target_list[this.pop_data.id].target_checked = true;
			this.regular_target_list[this.pop_data.id].target_week.score_now += parseInt(this.pop_data.current_score);
			//同步到全局变量
			getApp().globalData.userInfo.data.regular_target_list[this.pop_data.id] = this.regular_target_list[this.pop_data.id];
			getApp().globalData.userInfo.data.key_data.score.num_all += parseInt(this.pop_data.current_score);
			getApp().globalData.userInfo.data.key_data.score.num_day += parseInt(this.pop_data.current_score);
			getApp().globalData.userInfo.data.key_data.score.num_week += parseInt(this.pop_data.current_score);
			//修改全局变量中的每日目标
			getApp().globalData.userInfo.data.day_target_list[0].target_now += parseInt(this.pop_data.current_score);
			
			var event = this.pop_data.name + this.pop_data.current_score + '分';
			await this.log_upload('user',event);

			uni.showToast({
				title: '本日积分+' + this.pop_data.current_score,
				icon: 'success',
				mask: true
			})
			this.$refs.popup.close();
			this.pop_data.current_score = -1;
		},
		async log_upload(type,event){
			const LM = uniCloud.importObject("log_manager");
			let log_timestamp = new Date().toLocaleString();
			let data = getApp().globalData.userInfo.data;
			const res = await LM.log_add(log_timestamp, type, event, data);
			console.log(res);
			uni.setStorageSync('userInfo', getApp().globalData.userInfo);
		},
		add() {
			uni.showToast({
				title: '这个功能你老公正在开发中',
				icon: 'none',
				mask: true
			})
		}
	}
}
</script>

<style>
.container {
	width: 100%;
	height: 100vh;
	font-size: 14px;
	line-height: 24px;
	padding: 10px;
	/* background-image: url('~@/static/bg_check.jpeg'); */
	background-size: cover;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-image: url(https://mp-324f3402-0d4f-4186-9711-38d0cd552848.cdn.bspapp.com/bg_check.jpeg)}

.top-box {
	width: calc(100% - 20px);
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: space-evenly; */
	/* background-color: bisque; */
}

.nowtime {
	width: 120px;
	height: 120px;
	border-radius: 50%;
	font-size: 16px;
	text-align: center;
	line-height: 20px;
	color: ghostwhite;
	background-color: rgba(0, 0, 0, 0.1);
	border: 1px solid ghostwhite;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 10px;
}

.countdown {
	font-size: 20px;
	text-align: center;
	font-family: cursive;
	margin: 10px;
	/* background-color: aliceblue; */
}

.slogan {
	font-size: 16px;
	text-align: center;
	color: rgb(100, 100, 100);
	font-family: cursive;
	margin-bottom: 10px;
	/* background-color: aliceblue; */
}

.target-box {
	width: calc(100% - 20px);
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	/* background-color: aqua; */
}

.target-item {
	width: calc(50% - 10px);
	margin: 5px;
	height: 80px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.target-item-block {
	height: 80px;
	width: 10px;
	background-color: lightpink;
	border-radius: 10px 0 0 10px;
}

.target-item-name {
	/* background-color:violet; */
	width: 50%;
	text-align: center;
	font-size: 18px;
	line-height: 18px;
}

.target-item-status {
	/* background-color:violet; */
	/* height: 40px; */
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
}

.target-item-add {
	width: calc(50% - 10px);
	margin: 5px;
	height: 80px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}

.target-item-empty {
	width: calc(50% - 10px);
	margin: 5px;
	height: 40px;
	background-color: transparent;
}

.target-pop {
	width: 300px;
	height: 420px;
	background-color: white;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}

.pop-name {
	width: 40%;
	height: 40px;
	/* background-color: lightpink; */
	font-size: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
}

.pop-description {
	width: 80%;
	height: 20px;
	/* background-color: lightblue; */
	font-size: 16px;
	color: gray;
	display: flex;
	justify-content: center;
	align-items: center;
}

.pop-list {
	width: 80%;
	height: 200px;
	/* background-color: lightgreen; */
	display: flex;
	justify-content: center;
	align-items: center;
}

.pop-lable {
	width: 220px;
	height: 35px;
	/* background-color: lightblue; */
	font-size: 16px;
	/* color: gray; */
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid lightgray;
}

.pop-lable-index {
	width: 60px;
	height: 35px;
	/* background-color: lightblue; */
	font-size: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: gray;
}

.pop-lable-text {
	width: 100px;
	height: 35px;
	/* background-color: lightgoldenrodyellow; */
	font-size: 15px;
	color: gray;
	display: flex;
	justify-content: center;
	align-items: center;
}

.pop-lable-select {
	width: 40px;
	height: 35px;
	/* background-color: lightblue; */
	font-size: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.pop-button {
	width: 120px;
	height: 50px;
	/* background-color: lightpink; */
	margin-bottom: 20px;
}
</style>
