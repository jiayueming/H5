/**
 * Created by Administrator on 2016/9/20.
 */
$(function () {
    $('#stage_fav').click(function () {
        $.ajax({
            type:'post',
            url:'/users/get_fav',
            data:{hotPost:'hot'},
            timeout:3000,
            dataType:'json',
            success:function(d){
                $('.track').empty().append('<div class="track_post_post">帖子</div>');
                    for(var i=0;i<=d.favourites.length-1;i++){
                    $('.track').append(
                    '<div class="track_post_title">' +
                    '<section>' +
                    '<button class="lined thick linedthin"><a href="/users/postDetail?Post_id='+d.favourites[i].Post_id+'">'+d.favourites[i].Title +'</a></button>' +
                        '</section>' +
                        '<section>' +
                        '<button class="del lined thin linedthin del_span">' +
                        '<span class="del_hidden">'+d.favourites[i].Post_id+'</span>' +
                        '<span class="del_span">取消收藏</span>' +
                        '</button>' +
                        '</section>' +
                        '</div>'


                    //     '<div class="track_post_title">'+d.favourites[i].Title +
                    // '<div class="del" >'+
                    // '<span class="del_hidden">'+d.favourites[i].Post_id+'</span>' +
                    // '<span class="del_span">取消收藏</span>'+
                    // '</div>'+
                    //     '</div>'
                    )
                       // alert('timu'+$('.linedthin').text())

                        $('.del_span').click(function(){
                            var del_postId=$(this).prev().text();
                            var del_div=$(this).parent().parent();
                            alert('我要删除的是'+del_postId)
                            $.ajax({
                                type:'post',
                                url:'/users/del_fav',
                                data:{del_postId:del_postId},
                                timeout:3000,
                                dataType:'json',
                                success:function(d){
                                    del_div.remove();
                                },
                                error:function(error){
                                  console.log(error.message);
                                }
                            })
                           if(d.favourites[i].Post_id){
                               alert('删除成功')
                           }
                        })

                    }

            },
            error:function(error){
                console.log(error.message);
}
})

})
    //展示个人信息
    $('#per_info').click(function () {

        $.ajax({
            type:'post',
            url:'/users/get_info',
            data:{name:2},
            timeout:3000,
            dataType:'json',
            success:function(d){
                $('.track').empty();
                for(var i=0;i<=d.info.length-1;i++) {
                    $('.track').append(
                        ' <div class="per_name"><span>姓名：</span>'+d.info[i].Nickname+'</div>' +
                        '<div class="per_name"><span>职位：</span>'+d.info[i].Position+'</div>' +
                        '<div class="per_name"><span>性别：</span>'+d.info[i].Sex+'</div>' +
                        '<div class="per_name"><span>邮箱：</span>'+d.info[i].Email+'</div>' +
                        ' <div class="per_name"><span>个性签名：</span>' +
                        d.info[i].Autograph+
                        '</div>'+
                    '<div class="per_name"><a href="/users/person_setup">修改资料</a></div>'
                    )
                }
            },
            error:function(error){
                $('.ajax_result').html(error.message);
            }
        })
    })
})