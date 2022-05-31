<template name="bf-pagex">
	<view class="wrap">
		<view class="u-tabs-box">
			<u-tabs-swiper activeColor="#2979ff" ref="tabs" :list="pageContextData.viewContextVOList" name="view_name"
				:current="current" @change="change" is-scroll swiperWidth="750">
			</u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item"
				v-for="(viewContextVO, viewContextVOIndex) in pageContextData.viewContextVOList"
				:key="viewContextVOIndex">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<block v-for="(control, controlIndex) in viewContextVO.controlContextVOList" :key="controlIndex">
						<bf-input v-show="control.controlVO.status != 'hidden'" v-if="control.control_type == 'TEXT'"
							:control="control" inputType="text"></bf-input>
						<bf-input v-if="control.control_type == 'NUMBER'" :control="control" inputType="number">
						</bf-input>
						<bf-checkbox v-if="control.control_type == 'CHECKBOX'" :control="control"></bf-checkbox>
						<bf-picker-time v-if="control.control_type == 'DATETIME'" :control="control"></bf-picker-time>
						<bf-select v-if="control.control_type == 'SELECT'" :control="control"></bf-select>
						<!-- <bf-upload v-if="control.control_type == 'IMAGE'" :control="control" ></bf-upload> -->
						<bf-image v-if="control.control_type == 'IMAGE'" :control="control" :detailsParams="detailsParams"></bf-image>
						<bf-button v-if="control.control_type == 'TABLE-LIST'" :control="control"></bf-button>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view v-if="buttonArray.length>0">
			<lc-fab-touch ref="fab" :pattern="pattern" :content="buttonArray" :horizontal="horizontal" :vertical="vertical"
				:direction="direction" @trigger="fbaTrigger" @fabClick="fabClick" />
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import frame from '../../common/frame.js';  
	import bfText from '../../components/aip/bf-text.vue';
	import bfInput from '../../components/aip/bf-input.vue';
	import bfCheckbox from '../../components/aip/bf-checkbox.vue';
	import bfPickerTime from '../../components/aip/bf-picker-time.vue';
	import bfSelect from '../../components/aip/bf-select.vue';
	import bfUpload from '../../components/aip/bf-upload.vue';
	import bfImage from '../../components/aip/bf-image.vue';
	import bfButton from '../../components/aip/bf-button.vue';
	export default {
		name: "bf-pagex",
		props: {
			pageContextData: Object,
			// 用于存储详情页的查询条件，为组件页面返回刷新详情页
			detailsParams: Object
		},
		components: {
			bfText,
			bfInput,
			// -换成小写就行，bfCheckBox这种不行
			bfCheckbox,
			bfPickerTime,
			bfSelect,
			bfUpload,
			bfImage,
			bfButton,
		},
		data() {
			return {
				current: 0,
				swiperCurrent: 0,
				errorType: ['message'],
				horizontal: 'left',
				vertical: 'bottom',
				direction: 'vertical',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#000000',
					buttonColor: '#9E9E9E'
				},
				buttonArray: []
			}
		},
		// onLoad onShow是页面的生命周期，created是组件的生命周期
		created() {
			this.initButton();
		},
		methods: {
			// 点击标签时触发 tab栏切换
			change(index) {
				this.swiperCurrent = index;
			},
			// swiper-item 的位置发生改变时会触发
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			// 动画结束时会触发 animationfinish 事件
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// 初始化悬浮按钮
			initButton(){
				if(null != this.pageContextData.viewButtonVO && null != this.pageContextData.viewButtonVO.controlContextVOList
				&& this.pageContextData.viewButtonVO.controlContextVOList.length > 0){
					frame.initButton(this,this.pageContextData.viewButtonVO.controlContextVOList);
				}
			},
			// 悬浮按钮单个项点击事件
			fbaTrigger(e) {
				let button = this.pageContextData.viewButtonVO.controlContextVOList[e.index];
				button.pageParams = this.detailsParams;
				frame.buttonClick(this,button);
			},
			// 悬浮按钮点击事件
			fabClick() {
				console.log("fabClick");
			},
		}
	}
</script>

<style lang="scss">
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
