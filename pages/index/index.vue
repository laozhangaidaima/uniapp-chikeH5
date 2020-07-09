<template>
  <view class="content">
    <view class="flex_x">
      <u-subsection
        :current="1"
        :list="['因公出行', '私人旅游']"
        class="btn"
        style="border-radius: 41.667rpx;width: 312.5rpx; "
      ></u-subsection>
      <text class="btn2">差旅标准</text>
    </view>

    <view class="cardBackgroud">
      <view class="card1 flex_x flex_x flex-space-between">
        <text class="btn3" @click="toCityPick('fromCity')">{{searchData.fromCity}}</text>
        <u-image width="64.583rpx" height="64.583rpx" :src="src" style="margin-top: 6.25rpx;" :fade="false" ></u-image>
        <text class="btn3" @click="toCityPick('arrCity')">{{searchData.arrCity}}</text>
      </view>
      <view class="underLine"></view>

      <view class="card1">
        <u-calendar v-model="show" :mode="mode" :max-date="maxDate" @change="change"></u-calendar>
        <text @click="show = true" class="startData">{{searchData.showTime}} </text>
        <text class="startData2" @click="show = true">{{searchData.weekDay}}</text>
      </view>
      <view class="underLine"></view>

      <view class="card1">
        <u-button type="primary" @click="toSerch" class="search">搜索</u-button>
      </view>
    </view>
  </view>
</template>

<script>
import { getWeekByDay } from "common/util.js";

export default {
  data() {
    return {
      title: "Hello",
      src:
        "data:image/png;base64,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",
      show: false,
      mode: "date",
      maxDate: "2020-9-20",
      searchData: {
        showTime: "出发时间",
        arrCity: "出发城市",
        fromCity: "到达城市"
      }
    };
  },
  onLoad() {},
  onShow() {
    uni.getStorage({
      key: "fromCity",
      success: res => {
        this.searchData.fromCity = res.data.cityName;
      }
    });
    uni.getStorage({
      key: "arrCity",
      success: res => {
        this.searchData.arrCity = res.data.cityName;
      }
    });
    uni.getStorage({
      key: "showTime",
      success: res => {
        this.searchData.showTime = res.data.showTime;
        this.searchData.weekDay = res.data.weekDay;
      }
    });
  },
  methods: {
    toCityPick(city) {
      uni.navigateTo({
        url: "/pages/cityPick/cityPick?cityType=" + city
      });
    },
    toSerch() {
      uni.navigateTo({
        url: "/pages/airserch/airserch"
      });
    },
    change(e) {
      // 07月14日 周二
      e.month = e.month.length < 2 ? "0" + e.month : e.month;
      const weekDay = getWeekByDay(e.result);
      e.month + "月" + e.day + "日" + weekDay;
      this.searchData.showTime = e.month + "月" + e.day + "日";

      // 储存时间
      const data = {
        showTime: this.searchData.showTime || "出发时间",
        urlTime: e.result + " 00:00:00",
        weekDay: weekDay
      };
      //  出发时间
      uni.setStorage({
        key: "showTime",
        data: data,
        success: function() {}
      });
    }
  }
};
</script>

<style lang="scss" scoped>
page {
  height: 100%;
  background-image: url("/static/airbg.jpg");
  background-size: cover;
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 40rpx;
    padding-right: 40rpx;
    .btn {
      border-radius: 41.66rpx;
    }
    .btn2 {
      width: 145.83rpx;
      height: 72.91rpx;
      line-height: 72.91rpx;
      text-align: center;
      color: #ffffff;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 41.66rpx;
      position: absolute;
      right: 41.667rpx;
    }
    .cardBackgroud {
      width: 100%;
      margin-top: 62.5rpx;
      border-radius: 8.33rpx;
      border: 2.08rpx solid #ebeef5;
      background-color: #fff;
      overflow: hidden;
      color: #303133;
      transition: 0.3s;
      .card1 {
        width: 90%;
        margin: 0 auto;
        padding-top: 22px;
        padding-bottom: 22px;
      }
      .search {
        background: linear-gradient(to right, #ff9536, #ff7843);
      }
      .underLine {
        display: block;
        height: 2.083rpx;
        width: 100%;
        background-color: #dcdfe6;
      }
      .btn3 {
        font-weight: bold;
        font-size: 50rpx;
        font-weight: bold;
        color: #000;
        font-family: -apple-system-font, "Helvetica Neue", sans-serif;
      }
      .startData {
        justify-content: left;
        font-size: 35.417rpx;
        color: #000;
      }
      .startData2{
        color: #000;
        margin-left: 12.5rpx;
      }
    }
  }
}

// 按钮边框去除
.u-hairline-border[data-v-6e15e680]:after {
  content: " ";
  position: absolute;
  pointer-events: none;
  box-sizing: border-box;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  left: 0;
  top: 0;
  width: 199.8%;
  height: 199.7%;
  -webkit-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
  border: none;
  z-index: 1;
}
</style>
