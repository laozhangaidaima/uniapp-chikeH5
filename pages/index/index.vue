<template>
  <view class="content" :style="{ height: autoHeight }">
    <view class="flex_x" style="margin-top: 20.833rpx">
      <u-subsection
        :current="1"
        :list="['因公出行', '私人旅游']"
        class="btn"
        style="border-radius: 41.667rpx; width: 312.5rpx"
      ></u-subsection>
      <text class="btn2">差旅标准</text>
    </view>

    <view class="cardBackgroud">
      <view class="card1 flex_x flex_x flex-space-between">
        <text class="btn3" @click="toCityPick('fromCity')">{{
          searchData.fromCity || "出发城市"
        }}</text>

        <image
          :src="src"
          style="margin-top: 6.25rpx; width: 64.583rpx; height: 64.583rpx"
        ></image>
        <text class="btn3" @click="toCityPick('arrCity')">{{
          searchData.arrCity || "到达城市"
        }}</text>
      </view>
      <view class="underLine"></view>

      <view class="card1" @click="show = true">
        <text class="startData">{{ searchData.showTime || "出发时间" }}</text>
        <text class="startData2">{{ searchData.weekDay }}</text>
      </view>
      <view class="underLine"></view>

      <view class="card1">
        <u-button type="primary" @click="toSerch" class="search">搜索</u-button>
      </view>
    </view>
    <!-- 时间选择控件 -->
    <u-calendar
      v-model="show"
      :mode="mode"
      :min-date="minDate"
      :max-date="maxDate"
      @change="change"
    ></u-calendar>
  </view>
</template>

<script>
import { getWeekByDay } from "common/util.js";
import formatter from "@/common/formatter.js";

export default {
  data() {
    return {
      title: "Hello",
      src: "/static/flight_exchange.png",
      show: false,
      mode: "date",
      maxDate: "2020-9-20",
      // maxDate: getDateXHL(10),

      minDate: formatter.formatDate(new Date(), "yyyy-MM-dd"),

      searchData: {
        showTime: "",
        arrCity: "",
        fromCity: "",
      },
      autoHeight: "1041.667rpx",
    };
  },
  onLoad() {},
  onShow() {
    //   动态高度
    const res = uni.getSystemInfoSync();
    this.autoHeight = res.windowHeight - res.statusBarHeight + "px";

    uni.getStorage({
      key: "fromCity",
      success: (res) => {
        this.searchData.fromCity = res.data.cityName;
      },
    });
    uni.getStorage({
      key: "arrCity",
      success: (res) => {
        this.searchData.arrCity = res.data.cityName;
      },
    });
    uni.getStorage({
      key: "showTime",
      success: (res) => {
        this.searchData.showTime = res.data.showTime;
        this.searchData.weekDay = res.data.weekDay;
      },
    });

    this.maxDate = this.getDateXHL(60);
  },
  methods: {
    getDateXHL(num) {
      var date = new Date();
      var dateNumber = date.getTime();
      var differ = num * 24 * 60 * 60 * 1000;
      var needDateNumber = new Date(dateNumber + differ);
      var year = needDateNumber.getFullYear();
      var month = needDateNumber.getMonth() + 1;
      var day = needDateNumber.getDate();
      var monthX = month < 10 ? "0" + month : month;
      var dayX = day < 10 ? "0" + day : day;
      var nowDate = year + "-" + monthX + "-" + dayX;
      return nowDate;
    },

    toCityPick(city) {
      uni.navigateTo({
        url: "/pages/cityPick/cityPick?cityType=" + city,
      });
    },
    toSerch() {
      console.log("this.searchData.fromCity", this.searchData.fromCity);
      if (!this.searchData.fromCity) {
        uni.showToast({
          title: "请选择出发城市",
          duration: 2000,
          icon: "none",
        });
        return;
      }

      if (!this.searchData.arrCity) {
        uni.showToast({
          title: "请选择到达城市",
          duration: 2000,
          icon: "none",
        });
        return;
      }

      if (!this.searchData.showTime) {
        uni.showToast({
          title: "请选择出发时间",
          duration: 2000,
          icon: "none",
        });
        return;
      }


      uni.navigateTo({
        url: "/pages/airserch/airserch",
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
        weekDay: weekDay,
      };
      //
      //  出发时间
      uni.setStorage({
        key: "showTime",
        data: data,
        success: function () {},
      });

      // 获取时间
      uni.getStorage({
        key: "showTime",
        success: (res) => {
          this.searchData.showTime = res.data.showTime;
          this.searchData.weekDay = res.data.weekDay;
        },
      });

      // 同步
      // 存
      uni.setStorageSync("showTime", data);
      // 取
      const res = uni.getStorageSync("showTime");
      if (res) {
        console.log("change -> res", res);
        this.searchData.showTime = res.showTime;
        this.searchData.weekDay = res.weekDay;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  .content {
    background: url("/static/airbg.jpg");
    background-size: cover;
    //    height:100vh;

    overflow: hidden;
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
        padding-top: 45.833rpx;
        padding-bottom: 45.833rpx;
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

      .startData2 {
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
