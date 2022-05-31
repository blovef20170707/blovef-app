<template>
	<view>
		<view class="upview">
			<view style="display: inline-block;width: 90%;">{{control.control_name}}</view>
			<view class="upbt">
				<u-button slot="right" type="success" size="mini" @click="upload()">上传</u-button>
			</view>
		</view>
		<view>
			<u--image class="uimage" width="80px" height="80px" :src="control.controlVO.value" shape="circle">
				<view slot="error" style="font-size: 12px;">{{tip}}</view>
			</u--image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "bf-image",
		props: {
			control: Object,
			detailsParams: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'top',
				tip: ""
			}
		},
		mounted: function() {
			this.tip = this.control.controlVO.value == '' ? "请上传图片" : "加载失败";
		},
		methods: {
			upload() {
				// 组件跳转组件不能传递参数，所以跳转的页面
				uni.$u.route({url:'/pages/page/upload', params: {
					'control': JSON.stringify(this.control),
					'detailsParams': JSON.stringify(this.detailsParams)
				}});
			}
		}
	}
</script>

<style>
	.uimage {
		/* float: right; */
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
	}

	.upview {
		display: block;
		white-space: nowrap;
	}

	.upbt {
		float: right;
		width: 10%;
		display: inline-block;
	}
</style>
