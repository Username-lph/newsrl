$(function(){
    $('#home_banner3').flexslider({
        animation: "slide",
        direction: "horizontal",
        easing: "swing"
    });



    $(function () {
        $("p.goods_combo span").click(function () {
            if (!$(this).hasClass("on")) {
                ele = $(this);
                goods_id = $(this).attr('pro_id');
                a_url = $(this).attr('g_url');
                $.post(a_url, {
                    goods_id: goods_id
                }, function (res) {
                    if (res.error == 0) {
                        goods = res.goods;
                        ele.siblings('span').removeClass('on');
                        ele.addClass('on');
                        $(".info_item h2").html(goods.title);
                        $(".info_item p.summary").html(goods.summary);
                        $(".info_item div.t").html(goods.sub_name); /*自定义*/
                        $(".info_item p.description").html(goods.description[0].desc_a);
                        if (goods.is_promotion) {
                            $("p.price span.now_price").html(goods.promotion_price);
                        } else {
                            $("p.price span.now_price").html(goods.shop_price);
                            $("p.price span.old_price").html(goods.org_price);
                        }
                        if (goods.is_promotion || goods.is_recommendation) {
                            $(".info_img span.pro_tag").show();
                            (goods.is_recommendation) ? $(".info_img span.pro_tag").html(
                                "推荐"): $(".info_img span.pro_tag").html("促销");
                        } else {
                            $(".info_img span.pro_tag").hide();
                        }
                        $("p.goods_btns span.add_to_cart").attr("pro_id", goods.pro_id);
                        $("p.goods_btns span.now_purchase").attr("pro_id", goods.pro_id);

                    } else {
                        alert("数据获取错误，请联系管理员！");
                    }
                }, "json");
            }
        });
    })

    function go_cart(ele, c_url) {
        goods_id = $(ele).attr("pro_id");
        window.location.href = c_url + '/' + goods_id;
    }


    //评论
    $(function () {

        var a = 1;
        var h = $(".pj_content");
        var h2 = $(".comment_page");
        var htm;

        function t3(ele, ele2) {
            $(".pj2").show();
            ajaxurl = "http://www.baidiqing77.com/comments/index/" + a;
            $.post(ajaxurl, function (data) {
                if (data.error == 0) {
                    $(".pj2").hide();
                    $('input[name="token"]').attr('value', data.token);

                    var m2 = [];
                    for (var m in data.datalist) {
                        m2.push(data.datalist[m]);
                    }
                    m2.reverse();
                    $.each(m2, function (s, i) {
                        var t2 = "";
                        var rep2 = "";
                        if (i.rep !== 0) {
                            $.each(i.rep, function (n, n2) {
                                var newDate2 = new Date();
                                newDate2.setTime(n2.add_time * 1000);
                                rep2 += "<p><span style=\"color:#57000d\">【" + n2.user_name +
                                    "回复】：</span>" + n2.content +
                                    "<span style=\"padding-left:20px;color:#57000d\">" +
                                    newDate2.toLocaleDateString() + "</span></p>";
                            });
                        }
                        var newDate = new Date();
                        newDate.setTime(i.add_time * 1000);
                        for (var j = 0; j < i.score;) {
                            t2 +=
                                "<i class=\"fa fa-star fa-spin\" style=\"color:#f39d14\"></i>";
                            j++;
                        }
                        if (i.rep === 0) {
                            $(ele).append(
                                "<div class=\"clearfix t6\"><div class=\"fl\" style=\"width:142px\"><span class=\"k1\"><i class=\"fa fa-user-o\"></i>" +
                                i.user_name +
                                "</span><br><span class=\"k2\"><i class=\"fa fa-calendar-check-o\"></i>" +
                                newDate.toLocaleDateString() + "</span></div>" +
                                "<div class=\"fr\" style=\"width:798px\"><p class=\"k1\"> <span>" +
                                t2 + "</span></p><p class=\"k2\">" + i.content +
                                "</p><p class=\"k3\"><span onclick=\"comment_zhan(this," +
                                i.comment_id +
                                " , 'http://www.baidiqing77.com/comments/')\"><i class=\"fa fa-thumbs-o-up\"></i><small>" +
                                i.poke + "</small></p></div></div>");

                        } else {
                            $(ele).append(
                                "<div class=\"clearfix t6\"><div class=\"fl\" style=\"width:142px\"><span class=\"k1\"><i class=\"fa fa-user-o\"></i>" +
                                i.user_name +
                                "</span><br><span class=\"k2\"><i class=\"fa fa-calendar-check-o\"></i>" +
                                newDate.toLocaleDateString() + "</span></div>" +
                                "<div class=\"fr\" style=\"width:798px\"><p class=\"k1\"> <span>" +
                                t2 + "</span></p><p class=\"k2\">" + i.content +
                                "</p><p class=\"k3\"><span onclick=\"comment_zhan(this," +
                                i.comment_id +
                                " , 'http://www.baidiqing77.com/comments/')\"><i class=\"fa fa-thumbs-o-up\"></i><small>" +
                                i.poke + "</small></p>" + rep2 + "</div></div>");

                        }

                    });

                    $(ele2).append(data.page);
                    var t = h2.children();
                    $(ele2).find("a").attr("href", "javascript:void(0)");

                    $.each(t,
                        function () {
                            $(this).click(function () {
                                $(ele).children().remove();
                                $(ele2).children().remove();
                                $(".pj2").show();
                                if ($(this).context.nodeName === "STRONG") {
                                    a = parseInt($(this).html());
                                } else {
                                    a = parseInt($(this).attr("data-ci-pagination-page"));
                                }
                                t3(h, h2);

                            });
                        }
                    );

                } else {
                    $(".pj2").hide();
                    $(ele).append("没有评论");
                }
            }, "json");

        }

        t3(h, h2);

    });


    function check_captcha(ele, ajaxurl) {
        ajaxurl = ajaxurl + "/post_captcha_check";
        var captcha_val = $(ele).val();
        if (captcha_val != '') {
            $.post(ajaxurl, {
                captcha: captcha_val
            }, function (data) {
                if (data.error == 0) {
                    $(ele).after("<i class=\"fa fa-check\" style=\"color:#00CC66;\"></i>");
                    $(ele).removeAttr("onblur");
                    $(ele).attr("readonly", true);
                    $(ele).siblings("img#capthcha_img").removeAttr("onclick");
                    $(ele).siblings("a#capthcha_img_txt").removeAttr("onclick");
                } else {
                    alert(data.msg);
                    capthcha_img_src = $(ele).siblings("img#capthcha_img").attr("src");
                    $(ele).siblings("img#capthcha_img").attr("src", capthcha_img_src + "?r=" + Math.random());
                    $(ele).val("");
                }
            }, "json");
        }
    }

    function submit_form(ele, ajaxurl) {
        var comment_form = $(ele).closest("div#comment_form");
        var name = comment_form.find("input[name=name]").val() ? $.trim(comment_form.find("input[name=name]").val()) :
            "";
        var star = comment_form.find("input[name=star]:checked").val() ? $.trim(comment_form.find(
            "input[name=star]:checked").val()) : 0;
        var pingjia = comment_form.find("textarea[name=pingjia]").val() ? $.trim(comment_form.find(
            "textarea[name=pingjia]").val()) : "";
        var captcha = comment_form.find("input[name=captcha]").val() ? $.trim(comment_form.find(
            "input[name=captcha]").val()) : "";
        var token = comment_form.find("input[name=token]").val() ? $.trim(comment_form.find("input[name=token]").val()) :
            "";
        var action = comment_form.find("input[name=action]").val() ? $.trim(comment_form.find("input[name=action]")
            .val()) : "";
        if (name == '') {
            alert("客户昵称没有填写！");
            comment_form.find("input[name=name]").focus();
            return false;
        }
        if (pingjia == '') {
            alert("评价内容没有填写！");
            comment_form.find("textarea[name=pingjia]").focus();
            return false;
        }
        if (captcha == '') {
            alert("验证码没有填写！");
            comment_form.find("input[name=captcha]").focus();
            return false;
        }
        ajaxurl = ajaxurl + "/actadd";
        $.post(ajaxurl, {
            name: name,
            star: star,
            pingjia: pingjia,
            captcha: captcha,
            token: token,
            action: action
        }, function (data) {
            if (data.error == 0) {
                alert(data.msg);
            } else {
                alert(data.msg);
                location.reload();
            }
        }, "json");
    }

    function comment_zhan(ele, id, ajaxurl) {
        ajaxurl = ajaxurl + "/newpoke";
        $.post(ajaxurl, {
            comment_id: id
        }, function (data) {
            if (data.error == 0) {
                $(ele).find("small").html(data.msg);
            } else {
                alert(data.msg);
            }
        }, "json");
    }
})