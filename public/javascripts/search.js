/**
 * Created by Administrator on 2016/9/18.
 */
$(function () {
    $('#btn_searsh').click(function () {
        $.ajax({
            type:'post',
            url:'/search',
            data:{con:$('#ser_txt').val()},
            dataType:'json',
            success:function (data) {
                $('.main_left_show_middle').empty();
                $('footer').empty();
                console.log('changduwei'+data.posts.length-1)
                for (var a=0;a<=data.posts.length-1;a++){
                    $('.main_left_show_middle').append(
                        '<div class="main_left_show_middle_top">'+
                        '<span>' +data.posts[a].Post_date +'</span>'+
                        '<span>来自</span>'+
                        '<span><a href="">Mr尐哈拉</a> </span>'+
                        '</div>'+
                        '<div class="main_left_show_middle_title"><h2><a href="">'+data.posts[a].Title+'</a></h2></div>'+
                        '<div class="main_left_show_middle_content">'+data.posts[a].Post_content+'</div>'+
                        '<div class="main_left_show_middle_bottom">'+
                        '<span class="main_left_show_middle_bottom_span">浏览4|</span>'+
                        '<span>评论5|</span>'+
                        '<span>收藏6|</span>'+
                        '<span>赞1</span>'+
                        '</div>'

                    )
                    for (var j=1;j<=data.pageAcount;j++){
                        $('footer').append(

                            '<a href="#">'+j+'</a>'

                        )
                    }
                }
            },
            error:function (error) {
                console.log(error.message);
            }
        })
    });
})