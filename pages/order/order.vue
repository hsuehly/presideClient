<template>
	<view class="orderPage">
		<view class="inputArea">
			<view class="inputItemArea">
				<view class="require">姓名</view>
				<input placeholder="请输入你的姓名" maxlength=7 v-model="nameVal" />
			</view>
			<view class="orderLine">
			</view>
			<view class="inputArea">
				<view class="inputItemArea">
					<view class="require">手机</view>
					<input placeholder="请输入你的手机号" maxlength=11 v-model="phoneVal" />
				</view>
				<view class="orderLine">
				</view>
			</view>
			<view class="inputArea">
				<view class="inputItemArea">
					<view class="require">你是</view>
					<picker @change="rolePickerChange" :value="roleIndex" :range="roles">
						<view :class="{roleItem:roleIndex === 0}">{{roles[roleIndex]}}</view>
					</picker>

				</view>
				<view class="orderLine">
				</view>
			</view>
			<view class="inputArea" v-if="isShowWedding">
				<view class="inputItemArea">
					<view class="require">婚庆名称</view>
					<input placeholder="请输入婚庆名称" maxlength=11 v-model="weddingVal" />
				</view>
				<view class="orderLine">
				</view>
			</view>
			<view class="inputArea">
				<view class="inputItemArea">
					<view class="require">城市</view>
					<input placeholder="请输入你所在城市名称" maxlength=20 v-model="cityVal" />
				</view>
				<view class="orderLine">
				</view>
			</view>
			<view class="fwArea">
				<view class="">
					服务地址
				</view>
				<textarea class="textArea" placeholder="服务地址(最大输入50个字)" placeholder-style="color:grey" maxlength="50"
					v-model="addressVal" />
			</view>
			<view class="fwArea">
				<view class="">
					备注
				</view>
				<textarea class="textArea" placeholder-style="color:grey" placeholder="备注(最大输入100个字)" maxlength="100"
					v-model="remarksVal" />
			</view>
			<view class="tjArea">
				<button class="tj-btn" size="default" hover-class="tj-btn_hover" @click="sumbitHandle">立即提交</button>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				roles: ["请选择你的身份", "婚庆派单", "新人"],
				roleIndex: 0,
				isShowWedding: false,
				nameVal: "",
				phoneVal: "",
				weddingVal: "",
				cityVal: "",
				addressVal: "",
				remarksVal: ""

			}
		},

		methods: {
			rolePickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				if (Number(e.detail.value) === 1) {
					this.isShowWedding = true
				} else {
					this.isShowWedding = false
					this.weddingVal = ""
				}
				this.roleIndex = e.detail.value
				console.log(this.isShowWedding, "this.isShowWedding ")
			},
			cityPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
			},
			sumbitHandle() {
				if (this.nameVal.trim() === "") {
					uni.showToast({
						title: "请输入姓名",
						icon: "none"
					})
					return
				} else if (this.phoneVal.trim() === "") {
					uni.showToast({
						title: "请输入手机号",
						icon: "none"
					})
					return

				} else if (this.roleIndex === 0) {
					uni.showToast({
						title: "请输入角色信息",
						icon: "none"
					})
					return

				} else if (this.roleIndex === 1 && this.weddingVal.trim() === "") {
					uni.showToast({
						title: "请输入婚庆名称",
						icon: "none"
					})
					return
				} else if (this.cityVal.trim() === "") {
					uni.showToast({
						title: "请输入城市",
						icon: "none"
					})
					return
				}
				if (this.phoneVal.trim() !== "") {
					const phoneRange = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
					if (!phoneRange.test(this.phoneVal)) {
						uni.showToast({
							title: "请输入正确的手机号",
							icon: "none"
						})
						return
					}
				}
				uni.showToast({
					title: "提交成功",
					icon: "success"
				})
			setTimeout(() => {
				uni.navigateBack({
					delta: 1,
				})
			},700)
			}
		}
	}
</script>

<style>
	.orderPage {
		/* padding: 20rpx; */
	}

	.inputItemArea {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: right;
		padding: 20rpx;
	}

	.require::after {
		content: "*";
		color: red;
		text-align: center;
	}

	.orderLine {
		width: 100%;
		border: solid 1rpx rgba(0, 0, 0, .1);
		margin-top: 10rpx;
	}

	.roleItem {
		color: grey;
	}

	.fwArea {
		padding: 20rpx;

	}

	.textArea {
		font-size: 30rpx;
		border: solid 1rpx rgba(0, 0, 0, .1);
		width: 100%;
		margin-top: 30rpx;
	}

	.tjArea {
		padding: 20rpx;
	}

	.tj-btn {
		background-color: rgba(0, 0, 0, 1);
		color: #fff;
	}

	.tj-btn_hover {
		background-color: rgba(0, 0, 0, .5);
		color: rgba(255, 255, 255, .5);
	}
</style>
