<template>
	<view>
		<day @sendparent="helloFn"></day>
		<!-- 机票 -->
		<view v-for="(item,index) in airData" :key="index" @click="toAirListDetail(index)">
			<!-- 分割线 -->
			<view class="splitLine"></view>
			<!-- 机票信息 -->
			<view style="width:90%;margin:0 auto ">
				<!-- 第一排 -->
				<u-row gutter="16" style="align-items: start;margin-top: 41.667rpx;">
					<u-col span="3">
						<view>
							<view class="font1">{{ item.depDate}}</view>
							<view class="font2" style="margin-top: 20.833rpx;">{{ item.fromairportShortName}}</view>
						</view>
					</u-col>
					<u-col span="3" class="font2">
						<text>{{item.flightTime }}</text>
						<image class="img" src="/static/img_jiantou.png"></image>
					</u-col>
					<u-col span="3">
						<view class="font1">{{ item.arrDate}}</view>
						<view class="font2" style="margin-top: 20.833rpx;">{{ item.toairportShortName}}</view>
					</u-col>

					<u-col span="3" class="font3" style="display: flex;align-items: center;white-space: nowrap;margin-top: 20.833rpx; ">
						<view class="" style="margin-top: 40.833rpx;">
							
						</view>
						<view>
							{{"￥" +item.priceFare+"起" }}
						</view>
					</u-col>
				</u-row>
				<!-- 第二排 -->
				<u-row gutter="16" style="" class="font2 ">
					<!-- 解决微信小程序 margin-top不生效问题-->
					<view style="margin-top: 41.667rpx;"></view>
					<view class="">
						<image :src="item.airLogo" style="margin-right: 8.33rpx;width: 25rpx;height: 25rpx; " :fade="false"></image>
						{{item.flightNo}}<text style="padding:0 6.25rpx;">|</text>
						{{item.planeStyle}}<text style="padding:0 6.25rpx;">|</text>
						{{"有餐食"}}
					</view>
					<!-- 解决微信小程序 margin-top不生效问题-->
					<view style="margin-bottom: 41.667rpx;"></view>
				</u-row>
			</view>
		</view>

	</view>
</template>

