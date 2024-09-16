<template>
	<view class="bg">
		<view class="head_top"></view>
		<view class="user_info">
			<view class="user_logo">
				<image src="/static/logo.jpg" class="logo"></image>
			</view>
			<view class="user_name">{{ user_name }}</view>
			<view class="award_box">
				<view class="award_item">
					<!-- <text class="award_text">花花</text> -->
					<image src="/static/flower.png" />
					<text class="award_num">{{ num_flower }}个</text>
				</view>
				<view class="award_item">
					<!-- <text class="award_text">钻石</text> -->
					<image src="/static/diamond.png"/>
					<text class="award_num">{{ num_diamond }}个</text>
				</view>

			</view>
		</view>
		<view class="page_list">
			<view class="page_item" @click="go_award()">
				<text>奖励兑换</text>、
				<view class="icon">
					<uni-icons type="right" color="gray" size="24"/>
				</view>
			</view>
			<view class="page_item" @click="go_log()">
				<text>日志查看</text>
				<view class="icon">
					<uni-icons type="right" color="gray" size="24"/>
				</view>
			</view>
			<view class="page_item" @click="go_set()">
				<text>设置</text>
				<view class="icon">
					<uni-icons type="right" color="gray" size="24"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_name: "孙玉琼",
				user_avatar: '/static/avatar.png',
				num_flower: 15,
				num_diamond: 1,
			}
		},
		onLoad() {
			this.user_name = getApp().globalData.userInfo.user_name;
			this.user_avatar = getApp().globalData.userInfo.user_avatar;
		},
		onShow() {
			console.log("me onShow")
			this.num_flower = getApp().globalData.userInfo.data.key_data.flower.num_all;
			this.num_diamond = getApp().globalData.userInfo.data.key_data.diamond.num_all;
		},
		methods: {
			go_award() {
				uni.navigateTo({
					url: '/pages/award/award'
				})
			},
			go_log() {
				uni.navigateTo({
					url: '/pages/log/log'
				})
			},
		}
	}
</script>

<style lang="scss">
	.bg {
		width: 100%;
		height: 100vh;
		font-size: 14px;
		line-height: 24px;
		background:linear-gradient(to bottom, #98e9ff, #F8F8F8);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
/* 页面顶部圆弧背景 */
	.head_top {
		width: 100%;
		height: 200px;
		background:#98ddff;
		border-bottom-left-radius: 60%;
		border-bottom-right-radius: 60%;
		position:fixed;
		z-index: 1;
	}
	.user_info{
		background-color:#fff;
		margin-top: 100rpx;
		width: 300rpx;
		height: 400rpx;
		border-radius: 10%;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 2;
		.user_logo{
			width: 100px;
			height: 100px;
			border-radius: 50%;
			background-color: #fff;
			image{
				width: 100px;
				height: 100px;
				border-radius: 50%;
				border: 2px solid #98ddff;
			}
		}
		.user_name{
			font-size: 20px;
			font-weight: bold;
			margin-top: 10px;
			margin-bottom: 10px;
		}
		.award_box{	
			// background-color: blueviolet;
			height: 60px;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			width: 100%;
			margin-top: 5px;
			.award_item{
				// background-color: aqua;
				display: flex;
				flex-direction: column;
				align-items: center;
				.award_text{
					font-size: 12px;
				}
				.award_num{
					font-size: 16px;
				}
				image{
					width: 30px;
					height: 30px;
				}
			}
		}
	}
	.page_list{	
		background-color: #fff;
		width: 700rpx;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		.page_item{
			width: 700rpx;
			height: 50px;
			background-color:#FFF;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ccc;
			&:last-child {
				border-bottom: none;
			}
			&:first-child {
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
			}
			&:last-child {
				border-bottom-left-radius: 10px;
				border-bottom-right-radius: 10px;
			}
			text{
				font-size: 16px;
				// background-color: aqua;
				margin-left: 20px;
			}
			.icon {
				margin-right: 10px; /* Adjust the margin as needed */
			}
		}
	}

	

</style>