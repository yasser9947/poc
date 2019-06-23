// arranging (set , type)
 // getCountryName(countryCode)
 var conte = []
d3.csv('./data/POC.CSV').then(function (data) {
console.log(data)
var country_code = "us"
// 

// countris

// arranging(data ,"Country_Name_EN", conte)
{/* <select >
<option value="" disabled selected> جميع الدول</option>
<option  value="1">Option 1</option>
<option value="2">Option 2</option>
<option value="3">Option 3</option>
</select> */}
var contre = ""
var outlet = ""
var i = 0
arranging(data ,"Country_Name_EN", conte).forEach(ele => {

    contre = contre + `<option  value=${getCountryName(ele[0])}>${ele[0]}</option>`
});
arranging(data ,"Port_Name", conte).forEach(ele => {

    outlet = outlet + `<option  value=${i}>${ele[0]}</option>`
i++
});
$("#frestSelect").append(contre )
$("#secandSelect").append(outlet )

console.log("f2")




divs = [
    { img: `https://www.countryflags.io/${country_code}/shiny/64.png`, h4: "4", p: "اكبر مورد للمملكة العربيه السعوديه" },
    { img: "./pic/clipboard.svg.svg", h4: "3", p: "معدل رفض الطلبات ل س طلب" },
    { img: "./pic/saudi-arabia.svg", h4: "2", p: "معدل انجاز الطلبات ل س طلب" },
    { img: "./pic/user.svg", h4: "1", p: "نسبه طلبات الفحص لكل س طلب" }
]
divs.forEach(ele => {
    $(".f2").append("<div>" +
        `<img src=${ele.img} height="90px" width="90px" alt="">`
        + `<h4>${ele.h4}</h4>`
        + `<p>${ele.p} </p>`
        + "</div>");
});
});