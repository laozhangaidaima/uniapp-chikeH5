<template>
	<view class="">
		<div class="HelpCenter">

			<div class="body">
				<div class="content">
					<div class="text" v-html="obj.text"></div>
					<div class="imgs" v-if="obj.imgs && obj.imgs.length > 0">
						<img v-for="item in obj.imgs" :src="item" alt="" :key="item" />
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import img1 from "@/static/imgs/img1.jpg";
	import img2 from "@/static/imgs/img2.jpg";
	import img3 from "@/static/imgs/img3.jpg";
	import img4 from "@/static/imgs/img4.jpg";
	import img5 from "@/static/imgs/img5.jpg";
	import air1 from "@/static/imgs/air1.jpg";
	import air2 from "@/static/imgs/air2.jpg";
	import air3 from "@/static/imgs/air3.jpg";
	import air4 from "@/static/imgs/air4.jpg";
	import air5 from "@/static/imgs/air5.jpg";
	import air6 from "@/static/imgs/air6.jpg";
	import hotel1 from "@/static/imgs/hotel1.jpg";
	import hotel2 from "@/static/imgs/hotel2.jpg";
	import hotel3 from "@/static/imgs/hotel3.jpg";
	import hotel4 from "@/static/imgs/hotel4.jpg";
	import hotel5 from "@/static/imgs/hotel5.jpg";
	import hotel6 from "@/static/imgs/hotel6.jpg";
	import train1 from "@/static/imgs/train1.jpg";
	import train2 from "@/static/imgs/train2.jpg";
	import train3 from "@/static/imgs/train3.jpg";
	import train4 from "@/static/imgs/train4.jpg";
	import train5 from "@/static/imgs/train5.jpg";
	import train6 from "@/static/imgs/train6.jpg";

	export default {
		name: "HelpDetail",
		data() {
			return {
				id: "",
				title: "",
				obj: "",
				tel: "",
				content: [{
						id: 1,
						text: "一、预订机票、酒店和火车票的行程时间需要在申请单的出差时间范围内，请确认所选行程是否与申请单时间相符。（若企业扩大了时间范围，例如可提前预订出差时间前两天的机票，则预订时间可提前两天）.<br/>二、请检查出差申请单是否已成功提交。",
						imgs: [img2]
					},
					{
						id: 2,
						text: "进入差旅报销功能，选择可进行报销的申请单，系统会自动计算差补天数（自动扣除节假日和周末）。您可根据实际的出差天数进行修改，然后提交出差报销单。",
						imgs: [img3, img4]
					},
					{
						id: 3,
						text: "系统会根据您的出差申请单计算最大差补天数（包含节假日和周末），您不可以填写超过该字数的差补天数。",
						imgs: []
					},
					{
						id: 4,
						text: "无忧付是企业支付的方式之一，选择无忧付支付方式时，员工不需要自己垫付出差费用。",
						imgs: []
					},
					{
						id: 5,
						text: "您可以进入“我的”菜单中的账号安全，通过支付密码设置中的重置支付密码进行找回。",
						imgs: [img5, img1]
					},
					{
						id: 6,
						text: `<div>
	                <p>第一步：点击首页的【机票预订】，进入机票查询首页；输入出发城市、到达城市及出发时间，点击【搜索】；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${air1}' />
	                </div>
	                <p>第二步：选择航班以及相应的舱位；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${air2}' />
	                  <img style='width: 100%;margin-bottom: 28px;' src='${air3}' />
	                </div>
	                <p>第三步：选择关联的出差申请单；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${air4}' />
	                </div>
	                <p>第四步：填写订单信息；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${air5}' />
	                </div>
	                <p>第五步：支付订单；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${air6}' />
	                </div>
	              </div>`,
						imgs: []
					},
					{
						id: 7,
						text: `<div>
	                <p>第一步：选择出发城市和到达城市，以及出发时间进行查询；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${train1}' />
	                </div>
	                <p>第二步：选择火车班次和座位；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${train2}' />
	                  <img style='width: 100%;margin-bottom: 28px;' src='${train3}' />
	                </div>
	                <p>第三步：选择关联的出差申请单；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${train4}' />
	                </div>
	                <p>第四步：填写订单信息；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${train5}' />
	                </div>
	                <p>第五步：支付订单；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${train6}' />
	                </div>
	              </div>`,
						imgs: []
					},
					{
						id: 8,
						text: `<div>
	                <p>第一步：选择要预订酒店的位置；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${hotel1}' />
	                </div>
	                <p>第二步：选择酒店和房型；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${hotel2}' />
	                  <img style='width: 100%;margin-bottom: 28px;' src='${hotel3}' />
	                </div>
	                <p>第三步：选择关联的出差申请单；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${hotel4}' />
	                </div>
	                <p>第四步：填写订单信息；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${hotel5}' />
	                </div>
	                <p>第五步：支付订单；</p>          
	                <div style='text-align: center;padding: 32px 65px 0;'>
	                  <img style='width: 100%;margin-bottom: 28px;' src='${hotel6}' />
	                </div>
	              </div>`,
						imgs: []
					},
					{
						id: 9,
						text: "",
						imgs: []
					},
					{
						id: 10,
						text: `
	            <div class="public">
	              <h2>因公出行</h2>
	              <p>-员工因工作出差原因需预订差旅产品；</p>
	              <p>-支持企业支付，员工无需个人垫付；</p>
	              <p>-预订时需关联员工出差申请单；</p>
	            </div>
	            <div class="private">
	              <h2>私人旅游</h2>
	              <p>-员工因私人原因外出旅游；</p>
	              <p>-不支持企业支付，员工需个人支付所有费用；</p>
	              <p>-预订时无需关联出差申请单；</p>
	            </div>
	          `,
						imgs: []
					}
				]
			};
		},
		onLoad(option) {
			console.log("option",option)
			
			this.title = option.title;
			this.id = option.id;
			let number = "961011";
			this.tel = "tel:" + number;
			this.content[8].text =
				`若您有其他问题，可通过以下方式与我们联系：<br><br>电 话：${number} <a href='${this.tel}' style='padding-left: 14px;color: #1b86f7;text-decoration: underline;'>点击拨打</a><br>微 信：15397606220<br>Q Q：1686762451<br>邮 箱：kefu@shanglv51.com`;
			for (let i = 0; i < this.content.length; i++) {
				if (Number(this.id) === Number(this.content[i].id)) {
					this.obj = this.content[i];
					break;
				}
			}
		},
		methods: {
			call() {
				window.location.href = this.tel;
			}
		}
	};
</script>

<style lang="scss">
	.HelpCenter {
		width: 100%;
		height: 100%;

		.call {
			font-size: 20px;
		}

		.title {
			width: 80%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.body {
			width: 100%;
			height: 100%;
			background: #f8f8f8;
			overflow: auto;

			.list {
				padding-left: 15px;
				background: #fff;

				li {
					display: flex;
					align-items: center;
					height: 50px;
					border-bottom: 0.5px solid #e5e5e5;
					font-size: 14px;
					color: #111;
					padding-right: 15px;

					p {
						flex: 1;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						padding-right: 10px;
					}

					i {
						font-size: 14px;
						font-weight: 600;
					}
				}
			}

			.content {
				padding: 18px 15px;
				min-height: 100%;
				background: #fff;

				.text {
					font-size: 14px;
					color: #111;
					line-height: 20px;
				}

				.imgs {
					text-align: center;
					padding: 32px 65px 0;

					img {
						width: 100%;
						margin-bottom: 28px;
					}
				}
			}
		}
	}
</style>
