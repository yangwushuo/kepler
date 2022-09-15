export const randomColor = () => {
  //获取随机颜色
  let a = Math.round(Math.random() * 255);
  let b = Math.round(Math.random() * 255);
  let c = Math.round(Math.random() * 255);
  return `rgb(${a}, ${b}, ${c})`;
}

// 数字转换
export const numberFormat = (value) => {
  var param = {};
  var k = 10000,
    sizes = ['', '万', '亿', '万亿'],
    i;
  if (value < k) {
    param.value = value
    param.unit = ''
  } else {
    i = Math.floor(Math.log(value) / Math.log(k));

    param.value = ((value / Math.pow(k, i))).toFixed(2);
    param.unit = sizes[i];
  }
  return param;
}

export const regular = {
  // 验证自然数
  naturalNumber: /^(([0-9]*[1-9][0-9]*)|(0+))$/,
  naturalNumberMsg: '请输入自然数',
  // 微信号
  wechat: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
  wechatMsg: '请输入正确的微信号码',
  // 英文
  english: /^.[A-Za-z]+$/,
  englishMsg: '请输入英文字符',
  // 座机
  telephone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/,
  telephoneMsg: '请输入正确的座机号',
  // 银行卡号码
  bankCard: /^[1-9]\d{9,19}$/,
  bankCardMsg: '请输入正确的银行卡号码',
  // 证件号码
  IDNumber: /^[a-z0-9A-Z]{0,50}$/,
  IDNumberMsg: '请输入正确的证件号码',
  // 身份证号码,包括15位和18位的
  IDCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{7}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
  IDCardMsg: '请输入正确的身份证号码',
  // QQ号码
  qq: /^[1-9]\d{4,11}$/,
  qqMsg: '请输入正确的QQ号码',
  // 网址, 仅支持http和https开头的
  url: /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
  urlMsg: '请输入以http和https开头的网址',
  // 0到20位的英文字符和数字
  enNum0to20: /^[a-z0-9A-Z]{0,20}$/,
  enNum0to20Msg: '请输入20位以内的英文字符和数字',
  // 2到100位的中英文字符和空格
  cnEnSpace2to100: /^[a-zA-Z\u4E00-\u9FA5\s*]{2,100}$/,
  cnEnSpace2to100Msg: '请输入2到100位的中英文字符和空格',
  // 数字和换行符
  numLinefeed: /^[0-9\n*]+$/,
  numLinefeedMsg: '请输入数字和换行符',
  // 255位以内的字符
  char0to255: /^.{0,255}$/,
  char0to255Msg: '请输入255位以内的字符',
  // 特殊字符
  specialChar: /^[^`~!@#$^&*()=|{}':;',/\\[\].<>?]*$/,
  specialCharMsg: '请删除特殊字符',
  // 保留两位小数
  twoDecimal: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[0-9][0-9]*\.\d{1,2})))$/,
  twoDecimalMsg: '小数点保留最多两位'
}

//状态码
export const statusCode = {
  SUCCESS: {
    code: 20000,
    desc: '操作成功'
  },
  AUTHORIZED: {
    code: 40300,
    desc: '没有操作权限'
  },
  UNVERIFIED: {
    code: 40301,
    desc: '没有认证'
  },
  SYSTEM_ERROR: {
    code: 50000,
    desc: '系统异常'
  },
  VALID_ERROR: {
    code: 52000,
    desc: '参数格式不正确'
  },
  USERNAME_EXIST: {
    code: 52001,
    desc: '用户名已存在'
  },
  USERNAME_NOT_EXIST: {
    code: 52002,
    desc: '用户名不存在'
  },
  CAPTCHA_ERROR: {
    code: 53001,
    desc: '验证码错误'
  },
  SESSION_ERROR: {
    code: 53002,
    desc: '会话过期'
  },
  EMAIL_ERROR: {
    code: 53003,
    desc: '邮箱错误'
  },
  EMAIL_EXIST: {
    code: 53004,
    desc: '邮箱已经存在'
  },
}
//时间戳转标准时间
export const timeStampToFormat = (timeStamp) => {
  var now = new Date(timeStamp);
  var year = now.getFullYear(); //取得4位数的年份
  var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
  var date = now.getDate(); //返回日期月份中的天数（1到31）
  var hour = now.getHours(); //返回日期中的小时数（0到23）
  var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
  var second = now.getSeconds(); //返回日期中的秒数（0到59）
  return (
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second
  );
}

//cookie过滤
export const filtCookie = function getCookie(cookieName) {
  const strCookie = document.cookie
  const cookieList = strCookie.split(';')
  for(let i = 0; i < cookieList.length; i++) {
    const arr = cookieList[i].split('=')
    if (cookieName === arr[0].trim()) {
      return arr[1]
    }
  }
  
  return ''
}
