/**
 * Created by Administrator on 2016/9/11.
 */

$(function () {
    var example1=new sHover("example1","intro1");
    example1.set({
        speed:4,
        opacity:30,
        opacityChange:true
    });

    // $('.jieduan2_quanbu').hover(function () {
    //     $(this).toggleClass('zengjia').siblings().removeClass('zengjia');
    // })

    $('.span_most_zuixin,.span_most_zuire,.span_fanye_shang,.span_fanye_xia').hover(function () {
        $(this).toggleClass('span_most_font');
    })
    $('.show_one_show').hover(function () {
        $(this).toggleClass('show_one_show_hover');
    })

    $('.jieduan2_quanbu').click(function(){
        var stageId=$(this).attr('class').split('/')[1];
        alert('jjj'+stageId);
        $.ajax({
            type:'post',
            url:'/users/get_stage',
            data:{stageId:stageId},
            timeout:3000,
            dataType:'json',
            success:function(d){
                alert(d.stageCourse);
                $('.show').empty();
                for(var i=0;i<=d.stageCourse.length-1;i++) {
                    $('.show').append(
                        '<div class="show_one show_one_new">'+
                        '<div class="show_one_show example1 course">' +
                        '<a href="/video?Video_id=stageCourse[i].Video_id"><span class="intro1"></span><img src="/images/"+d.stageCourse[i].img_url></a>' +
                        '<div class="show_one_show_title course_inner_title">'+d.stageCourse[i].Course_name+'</div>' +
                        '</div>'+
                        '</div>'
                    )
                }
            },
            error:function(error){
                console.log(error.message);
            }
        })
    })
})


