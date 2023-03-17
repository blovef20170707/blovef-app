<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 2px;">
			</view>
			<view style="width: 100%; background-color: white;border-radius: 8px;">
				<view style="height: 2px;">
				</view>
				<view style="display: flex;">
					<view style="width: 30%">
						<u-avatar :src="evaluationVO.series_pic" shape="square" size="80"></u-avatar>
					</view>
					<view style="width: 2%;">
					</view>
					<view style="width: 68%;font-size: 12px;">
						<view>
							<view>
								<text>品牌:{{evaluationVO.model_name}}</text>
							</view>
							<view>
								<text>车架号:{{evaluationVO.vin}}</text>
							</view>
							<view>
								<text>公里数:{{evaluationVO.mileage}}万公里</text>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 2px;">
				</view>
			</view>
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius: 8px;">
				<view style="font-size: 12px;">
					车辆评估价
				</view>
				<view style="height: 5px;">
				</view>
				<view style="display: flex;">
					<view style="width: 2.5%;">
					</view>
					<view class="demo1">
						<view class="demoText">
							<view>{{evaluationVO.vehicle_general_cssg}}万</view>
						</view>
						<view class="out"></view>
						<view class="in"></view>
					</view>
					<view style="width: 2.5%;">
					</view>
					<view class="demo2">
						<view class="demoText">
							<view>{{evaluationVO.vehicle_good_cssg}}万</view>
						</view>
						<view class="out">
						</view>
						<view class="in"></view>
					</view>
					<view style="width: 2.5%;">
					</view>
					<view class="demo3">
						<view class="demoText">
							<view>{{evaluationVO.vehicle_excellent_cssg}}万</view>
						</view>
						<view class="out">
						</view>
						<view class="in"></view>
					</view>
					<view style="width: 2.5%;">
					</view>
				</view>
				<view style="height: 15px;">
				</view>
				<view style="display: flex; font-size: 12px;color: #ffffff;">
					<view style="width: 2%;">
					</view>
					<view class="carPrice1">
						车况一般
					</view>
					<view class="carPrice2">
						车况良好
					</view>
					<view class="carPrice3">
						车况优秀
					</view>
					<view style="width: 2%;">
					</view>
				</view>
				<view style="display: flex; font-size:12px">
					<view style="width: 15%;">
						<view>{{evaluationVO.p1}}万</view>
					</view>
					<view style="width: 25%;">
						<view style="float: right;">{{evaluationVO.p2}}万</view>
					</view>
					<view style="width: 30%;">
						<view style="float: right;">{{evaluationVO.p3}}万</view>
					</view>
					<view style="width: 30%;">
						<view style="float: right;">{{evaluationVO.p4}}万</view>
					</view>
				</view>
			</view>
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius: 8px;">
				<view style="font-size: 12px;">
					抵押放款额
				</view>
				<view style="height: 5px;">
				</view>
				<view style="display: flex;">
					<view style="width: 2.5%;">
					</view>
					<view class="demo1" style="height: 25px">
						<view class="demoText">
							<view>{{evaluationVO.p5}}万</view>
						</view>
						<view class="out"></view>
						<view class="in"></view>
					</view>
					<view style="width: 2.5%;">
					</view>
					<view class="demo2" style="height: 25px">
						<view class="demoText">
							<view>{{evaluationVO.p6}}万</view>
						</view>
						<view class="out">
						</view>
						<view class="in"></view>
					</view>
					<view style="width: 2.5%;">
					</view>
					<view class="demo3" style="height: 25px">
						<view class="demoText">
							<view>{{evaluationVO.p7}}万</view>
						</view>
						<view class="out">
						</view>
						<view class="in"></view>
					</view>
					<view style="width: 2.5%;">
					</view>
				</view>
				<view style="height: 15px;">
				</view>
				<view style="display: flex;font-size: 12px;color: #ffffff;">
					<view style="width: 2%;">
					</view>
					<view class="carPrice1">
						征信差
					</view>
					<view class="carPrice2">
						征信一般
					</view>
					<view class="carPrice3">
						征信好
					</view>
					<view style="width: 2%;">
					</view>
				</view>
				<view style="height: 15px;">
				</view>
				<view style="width: 100%;display: flex;justify-content: center;">
					<view style="width: 50%;">
						<u-button text="提交申请" size="small" type="primary"></u-button>
					</view>
				</view>
				<view style="height: 5px;">
				</view>
			</view>
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;font-size: 12px;">
				<u-cell-group>
					<u-cell title="更多评估案例" value="" isLink></u-cell>
				</u-cell-group>
			</view>
			<view style="height: 5px;">
			</view>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiEvaluationReport
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				evaluationId: '',
				evaluationVO: {}
			}
		},
		onLoad(option) {
			console.log("option:", option);
			this.evaluationId = option.evaluationId;
			console.log("evaluationId:", this.evaluationId);
			this.evaluationReport();
		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			evaluationReport() {
				let params = {
					"id":this.evaluationId
				}
				apiEvaluationReport(params).then(data => {
					this.evaluationVO = data;
					console.log(this.evaluationVO)
				}).catch(exception => {
					console.log("exception", exception)
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
