<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view class="todo">
				<view>
					<u-button :type="buttonStatus == false?'primary':'info'" text="未完成" @click="getIndex(0)"></u-button>
				</view>
				<view>
					<u-button :type="buttonStatus == true?'primary':'info'"  text="已完成" @click="getIndex(1)"></u-button>
				</view>
			</view>
			<view style="height: 10px;">
			</view>
			<view>
				<view>
					<u--text text="工作"></u--text>
					<u-line color="#2979ff"></u-line>
					<view style="height: 5px;">
					</view>
				</view>
				<view v-for="(item,index) in work" :key="index">
					<view class="row" v-if="item.do_status == dos">
						<view>
							{{item.content}}
						</view>
						<view>
							<u-button v-if="item.do_status == 0" type="primary" size="mini" text="完成" @click="done(item)"></u-button>
						</view>
					</view>
					<view style="height: 5px;">
					</view>
				</view>
			</view>
			<view>
				<view>
					<u--text text="个人"></u--text>
					<u-line color="#2979ff"></u-line>
					<view style="height: 5px;">
					</view>
				</view>
				<view v-for="(item,index) in me" :key="index">
					<view class="row" v-if="item.do_status == dos">
						<view>
							{{item.content}}
						</view>
						<view>
							<u-button v-if="item.do_status == 0" type="primary" size="mini" text="完成" @click="done(item)"></u-button>
						</view>
					</view>
					<view style="height: 5px;">
					</view>
				</view>
			</view>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {apiToDoList,apiToDoDone} from '@/common/http.api.js';
	export default {
		data() {
			return {
				work: [],
				me: [],
				dos: 0,
				buttonStatus: false
			}
		},
		onLoad() {

		},
		onUnload() {

		},
		onShow() {
			this.token = uni.getStorageSync('token');
			console.log("onShow:" + this.token);
			this.getIndex(0);
		},
		methods: {
			getIndex(obj) {
				if(obj == 0){
					this.buttonStatus = false;
				}else {
					this.buttonStatus = true;
				}
				apiToDoList({
					params: {
						"type": obj
					}
				}).then(data => {
					console.log("投诉", data)
					if (data) {
						this.work = data.work;
						this.me = data.me;
						this.dos = obj;
					}
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {
					console.log("res", res)
				})
			},
			done(obj){
				apiToDoDone({
					"id": obj.id
				}).then(data => {
					obj.do_status = 1;
					this.$refs.uToast.show({
						message: '成功',
						type: 'success'
					});
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {
				
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: white;
	}

	.wrap {
		margin: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		font-size: 12px;
		color: #7d7e7f;
	}

	.container {
		width: 97%;
	}

	.row {
		display: flex;
		justify-content: space-between;
	}

	.todo {
		display: flex;
		justify-content: space-between;
	}
</style>