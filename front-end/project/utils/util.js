// date is a Date object
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  let minute = date.getMinutes()
  if (minute < 10)
    minute = "0" + minute
  let second = date.getSeconds()
  if (second < 10)
    second = "0" + second
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}

// usedTime is the number of ms
const msToString = usedTime => {
  var days = Math.floor(usedTime / (24 * 3600 * 1000));
  //计算出小时数
  var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000));
  //计算相差分钟数
  var leave3 = leave1 % (60 * 1000); //计算分钟数后剩余的毫秒数
  var seconds = Math.floor(leave3 / 1000);

  if (days > 0)
    return days + " 天";
  else if (hours > 0)
    return hours + " 小时";
  else if (minutes > 0)
    return minutes + " 分钟";
  else
    return seconds + " 秒"
}

module.exports = {
  formatTime: formatTime,
  msToString: msToString,
}