(function ($) {
    //Author: Brady Sammons
    //URL: www.bradysammons.com
    /* -------------------------------------------------------- */
    /*	//set Global variables
     /* -------------------------------------------------------- */
    var cards = $(".card-drop"),
        links = cards.find("ul>li>a"),
        li = links.parent('li'),
        count = links.length,
        width = links.outerWidth();

    //set z-Index of drop Items
    links.parent("li").each(function (i) {
        $(this).css("z-index", count - i); //invert the index values
    });

    var countSet = TempCache.getItem("count");
    var countN = 0;
    countN = countSet;
    li.each(function (index) {
        $(this).css("top", 60 * (index ))
            .css("width", "100%")
            .css("margin-left", "0px");

        for(var i = 0; i<countSet;i++){
            var value = TempCache.getItem(i+"");
            if(value == $(this).text()){
               var a =  $(this).find("a");
                a.children("img").attr("src", "./img/select_true.png");
                $(this).addClass("active");
            }
        }


    });



    /* -------------------------------------------------------- */
    /*	Links Click handler
     /* -------------------------------------------------------- */


    links.on("click", function (e) {


        var $this = $(this),
            label = $this.data("label");



        //li.removeClass('active');

        if ($this.parent("li").attr("class") == "active") {
            $this.parent('li').removeClass("active");
            $this.children("img").attr("src", "./img/select_false.png");
            countN--;
            console.log(countN+""+$this.parent("li").text());
        } else {

            console.log(count+"index 48 = "+$this.parent("li").text());
            if(countN >= 3){
                Toast("最多可选择3个画室",2000);
                return;
            }
            countN++;
            $this.children("img").attr("src", "./img/select_true.png");
            $this.parent("li").addClass("active");
        }
        e.preventDefault;
    });
    /**
     * Toast 窗口
     */

    function Toast(msg, duration) {
        duration = isNaN(duration) ? 2000 : duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.style.cssText = "width:150px; min-width:100px;opacity:0.5; height:40px; color:#fff; line-height:40px; " +
            "text-align:center; border-radius:5px; position:fixed; top:40%; left:35%;  z-index:999999; font-size:14px; " +
            "font-weight:100; filter: alpha(opacity=80); background-image:url(./img/toast_back.png);";
        document.body.appendChild(m);
        setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(m)
            }, d * 1000);
        }, duration);
    }
    var u = 0;
    $("#determine").click(function(){
        TempCache.setItem("count",countN);
        console.log("count = "+countN);
        li.each(function (index) {

            if ( $(this).attr("class") == "active"){
                console.log("count = "+countN+" index 85 = "+$(this).text());
                TempCache.setItem(u,$(this).text());
                u++;
            }

        });

        //
        //setTimeout(function(){
        //    window.history.back();
        //},1000);
        window.history.go(-2);

        u = 0;
    });

})(jQuery);