
const https = require("https"); 
const {dealhtml} = require("./parsingpage/anjuke/index.js");
const fs = require("fs");
let url="https://wh.zu.anjuke.com/fangyuan/wuchanga/x1/";
const {getUrl} = require("./util/giveurl/index.js");
const {sleep} =require("./util/sleep.js");
const { URL } = require('url'); 

/**
 * 结果对象将其输出到文件中
 * @param {*} obj 
 */
function exporttoFile(obj,filename){
  filename = filename.replace("https://wh.zu.anjuke.com/","").split("/").join('_');
  let data = JSON.stringify(obj);
  fs.writeFileSync(`./result/${filename}.json`,data);
}
/**
 * https请求头
 */
const options = {
  headers :{
    "Accept"	:"text/html",
    "Accept-Encoding" :"utf-8",
    "Accept-Language":	 "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "Cache-Control"	:"max-age=0",
    "Connection":	"keep-alive",
    "Cookie":	"aQQ_ajkguid=51C5A875-EDB6-391F-B593-B898AB796AC7; 58tj_uuid=c6041809-eb8d-452c-9d70-4d62b1801031; new_uv=2; __xsptplus8=8.2.1556593698.1556593730.4%233%7Ccn.bing.com%7C%7C%7C%7C%23%23tCD6uK-qprKqvfUShNPiQBlWlzM8BP6_%23; als=0; ctid=22; wmda_uuid=f0aa7eb2fd61ca3678f4574d20d0ccfc; wmda_new_uuid=1; wmda_visited_projects=%3B6289197098934; sessid=FE2F0B80-FDC6-0C84-22E5-1448FB0BFA2C; lps=http%3A%2F%2Fwh.xzl.anjuke.com%2Fzu%2F%3Fkw%3D%25E4%25BF%259D%25E5%2588%25A9%25E5%259B%25BD%25E9%2599%2585%25E5%2585%25AC%25E5%25AF%2593%26pi%3D360-cpcjp-wh-chloupan1%26kwid%3D16309186180%26utm_term%3D%25e4%25bf%259d%25e5%2588%25a9%25e5%259b%25bd%25e9%2599%2585%25e5%2585%25ac%25e5%25af%2593%7Chttps%3A%2F%2Fcn.bing.com%2F; twe=2; ajk_member_captcha=4b7a103be89a56fd6fdf85e09f41c250; wmda_session_id_6289197098934=1556593697467-eaf2078d-1712-7da9; new_session=0; init_refer=; wmda_uuid=f4d4e8a6e26192682c1ec6d3710362b7; wmda_new_uuid=1; wmda_session_id_6289197098934=1556593697467-eaf2078d-1712-7da9; wmda_visited_projects=%3B6289197098934",
    "Host":	"wh.zu.anjuke.com",
    "Upgrade-Insecure-Requests":	1,
    "User-Agent"	:"Mozilla/5.0 (Windows NT 10.0; WOW64; rv:66.0) Gecko/20100101 Firefox/66.0"
  }
};

/**
 * 用于获取数据
 * @param {*} url 
 */
function getdata(url){

   url = new URL(url);
   console.log(url)
   url.headers = options.headers;
    https.get(url,(res) => {
      console.log('状态码:', res.statusCode);
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { 
        rawData += chunk; 
      });
      res.on('end', () => {
        try {
          let result = dealhtml(rawData)
          exporttoFile(result,url.href)
        } catch (e) {
          console.error(e.message);
        }
      });
    }).on('error', (e) => {
      console.error(e);
    });
}
async function start(){
  // let url = "https://wh.zu.anjuke.com/fangyuan/wuchanga/x1/";
  let urls = getUrl();
  for(let i=0;i<urls.length;i++){
    await sleep(2000);
    console.log(urls[i])
    getdata(urls[i]);
  }
}



start()
