/**
 * Created by Administrator on 2016/9/12.
 */
$(function () {
    $('.main_left_show_middle_title').click(function () {
        var postId=$(this).attr('class').split('/')[1];
        // alert(postId);
    })
    $('.main_left_show_middle_bottom_span_3').click(function () {

    $(this).css("display","none").next().css("display","inline");
        var postId=$(this).attr('class').split('/')[1];
        alert(postId);
        $.ajax({
            type:'post',
            url:'/favourite_post',
            data:{id:$(this).next().attr('id'),postId:postId},
            timeout:3000,
            dataType:'json',
            success:function(d){
                if(d.res==0){
                    alert('收藏成功');
                }else if(d.res==2){
                    alert('收藏失败');
                }
            },
            error:function(error){
                console.log(error.message);
            }
        })




})
    $('.main_left_show_middle_bottom_span_4').click(function () {
        $(this).css("display","none").prev().css("display","inline");
        // $('#fav2').css("display","inline");
    })
    // var f=true;
    // $('.main_left_show_middle_bottom_span_3').click(function () {
    //
    //     if(f=true){
    //         $(this).empty();
    //         $(this).append('<img src="/images/fav1.png" alt="">');
    //         f=false;
    //     }else {
    //         $('.main_left_show_middle_bottom_span_3').empty();
    //         $('.main_left_show_middle_bottom_span_3').append('<img src="/images/fav2.png" alt="">');
    //         f=true;
    //     }
    //
    // })



    $(".main_left_show_top_span,.main_left_show_top_triangle1").mouseover(function () {
        $(".main_left_show_top_triangle1").css({"transform":"rotate(180deg)"});
        $('.main_left_show_top_hid').toggle();
    });
    $(".main_left_show_top_span,.main_left_show_top_triangle1").mouseleave(function () {
        $(".main_left_show_top_triangle1").css({"transform":"rotate(360deg)"});
        $('.main_left_show_top_hid').toggle();
    });

    
    $('footer a').click(function(){
        $.ajax({
            type:'post',
            url:'/post',
            data:{index:$(this).text()},
            timeout:3000,
            dataType:'json',
            success:function(d){
                alert(data.posts[0].title);
            },
            error:function(error){
                $('.ajax_result').html(error.message);
            }
        })
    })

    $('.fot_fot').click(function () {
        $('.content_post').animate({height:'+=300px'})
    })

    $('#btn_searsh').click(function () {
        $.ajax({
            type:'post',
            url:'/search',
            data:{con:$('#ser_txt').val()},
            dataType:'json',
            success:function (data) {
                $('.content_post').empty();
                $('.fot_da').empty().css("display","none");
                $('footer').empty();
                $('.fot_fot').css('display','block');
                // console.log('changduwei'+data.posts.length-1)
                for (var a=0;a<=data.posts.length-1;a++){
                    $('.content_post').append(
                    '<div class="main_left_show_middle_top">'+
                        '<span>' +data.posts[a].Post_date +'</span>'+
                        '</div>'+
                        '<div class="main_left_show_middle_title"><h2><a href="">'+data.posts[a].Title+'</a></h2></div>'+
                        '<div class="main_left_show_middle_content">'+data.posts[a].Post_content+'</div>'+
                        '<div class="main_left_show_middle_bottom">'+
                        '<span class="main_left_show_middle_bottom_span">浏览4|</span>'+
                        '<span>评论5|</span>'+
                        '<span class="main_left_show_middle_bottom_span_3"><img src="/images/fav2.png" alt=""></span>'+'|'+
                        '<span>赞1</span>'+
                        '</div>'

                    )

                }


            },
            error:function (error) {
                console.log(error.message);
            }
        })
    });
    $('.main_left_show_middle_comment_span').click(function () {
        alert($(this).prev().attr('class'));
        var time=new Date();
        var postId=$(this).attr('class').split('/')[1];
        alert(postId)
        $.ajax({
            type:'post',
            url:'/comment_post',
            data:{Post_id:postId,comment_time:time.getDate(),comment_content:$(this).prev().val()},
            timeout:3000,
            dataType:'json',
            success:function(d){
                alert(d.result);
            },
            error:function(error){
                console.log(error.message);
            }
        })
    })

    $('.hot').click(function () {
        $.ajax({
            type:'post',
            url:'/get_fav_post',
            data:{name:'sort'},
            timeout:3000,
            dataType:'json',
            success:function(data){
                alert(data.pageAcount)
                $('.content_post').empty();
                $('.fot_da').empty().css('display','block');
                // console.log('changduwei'+data.posts.length-1)
                for (var a=0;a<=data.hotposts.length-1;a++) {
                    $('.content_post').append(
                        '<div class="main_left_show_middle_top">' +
                        '<span>' + data.hotposts[a].time + '</span>' +
                        '</div>' +
                        '<div class="main_left_show_middle_title"><h2><a href="">' + data.hotposts[a].Title + '</a></h2></div>' +
                        '<div class="main_left_show_middle_content">' + data.hotposts[a].Post_content + '</div>' +
                        '<div class="main_left_show_middle_bottom">' +
                        '<span class="main_left_show_middle_bottom_span">浏览4|</span>' +
                        '<span>评论5|</span>' +
                        '<span class="main_left_show_middle_bottom_span_3"><img src="/images/fav2.png" alt=""></span>' + '|' +
                        '<span>赞1</span>' +
                        '</div>'
                    )

                }
                for (var a=1;a<=data.pageAcount;a++) {
                    $('.fot_da').append(
                    '<div class="fot_zhong">'+
                        '<a href="/post/?hh='+a+'">'+a+'</a>'+
                        '</div>'
                    )
                }

            },
            complete:function () {
                $('.fot_zhong').click(function () {
                    alert($(this).text())
                    $.ajax({
                        type:'post',
                        url:'/indexuu',
                        data:{index:$(this).text()},
                        timeout:3000,
                        dataType:'json',
                        success:function(data){
                            alert(data.posts[0].title);
                        },
                        error:function(error){
                            $('.ajax_result').html(error.message);
                        }
                    })
                })
            },
            error:function(error){
                console.log(error.message);
            }
        })
    })
    //获取postId查找作者名
    // var postId=$('.author').attr('class').split('/')[1];
    // $.ajax({
    //     type:'post',
    //     url:'/users/sea_athor',
    //     data:{postId:postId},
    //     timeout:3000,
    //     dataType:'json',
    //     success:function(d){
    //         alert(data.posts[0].title);
    //     },
    //     error:function(error){
    //        console.log(error.message);
    //     }
    // })


})
