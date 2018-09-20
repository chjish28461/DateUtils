class DateUtils{
  constructor(d){
    this.d = d?new Date(d.replace(/\-/g,"/")):new Date();
    this.format.bind(this);
    this.getPreMonthDay.bind(this);
  }
  format(fmt='YYYY-MM-DD'){//默认转化成YYYY-MM-DD的形式，可根据传参转化成YYYY-MM-DD hh-mm-ss week quarter形式
    let d = this.d;
    let quarter = ["春季","夏季","秋季","冬季"];
    let weekDay = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
    let fmtStr = '';
    let o = {
      "YYYY":d.getFullYear(),//年
      "MM": d.getMonth()>=9?(d.getMonth()+1):("0"+(d.getMonth()+1)), //月
      "DD": d.getDate()>=10?d.getDate():("0"+d.getDate()), //日
      "hh": d.getHours()>=10?d.getHours():("0"+d.getHours()), //时
      "mm": d.getMinutes()>=10?d.getMinutes():("0"+d.getMinutes()), //分
      "ss": d.getSeconds()>=10?d.getSeconds():("0"+d.getSeconds()), //秒
      "w": weekDay[d.getDay()], //星期几
      "q": quarter[Math.ceil((d.getMonth() + 1) / 3)-1], //季度
    };
    if(/YYYY-MM-DD/i.test(fmt)){
      fmtStr += `${o.YYYY}-${o.MM}-${o.DD}`; 
    }
    if(/hh:mm:ss/i.test(fmt)){
      fmtStr += ` ${o.hh}:${o.mm}:${o.ss}`; 
    }
    if(/w/i.test(fmt)){
      fmtStr += ` ${o.w}`; 
    }
    if(/q/i.test(fmt)){
      fmtStr += ` ${o.q}`; 
    }
    return fmtStr.replace(/^\s/,"");
  }
  getPreMonthDay(){//获取当前日期上个月的1号-月末。也可以指定日期获取上月的1号-月末
    let d = this.d;
    let myDate=null;
    let [startDate,endDate] = ["",""];
    let fomatDate = this.format('YYYY-MM-DD').split(' ')[0].split('-');
    if(fomatDate[1]!="01"){
        let preMonthDay =new Date(`${fomatDate[0]}/${Number(fomatDate[1])-1}/01`);
        startDate = new DateUtils(`${fomatDate[0]}/${Number(fomatDate[1])-1}/01`).format("YYYY-MM-DD");
        let nextMonthDay = new Date(`${fomatDate[0]}/${Number(fomatDate[1])}/01`);
        //通过毫秒数计算上月有多少天可以避免判断平闰年，具体月份多少天的复杂计算
        let monthDay = (nextMonthDay.getTime()-preMonthDay.valueOf())/(24*60*60*1000);
        endDate = new DateUtils(`${fomatDate[0]}/${Number(fomatDate[1])-1}/${monthDay}`).format('YYYY-MM-DD');
    }else{
        let preMonthDay =new Date(`${Number(fomatDate[0])-1}/12/01`);
        startDate=  new DateUtils(`${Number(fomatDate[0])-1}/12/01`).format("YYYY-MM-DD");
        let nextMonthDay = new Date(`${fomatDate[0]}/${fomatDate[1]}/01`);
        //通过毫秒数计算上月有多少天可以避免判断平闰年，具体月份多少天的复杂计算
        let monthDay = (nextMonthDay.getTime()-preMonthDay.getTime())/(24*60*60*1000);
        endDate = new DateUtils(`${Number(fomatDate[0])-1}/12/${monthDay}`).format('YYYY-MM-DD');
    }
    myDate={
      startDate,endDate
    }
    return myDate;
  }
  getTime(){//返回 1970 年 1 月 1 日至时间对象的毫秒数。
    let d = this.d;
    return d.getTime();
  }
}