<template>
	<view>
		<div class="Center">
			<!-- <my-header background="#fff" color="#111"></my-header> -->
			<div class="body">
				<div class="top">
					<img class="avatar" src="/static/imgs/icon_avatar.png" alt="" />
					<div class="userinfo">
						<span>您好，{{ username||'李磊' }}</span>
						<p @click="toggleEnterprise">
							<img v-show="companyNum !== 1" src="/static/imgs/icon_switch.png" alt="" />
							<i>{{ company||'湖南广电测试企业' }}</i>
						</p>
					</div>
				</div>
				<div class="main">
					<div class="order">
						<p>我的订单</p>
						<div>
							<router-link class="link" to="/Air/AirOrderList">
								<img src="/static/imgs/icon_air_order.png" alt="" />
								<span>国内机票</span>
							</router-link>
							<router-link class="link" to="/int_flight/order_list">
								<img src="/static/imgs/int_air.png" alt="" />
								<span>国际机票</span>
							</router-link>
							<router-link class="link" to="/Hotel/OrderList">
								<img src="/static/imgs/icon_hotel_order.png" alt="" />
								<span>国内酒店</span>
							</router-link>
							<router-link class="link" to="/Train/order_list">
								<img src="/static/imgs/icon_train_order.png" alt="" />
								<span>火车票</span>
							</router-link>
							<router-link class="link" to="/car/order-list">
								<img src="/static/imgs/My_Car2.png" alt="" />
								<span>用车</span>
							</router-link>
						</div>
					</div>
					<ul class="menu">
						<li>
							<a class="menuitem" href="javascript:;" @click="toApplyList">
								<img src="/static/imgs/icon_approve.png" alt="" />
								<p>我已审批</p>
								<u-icon name="arrow-right" color="#111;"></u-icon>
							</a>
						</li>
						<li>
							<router-link class="menuitem" to="/Center/Safety">
								<img src="/static/imgs/icon_safe.png" alt="" />
								<p>账号安全</p>
								<u-icon name="arrow-right" color="#111;"></u-icon>
							</router-link>
						</li>
						<li>
							<router-link class="menuitem" to="/Center/Infor">
								<img src="/static/imgs/icon_info.png" alt="" />
								<p>个人信息</p>
								<u-icon name="arrow-right" color="#111;"></u-icon>
							</router-link>
						</li>
						<li>
							<view class="menuitem" @click="toUrl('help')">
								<img src="/static/imgs/icon_help.png" alt="" />
								<p>帮助中心</p>
								<u-icon name="arrow-right" color="#111;"></u-icon>
							</view>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				company: "",
				companyNum: 1,
				id: ""
			};
		},
		methods: {
			toUrl(url) {
				switch (url) {
					case 'help':
						console.log("321321")
						uni.navigateTo({
							url: '/pages/center/help'
						});
						break;
					// case 'train':
					// 	uni.navigateTo({
					// 		url: '/pages/trina/query/query'
					// 	});
					// 	break;
					// case 'hotel':
					// 	uni.navigateTo({
					// 		url: '/pages/hotel/index/index'
					// 	});
					// 	break;

					default:
						console.log("暂无对应路径")
				}
			},
		},
	}
</script>

<style lang="scss">
	a {
		font-family: initial;
	}

	page {
		overflow: hidden;
	}

	.Center {
		width: 100%;
		height: 100%;

		.body {
			width: 100%;
			height: 100%;
			background: #f2f2f2;

			.top {
				width: 100%;
				height: 80px;
				position: relative;
				z-index: 9;
				background: url('/static/imgs/img_center_bg.jpg') no-repeat center;
				background-size: 100% 100%;
				padding: 48px 28px 0;
				display: flex;
				align-items: flex-start;

				.avatar {
					width: 67px;
					height: 67px;
					margin-right: 15px;
					flex-shrink: 0;
				}

				.userinfo {
					flex: 1;
					display: flex;
					height: 50px;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
					line-height: 1.2;
					overflow: hidden;

					span {
						font-size: 16px;
						color: #fff;
						font-weight: 600;
						margin-bottom: 10px;
					}

					p {
						display: flex;
						font-size: 11px;
						color: #fff;
						padding: 3px 6px;
						border-radius: 15px;
						border: 0.5px solid rgba(255, 255, 255, 0.5);
						background: rgba(255, 255, 255, 0.2);
						line-height: 1;
						max-width: 100%;
						overflow: hidden;
						touch-action: none;

						img {
							width: 12px;
							height: 12px;
							margin-right: 4px;
						}

						i {
							flex: 1;
							white-space: nowrap;
							overflow: hidden;
							line-height: 1.25;
							text-overflow: ellipsis;
						}
					}
				}
			}

			.main {
				margin: -100px 18px 0;

				.order {
					padding-top: 100px;
					background: #fff;
					border-radius: 4px;
					margin-bottom: 5px;

					p {
						height: 40px;
						line-height: 40px;
						font-size: 15px;
						color: #111;
						font-weight: 600;
						padding-left: 25px;
						border-bottom: 0.5px solid #e5e5e5;
					}

					div {
						display: flex;
						height: 60px;
						align-items: center;
						justify-content: space-around;

						.link {
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							line-height: 1.2;

							img {
								width: 28px;
								height: 28px;
								margin-bottom: 7px;
							}

							span {
								font-size: 11px;
								color: #111;
							}
						}
					}
				}

				.menu {
					padding-bottom: 49px;

					.menuitem {
						display: flex;
						width: 88%;
						height: 60px;
						margin-bottom: 5px;
						background: #fff;
						border-radius: 4px;
						align-items: center;
						padding: 0 15px 0 25px;

						img {
							width: 33px;
							height: 33px;
							flex-shrink: 0;
							margin-right: 18px;
						}

						p {
							flex: 1;
							font-size: 15px;
							color: #111;
						}

						i {
							flex-shrink: 0;
							font-size: 16px;
							color: #111;
							font-weight: 600;
						}
					}
				}
			}
		}
	}
</style>
