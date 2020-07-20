<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onShow() {
			uni.makePhoneCall({
				// 手机号
				phoneNumber: '961011',
				// 成功回调
				success: (res) => {
					console.log('调用成功!')
					uni.switchTab({
					    url: '/pages/main/main'
					});
				},
				// 失败回调
				fail: (res) => {
					console.log('调用失败!')
					uni.switchTab({
					    url: '/pages/main/main'
					});
				}
			});
		},
		onLoad() {

		}

	}
</script>

<style lang="scss">

</style>
