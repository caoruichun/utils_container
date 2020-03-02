/**
 * 时间格式化插件
 * @param {*} date 时间(可以传入时间戳)
 * @param {*} format 格式
 */
export const TimeFormater = function (date, format) {
  if (!date) {
    return "";
  }
  format = format || "YYYY-MM-DD";
  // 转换毫秒和字符串为时间对象
  if (typeof date === "string") {
    if (/^\d+$/.test(date)) {
      date = parseInt(date);
    } else {
      date = date.replace(new RegExp(/-/gm), "/");
    }
  } else if (typeof date === "number" && date.toString().length === 10) {
    date = date * 1000;
  }

  // 处理日期兼容(火狐和safari浏览器)
  let d = new Date(date);
  // d是NaN的时候返回空
  if (isNaN(d)) return "";

  function fillZero(num) {
    return num.toString().padStart(2, "0");
  }
  const WEEK_DISPLAY = ["日", "一", "二", "三", "四", "五", "六"];
  const formatObj = {
    YYYY: d.getFullYear(), // 年
    MM: fillZero(d.getMonth() + 1), // 月份 [01..12]
    M: d.getMonth() + 1, // 月份 [1..12]
    DD: fillZero(d.getDate()), // 日期 [01..31]
    D: d.getDate(), // 日期 [1..31]
    d: WEEK_DISPLAY[d.getDay()], // 星期
    HH: fillZero(d.getHours() % 12 || 12), // 时 [01..12]
    H: d.getHours() % 12 || 12, // 时 [1.12]
    hh: fillZero(d.getHours()), // 时 [00..23]
    h: d.getHours(), // 时 [0..23]
    mm: fillZero(d.getMinutes()), // 分钟 [00..59]
    m: d.getMinutes(), // 分钟 [0..59]
    ss: fillZero(d.getSeconds()), // 秒 [00..59]
    s: d.getSeconds(), // 秒 [0..59]
    S: d.getMilliseconds(), // 毫秒
    Q: Math.ceil((d.getMonth() + 1) / 3),
    x: d.getTime(), // 时间戳，单位：毫秒
    X: Math.floor(d.getTime() / 1000) // 时间戳，单位：秒
  };
  const reg = /Y{4}|M{1,2}|D{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|S|d|Q|x|X/g;
  return format.replace(reg, match =>
    formatObj[match] ? formatObj[match] : match
  );
};