<template>
	<view class="wrap">
		<view class="container">
			<view>
				<view style="height: 4px;">
				</view>
				<view style="width: 100%;background-color: white;">
					<u-swiper imgMode="heightFix" :list="banList"></u-swiper>
				</view>
				<view style="height: 4px;"></view>
				<!-- 				<view style="background-color: white;border-radius:5px;">
					<view style="display: flex;"><text>讲师介绍</text>
					</view>
				</view> -->
				<view style="height: 4px;"></view>
				<view v-for="(item,index) in jslist">
					<view style="background-color: white;border-radius:5px;display: flex;">
						<view style="display: flex;">
							<view><u-avatar :src="item.img" size="80"></u-avatar></view>
							<view style="padding-left: 10px;">
								<view><text style="color: black;font-size: 13px;">{{item.name}}</text></view>
								<view style="display: flex;">
									<view v-for="(tagitem,tagindex) in item.tag" :key="tagindex">
										<u-tag :text="tagitem.name" plain size="mini" :bgColor="tagitem.color"
											color="#ffffff" borderColor="#ffffff" plain plainFill></u-tag>
									</view>
								</view>
								<view>
									<u--text size="12" :lines="3" color="#888888" :text="item.content"></u--text>
								</view>
							</view>
						</view>
					</view>
					<view style="height: 10px;"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	export default {
		data() {
			return {
				jslist: [
					{
							"img": "https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/ltx.jpg",
							"name": "罗羽",
							"content": "为军队育才银奖获得者、重庆市护理学优秀研究生导师团队带头人、重庆市研究生教育先进个人、重庆市三八红旗手、陆军军医大学校优秀教学团队带头人、大学校优秀研究生导师。现任教育部高等学校护理学类专业教指委委员、教育部护理专业认证委员会委员，重庆市护理学会理事及教育专委会副主委员，全军护理专业委员会管理组委员，《护理研究》、《护理学杂志》、《解放军护理杂志》、《中国实用护理杂志》、IJNS、《解放军护理杂志》等专业杂志编委，国外多部SCI专业期刊reviewer。主持获包括国社科、军队创新基金、国重实验室开放基金、教育部部重实验室开放基金、重庆市人文社科基金、重庆市教委教改重点项目、重庆市研究生教改项目在内的各级教研课题30余项；发表SCI论著19篇（最高影响因子IF17分）；发表中文论文110篇；主编、参编国家级、军队级教材及专著15部。获中华护理科技进步一等奖、三等奖2项，获各级教学奖励6项，获评2019年中华百篇优秀护理论文。",
							"tag": [{
									"name": "院长",
									"color": "#ff7777"
								},
								{
									"name": "护理学院",
									"color": "#bcbcbc"
								},
								{
									"name": "医学博士",
									"color": "#bcbcbc"
								},
								{
									"name": "教授",
									"color": "#bcbcbc"
								}
							],
					},
					{
							"img": "https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/ntx.jpg",
							"name": "王沂芹",
							"content": "长期从事肾脏病临床、科研、教学及血液净化中心管理工作。现任全军血液净化专业委员会青年委员，重庆市医学会内科学专业委员会委员。",
							"tag": [{
									"name": "副主任",
									"color": "#ff7777"
								},
								{
									"name": "肾内科",
									"color": "#bcbcbc"
								},
								{
									"name": "副教授",
									"color": "#bcbcbc"
								}
							],
					},
					{
						"img": "https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/sy.jpg",
						"name": "石钰",
						"content": "德国海德堡大学访问学者、RECOM研发中心客座研究员、中华护理学会护理理论研究专委会委员、重庆市护理学会慢病专委会副主任委员、重庆市预防医学会肾脏病防治专委会委员兼秘书、作为项目负责人主持各类科研项目 11项（其中省部级以上 6项）、以第一/通讯作者发表核心期刊论文 31篇（其中SCI 7篇）；、获新技术等级评审护理一级 2项、护理二级 2项；、获国家卫健委“护理质量提灯奖-金奖”（第一完成人）、中华护理学会“科技奖-三等奖”（第一完成人）、中国研究型医院学会“创新发明奖”（第一完成人）等",
						"tag": [{
								"name": "护士长",
								"color": "#ff7777"
							},
							{
								"name": "肾内科",
								"color": "#bcbcbc"
							},
							{
								"name": "博士研究生",
								"color": "#bcbcbc"
							}
						],
					}, {
						"img": "https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/xjc.jpg",
						"name": "熊加川",
						"content": "中国中药协会肾病专委会青年委员、重庆市医院协会肾病管理专委会委员、重庆市医学会肾脏病学专业委员会委员。目前主持国家自然科学基金、重庆市科学基金等课题5项，发表SCI论文40余篇，其中以第一作者或通讯作者发表SCI论文30篇。",
						"tag": [{
								"name": "副主任医师",
								"color": "#ff7777"
							},
							{
								"name": "肾内科",
								"color": "#bcbcbc"
							}
						],
					},
					{
						"img": "https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/ntx.jpg",
						"name": "李墨奇",
						"content": "重庆市护理学会血液净化护理专委会副主任委员、中华护理学会血液净化专委会专家库成员、中国研究型医院学会护理教育专业委员会委员。曾获国际品管圈大赛金奖、亚洲案例持续改进项目一等奖，全国医院品管圈大赛一等奖，全军科技进步三等奖一项，国家新型实用发明专利8项，新业务新技术二级三项，三级两项，重庆市课题三项，校管课题两项，发表论文十余篇。",
						"tag": [{
								"name": "护士长",
								"color": "#ff7777"
							},
							{
								"name": "血液净化中心",
								"color": "#bcbcbc"
							},
							{
								"name": "副主任护师",
								"color": "#bcbcbc"
							}
						],
					},
					{
						"img": "https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/ltx.jpg",
						"name": "何文昌",
						"content": "主要负责住院部血透室及连续性血液净化工作，同时负责本中心仪器管理及透析用水、集中供液质控工作，临床经验及急救知识丰富，熟练掌握各种透析相关并发症处置。以第一作者获新业务新技术三级1项，国家发明专利1项，实用新型专利3项。参与重庆市课题1项，院管课题2项，发表学术论文6篇。2018年获国际医院品管圈大赛金奖，2016年、2020年分别获第四届、第八届全国医院品管圈大赛一等奖。多次被评为优秀护士、优秀医务工作者、优秀护理教员、星级护士等荣誉。",
						"tag": [{
								"name": "护士长",
								"color": "#ff7777"
							},
							{
								"name": "血液净化中心",
								"color": "#bcbcbc"
							},
							{
								"name": "主管护师",
								"color": "#bcbcbc"
							}
						],
					}
				],
				banList: [
					"https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/teamb.png",
				]
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			videoErrorCallback: function(e) {
				console.log(e)
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
		}
	}
</script>

<style lang="scss">
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
</style>