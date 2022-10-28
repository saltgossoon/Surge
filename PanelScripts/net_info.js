/*
 * 由@fishingworld编写
 * 原脚本地址：https://raw.githubusercontent.com/fishingworld/something/main/PanelScripts/net_info.js
 * 由Saltgossoon修改
 * 更新日期：2022.10.25
 * 版本：1.0
*/


;(async () => {



let params = getParams($argument)
//获取根节点名
let proxy = await httpAPI("/v1/policy_groups");
let allGroup = [];
for (var key in proxy){
   allGroup.push(key)
    }
let group = params.group
let rootName = (await httpAPI("/v1/policy_groups/select?group_name="+encodeURIComponent(group)+"")).policy;
while(allGroup.includes(rootName)==true){
	rootName = (await httpAPI("/v1/policy_groups/select?group_name="+encodeURIComponent(rootName)+"")).policy;
}

$httpClient.get('http://ip-api.com/json/?lang=en', function (error, response, data) {
    const jsonData = JSON.parse(data);
    $done({
      title:rootName,
      content:
		`国家&地区: ${jsonData.country} - ${jsonData.city}\n`+
      `运营商 : ${jsonData.isp}\n` +
		`数据中心: ${jsonData.org}`,
      icon: params.icon,
		  "icon-color":params.color
    });
  });

})();


function httpAPI(path = "", method = "GET", body = null) {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
};

function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
