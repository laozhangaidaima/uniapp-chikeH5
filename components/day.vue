<template>
  <view>
    <view class="top"  >
      <view
        v-for="(item,index) in dayData"
        :key="index"
        :class="activeClass == index ? 'active':''"
        style="height:112.5rpx "
      >
        <view
          class="son"
          @click="getItme(index,item[0])"
          :style="{'color':activeClass == index ?'#1b86f7':'#ffffff'} "
        >
          <view style="margin-bottom: 12.5rpx;">{{item[0]|formatTime}}</view>
          <view>{{item[1]}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import formatter from "@/common/formatter.js";
export default {
  data() {
    return {
      urlTime: "",
      dayData: [],
      activeClass: 0
    };
  },
  filters: {
    // 处理时间格式
    formatTime: function(value) {
      if (!value) return "";
      value = formatter.formatDate(value, "MM/dd");
      return value;
    }
  },
  created() {
    uni.getStorage({
      key: "showTime",
      success: res => {
        // this.urlTime = res.data.urlTime;
        this.urlTime = formatter.formatDate(res.data.urlTime, "yyyy-MM-dd");
        console.log("this.urlTime", this.urlTime);
      }
    });
  },

  methods: {
    createdDay(dayCount = 60) {
      // 获得星期几
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

      // 生成 日期
      const arr = [];
      const indexArr = [];
      for (let i = 0; i < dayCount; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const day = formatter.formatDate(date, "yyyy-MM-dd");
        const weekDay = getWeekByDay(day);
        // 需要格式
        arr.push([day, weekDay]);
        indexArr.push(day);
      }
      this.activeClass = indexArr.indexOf(this.urlTime);

      console.log("createdDay ", indexArr.indexOf(this.urlTime));

      return arr;
    },
    getItme(index, item) {
      this.$emit("sendparent", item);
      this.activeClass = index;
    }
  },
  mounted() {
    this.dayData = this.createdDay();
  }
};
</script>

<style lang="scss">
.flex_y {
  display: flex;
  flex-direction: column;
}

.flex-x-center {
  justify-content: center;
}

page {
  .top {
    display: flex;
    overflow-x: auto;
    background: -webkit-linear-gradient(left, #02a6ff, #3e5ceb);
    .active {
      background-color: #ffffff;
      font-weight: bolder;
    }
    .son {
      width: 137.5rpx;
      text-align: center;
      color: #ffffff;
      margin-top: 12.5rpx;
    }
  }
}
</style>
