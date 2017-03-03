/**
 * Created by jym on 2016/9/12.
 */

$(function(){
    $('li').click(function () {
        $(this).toggleClass('show').siblings().removeClass('show');
    });
});
$('footer a').click(function(){
    $.ajax({
        type:'post',
        url:'/users/Test',
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