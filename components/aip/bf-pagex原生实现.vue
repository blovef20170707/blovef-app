<template name="bf-pagex">
	<view>
		<scroll-view class="shadow" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view class="tab-view" :class="viewContextVOIndex == viewIndex ? 'text-blue tab-tap' : ''"
				v-for="(viewContextVO, viewContextVOIndex) in pageContextData.viewContextVOList"
				:key="viewContextVOIndex" @tap="viewSelect" :data-id="viewContextVOIndex">
				{{ viewContextVO.view_name }}
			</view>
		</scroll-view>
		<block v-if="pageContextData.viewContextVOList.length>0">
			<swiper :current="viewIndex" class="swiper-box" :duration="300" @change="viewChange"
				:style="[{height:'100vh' }]">
				<swiper-item v-for="(viewContextVO, viewContextVOIndex) in pageContextData.viewContextVOList"
					:key="viewContextVOIndex">
					<scroll-view @scroll="" :scroll-top="tapscrollTop" class="swiper-box" scroll-y
						:style="[{height:'100vh' }]">
						<u-form :model="model" ref="uForm" :errorType="errorType">
							<block v-for="(control, controlIndex) in viewContextVO.controlContextVOList"
								:key="controlIndex" v-if="viewContextVOIndex==viewIndex">
								<u-form-item :label-position="labelPosition" :label="control.control_name"
									label-width="200">
									<u-input type="text" input-align="right"
										:placeholder="`请输入${control.control_name}`"></u-input>
								</u-form-item>
							</block>
						</u-form>
					</scroll-view>
				</swiper-item>
			</swiper>
		</block>
	</view>
</template>

<script>
	export default {
		name: "bf-pagex",
		props: {
			pageContextData: Object
		},
		data() {
			return {
				viewIndex: 0,
				scrollLeft: 0,
				tapscrollTop: 0,
				labelPosition: 'left',
				errorType: ['message'],
			}
		},
		onLoad() {

		},
		methods: {
			viewSelect(e) {
				this.viewIndex = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 80;
				uni.pageScrollTo({
					scrollTop: 0
				});
			},
			viewChange(e) {
				if (e && e.detail && e.detail.current >= 0) {
					// this.$nextTick(() => {
					this.viewIndex = e.detail.current;
					// this.scrollLeft = (e.detail.current - 1) * 80
					uni.pageScrollTo({
						scrollTop: 0
					});
					// });
				}
			},
		}
	}
</script>

<style lang="scss">
	.tab-view {
		margin: 0 20upx;
		padding: 0 0 10upx 0;
		max-width: 180upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;

		&.tab-tap {
			border-bottom: 6upx solid
		}
	}

	.shadow {
		box-shadow: 0 0 20upx 0 #ccc;
	}

	.swiper-box {
		flex: 1;
		width: 100%;
	}
</style>
