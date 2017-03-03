/**
 * Created by Administrator on 2016/9/18.
 */
$(function () {
    var example1=new sHover("example1","intro1");
    example1.set({
        speed:4,
        opacity:30,
        opacityChange:true
    });


    $.ajax({
            type:'post',
            // url:'/post/aaaa',
            url:'/main',
            data:{hotPost:'hot'},
            timeout:3000,
            dataType:'json',
            success:function(d){
                alert('chulaiba')
            },
            error:function(error){

            }
        })

})
