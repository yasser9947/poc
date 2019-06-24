
var conte = []
d3.csv('./data/POC.CSV').then(function (data) {
    // console.log(data)
    var country_code = "us"
    var contre = ""
    var outlet = ""
    var i = 0
    arranging(data, "Country_Name_EN", conte).forEach(ele => {

        contre = contre + `<option  value=${getCountryName(ele[0])}>${ele[0]}</option>`
    });
    arranging(data, "Port_Name", conte).forEach(ele => {
        // console.log(ele[0].replace(/\s/g,''))
        outlet = outlet + `<option  value=${ele[0].replace(/\s/g, '')}>${ele[0]}</option>`
        i++
    });
    $("#frestSelect").append(contre)
    $("#secandSelect").append(outlet)
    // to update 
    var Accepted = arranging(data, "Accepted")
    var rejected = arranging(data, "rejected")
    function sum() {
        var sum = 0
        data.forEach(ele => {

            sum = sum + Number(ele.Total_Working_Time)
        });
        return sum
    };
    var oneH4 = country_code;
    var towH4 = ((rejected[1][1] / (rejected[0][1] + rejected[1][1])) * 100).toString() + "%";
    var threeH4 = parseInt((sum() / 60) / 60).toString() + " ساعة"

    var fourH4 = ((Accepted[0][1] / (Accepted[0][1] + Accepted[1][1])) * 100).toString() + "%";
 

    var divs = [
        { img: `https://www.countryflags.io/${country_code}/shiny/64.png`, h4: "4", p: "اكبر مورد للمملكة العربيه السعوديه" },
        { img: "./pic/clipboard.svg.svg", h4: `${towH4}`, p: `معدل رفض الطلبات ل ${data.length}طلب` },
        { img: "./pic/saudi-arabia.svg", h4: `${threeH4}`, p: `معدل انجاز الطلبات ل ${data.length} طلب` },
        { img: "./pic/user.svg", h4: `${fourH4}`, p: `نسبه طلبات الفحص لكل ${data.length} طلب` }
    ]
    divs.forEach(ele => {
        $(".f2").append("<div>" +
            `<img src=${ele.img} height="90px" width="90px" alt="">`
            + `<h4>${ele.h4}</h4>`
            + `<p>${ele.p} </p>`
            + "</div>");
    });
    // Udate function  ------------------------------
    function update(contry, port, q) {

        q = []
        var c = []
        data.forEach(ele => {
            if (ele.Port_Name.replace(/\s/g, '') == port) {
                q.push(ele)
            }
            else if ("all" == port) {
                q = data
            }
            if (getCountryName(ele.Country_Name_EN) == contry) {
                c.push(ele)
            }
            else if ("all" == contry) {
                c = data
            }

        });
 
       
           
       

        var Accepted = arranging(q, "Accepted")
        var rejected = arranging(q, "rejected")
        var contry2 = arranging(q, "Country_Name_EN")
        function sum() {
            var sum = 0
            q.forEach(ele => {

                sum = sum + Number(ele.Total_Working_Time)
            });
            return sum
        };
        if (contry2[0][0] == "UNITED ARAB EMIRATE") {
            oneH4 = "AE"
            contry2[0][0] = "UAE"
        }
        else {
            var oneH4 = getCountryName(contry2[0][0]);
        }
       

        if (rejected.length == 1) { var towH4 = "0.00%" }
        else { var towH4 = (Number.parseFloat(rejected[1][1] / (rejected[0][1] + rejected[1][1])) * 100).toFixed(2).toString() + "%"; }


        var threeH4 = Number.parseFloat((sum() / 60) / 60).toFixed(2).toString() + " ساعة"
        if (Accepted.length == 1) { var fourH4 = "100" + "%" }
        else{var fourH4 = parseInt(((Accepted[0][1] / (Accepted[0][1] + Accepted[1][1])) * 100)).toString() + "%"}
        divs = [
            { img: `https://www.countryflags.io/${oneH4}/shiny/64.png`, h4: contry2[0][0], p: "اكبر مورد للمملكة العربيه السعوديه" },
            { img: "./pic/clipboard.svg.svg", h4: `${towH4}`, p: `معدل رفض الطلبات ل ${q.length}طلب` },
            { img: "./pic/saudi-arabia.svg", h4: `${threeH4}`, p: `معدل انجاز الطلبات ل ${q.length} طلب` },
            { img: "./pic/user.svg", h4: `${fourH4}`, p: `نسبه طلبات الفحص لكل ${q.length} طلب` }
        ]
        $("#frestSelect").val()
        $(".f2").remove()
        $(".secand-div").append(" <div class='f2'> </div>")
        divs.forEach(ele => {
            $(".f2").append("<div>" +
                `<img src=${ele.img} height="90px" width="90px" alt="">`
                + `<h4>${ele.h4}</h4>`
                + `<p>${ele.p} </p>`
                + "</div>");
        });
    }
    d3.interval(function () {
        var q = []
        country_code = $("#frestSelect").val()

        update($("#frestSelect").val(), $("#secandSelect").val(), q)
    }, 1000)
});