<template>
	<view class="detailPage">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item, index) in imageGroup" :key="index">
					<view class="swiper-item">
						<image :src="item.url" class="img-item" mode="scaleToFill" />
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="line"> </view>
		<view class="videoInfo">
			<view class="textInfo">精彩视频</view>
			<view class="textLine"></view>
			<swiper class="videoSwiper" next-margin="60rpx">
				<swiper-item v-for="(item,index) in videoGroup" :key="index">
					<view class="video-swiper-item">
						<video :id="`video${index}`" class="videoDetail" :src="item.url" @play="videoPlayhandle(`video${index}`)" :enable-progress-gesture="false"  ></video>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="line"> </view>
		<view class="personInfo">
			<view class="textInfo">个人简介</view>
			<view class="textLine"></view>
			<view class="personDetail">
				<image class="personImg" src="https://img.bj520.com/202205/5462fde1a6.jpg"></image>
			</view>
		</view>
		<view class="btnArea">
			<view class="peopleName">{{userName}}</view>

			<view class="">
				<button class="yy-btn" size="default" @click="goToyuyueHandle" hover-class="yy-btn-hover">立即预约</button>
			</view>
		</view>
	</view>

</template>

<script>
	import {getUserInfo} from "../../api"
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				userName:"",
				imageGroup: [],
				videoGroup: [],
				playIdx:""
			}
		},
		mounted: async function ()  {
			console.log("kiki")
			const userInfo = await getUserInfo(100)
			console.log(userInfo,"getUserInfo")
			console.log(this,"this")
			this.userName = userInfo.username
			this.imageGroup = userInfo.images
			this.videoGroup = userInfo.videos
	
		
		},

		methods: {
			goToyuyueHandle() {
				console.log("去预约")
				uni.navigateTo({
					url: "/pages/order/index?id=100"
				})
			},
			videoPlayhandle(id) {
				console.log(id,"idid")
				if (this.playIdx !== '') {
					console.log(`暂停上一个下标为${this.playIdx}的视频`);
					let videoContext = uni.createVideoContext(this.playIdx)
					videoContext.pause()
				}

				this.playIdx = id
			}
		}
	}
</script>

<style>
	.detailPage {
		font-size: 35rpx;
		font-weight: 500;
	}

	.uni-margin-wrap {
		/* width: 990rpx; */
		/* width: 100%; */
		/* margin: 30px; */
		padding: 20rpx;
	}

	.swiper {
		height: 780rpx;
		/* width: 100%; */
	}

	.videoSwiper {
		width: 100%;
		/* height: 600rpx; */
		height: 560rpx;
	}

	.video-swiper-item {
		width: 100%;
	}

	.img-item {
		/* background-repeat: no-repeat; */
		/* background-image: ; */
		width: 100%;
		height: 780rpx;
		/* padding: 20rpx; */
	}

	.swiper-item {
		/* height: 600rpx; */
		/* display: block; */
		/* line-height: 600rpx; */
		/* text-align: center; */
	}

	.line {
		width: 100%;
		border: solid 10rpx rgba(0, 0, 0, .1);
	}

	.videoInfo {
		padding: 20rpx;
	}

	.textInfo {
		/* height: 40rpx; */

		margin-left: 10rpx;
		position: absolute;
	}

	.textLine {
		width: 70rpx;
		border: solid 10rpx rgba(0, 0, 0, .4);
		position: relative;
		top: 20rpx;
	}

	.videoDetail {
		width: 100%;
		height: 460rpx;
		margin-top: 50rpx;
	}

	.personInfo {
		padding: 20rpx;
	}

	.personDetail {
		margin-top: 50rpx;
		/* 	width: 100%;
		height: 780rpx; */
	}

	.personDetail:last-child {
		margin-bottom: 120rpx;
	}

	.personImg {
		width: 100%;
		height: 780rpx;
		/* padding-bottom: 40rpx; */
	}

	.btnArea {
		width: 100%;
		height: 80rpx;
		padding: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		/* z-index: 999; */
		text-align: center;
		bottom: 0rpx;
		background-color: #fff;
	}

	.peopleName {
		font-size: 50rpx;
		font-weight: 600;
		/* line-height:80rpx ; */
	}

	.yy-btn {
		color: #fff;

		height: 70rpx;
		margin-right: 80rpx;
		background-color: rgba(0, 0, 0, 1);
		text-align: center;
		line-height: 70rpx;
	}

	.yy-btn-hover {
		background-color: rgba(0, 0, 0, .5);
		color: rgba(255, 255, 255, .5);
	}
</style>
