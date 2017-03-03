/**
 * Created by jym on 2016/9/10.
 */
$(function(){
    $('#page1').click(function(){
        $('.content').empty();
        $('.content').append(
            '<div class="page1">'+
            '<div class="course_intro">'+
            '<div class="page1_title">课程描述</div>'+
            '<div class="page1_content">' +
                'HTML5是用于取代1999年所制定的 HTML 4.01 和 XHTML 1.0 标准的 HTML 标准版本，'+
                ' 现在仍处于发展阶段，但大部分浏览器已经支持某些 HTML5 技术。HTML 5有两大特点：'+
                '首先，强化了 Web 网页的表现性能。其次，追加了本地数据库等 Web 应用的功能。广义论及HTML5时，'+
                '实际指的是包括HTML、CSS和JavaScript在内的一套技术组合。它希望能够减少浏览器对于需要插件的丰富性'+
                '网络应用服务（plug-in-based rich internet application，RIA)' +
                '如Adobe Flash、MicrosoftSilverlight与Oracle JavaFX的需求并且提供更多能有效增强网络应用的标准集'+
            '</div>'+
            '</div>'+
            '</div>'
        );
    })
    $('#page2').click(function(){
        $('.content').empty();
        $('.content').append(
            '<div class="page2">' +
            '<div class="comm">' +
            '<div class="head_img"><img src="../images/1.jpg"></div>'+
            '<div class="write_comm"></div>'+
            '</div>'+
            '<div id="pinglun"><button>评论<tton></div>'+
            '<div class="all_comm">' +
            '<div class="comm_info">aaa<div>' +
            '<div class="comm_info1">bbb<div>' +
            '<div class="comm_info1">bbb<div>' +
            '<div class="comm_info1">bbb<div>' +
            '</div>'+
            '</div>'
        );
    })

    $('#page3').click(function(){
        $('.content').empty();
        $('.content').append(
            '<div class="page3">' +
                '<div class="test">'+
                '<div class="question"></div>'+
                '<div class="question"></div>'+
                '<div class="question"></div>'+
                '<div class="question"></div>'+
            '</div>'+
            '</div>'
        );
    })
    $('li').hover(function () {
        $(this).addClass('underline').siblings().removeClass('underline');
    });
    //
    // $.ajax({
    //     type:'get',
    //     // url:'/post/aaaa',
    //     url:'/video',
    //     data:{hotPost:'hot'},
    //     timeout:3000,
    //     dataType:'json',
    //     success:function(d){
    //         alert(d.video)
    //     },
    //     error:function(error){
    //         alert('34656error')
    //     }
    // })

});