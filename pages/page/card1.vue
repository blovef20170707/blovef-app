<template>
	<view>
		<view class="wrap">
			<block v-if="controlContextData.control_type == 'TABLE-LIST'">
				<view class="tableOperation">
					<block v-if="quickSearch.length  > 0">
						<view style="width: 55%;">
							<u-search height="50rpx" placeholder="快捷搜索" :show-action="true" action-text="搜索"
								:animation="true" v-model="keyword" :clearabled="true" bg-color="#ffffff"
								@custom="quickSearchSubmit()"></u-search>
						</view>
					</block>
					<view style="display: flex;">
						<block v-if="advancedSearch.length  > 0">
							<view class="tableButton">
								<u-button type="success" size="mini"
									@click="showAdvancedSearch = true" :plain="true">筛选</u-button>
							</view>
						</block>
						<block v-if="optionalSort.length  > 0">
							<view class="tableButton">
								<u-button type="warning" size="mini" 
									@click="showOptionalSort = true" :plain="true">排序</u-button>
							</view>
						</block>
						<block v-if="tableAddButton">
							<view class="tableButton">
								<u-button type="error" size="mini" :plain="true" 
									@click="buttonClick(tableAddButton)">{{tableAddButton.control_name}}</u-button>
							</view>
						</block>
						<view class="tableButton" v-for="(button, index) in tableCustomButton" :key="index">
							<u-button type="info" size="mini" :plain="true"
								@click="buttonClick(button)">{{button.control_name}}</u-button>
						</view>
					</view>
				</view>
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom"
					refresher-enabled="true" :refresher-triggered="triggered" :refresher-threshold="100"
					@refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
					@refresherabort="onAbort">
					<view class="page-box">
						<block v-if="tableData.length  <= 0">
							<u-empty marginTop="200"></u-empty>
						</block>
						<view class="order" v-for="(row, rowIndex) in tableData" :key="rowIndex">
							<view class="top">
								<view class="left">
									<u-icon name="order" size="16" color="rgb(94,94,94)"></u-icon>
									<view class="store">{{row[5].controlVO.value}}</view>
									<u-icon name="arrow-right" color="rgb(203,203,203)" size="14"></u-icon>
								</view>
								<view class="right">{{row[4].control_name}}：{{row[4].controlVO.value}}</view>
							</view>
							<view class="item">
								<view class="left">
									<u-image width="150rpx" height="150rpx" border-radius="10rpx"
										:src="row[8].controlVO.value" mode="aspectFill" shape="circle" :fade="true"
										duration="450">
										<view slot="error" style="font-size: 24rpx;">加载失败</view>
									</u-image> 
								</view>
								<view class="content">
									<view class="title u-line-2">
										{{row[3].control_name}}：{{row[3].controlVO.value}}
									</view>
									<view class="type">{{row[1].control_name}}：{{row[1].controlVO.label}}</view>
									<view class="type">{{row[6].control_name}}：{{row[6].controlVO.label}}</view>
									<view class="type">{{row[2].control_name}}：{{row[2].controlVO.value}}</view>
								</view>
								<view class="right">
									<view class="status">
										<block v-if="row[9].controlVO.value  == '2'">
											<u-image width="160rpx" height="160rpx" shape="circle"
												:src="row[9].controlVO.label"></u-image>
										</block>
									</view>
								</view>
							</view>
							<view class="total">
								{{row[7].control_name}}：{{row[7].controlVO.value}}
							</view>
							<view class="bottom">
								<view class="more">
									<u-icon name="more-dot-fill" color="rgb(4, 4, 4)"></u-icon>
								</view>
								<view class="cardButtonDiv">
									<u-button class="cardButton"
										v-for="(button, buttonIndex) in tableDataButton[rowIndex]" :key="buttonIndex"
										@click="buttonClick(button)" size="mini" :plain="true"
										:customStyle="button.controlVO.custom_style" :ripple="true">
										{{button.control_name}}
									</u-button>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
		<view>
			<u-popup :show="showAdvancedSearch" mode="right" :round="10" :closeable="true" @close="showAdvancedSearch = false">
				<view class="ads-list">
					<u-form labelPosition="top">
					<view v-for="(item, index) in advancedSearch" :key="index">
						<bf-ads-select :ref="item.key" @setAdsJson="setAdsJson" v-if="item.control_type == 'TEXT'"
							:control="item"></bf-ads-select>
					</view>
					</u-form>
					<view class="sort-op">
						<view style="width: 50%;">
							<u-button type="success" @click="adsSubmit()" size="small">确定</u-button>
						</view>
						<view style="width: 50%;">
							<u-button type="warning" @click="adsReset()" size="small">重置</u-button>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<view>
			<u-popup :show="showOptionalSort" mode="right" :round="10" :closeable="true" @close="showOptionalSort = false">
				<view class="sort-list">
					<view class="sort-row-name">排序字段</view>
					<view class="sort-row-value">
						<u-radio-group>
							<u-radio :customStyle="{marginLeft: '8px'}" shape="square" v-for="(item, index) in optionalSort" :key="index"
								:label="item.control_name" :name="item.control_name" @change="optionalSortChange">
							</u-radio>
						</u-radio-group>
					</view>
					<u-line border-style="dashed" color="#797979"></u-line>
					<view class="sort-row-name">排序方式</view>
					<view class="sort-row-value">
						<u-radio-group>
							<u-radio :customStyle="{marginLeft: '8px'}" shape="square" v-for="(item, index) in sortMode" :key="index"
								:label="item.name" :name="item.name" @change="sortModeChange"></u-radio>
						</u-radio-group>
					</view>
					<view class="sort-op">
						<view style="width: 50%;">
							<u-button type="success" @click="sortSubmit()" size="small">确定</u-button>
						</view>
						<view style="width: 50%;">
							<u-button type="warning" @click="sortReset()" size="small">重置</u-button>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import bfAdsSelect from '@/components/aip/ads/bf-ads-select.vue';
	import {
		apiGetControlContext
	} from '@/common/http.api.js';
	export default {
		components: {
			bfAdsSelect,
		},
		data() {
			return {
				pageContextData: '',
				controlContextData: '',
				tableData: '',
				tableDataButton: '',
				tableQuerySortOperation: '',
				tableAddButton: '',
				tableCustomButton: '',
				quickSearch: '',
				advancedSearch: '',
				optionalSort: '',
				params: '',
				triggered: false,
				_freshing: false,
				showAdvancedSearch: false,
				showOptionalSort: false,
				sortModeValue: '',
				optionalSortValue: '',
				adsJosn: {},
				sortMode: [{
						name: '正序',
						checked: false,
						disabled: false
					},
					{
						name: '倒序',
						checked: false,
						disabled: false
					}
				]
			};
		},
		// 第一次进入加载，参数可来源于菜单
		onLoad(option) {
			console.log("onLoad option", option);
			this.params = JSON.parse(option.params);
		},
		// 页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		onShow(option) {
			console.log("onShow params", this.params);
			this.getListByControl("init");
		},
		computed: {

		},
		// scroll-view是区域滚动，不会触发页面滚动，无法触发pages.json配置的下拉刷新、页面触底onReachBottomDistance
		// onPullDownRefresh() {
		// 	console.log('refresh');
		// 	this.getListByControl("init");
		// 	console.log('refreshend');
		// 	setTimeout(function() {
		// 		uni.stopPullDownRefresh();
		// 	}, 1000);
		// },

		methods: {
			// scroll-view自定义下拉刷新控件被下拉
			onPulling(e) {

			},
			// scroll-view自定义下拉刷新被触发
			onRefresh() {
				console.log("onRefresh");
				if (this._freshing) return;
				this._freshing = true;
				this.triggered = true;
				this.getListByControl("init");
			},
			// scroll-view自定义下拉刷新被复位
			onRestore() {
				console.log("onRestore");
				this.triggered = false;
				this._freshing = false;
			},
			// scroll-view自定义下拉刷新被中止
			onAbort() {
				console.log("onAbort");
			},
			// list页通过PAGE方式加载,暂时没有,修改成了通过TABLE控件方式加载
			// getListByPage() {
			// 	var params = {
			// 		"page_no": "27191887630696579"
			// 	};
			// 	this.$u.api.getPageContext(params).then(res => {
			// 		console.log("getPageContextStart:", res);
			// 		if (res.success && null != res.data) {
			// 			this.pageContextData = res.data;
			// 			console.log("pageContextData:", this.pageContextData);
			// 		}
			// 	}).catch(res => {
			// 		console.log("getPageContextException:", res);
			// 		getApp().$resShow(this, res);
			// 	}).finally(res => {
			// 		console.log("getPageContextEnd");
			// 	})
			// },
			// 排序字段的选择,目前只支持到单选
			optionalSortChange(e) {
				this.optionalSortValue = e;
			},
			// 排序方式的选择,目前支持正序和反序
			sortModeChange(e) {
				this.sortModeValue = "正序" == e ? "0" : "1";
			},
			// 排序字段和方式确认,确认后封装为getListByControl的参数,并请求
			sortSubmit() {
				if (this.optionalSortValue == '' || this.sortModeValue == '') {
					this.$refs.uToast.show({
						title: '排序字段和方式必须同时被选中',
						type: 'error'
					});
					return;
				}
				this.showOptionalSort = false;
				if (this.optionalSortValue == '' && this.sortModeValue == '') {
					return;
				}
				let sortValue = '';
				for (var i = 0, l = this.optionalSort.length; i < l; i++) {
					if (this.optionalSort[i].control_name == this.optionalSortValue) {
						sortValue = this.optionalSort[i].key;
						break;
					}
				}
				console.log(sortValue);
				console.log(this.sortModeValue);
				this.params.dataScopeVO.orderVOS = [];
				this.params.dataScopeVO.orderVOS.push({
					"key": sortValue,
					"sort": this.sortModeValue
				});
				this.getListByControl("search");
			},
			/**
			 * @param {Object} obj
			 * 高级查询条件设置,用于子组件设置父组件查询JSON
			 */
			setAdsJson(obj) {
				this.adsJosn[obj.key] = obj;
			},
			// 高级查询条件确认,确认后封装为getListByControl的参数,并请求
			adsSubmit() {
				this.params.dataScopeVO.queryScopeVOS = [];
				for (var val in this.adsJosn) {
					this.params.dataScopeVO.queryScopeVOS.push({
						"key": val,
						"value": this.adsJosn[val].value,
						"operator": this.adsJosn[val].operator,
						"and_or": "AND"
					});
				}
				if (this.params.dataScopeVO.queryScopeVOS.length > 0) {
					this.getListByControl("search");
				}
				this.showAdvancedSearch = false;
			},
			/**
			 * @param {Object} value 快捷搜索
			 * 用于list快捷查询,确认后封装为getListByControl的参数,并请求
			 */
			quickSearchSubmit(value) {
				this.params.dataScopeVO.queryScopeVOS = [];
				this.quickSearch.forEach(item => {
					this.params.dataScopeVO.queryScopeVOS.push({
						"key": item.key,
						"value": value,
						"operator": "6",
						"and_or": "OR"
					});
				});
				this.getListByControl("search");
			},
			/**
			 * @param {Object} type
			 * 通过控件方式加载控件内容，主要用于table
			 * init为进入页面时,search为查询【快捷,高级,排序】触发,nextpage为下一页
			 */
			getListByControl(type) {
				if ("init" == type || "search" == type) {
					this.params.dataScopeVO.dataPageVO.current = 1;
				}
				console.log(this.params)
				apiGetControlContext(this.params).then(data => {
					console.log("getControlContextSuccess :", data);
					if (data?.controlVO != null) {
						if ("init" == type) {
							this.controlContextData = data;
							this.tableData = this.controlContextData.controlVO.tableData;
							this.tableDataButton = this.controlContextData.controlVO.tableDataButton;
						} else if ("search" == type) {
							this.controlContextData = data;
							this.tableData = this.controlContextData.controlVO.tableData;
							this.tableDataButton = this.controlContextData.controlVO.tableDataButton;
						} else if ("nextpage" == type && data.controlVO.tableData.length > 0) {
							this.controlContextData.controlVO.tableData.push(...data.controlVO.tableData)
							this.controlContextData.controlVO.tableDataButton.push(...data.controlVO
								.tableDataButton)
							this.tableData = this.controlContextData.controlVO.tableData;
							this.tableDataButton = this.controlContextData.controlVO.tableDataButton;
						}
						if (data.controlVO.tableData.length > 0) {
							this.params.dataScopeVO.dataPageVO.current = this.params.dataScopeVO.dataPageVO
								.current +
								1;
						}
						this.tableQuerySortOperation = this.controlContextData.controlVO.tableQuerySortOperation;
						this.quickSearch = this.controlContextData.controlVO.tableQuerySortOperation.quickSearch;
						this.advancedSearch = this.controlContextData.controlVO.tableQuerySortOperation
							.advancedSearch;
						this.optionalSort = this.controlContextData.controlVO.tableQuerySortOperation.optionalSort;
						this.tableAddButton = this.controlContextData.controlVO.tableAddButton;
						this.tableCustomButton = this.controlContextData.controlVO.tableCustomButton;
					}
				}).catch( exception => {
					console.log("getControlContext Exception:", exception);
				}).finally(res => {

				})
			},
			reachBottom() {
				console.log("reachBottom");
				this.getListByControl("nextpage");
			},
			buttonClick(obj) {
				frame.buttonClick(this, obj);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.tableOperation {
		padding-left: 20rpx;
		padding-top: 10rpx;
		margin: 5rpx;
		display: flex;
	}
	.tableButton {
		// width: 30px;
		// font-size: 10px;
		margin-left: 8rpx;
	}

	.page-box {}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {

				width: 30%;
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				width: 40%;

				.title {
					font-size: 28rpx;
					line-height: 40rpx;
				}

				.type {
					margin: 0rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				width: 30%;
				// margin-left: 10rpx;
				// padding-top: 20rpx;
				text-align: right;

				.status {}

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.cardButtonDiv {
				display: flex;
				.cardButton {
					margin-left: 8rpx
				}
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}
	}



	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	.sort-row-name {
		width: 100%;
		margin: 10rpx;
	}

	.sort-row-value {
		width: 100%;
		margin: 10rpx;
	}

	.sort-list {
		width: 200px;
	}

	.sort-op {
		display: flex;
		width: 100%;
		
	}

	.ads-list {
		width: 200px;
	}
</style>
