/**
 * Created by Administrator on 2016/9/24.
 */
$(function(){
    var postId=$('.post_title').attr('class').split('/')[1];
    // $.ajax({
    //     type: 'post',
    //     url: '/users/get_comments',
    //     data: {postId: postId},
    //     dataType: 'json',
    //     success:function(data){
    //         $('.comment_area').empty();
    //         for (var i=0;i<=data.comments.length-1;i++) {
    //             $('.comment_area').append(
    //                 '<div class="comm">'+
    //                 '<div id="nickname">'+data.comments[i].Nickname+'</div>'+
    //                 '<div class="write_comm">'+data.comments[i].Comment_content+'</div>'+
    //                 '<span>'+data.comments[i].Comment_time+'</span>'+
    //                 '</div>'
    //
    //             )
    //         }
    //     },
    //     error:function (error) {
    //         alert('获取评论失败');
    //     }
    // })
    $('#btn_con').click(function () {
        $('#qianming').empty()
        var postId=$('.post_title').attr('class').split('/')[1];
        var comment_content=$('#qianming').val();
        $.ajax({
        type:'post',
        url:'/users/comment',
        data:{Post_id:postId,comment_content:comment_content},
        timeout:3000,
        dataType:'json',
        success:function(data){
            $('.comment_area').empty();
            for (var i=0;i<=data.comments.length-1;i++) {
                $('.comment_area').append(
                    '<div class="comm">'+
                    '<div id="nickname">'+data.comments[i].Nickname+'</div>'+
                    '<div class="write_comm">'+data.comments[i].Comment_content+'</div>'+
                    '<span>'+data.comments[i].Comment_time+'</span>'+
                    '</div>'

                )
            }
        },
        error:function(error){
            // console.log(error.message);
            alert('error insert cuol');
        }
    })


  })

    $('#love').click(function () {
        $('#love').animate({"margin-top":-30,"opacity":"0"},1000);
        $('#love1').css({"display":"inline"},1000);
      // $(this).css("display","none").next().css("display","inline");
        var postId=$('.post_title').attr('class').split('/')[1]
        $.ajax({
            type:'post',
            url:'/post/in_love',
            data:{postId:postId},
            timeout:3000,
            dataType:'json',
            success:function(data){
                if(data.in_love==1){
                    //alert('点赞成功')
                }else{
                    alert('点赞fail')
                }
            },
            error:function(error){
                // console.log(error.message);
                alert('error insert cuol');
            }
        })

    })
    $('#love1').click(function () {
        $(this).css("display","none").prev().css("display","inline");
        $('#love').animate({"margin-top":0,"opacity":"1"},1000);
       // alert('取消赞');
        var postId=$('.post_title').attr('class').split('/')[1]
        $.ajax({
            type:'post',
            url:'/post/del_love',
            data:{postId:postId},
            timeout:3000,
            dataType:'json',
            success:function(data){
                if(data.del_love==1){
                  //  alert('取消点赞成功')
                }else{
                    alert('取消fail')
                }
            },
            error:function(error){
                // console.log(error.message);
                alert('error insert cuol');
            }
        })

    })
})