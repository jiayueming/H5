/**
 * Created by Administrator on 2016/9/24.
 */
$(function () {
    $('.jieduan').click(function () {
        $('.quanbu').toggle('background-color','#f7f3f5');
        $(this).css({"background-color":"red","color":"white","border-radius":"5px"}).siblings().css({"background-color":"#f7f3f5","color":"black"});
        // $('.jieduan').toggleClass('jieudan_new').siblings().removeClass('jieduan')
    })


    var example1=new sHover("example1","intro1");
    example1.set({
        speed:4,
        opacity:30,
        opacityChange:true
    });
    $('.footer a').click(function(){
        $.ajax({
            type:'post',
            url:'/course',
            data:{course:$(this).text()},
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

$('.jieduan').click(function(){
    var stageId=$(this).attr('class').split('/')[1];
    // alert('jjj'+stageId);
    $.ajax({
        type:'post',
        url:'/users/get_stage',
        data:{stageId:stageId},
        timeout:3000,
        dataType:'json',
        success:function(d){
            // alert(d.stageCourse);
            $('.show_cou_new').empty();
            for(var i=0;i<=d.stageCourse.length-1;i++) {
                $('.show_cou_new').append(
                '<div class="col-lg-3 col-md-3 col-sm-4 col-xs-6 show_cou">'+
                    '<div class="show_cou_q example1">'+
                    '<a href="/video?Video_id='+d.stageCourse[i].Video_id+'"><span class="intro1"></span><img src="/images/'+d.stageCourse[i].img_url+'"></a>'+
                    '<div class="show_cou_q_title">'+d.stageCourse[i].Course_name+'</div>'+
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
    // $('.jieduan').mouseover(function () {
    //     $('.quanbu').next().html('HTML/CSS');
    // }).mouseleave(function () {
    //     $('.quanbu').next().html('阶段一');
    // })
})