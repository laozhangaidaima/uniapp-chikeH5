<script>
	export default {
		onLaunch: function() {
			console.log("App Launch");
		},
		onShow: function() {
			console.log("App Show");
			// console.log("123",--status-bar-height);

		},
		onHide: function() {
			console.log("App Hide");
		}
	};
</script>

<style lang="scss">
	#ifdef APP-PLUS 
	page {
		margin-top: var(--status-bar-height);
	}
	#endif
	
	
	
	[v-cloak] {
		display: none !important;
	}


	.flex_y {
		display: flex;
		flex-direction: column;
	}

	.flex_x {
		display: flex;
	}

	.flex-y-center {
		align-items: center;
	}

	.flex-space-between {
		justify-content: space-between;
	}

	.flex-x-center {
		justify-content: center;
	}

	image {
		will-change: transform
	}

	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
