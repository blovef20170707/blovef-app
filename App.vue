<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";

	// CSS库，看情况引入，如果有样式冲突地方则去掉全部引入，引入部分
	// @import "colorui/main.css";
	// @import "colorui/icon.css";
	body {
		background-color: #f1f1f1;
		// font-size: 15px;
		color: #333333;
		font-family: Helvetica Neue, Helvetica, sans-serif;
	}

	.bg-white {
		background-color: #ffffff;
		color: #666666;
	}
</style>
<script>
	import global from "common/global.js";
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const token = uni.getStorageSync('token');
			console.log("token:"+token);
			if (token) {
				console.log("index");
				if (global.appName == "crrtTrain") {
					console.log('crrtTrain Show')
					uni.request({
						url: global.baseUrl + '/crrt/train/login/auth',
						data: {},
						header: {'token': token},
						success: (res) => {
							console.log(res.data);
							if(res.data.code == 200){
								uni.$u.route({
									type: 'switchTab',
									url: '/pages/crrt/index/index'
								});
							}else {
								uni.$u.route({
									type: 'reLaunch',
									url: '/pages/login/login'
								});
							}
						}
					});
				} else {
					uni.$u.route({
						type: 'switchTab',
						url: '/pages/crrt/index/index'
					});
				}
			} else {
				console.log("login");
				// 因为首页是登录，这里不用再次
				// uni.$u.route({
				// 	type: 'reLaunch',
				// 	url: '/pages/login/login'
				// });
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			$errMsg: '系统异常，请稍后再试',
			$successMsg: '操作成功'
		},
		methods: {
			$resShow(_this, res) {
				let type = res.success ? "success" : "error";
				if (res.success && null == res.message) {
					res.message = this.globalData.$successMsg;
				} else if (!res.success && null == res.message) {
					res.message = this.globalData.$errMsg;
				}
				console.log(res);
				console.log(_this.$refs);
				_this.$refs.uToast.show({
					message: res.message,
					type: type
				});
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>