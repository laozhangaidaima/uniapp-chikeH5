<template>
	<view v-cloak>
		<!-- 顶部 -->
		<view class="flex_x flex-x-center flex-y-center" style="background: linear-gradient(to right, #02a6ff, #3e5ceb); ">
			<view class="card">
				<!-- 第一行 -->
				<u-row gutter="16" style="margin-bottom: 41.667rpx;margin-top: 20.833rpx;">
					<u-col span="9">
						<view class="flex_x">
							<image :src="src" style="padding-top: 4.167rpx;margin-right: 12.5rpx;width:29.167rpx;height:29.167rpx"></image>
							<view style="color:#00000">{{airCurData.fromairportShortName}}--{{airCurData.toairportShortName}}</view>
						</view>
					</u-col>
					<u-col span="3" style="text-align: right;color:#999999 ">
						<view>{{"约"+ airCurData.flightTime}}</view>
					</u-col>
				</u-row>
				<!-- 第二行 -->
				<u-row gutter="16" style="margin-bottom: 20.833rpx;">
					<u-col span="3">
						<view class="flex_y">
							<!--  -->
							<view style="color:#999999">
								{{airCurData.depDate|formatTime}}
								{{airCurData.depDate|formatWeekDay}}
							</view>
							<view style="text-align: end;margin-right: 12.5rpx; ">{{airCurData.depDate|formatHour}}</view>
							<!--  -->
							<view style="color:#999999;margin-top:50rpx ">
								{{airCurData.arrDate|formatTime}}
								{{airCurData.arrDate|formatWeekDay}}
							</view>
							<view style="text-align: end;margin-right: 12.5rpx; ">{{airCurData.arrDate|formatHour}}</view>
						</view>
					</u-col>

					<u-col span="1">
						<image style="margin-top: 41.667rpx;width:20.833rpx;height:68px; " :src="src2"></image>
					</u-col>
					<!-- 机场 -->
					<u-col span="3">
						<view style="height:78px;margin-top:16px " class="flex_y flex-space-between">
							<view  >{{airCurData.orgAirportName}}</view>
							<view >{{airCurData.dstAirportName}}</view>
						</view>
					</u-col>
					<u-col span="5">
						<view class="flex_y" style="text-align: right;color:#999999 ">
							<view class>
								<image :src="airCurData.airLogo" style="display: inline-block;margin-right: 8.333rpx;width:25rpx;height:25rpx "></image>
								{{airCurData.carrierShortName}}{{airCurData.flightNo}}
							</view>
							<view class>{{airCurData.planeStyle}}</view>
							<view class>有餐食</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>

		<!-- 具体信息 -->
		<view v-for="(item,value,index) in  airCurData.cabin" :key="index" class="detilMsg" style="padding-bottom: 16px;    " >
			<u-row gutter="16">
				<u-col span="12">
					<view class="productTypeName">{{item.productTypeName}}</view>
				</u-col>
			</u-row>
			<u-row gutter="16">
				<u-col span="10" style="color: #999999;">
					<view class style="font-size: 1.1rem;color: #ff7625;">￥{{item.fdinfo.cost}}</view>

					<view class>
						{{item.fdinfo.policyCode}}
						<text style="margin-left: 8.333rpx;margin-right: 8.333rpx;">|</text>
						{{item.fdinfo.discountRate}}
						<text style="margin-left: 8.333rpx;margin-right: 8.333rpx;">|</text>
						{{"退改签"}}
					</view>
				</u-col>
				<u-col span="2">
					<view class="bookBtn">预订</view>
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
				airCurData: {},
				src: "/static/icon_flight_cabin.png",
				src2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAC5CAYAAADZAESwAAAACXBIWXMAAAsTAAALEwEAmpwYAAADHElEQVR42u2cv08UQRTHP2/ggoIJYMIZgyFUEIiEqL3hD/A/ITE2llSWNjb+N1poDRricQiVIViAMd4ZIIHcsjZvyTDMsXt7dwLhvWRzMzs/PvNm5uY7zT5J05R6vU6SJJyenhIxB1SBcWAMGNL3x0AD+APsA9HGAAsLCzjnGKS9DQGTwHSb8rv6PATmgR/ATx1E1NrBqsAsUKG4TevgttTTQrBHwEzw7gmwpL8P9N0e8BX4BHzRdxXgMbAN7ObBqgFoCngFLEYGNanPC2AdeAfsaNkMcBJ66Lz0PWDOyy8C79uAQovVndM+o7BZYMDz6A0w3MGaDWubKc0PaJ8XYA4Y1bQAr4EROrcRbSuaH/Udct5a+ZthnvI2r30Q9p3Bxr3CJbo3v4/xEDYWeNat+X2MhbChmNtdWDU4ic7BUq/whD6Z8w7VzH73oN9fZwDnjkPYX6/i91Kjds5/alkaaIrIOVjDa/exB559yBIi0gg92/MqrgL1Dj3xi+rAmpffC2EJ0PQ2y1vgsIRHh9o223BNEUliZ+OWQtHTewU4KkoRkSMRWRGRHRFBRBIR2dKyC7ADYNPLrwPLRaZU6yxrm8w2gYMMFNOzfRW+Gc/Dl8Az4DnwFJgAWlr3G/BZ18j/r27H1Dqm1Lv6x55TmUh106wW8DBRjwpfCzIPj1SPRgsuW1PX/aDTC0+2hmvq3QRwX8F39NqWXeUaemIkucNJ07Svz8bGxlna8R/NYDcPNthvQLYTr59ntVotd+R5unc1a5Y3spgz3vX6Bq9ZAYXOLY8ptZ0gBrt5MLFpvEVKnXe23appTG2DGMxgpmc2jQYzPbNpNJjBTM8MZjDTM4MZzGCmZwYzmOmZwQxmMNMzgxnM9MxgBjM9s2k0mOmZTaPBDGZ6ZmtmMNMzgxnMJMam0WA9scHsW8xWq0WaplQqldiAuooPcga7pMzig1h8EIsP0pFZfJALU1rWbkF8EL/vnsUHCcz/VLkZwvoWH8Tvu3R8kEvs6uKD4EVq6Fl8EK274p38ifYZPYj7Eh/kMj2z+CAxu17xQaTE1/2l7R952lhDzR0C3wAAAABJRU5ErkJggg=="
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
					this.airMsgData = res.data;
					this.airCurData = this.airMsgData[this.airMsgIndex];
				}
			});
		},

	};
