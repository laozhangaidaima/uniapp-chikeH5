<template>
  <view class="img">
    <view class="header">差客e族登录</view>
    <view class="fa">
      <input
        v-model="pwdForm.account"
        type="text"
        placeholder="请输入手机号码/邮箱"
      />
      <i class="icon iconfont icon-Closewithcircle"></i>
    </view>

    <view class="fa">
      <input v-model="pwdForm.gdf" type="text" placeholder="请输入登录密码" />
      <text class="psd">忘记密码？</text>
    </view>

    <button class="login" size="default" type="default" @click="login">
      登录
    </button>
    <view class="switch">手机验证码登录</view>

    <view class="notice">
      登录即代表您同意我们的
      <text @click="jumpUrl">《服务协议》</text>
      <navigator url="http://h5.shanglv51.com/index_prod.html#!/article4"
        >《隐私政策》</navigator
      >
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      second: 0,
      canSendCode: true,
      loginType: 1,
      isShowCode: false,
      imgSrc: "",
      pictureKeyID: "",
      pwdForm: {
        account: "",
        pictureAnswer: "",
        pwd: "",
        type: 1000,
      },
      smsForm: {
        account: "",
        pictureAnswer: "",
        code: "",
        type: 1001,
      },
      interval: null,
    };
  },
  onLoad() {},
  methods: {
    login() {
      if (!this.pwdForm.account) {
        uni.showToast({
          title: "请输入手机号码/邮箱",
          duration: 2000,
          icon: "none",
        });
        return;
      }
      if (!this.pwdForm.gdf) {
        uni.showToast({
          title: "请输入登录密码",
          duration: 2000,
          icon: "none",
        });
        return;
      }

      const url = "http://nwgateway.shanglv51.com/cuser/login";
      const data = {
        data: {
          account: this.pwdForm.account,
          pwd: this.pwdForm.gdf,
          source: "h5",
          type: 1000,
        },
      };
      const header = {
        Authorization: this.tocken,
      };
      uni.request({
        url: url,
        data: data,
        method: "POST",
        header: header,
        success: (res) => {
        console.log("login -> res", res)
        },
      });

      uni.switchTab({
        url: "/pages/index/index",
      });
    },
    jumpUrl() {
      let url = "http://h5.shanglv51.com/index_prod.html#!/article3";
    },
  },
};
</script>

<style lang="scss">
@import url("/styles/iconfont.scss");

.img {
  background: #fff url(../../static/imgs/img-login-bg.jpg) no-repeat bottom
    center;
  height: 100vh;
  width: 100%;
}

.header {
  padding: 45px 0 50px 0;
  font-size: 24px;
  color: #111;
  text-align: center;
}

input {
  height: 100rpx;
  line-height: 100rpx;
  border-bottom: 1px solid #dddddd;
}

.fa {
  position: relative;
  width: 90%;
  margin: 0 auto;
}

.icon {
  position: absolute;
  top: 39.58rpx;
  right: 25rpx;
}

.psd {
  position: absolute;
  top: 29.16rpx;
  right: -14.58rpx;
  font-size: 31.25rpx;
  color: $theme-color;
}

.login {
  width: 687.5rpx;
  height: 83.33rpx;
  line-height: 83.33rpx;
  text-align: center;
  font-size: 31.25rpx;
  color: #fff;
  margin: 166.66rpx auto 41.66rpx;
  border-radius: 8.33rpx;
  background: linear-gradient(to right, #02a6ff, #3e5ceb);
}

.switch {
  width: 687.5rpx;
  margin: 0 auto;
  line-height: 1;
  text-align: right;
  font-size: 27.08rpx;
  color: $theme-color;
}

.notice {
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 20px;
  line-height: 1;
  width: 750rpx;
  font-size: 12px;
  color: #666;
  padding-bottom: 30px;
  flex-shrink: 0;
  text-align: center;

  navigator {
    color: $theme-color;
  }
}
</style>
