<template>
	<view class="menu">
		<block v-for="(menu, index) in menuContext" :key="index">
			<view class="">
				<view class="one">
					<text class="oneText">{{menu.menu_name}}</text>
					<u-icon name="arrow-down"></u-icon>
				</view>
				<view>
					<u-grid :col="3">
						<block v-for="(mc, c_index) in menu.children" :key="c_index">
							<u-grid-item @click="menuClick(mc.route_path,mc.route_params)">
								<u-icon :name="mc.menu_img" :size="46"></u-icon>
								<view class="grid-text">{{mc.menu_name}}</view>
							</u-grid-item>
						</block>
					</u-grid>
				</view>
			</view>
		</block>
	</view>

</template>

<script>
	import frame from '@/common/frame.js';
	import { apiGetMenu } from '@/common/http.api.js';
	export default {
		data() {
			return {
				menuContext: {}
			}
		},
		onLoad() {

		},
		onShow() {
			apiGetMenu({
				"menu_client": 1
			}).then(res => {
				if (res.success && null != res.data) {
					this.menuContext = res.data;
				}
			}).catch(res => {
				console.log("getMenuException:", res);
				this.$u.toast("加载出错");
			})
		},
		methods: {
			menuClick(route_path, route_params) {
				console.log("route_path", route_path);
				console.log("route_params", route_params);
				if(frame.isNull(route_path)){
					return;
				}
				this.$u.route(route_path, {
					params: route_params
				});
			}
		}
	}
</script>

<style lang="scss">
	
	.one {
		width: 100%;
		height: 46rpx;
		margin-top: 4rpx;
		background-color: #fafafa;
	}
	
	.oneText {
		font-size: 28rpx;
	}
	
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-info;
	}

	.menu {
		background-color: #ffffff;
		color: #666666;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
</style>