</script>

<style lang="scss">
	page {
    background: #F2F6FC;
		.card {
			background: #ffffff;
			width: 94%;
			padding: 0 31.25rpx;
			margin: 20.833rpx auto;
			position: relative;
			border-radius: 6.25rpx;
		}
		.card::before,
		.card::after {
			content: "";
			display: block;
			width: 41.667rpx;
			height: 41.667rpx;
			border-radius: 50%;
			position: absolute;
			top: 90.167rpx;
			z-index: 10000;
		}

		.card::before {
			left: -20.833rpx;
			background-color: #02a6ff;
		}

		.card::after {
			right: -20.833rpx;
			background-color: #3e5ceb;
		}

		.productTypeName {
			width: 133.333rpx;
			height: 45.833rpx;
			line-height: 45.833rpx;
			font-size: 25rpx;
			border-top-left-radius: 10.417rpx;
			background-image: url(/static/tuijian.png);
			background-size: 100% 100%;
			color: #fff;
			text-align: center;
      margin-left: -4.167rpx;
		}

		.bookBtn {
			width: 91.667rpx;
			height: 56.25rpx;
			line-height: 56.25rpx;
			font-size: 25rpx;
			color: #ffffff;
			background-color: #ff7625;
			border-radius: 8.333rpx;
			text-align: center;
		}
    .detilMsg{
line-height: 54.167rpx;width: 94%;margin: 20.833rpx auto;background:#fff;border-radius:6.25rpx    
    }
	}
</style>
