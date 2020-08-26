# less 文件的引入
@import 'static/image.less';

# 无法全局使用less文件  只能用sass

# @/api 改为 ../../api/apiConfig
/pages/api/apiConfig


#  utils组件引入方式
原
import { getWeek, relogin, saver } from "@/utils";

换
import { getWeek, relogin, saver } from "pages/utils"; 



# 图片路径更改

原
../../assets/imgs/img-login-bg.jpg


换
/pages/assets/imgs/img-login-bg.jpg





# vux是无法使用的 只能重新写相关代码
## vux相关组件的替换
```
原
this.$vux.toast.show({
    time: 2000,
    type: "text",
    text: checkObj.msg,
    width: "9em"
});

换
uni.showToast({
    title: checkObj.msg,
    duration: 2000,
    icon:"none"
});
```

# axios发送请求替换
```
原
let [res, err] = await this.$store.dispatch("home/getUserInfor", options);

换
uni.request({
url: "http://nwgateway.shanglv51.com/cuser/login", //仅为示例，并非真实接口地址。
method: "POST", 
data: options,
success: function (res) {
    console.log(res.data);
},
});


```

# 路由跳转替换
原
<router-link class="row flex_x flex-y-center" to="/Air/AirHome">
    <img src="/static/imgs/air_ticket.png" alt />
    <p>机票预订</p>
    <i class="iconfont icon-right-line"></i>
</router-link>


换
<navigator class="row flex_x flex-y-center" url="/pages/views/Air/AirHome/index">
    <img src="/static/imgs/air_ticket.png" alt />
    <p>机票预订</p>
    <i class="iconfont icon-right-line"></i>
</navigator>




# vue文件中的图片引用只能放在static文件里才生效
 <img src="/static/imgs/index_fgt_banner1.jpg" alt />  








# 钉钉登录插件 暂时不用 
import { ready, biz } from "dingtalk-jsapi"; 


# 地图软件 暂时不用
import { lazyAMapApiLoaderInstance } from "vue-amap";