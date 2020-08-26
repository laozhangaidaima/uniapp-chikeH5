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
				<u-row gutter="16" style="align-items: start;padding-top: 41.667rpx;">
					<u-col span="3">
						<view class="flex_y">
							<text class="font1">{{ item.depDate}}</text>
							<text class="font2" style="margin-top: 20.833rpx;">{{ item.fromairportShortName}}</text>
						</view>
					</u-col>
					<u-col span="3" class="font2">
						<text>{{item.flightTime }}</text>
						<image class="img" src="/static/img_jiantou.png"></image>
					</u-col>
					<u-col span="3" class="flex_y">
						<text class="font1">{{ item.arrDate}}</text>
						<text class="font2" style="margin-top: 20.833rpx;">{{ item.toairportShortName}}</text>
					</u-col>
					<u-col span="3" class="font3" style="display: flex;align-items: center;margin-top: 37.5rpx; ">{{"￥" +item.priceFare+"起" }}</u-col>
				</u-row>
				<!-- 第二排 -->
				<u-row gutter="16" style="margin-top: 20.833rpx;width:90%;padding-bottom: 41.667rpx; " class="font2">
					<u-image width="25rpx" height="25rpx" :src="item.airLogo" style="margin-right: 8.33rpx;" :fade="false"></u-image>
					{{item.flightNo}}<text style="padding:0 6.25rpx;">|</text>
					{{item.planeStyle}}<text style="padding:0 6.25rpx;">|</text>
					{{"有餐食"}}
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
				// 正常请求参数
				tocken: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMDAxMTkxNTE3MDEyODMwYTAxODM0NjE1MTEiLCJ1c2VySUQiOiIyMDAxMTkxNTk3MDEyODMwYTAxODM0NjE1MTE4IiwiY29tcGFueUlEIjoiMTkyMTA3MTcwMTUyNTgyMGMwNDAwMjMyMjk2MiIsInVzZXJBY2NvdW50IjoiMTQ2ODM0NDkyNjAxIiwicGFydG5lckNvZGUiOiIwMSIsImlhdCI6MTU5ODQyMDA0NCwiZXhwIjoxNTk4NDIxMjQ0fQ.p7WYSTCKPigvIGZHs3Q4cQ6haN48ZszGNTZleF8N1K0",
				// 重新获取token参数
				refreshTocken: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMDAxMTkxNTE3MDEyODMwYTAxODM0NjE1MTEiLCJ1c2VySUQiOiIyMDAxMTkxNTE3MDEyODMwYTAxODM0NjE1MTEwIiwiY29tcGFueUlEIjoiMTkwMTA3MTcwMTUyNTgyMGMwNDAwMjMyMjk2MCIsInVzZXJBY2NvdW50IjoiMTM2ODc0NDkyNjA0IiwicGFydG5lckNvZGUiOiIwMSIsImlhdCI6MTU5ODQxMzk0MiwiZXhwIjoxNjAxMDA1OTQyfQ.vwcZOhd8T48NMIiicJ8LU0AW8IelARPBgWF04PTwZyI"
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
