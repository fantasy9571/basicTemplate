import moment from 'moment'
//axios捕错
export const throwErr = (code, response) => {
  let message = '请求错误'
  switch (code) {
    case 400:
      message = '请求错误'
      break
    case 401:
      message = '未授权，请登录'
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = `请求地址出错: ${response.config.url}`
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '服务器内部错误'
      break
    case 501:
      message = '服务未实现'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务不可用'
      break
    case 504:
      message = '网关超时'
      break
    case 505:
      message = 'HTTP版本不受支持'
      break
    default:
  }
  return message
}
//仲裁费用计算
export const getFastCountRule = (arr) => {
  let baseAmout = arr[0].base_amount
  arr.forEach((item, index) => {
    if (index == 0) {
      item.newBaseAomunt = 0
    }
    else {
      baseAmout += Math.round((arr[index - 1].end_amount - arr[index - 1].start_amount) * arr[index - 1].rates / 100)
      item.newBaseAomunt = baseAmout
    }
  })
  return arr
}
export const feeDetail = (data, arr, whole, proportion) => {
  let obj = {}
  arr.forEach((item, index) => {
    if ((data > item.start_amount && data <= item.end_amount) || (data > item.start_amount && item.end_amount === 0)) {
      if (data <= arr[0].end_amount) {
        obj.beyond = 0
        obj.inner = arr[0].end_amount
        obj.innnerFee = item.base_amount
      } else {
        obj.inner = item.start_amount
        obj.innnerFee = item.newBaseAomunt
        obj.beyond = data - item.start_amount
      }
      obj.rates = item.rates
      obj.beyondFee = Math.round((data - item.start_amount) * item.rates / 100)
      if ((obj.innnerFee + obj.beyondFee) * proportion / 100 > whole) {
        obj.dealFee = (obj.innnerFee + obj.beyondFee) * proportion / 100
      } else {
        obj.dealFee = whole
      }
      obj.totalFee = obj.innnerFee + obj.beyondFee + obj.dealFee
    }
  })
  return obj
}

//转换时间格式
export const getDayTime = timestamp => {
  if (`${timestamp}`.length < 13) {
    timestamp *= 1000
  }
  if (timestamp >= 0) {
    return moment(timestamp).format('YYYY年MM月DD日')
  } else {
    return ''
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}



