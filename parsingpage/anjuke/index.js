const { URL } = require('url'); 
const cheerio = require('cheerio');


function dealhtml(text){
    const $ = cheerio.load(text);
    let arrs = $('.zu-itemmod');
    let finalresult = [];
    $('.zu-itemmod').each(function (index, el) {
      let result = {
  
      };
      let $el = $(el)
      let url = $el.attr("link");
      let idurl = new URL(url);
      let pathname = idurl.pathname;
      let paths = pathname.split("/");
      result.uid=paths[2];  //唯一id
      result.url=url; //他的连接
    //   console.log(`--------------------------------  `)
    //   console.log(` 地址      ${result.uid}  `)
    //   console.log(` 唯一主键     ${result.url}  `)
      let info = $el.find('.details-item.tag').text();
      let infoarr = info.replace("\n","").trim().split("");
      infoarr[0]=infoarr[0].trim();
      result.owner = infoarr[1]; //所有者
      infoarr=infoarr[0].split("|");
      result.apartment = infoarr[0];//户型
      result.totalarea = infoarr[1];//全部面积
      result.floortype = infoarr[2];//楼层类型
      //遍历信息
    //   console.log(` 所有者     ${result.owner}  `)
    //   console.log(` 户型       ${result.apartment}  `)
    //   console.log(` 全部面积   ${result.totalarea}  `)
    //   console.log(` 楼层类型   ${result.floortype}  `)
      let address = $el.find("address[class='details-item']").text().trim()
      address = address.replace("\n","").split(" ");
      result.address0 = address[0];
      result.address1 = address[address.length-2];
      result.address2 = address[address.length-1];
    //   console.log(` 小区名   ${result.address0}  `)
    //   console.log(` 地址1    ${result.address1}  `)
    //   console.log(` 地址2    ${result.address2}  `)
      result.rent = $el.find('.cls-1').text()//整租 合租
    //   console.log(` 整租合租   ${result.rent}  `)
      result.orientation = $el.find('.cls-2').text()
    //   console.log(` 朝向   ${result.orientation}  `)//朝向
      result.elevator = $el.find('.cls-3').text()    //是否有电梯
    //   console.log(` 电梯   ${result.elevator}  `)
      result.metro = $el.find('.cls-4').text()
    //   console.log(` 地铁   ${result.metro}  `)//地铁
      let price = $el.find('.zu-side').text()
      result.price=price.trim()
    //   console.log(` 价格   ${result.price}  `)

      finalresult.push(result)
    });
  
    return finalresult;
    // console.log(arrs);
  }

  module.exports = {
    dealhtml:dealhtml
  }