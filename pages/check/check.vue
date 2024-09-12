<template>
	<view class="container">
		<view class="top-box">
			<view class="nowtime">
				<view>{{date}}</view>
				<view>{{time}}</view>
			</view>
			<view class="countdown">距离考研初试还有{{d_remain}}天</view>
			<view class="slogan" style="text-align: center;">-- {{slogan}} --</view>
		</view>	

		<unicloud-db ref="tgt" v-slot:default="{data, loading, error, options}" collection="target_table" orderby="target_id asc">
			<view class="target-box">
				<view class="target-item" v-for="(item, index) in data" :key="item._id" @click="check()">
					<view class="target-item-block"></view>
					<view class="target-item-name">
						{{ item.target_name }}
					</view>
					<view v-if="item.target_is_done" class="target-item-status">
						<uni-icons type="checkbox-filled" size="40" color="green"></uni-icons>
					</view>
					<view v-else class="target-item-status">
						<uni-icons type="circle" size="40" color="red"></uni-icons>
					</view>
				</view>
				<view class="target-item-add" @click="add()">
					<uni-icons type="plusempty" size="20" color="gray"></uni-icons>
					<text style="font-size: 16px;color: gray;">添加目标</text>
				</view>
				<view class="target-item-empty" v-if="data.length % 2 === 0"></view>
			</view>
		</unicloud-db>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// date: new Date().toISOString().slice(0,10),
				date: new Date(),
				time: new Date().toLocaleTimeString(),
				d_remain: Math.ceil((new Date('2024-12-21') - new Date()) / (1000 * 60 * 60 * 24)),
				slogan: '每天自律一点点'
			}
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
			get_date(){
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				return year + '-' + month + '-' + day;
			},
			async add() {
				console.log('add')
				const TM = uniCloud.importObject("target_manager");
				var max_id = await TM.get_max_id();
				console.log('max',max_id)
				const target_info ={
					"target_id":max_id+1,
					"target_name":"情绪状态",
					"target_description":"你今天心情怎么样?",
					"target_options":{
						"score0_item":"心情烦闷",
						"score1_item":"略显疲惫",
						"score2_item":"无风无浪",
						"score3_item":"小小喜悦",
						"score4_item":"干劲十足",
					},
					"target_is_done":false,
					"target_frequency":"per_day",
					"target_use":true 
				}
				// var r = await TM.target_add(target_info)
				this.$refs.tgt.refresh() //udb为unicloud-db组件的ref属性值
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
		background-image: url('~@/static/bg_check.jpeg');
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}
	.top-box{
		width: calc(100% - 20px);
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: space-evenly; */
		/* background-color: bisque; */
	}
	.nowtime{
		width: 120px;
		height: 120px;
		border-radius:50%;
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
	.countdown{
		font-size: 20px;
		text-align: center;
		font-family:cursive;
		margin: 10px;
		/* background-color: aliceblue; */
	}
	.slogan{
		font-size: 16px;
		text-align: center;
		color:rgb(100, 100, 100);
		font-family: cursive;
		margin-bottom: 10px;
		/* background-color: aliceblue; */
	}
	.target-box{
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
		background-color:white;
		border-radius: 10px;
		box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.target-item-block{
		height: 80px;
		width: 10px;
		background-color:lightpink;
		border-radius: 10px 0 0 10px;
	}
	.target-item-name {
		/* background-color:violet; */
		margin-left:20px;
		width: 50%;
		text-align: center;
		font-size: 18px;
		line-height: 18px;
	}
	.target-item-status {
		display: flex;
		margin-right:10px;
	}
	.target-item-add {
		width: calc(50% - 10px);
		margin: 5px;
		height: 80px;
		background-color:white;
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
		background-color:transparent;
	}
</style>
