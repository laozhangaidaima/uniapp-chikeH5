<template>
	<view>
		<!-- 顶部 -->
		<view style="background-color:#02a6ff;height: 160px;line-height: 20px;	 " class="flex_x flex-x-center flex-y-center">
			<view class="top">
				<u-row gutter="16" style="margin-bottom: 20px;margin-top: 10px;">
					<u-col span="9">
						<view>{{airCurData.fromairportShortName}}--{{airCurData.toairportShortName}}</view>
					</u-col>
					<u-col span="3" style="text-align: right;">
						<view>{{airCurData.flightTime}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16" style="margin-bottom: 10px;">
					<u-col span="3">
						<view class="flex_y">
							<!--  -->
							<view class>
								{{airCurData.depDate|formatTime}}
								{{airCurData.depDate|formatWeekDay}}
							</view>
							<view class>{{airCurData.depDate|formatHour}}</view>
							<!--  -->
							<view class>
								{{airCurData.arrDate|formatTime}}
								{{airCurData.arrDate|formatWeekDay}}
							</view>
							<view class>{{airCurData.arrDate|formatHour}}</view>
						</view>
					</u-col>
					<u-col span="6">
						<view class="flex_y">
							<view class>{{airCurData.orgAirportName}}</view>
							<view class>{{airCurData.dstAirportName}}</view>
						</view>
					</u-col>
					<u-col span="3">
						<view class="flex_y" style="text-align: right;">
							<view class>{{airCurData.carrierShortName}}{{airCurData.flightNo}}</view>
							<view class>{{airCurData.planeStyle}}</view>
							<view class>有餐食</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>

		<!-- 具体信息 -->

		<view v-for="(item,value,index) in  airCurData.cabin" :key="index" style="line-height: 26px;width: 94%;margin: 10px auto;">
			<u-row gutter="16">
				<u-col span="12">
					<view style="color: #fff;background-color: #D1BD98;width: 60px; ">{{item.productTypeName}}</view>
				</u-col>
			</u-row>

			<u-row gutter="16">
				<u-col span="10" style="color: #999999;">
					<view class style="font-size: 1.1rem;color: #ff7625;">￥{{item.fdinfo.cost}}</view>

					<view class>
						{{item.fdinfo.policyCode}}
						{{item.fdinfo.discountRate}}
						{{"退改签"}}
					</view>
				</u-col>
				<u-col span="2">
					<view style="color: #ffffff;background-color: #ff7625;font-size: 0.875rem;height: 1.75rem;line-height: 1.75rem;border-radius: 4px;text-align: center; ">预订</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import formatter from "@/common/formatter.js";
	export default {
		data() {
			return {
				airMsgIndex: 0,
				airMsgData: {},
				airCurData: {}
			};
		},
		filters: {
			// 处理时间格式
			formatTime: function(value) {
				if (!value) return "";
				value = formatter.formatDate(value, "MM-dd");
				return value;
			},
			// 处理
			formatWeekDay: function(value) {
				if (!value) return "";

				function getWeekByDay(dayValue) {
					//dayValue=“2014-01-01”
					var day = new Date(Date.parse(dayValue.replace(/-/g, "/"))); //将日期值格式化
					var today = new Array(
						"周日",
						"周一",
						"周二",
						"周三",
						"周四",
						"周五",
						"周六"
					); //创建星期数组
					return today[day.getDay()]; //返一个星期中的某一天，其中0为星期日
				}
				value = getWeekByDay(value);
				return value;
			},
			//
			formatHour: function(value) {
				if (!value) return "";
				value = formatter.formatDate(value, "hh:mm");
				return value;
			}
		},
		onLoad: function(option) {
			//option为object类型，会序列化上个页面传递的参数
			this.airMsgIndex = option.inedx;
			uni.getStorage({
				key: "airMsg",
				success: res => {
					console.log("res.data", res.data)
					this.airMsgData = res.data;
					this.airCurData = this.airMsgData[this.airMsgIndex];
				},
				fail: () => {}
			});
		},

	};
</script>

<style lang="scss">
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

	page {
		.top {
			background-color: #ffffff;
			border-radius: 12.5rpx;
			width: 94%;
		}
	}
</style>