<script>
	import formatter from "@/common/formatter.js";
	import day from "@/components/day.vue";

	export default {
		data() {
			return {
				arrCity: "",
				fromCity: "",
				airData: [],
				isShow: true,
				takeOffDate: "",
				tocken: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTAxMTAwOTQ4MzY3ODEwYzEyMDAyMzcyMzMiLCJ1c2VySUQiOiIxOTIxMTAwOTQ4MzY3ODEwYzEyMDAyMzcyMzMyIiwiY29tcGFueUlEIjoiMTAwMTExMTcxNDQ0MTg2MGMwNDAwMjMyMzI3MSIsInVzZXJBY2NvdW50IjoiMTU5Mjg0NDYzMjc5IiwicGFydG5lckNvZGUiOiIwMSIsImlhdCI6MTU5NDE3OTM2OCwiZXhwIjoxNTk0MTgwNTY4fQ.rIrnwuDWO-bCT-CnBfPd9f3gBwpeAZDOAXL1UnfANX0",
				refreshTocken: "Bearer+eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTAxMTAwOTQ4MzY3ODEwYzEyMDAyMzcyMzMiLCJ1c2VySUQiOiIxOTAxMTA2OTQ4MzY3ODEwYzEyMDAyMzcyMzM2IiwiY29tcGFueUlEIjoiMTAwMTExMTcxNDQ0MTg2MGMwNDAwMjMyMzI3MSIsInVzZXJBY2NvdW50IjoiMTU5Mjg5NDYzMzc1IiwicGFydG5lckNvZGUiOiIwMSIsImlhdCI6MTU5MzU4OTg0NywiZXhwIjoxNTk2MTgxODQ3fQ.Myru6tfZ6p1epP9t7kEhZB_gIQO5FNyeEa2jMEJaoBY"
			};
		},
		components: {
			day
		},
		onPullDownRefresh() {
			this.helloFn(this.takeOffDate)
			uni.stopPullDownRefresh();

		},

		created() {
			uni.getStorage({
				key: "fromCity",
				success: res => {

					this.fromCity = res.data.cityCode;
					uni.getStorage({
						key: "arrCity",
						success: res => {
							this.arrCity = res.data.cityCode;
							uni.getStorage({
								key: "showTime",
								success: res => {
									this.takeOffDate = res.data.urlTime;
									this.getAit();
								}
							});
						}
					});
				}
			});
		},

		methods: {
			helloFn(param1) {
				console.log("helloFn -> param1", param1)
				this.takeOffDate = param1;
				this.getAit();
			},
			toAirListDetail(index) {
				uni.navigateTo({
					url: "/pages/AirListDetail/AirListDetail?inedx=" + index
				});
			},

			getTocken() {
				const url =
					"http://nwgateway.shanglv51.com/cuser/gettoken?refreshtoken=" +
					this.refreshTocken;
				const data = {
					data: {
						voyageTypeID: 1,
						firstVoyageInfo: {
							salePrice: 0,
							airTicket: 0
						},
						arrCity: "NKG",
						takeOffDate: this.takeOffDate || "2020-08-25 00:00:00",
						fromCity: "FOC",
						sourceName: "H5"
					}
				};
				uni.request({
					url: url,
					// data: data,
					method: "GET",
					success: res => {
						if (res.data.code === 1) {
							this.tocken = res.data.data.accessToken;
							this.getAit();
						}
					}
				});
			},
			getAit() {
				// 重置机票数据
				this.airData = []
				uni.showLoading({
					title: "加载中"
				});
				//

				const url =
					"http://nwgateway.shanglv51.com/domesticticketflight/yx/querysingle/flightQuerySingle";


				const data = {
					data: {
						voyageTypeID: 1,
						firstVoyageInfo: {
							salePrice: 0,
							airTicket: 0
						},
						arrCity: this.arrCity || "NKG",
						takeOffDate: this.takeOffDate || "2020-08-25 00:00:00",
						fromCity: this.fromCity || "FOC",
						sourceName: "H5"
					}
				};
				const header = {
					Authorization: this.tocken
				};

				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: header,
					success: res => {

						// tocken过期 重新拉取
						if (res.statusCode == 391) {
							this.getTocken();
						} else if (res.data.code == 0) {
							uni.showToast({
								title: res.data.message,
								duration: 3000,
								icon: 'none',
							});
						} else if (res.data.data.flights.length == 0) {
							uni.showToast({
								title: '当前日期暂无航班',
								duration: 6000,
								icon: 'none',
							});
						} else {
							// 处理数据格式
							this.airData = JSON.parse(JSON.stringify(res.data.data.flights));
							this.airData.forEach(element => {
								element.depDate = formatter.formatDate(element.depDate, "hh:mm");
								element.arrDate = formatter.formatDate(element.arrDate, "hh:mm");
							});
							uni.hideLoading();
							//  缓存机票 localstore
							uni.setStorage({
								key: "airMsg",
								data: res.data.data.flights,
								success: function() {}
							});
						}
					}



				});
			}
		}
	};
</script>

<style lang="scss">
	page {


		.splitLine {
			width: 750rpx;
			height: 12.5rpx;
			background-color: #F2F6FC;
		}


		.font1 {
			font-size: 39.58rpx;
			line-height: 39.58rpx;
		}

		.font2 {
			color: rgb(153, 153, 153);
			font-size: 25rpx;
			line-height: 25rpx;

			.img {
				height: 12.5rpx;
				width: 166.667rpx;
				margin-left: -33.333rpx;
			}
		}

		.font3 {
			color: #ff7624;
			font-size: 37.5rpx;
			line-height: 37.5rpx;
		}
	}
</style>
