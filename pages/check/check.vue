<template>
	<view class="container">
		<view class="target-item" @click="test">早起</view>
		<view class="target-item">学习</view>
		<view class="target-item">早睡</view>
		<view class="target-item">锻炼</view>
		<view class="target-item">yule</view>
		<view class="target-item">add</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			test() {
				console.log('test')
				const TM = uniCloud.importObject("target_manager");
				var max_id = TM.get_max_id();
				console.log('max',max_id)
				// const target_info ={
				// 	"target_id":1,
				// 	"target_name":"早起",
				// 	"target_options":{
				// 		"score0_item":"九点后",
				// 		"score1_item":"九点",
				// 		"score2_item":"八点半",
				// 		"score3_item":"八点",
				// 		"score4_item":"七点半",
				// 	},
				// 	"target_is_done":false,
				// 	"target_frequency":"per_day",
				// 	"target_use":true
				// }
				// let r = TM.target_add()
				// console.log(r)
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		font-size: 14px;
		line-height: 24px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		background-color: aqua;
	}
	.target-item {
		width: calc(50% - 20px);
		margin: 10px;
		height: 80px;
		background-color: #f90707;
	}
</style>
