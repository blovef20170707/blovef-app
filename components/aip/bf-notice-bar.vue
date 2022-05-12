<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-toast :type="type" ref="uToast"></u-toast>
			<u-notice-bar :autoplay="autoplay" :playState="playState" :speed="speed" @getMore="getMore" 
			:mode="mode" @end="end" @close="close" @click="click" :show="show" :type="type" :list="list"
			:moreIcon="moreIcon" :volumeIcon="volumeIcon" :duration="duration" :isCircular="isCircular"></u-notice-bar>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-notice-bar",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				show: true,
				autoplay: false,
				type: 'warning',
				list: [
					'锦瑟无端五十弦，一弦一柱思华年',
					'庄生晓梦迷蝴蝶，望帝春心托杜鹃',
					'沧海月明珠有泪，蓝田日暖玉生烟'
				],
				// list: control.controlVO.value,
				mode: 'horizontal'//vertical,
				playState: 'play',
				speed: 160,
				duration: 2000,
				moreIcon: true,
				volumeIcon: true,
				isCircular: true,
				current: 0
			}
		},
		onLoad() {

		},
		methods: {
			end() {
				// console.log('end');
			},
			close() {
				this.toast(`点击了关闭图标`);
			},
			getMore() {
				this.toast(`点击了更多图标`);
			},
			toast(title) {
				this.$refs.uToast.show({
					title: title,
					type: 'warning'
				})
			},
		}
	}
</script>

<style>
</style>
