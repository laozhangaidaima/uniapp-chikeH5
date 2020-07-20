<template>
	<view>
		<view class="Index">
			<view class="body">
				<!-- 顶部背景图片 -->
				<view class="top">
					<img src="/static/imgs/index_fgt_banner1.jpg" alt />
				</view>
				<!-- 第一行 -->
				<view class="container">

					<view class="company">
						<p>{{ temperature || 29 }}°</p>
						<i>{{ currentCity || "成都" }}</i>
						<!-- <i>{{ dayjs().format("MM月DD日") || "01月01日" }}</i>
					<i>{{ getWeek(dayjs()) || "周一" }}</i> -->

						<i>7月20号</i>
						<i>周一</i>
						<i>阴转阵雨</i>

						<!-- <i>
							{{
	            weather.dayWeather == weather.nightWeather
	            ? weather.dayWeather
	            : weather.dayWeather + "转" + weather.nightWeather
	            }}
						</i> -->
					</view>



					<view class="row flex_x flex-y-center" @click="toUrl('air')">
						<img src="/static/imgs/air_ticket.png" alt />
						<p>机票预订</p>
						<u-icon name="arrow-right" color="#111;"></u-icon>
					</view>


					<view class="row flex_x flex-y-center" @click="toUrl('hotel')">
						<img src="/static/imgs/hotel.png" alt />
						<p>酒店预订</p>
						<u-icon name="arrow-right" color="#111;"></u-icon>
					</view>


					<view class="row flex_x flex-y-center" @click="toUrl('train')">
						<img src="/static/imgs/train_ticket.png" alt />
						<p>火车票预订</p>
						<u-icon name="arrow-right" color="#111;"></u-icon>
					</view>

					<view v-show="isCar==1">
						<router-link class="row flex_x flex-y-center" to="/pages/login/login">
							<img src="/static/imgs/car-home.png" alt />
							<p>用车</p>
							<u-icon name="arrow-right" color="#111;"></u-icon>
							<!-- <i class="iconfont icon-right-line"></i> -->
						</router-link>
					</view>
					<!-- 不可用车 -->
					<view v-show="isCar==2">
						<view class="row flex_x flex-y-center" to="/Car/Index">
							<img src="/static/imgs/car-home.png" alt class="backColor" />
							<p style="color:#CFD5E3">用车</p>
							<i class="iconfont icon-right-line"></i>
						</view>
					</view>
					<view class="flex_x flex-y-center flex-space-between">
						<view class="column flex_y flex-y-center flex-x-center" @click="linkSubmitApply">
							<img src="/static/imgs/icon_business.png" alt />
							<p>出差申请</p>
						</view>
						<router-link class="column flex_y flex-y-center flex-x-center" to="/Apply/List">
							<img src="/static/imgs/apply.png" alt />
							<p>我的申请</p>
						</router-link>
						<view class="column flex_y flex-y-center flex-x-center wait-approval" @click="linkApplyList">
							<i class="approval-num" v-if="approvalNum">{{ approvalNum }}</i>
							<img src="/static/imgs/icon_seal.png" alt />
							<p>待我审批</p>
						</view>
						<view class="column flex_y flex-y-center flex-x-center" @click="linkReimbursre">
							<img src="/static/imgs/baoxiao.png" alt />
							<p>差旅报销</p>
						</view>
					</view>
				</view>
				<view class="cover" v-if="cover"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				companyName: "",
				cover: false,
				loginInfo: "",
				appid: "",
				code: "",
				sign: "",
				businessType: "",
				tel: "",
				currentCity: "",
				temperature: "",
				weather: "",
				approvalNum: 0,
				payModeId: "1",
				isCar: 1
			};
		},
		methods: {
			toUrl(url) {
				switch (url) {
					case 'air':
						console.log("321321")
						uni.navigateTo({
							url: '/pages/index/index'
						});
						break;
					case 'train':
						uni.navigateTo({
							url: '/pages/trina/query/query'
						});
						break;
					case 'hotel':
						uni.navigateTo({
							url: '/pages/hotel/index/index'
						});
						break;

					default:
						console.log("123")
				}
			},
		},

	}
</script>

<style lang="scss">
	page {
		overflow: hidden;
	}

	.Index {

		width: 100%;
		height: 100%;
		background: #f5f5f5;
		padding-bottom: 40px;

		.body {
			width: 100%;
			height: 100%;

			.top {
				width: 100%;
				height: 308.33rpx;
				margin-top: -40px;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.container {
				width: 708.33rpx;
				margin: -54.16rpx auto 0;
				position: relative;

				.company {
					width: 89%;
					height: 120rpx;
					font-size: 35.41rpx;
					padding-top: 36.45rpx;
					padding-left: 41.66rpx;
					padding-right: 41.66rpx;
					color: #111;
					display: flex;
					align-items: baseline;
					justify-content: space-around;
					border-top-right-radius: 41.66rpx;
					border-top-left-radius: 41.66rpx;
					border-bottom-right-radius: 8.33rpx;
					border-bottom-left-radius: 8.33rpx;
					background: #fff;
					margin-bottom: 14.58rpx;

					p {
						font-size: 52.08rpx;
						color: #1b86f7;
						line-height: 1;
					}

					i {
						line-height: 1;
						font-size: 29.16rpx;
						color: #111;
					}
				}
			}
		}

		.row {
			margin-bottom: 10.41rpx;
			padding-right: 31.25rpx;
			padding-left: 52.08rpx;
			background: #fff;
			border-radius: 8.33rpx;
			height: 120rpx;
			font-size: 31.25rpx;
			color: #111;

			img {
				width: 68.75rpx;
				height: 68.75rpx;
				margin-right: 37.5rpx;
				flex-shrink: 0;
			}

			p {
				flex: 1;
			}

			i {
				flex-shrink: 0;
				font-size: 33.33rpx;
				font-weight: 600;
			}
		}

		.column {
			width: 166.66rpx;
			background: #fff;
			border-radius: 8.33rpx;
			height: 140rpx;
			font-size: 25rpx;
			color: #111;
			line-height: 1;
			padding-top: 14.58rpx;

			img {
				width: 50rpx;
				height: 50rpx;
				margin-bottom: 27.08rpx;
			}
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

		.width {
			width: 348.95rpx;
		}

		.disabled {
			opacity: 0.5;
		}

		.cover {
			width: 100%;
			height: 100%;
			position: fixed;
			z-index: 1000;
			background: rgba(255, 255, 255, 0);
			top: 0;
			left: 0;
		}
	}

	.wait-approval {
		position: relative;
	}

	.approval-num {
		position: absolute;
		width: 33.33rpx;
		height: 33.33rpx;
		text-align: center;
		line-height: 33.33rpx;
		font-size: 20.83rpx;
		background-color: #f7161c;
		color: #fff;
		border-radius: 50%;
		right: 10.41rpx;
		top: 10.41rpx;
	}


	.backColor {
		filter: grayscale(100%);
		-webkit-filter: grayscale(100%);
		-moz-filter: grayscale(100%);
		-ms-filter: grayscale(100%);
		-o-filter: grayscale(100%);
	}
</style>
