/**
 * 在这里把URL输出出去供请求用
 */


 let position = ['wuchanga','hongshana','jiangan','jianghana'];//自己分析url在这里填充必要的部分
 let rent  = "x1";//是否整租
   function getUrl(){
    let result = [];
    for (let j=0;j<position.length;j++){
        let url = "https://wh.zu.anjuke.com/fangyuan";
        for (let i=1;i<30;i++){
            let surl = url+"/"+position[j]+"/"+rent+"-"+`p${i}`+"/";
            result.push(surl)
        }
    }
    
    return result;
   
 }
// console.log(getUrl())
module.exports={
    getUrl:getUrl
}