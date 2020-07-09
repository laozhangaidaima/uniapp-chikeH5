<template>
  <view>
    <day @sendparent="helloFn"></day>
    <view
      v-for="(item,index) in airData"
      :key="index"
      style="margin-left: 41.66rpx;margin-top: 83.33rpx; "
      @click="toAirListDetail(index)"
    >
      <u-row gutter="16" style="align-items: start;margin-top: 41.66rpx;">
        <u-col span="3">
          <view class="flex_y">
            <text class="font1">{{ item.depDate}}</text>
            <text class="font2" style="margin-top: 10px;">{{ item.fromairportShortName}}</text>
          </view>
        </u-col>
        <u-col span="3" class="font2">
          <text>{{item.flightTime }}</text>
          <image class="img" src="/static/img_jiantou.png"></image>
        </u-col>

        <u-col span="3" class="flex_y">
          <text class="font1">{{ item.arrDate}}</text>
          <text class="font2" style="margin-top: 10px;">{{ item.toairportShortName}}</text>
        </u-col>
        <u-col
          span="3"
          class="font3"
          style="display: flex;align-items: center; "
        >{{"￥" +item.priceFare+"起" }}</u-col>
      </u-row>
      <u-row gutter="16" style="margin-top: 10px;margin-left: 3px; " class="font2">
        <u-image
          width="12px"
          height="12px"
          :src="item.airLogo"
          style="margin-right: 8.33rpx;"
          :fade="false"
        ></u-image>
        {{item.carrierShortName + item.flightNo+item.planeStyle + "有餐食" }}
      </u-row>
    </view>

    <u-toast ref="uToast" />
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
      tocken:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTAxMTAwOTQ4MzY3ODEwYzEyMDAyMzcyMzMiLCJ1c2VySUQiOiIxOTIxMTAwOTQ4MzY3ODEwYzEyMDAyMzcyMzMyIiwiY29tcGFueUlEIjoiMTAwMTExMTcxNDQ0MTg2MGMwNDAwMjMyMzI3MSIsInVzZXJBY2NvdW50IjoiMTU5Mjg0NDYzMjc5IiwicGFydG5lckNvZGUiOiIwMSIsImlhdCI6MTU5NDE3OTM2OCwiZXhwIjoxNTk0MTgwNTY4fQ.rIrnwuDWO-bCT-CnBfPd9f3gBwpeAZDOAXL1UnfANX0",
      refreshTocken:
        "Bearer+eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTAxMTAwOTQ4MzY3ODEwYzEyMDAyMzcyMzMiLCJ1c2VySUQiOiIxOTAxMTA2OTQ4MzY3ODEwYzEyMDAyMzcyMzM2IiwiY29tcGFueUlEIjoiMTAwMTExMTcxNDQ0MTg2MGMwNDAwMjMyMzI3MSIsInVzZXJBY2NvdW50IjoiMTU5Mjg5NDYzMzc1IiwicGFydG5lckNvZGUiOiIwMSIsImlhdCI6MTU5MzU4OTg0NywiZXhwIjoxNTk2MTgxODQ3fQ.Myru6tfZ6p1epP9t7kEhZB_gIQO5FNyeEa2jMEJaoBY"
    };
  },
  components: {
    day
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
          // 这里要修改
          if (res.statusCode == 391) {
            this.getTocken();
          }else if(res.data.code==0){
           uni.showToast({
            title: res.data.message,
            duration: 3000,
            icon:'none',

            });
            
          }else {
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

.center {
  position: absolute;
  border: 1px solid black;
  width: 300px;
  padding: 10px;
  left: 50%;
  top: 30%;
  z-index: 1001;
  // box-sizing: border-box;
  // transform: translate(-50%, -20%);
}

page {
  .font1 {
    font-size: 39.58rpx;
    line-height: 39.58rpx;
  }

  .font2 {
    color: rgb(153, 153, 153);
    font-size: 25rpx;
    line-height: 25rpx;
    .img {
      height: 6px;
      width: 80px;
      margin-left: -16px;
    }
  }

  .font3 {
    color: #ff7624;
    font-size: 37.5rpx;
    line-height: 37.5rpx;
  }
}
</style>
