const base_url = process.env.VUE_APP_URL
console.log(base_url,"base_url")
export const getUserInfo = (id) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${base_url}/api/v1/user/${id}`,
            method: "GET",// 请求类型，默认为GET
            data: {}, // 请求参数，默认空对象
            success: res => {
                // 状态判断，根据后台定义并提示
                if (res.statusCode === 200) {
                    resolve(res.data.data)
                } else {
                    uni.showToast({
                        title: "获取数据失败："
                    })
                    return
                }
            },
            fail: err => {
                uni.showToast({
                    title: "请求失败！"
                })
                reject(err)
            }
        })
    })

}
export const postOrder = ({id,address,city,identity,phone,remarks,username,weddingname,times,date}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${base_url}/api/v1/order/create/${id}`,
            method: "POST",// 请求类型，默认为GET
            data: {
				    address,
				    city,
				    identity,
				    phone,
				    remarks,
				    username,
				    weddingname,
					times,
					date
				
			}, // 请求参数，默认空对象
			    header: {
			        'content-type': 'application/json' //自定义请求头信息
			    },
            success: res => {
                // 状态判断，根据后台定义并提示
                if (res.statusCode === 200) {
                    resolve(res.data)
                } else {
                    uni.showToast({
                        title: "获取数据失败："
                    })
                    return
                }
            },
            fail: err => {
                uni.showToast({
                    title: "请求失败！"
                })
                reject(err)
            }
        })
    })

}