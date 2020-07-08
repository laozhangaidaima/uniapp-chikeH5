<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	page{
		margin-top: 30px;
	}
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
