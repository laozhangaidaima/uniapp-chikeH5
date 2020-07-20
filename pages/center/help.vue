<template>
	<div class="HelpCenter">
		<!-- <my-header background="#fff" color="#111">
			<i slot="right" class="call iconfont icon-kefu" @click="call"></i>
		</my-header> -->
		<div class="body">
			<ul class="list">
				<li v-for="(item, index) in list" :key="index" @click="toHelpDetail(item.id, item.title)">
					<p>{{ index + 1 }}、{{ item.title }}</p>
					<u-icon name="arrow-right" color="#111;"></u-icon>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				list: [{
						title: "如何预订机票？",
						id: 6
					},
					{
						title: "如何预订火车票？",
						id: 7
					},
					{
						title: "如何预订酒店？",
						id: 8
					},
					{
						title: "如何进行差旅报销？",
						id: 2
					},
					{
						title: "什么是因公出行和私人旅游？",
						id: 10
					},
					{
						title: "为什么预订时无法关联申请单？",
						id: 1
					},
					{
						title: "什么是差补天数超额？",
						id: 3
					},
					{
						title: "什么是无忧付？",
						id: 4
					},
					{
						title: "忘记支付密码怎么办？",
						id: 5
					},
					{
						title: "联系客服",
						id: 9
					}
				]
			};
		},
		created() {},
		methods: {
			toHelpDetail(id, title) {


				uni.navigateTo({
					url: '/pages/center/HelpDetail?id=' + id + '&title=' + title
				});

				// this.$router.push({
				// 	path: "/Center/HelpDetail",
				// 	query: {
				// 		id,
				// 		title
				// 	}
				// });
			},
			call() {
				window.location.href = "tel:" + localStorage.getItem("hotCall");
			}
		}
	};
</script>
<style lang="less" scoped>
	.HelpCenter {
		width: 100%;
		height: 100%;

		.call {
			font-size: 20px;
		}

		.title {
			width: 80%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.body {
			width: 100%;
			height: 100%;
			background: #f8f8f8;
			overflow: auto;

			.list {
				padding-left: 15px;
				background: #fff;

				li {
					display: flex;
					align-items: center;
					height: 50px;
					border-bottom: 0.5px solid #e5e5e5;
					font-size: 14px;
					color: #111;
					padding-right: 15px;

					p {
						flex: 1;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						padding-right: 10px;
					}

					i {
						font-size: 14px;
						font-weight: 600;
					}
				}
			}

			.content {
				padding: 18px 15px;
				min-height: 100%;
				background: #fff;

				.text {
					font-size: 14px;
					color: #111;
					line-height: 20px;
				}

				.imgs {
					text-align: center;
					padding: 32px 65px 0;

					img {
						width: 100%;
						margin-bottom: 28px;
					}
				}
			}
		}
	}
</style>
