export const getWeekByDay = (dayValue) => {
    //dayValue=“2014-01-01”
    const day = new Date(Date.parse(dayValue.replace(/-/g, "/"))); //将日期值格式化
    let today = new Array(
        "周日",
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六"
    ); //创建星期数组
    return today[day.getDay()]; //返一个星期中的某一天，其中0为星期日
}