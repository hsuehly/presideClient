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
					<view class="require">日期</view>
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="roleItem">{{date}}</view>

					</picker>

				</view>
				<view class="orderLine">
				</view>
			</view>
			<view class="inputArea">
				<view class="inputItemArea">
					<view class="require">时间</view>
					<picker @change="timesPickerChange" :value="timesIndex" :range="times">
						<view class="roleItem">{{times[timesIndex]}}</view>
					</picker>

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
	import {
		postOrder
	} from "../../api"
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				id: "",
				roles: ["请选择你的身份", "婚庆派单", "新人"],
				roleIndex: 0,
				isShowWedding: false,
				nameVal: "",
				phoneVal: "",
				weddingVal: "",
				cityVal: "",
				addressVal: "",
				remarksVal: "",
				date: currentDate,
				times: ["全天", "午宴", "晚宴"],
				timesIndex: 0,

			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad: function(options) {

			this.id = options.id
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
			timesPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)

				this.timesIndex = e.detail.value

			},
			cityPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 0;
				} else if (type === 'end') {
					year = year + 1;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			async sumbitHandle() {
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
				const params = {
					id: this.id,
					address: this.addressVal,
					city: this.cityVal,
					identity: this.roles[this.roleIndex],
					weddingname: this.weddingVal,
					phone: this.phoneVal,
					remarks: this.remarksVal,
					username: this.nameVal,
					times: this.times[this.timesIndex],
					date: this.date
				}
				const response = await postOrder(params)
				if (response.code === 200) {
					uni.showToast({
						title: "提交成功",
						icon: "success"
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1,
						})
					}, 700)
				} else {
					uni.showToast({
					title: response.msg,
					icon: "none"
					})
				}
				// console.log()
				console.log(response, 'response')
			
				// setTimeout(() => {
				// 	uni.navigateBack({
				// 		delta: 1,
				// 	})
				// }, 700)
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
		padding: 20px 0px 20px 0px;
		;

		width: 100%;
		height: 80rpx;
		/* padding: 40rpx; */
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		/* z-index: 999; */
		text-align: center;
		bottom: 0rpx;
		background-color: #fff;

	}

	.tj-btn {
		width: 90%;
		background-color: rgba(0, 0, 0, 1);
		color: #fff;
	}

	.tj-btn_hover {
		background-color: rgba(0, 0, 0, .5);
		color: rgba(255, 255, 255, .5);
	}

	.picker-view {
		width: 750rpx;
		height: 600rpx;
		margin-top: 20rpx;
	}

	.item {
		height: 50px;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
</style>
