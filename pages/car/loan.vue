<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 10px;">
			</view>
			<view v-for="(item, index) in loanArray" :key="index">
				<view
					style="width: 100%;background-color: white;border-bottom-right-radius:8px;border-bottom-left-radius:8px;font-size: 12px;">
					<view style="height: 5px;">
					</view>
					<view style="display: flex;">
						<view style="width: 10%">
							<u-avatar :src="item.personUrl" size="35"></u-avatar>
						</view>
						<view style="width: 2%;">
						</view>
						<view style="width: 88%;font-size: 12px;">
							<view>
								<view style="display: flex;height: 20px;">
									<view style="width: 40%;">{{item.name}}</view>
									<view style="width: 30%;">{{item.age}}岁</view>
									<view style="width: 20%;">{{item.sex}}</view>
									<view style="width: 10%;">
										<view style="float: right;width: 98%;top:0"><u--image :src="item.hgUrl" width="15px" height="15px"></u--image></view>
									</view>
								</view>
								<view style="display: flex;height: 20px;">
									<view style="width: 40%;">{{item.phone}}</view>
									<view style="width: 30%;">{{item.dq}}</view>
									<view style="width: 30%;">征:{{item.zx}}</view>
								</view>
							</view>
						</view>
					</view>
					<view style="display: flex;">
						<view style="width: 10%">
							<u-avatar :src="item.pic" shape="square" size="35"></u-avatar>
						</view>
						<view style="width: 2%;">
						</view>
						<view style="width: 88%;font-size: 12px;">
							<view>
								<view style="display: flex;height: 20px;">
									<view style="width: 100%;">{{item.model_name}}</view>
									<!-- <view style="width: 30%;">渝A2671H</view> -->
								</view>
								<view style="display: flex;height: 20px;">
									<view style="width: 40%;">里程:{{item.mile}}万</view>
									<view style="width: 30%;">评:{{item.pgj}}万</view>
									<view style="width: 30%;">放:{{item.pay_sum}}万</view>
								</view>
							</view>
						</view>
					</view>
					<view style="display: flex;">
						<view style="width: 47%;">{{item.prod}}</view>
						<view style="width: 27%;">36期</view>
						<view style="width: 26%;">利率:{{item.rate}}%</view>
					</view>
					<view style="height: 2px;">
					</view>
					<view style="display: flex;">
						<view style="width: 74%;">放款时间</view>
						<view style="width: 26%;">{{item.pay_date}}</view>
					</view>
					<view style="height: 2px;">
					</view>
				</view>
				<view style="height: 10px;">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiQueryLoanArray
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				loanArray: [],
				triggered: false,
				_freshing: false,
				current: 1
			}
		},
		onLoad(option) {
			this.queryLoanArray();
		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			queryLoanArray() {
				apiQueryLoanArray({}).then(data => {
					console.log(data);
					this.loanArray = data;
				}).catch(exception => {
					console.log("getControlContextException:", exception);
				}).finally(res => {

				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		margin: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		font-size: 15px;
		color: #9c9c9c;
	}

	.container {
		width: 95%;
		// margin: 20px;
		// width: 500px;
		// height: 500px;
		// perspective: 1000px;
	}

	.demoText {
		color: #ffffff;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.carPrice1 {
		width: 32%;
		height: 20px;
		border: 1px solid #42a5f5;
		position: relative;
		background-color: #42a5f5;
		text-align: center;
	}

	.carPrice2 {
		width: 32%;
		height: 20px;
		border: 1px solid #3588c8;
		position: relative;
		background-color: #3588c8;
		text-align: center;
	}

	.carPrice3 {
		width: 32%;
		height: 20px;
		border: 1px solid #29699a;
		position: relative;
		background-color: #29699a;
		text-align: center;
	}

	.demo1 {
		width: 30%;
		height: 40px;
		border: 1px solid #42a5f5;
		position: relative;
		background-color: #42a5f5;

		.out,
		.in {
			position: absolute;
			width: 0;
			height: 0px;
		}

		.out {
			border: 10px solid transparent;
			border-top-color: #42a5f5;
			bottom: -20px;
			left: 40%;
		}
	}

	.demo2 {
		width: 30%;
		height: 40px;
		border: 1px solid #3588c8;
		position: relative;
		background-color: #3588c8;

		.out,
		.in {
			position: absolute;
			width: 0;
			height: 0px;
		}

		.out {
			border: 10px solid transparent;
			border-top-color: #3588c8;
			bottom: -20px;
			left: 40%;
		}
	}

	.demo3 {
		width: 30%;
		height: 40px;
		border: 1px solid #29699a;
		position: relative;
		background-color: #29699a;

		.out,
		.in {
			position: absolute;
			width: 0;
			height: 0px;
		}

		.out {
			border: 10px solid transparent;
			border-top-color: #29699a;
			bottom: -20px;
			left: 40%;
		}
	}
</style>
