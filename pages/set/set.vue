<template>
	<view>
		<text>
			这个页面的按钮谨慎点击，会重置所有数据
		</text>
		<button @click="delete_all_log()">日志重置</button>
		<button @click="reset_all()">全局数据重置</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			async delete_all_log() {
				const LM = uniCloud.importObject("log_manager");
				const res = await LM.delete_log(getApp().globalData.device);
				console.log(res);
				uni.showToast({
					title: "重置完成"
				})
			},
			async reset_all() {
				uni.removeStorageSync('userInfo');
				uni.removeStorageSync('lastResetTimestamp');
				uni.showToast({
					title: "重置完成，请手动退出小程序，清除后台并重新打开",
					duration: 5000,
					success: () => {
						uni.exitMiniProgram({
							success: function() {
								console.log('退出小程序成功');
							},
							fail: function(err) {
								console.log('退出小程序失败', err);
							}
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>