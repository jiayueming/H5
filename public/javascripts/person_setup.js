/**
 * Created by Administrator on 2016/9/21.
 */
function previewImage(file)
{
    var MAXWIDTH  = 260;
    var MAXHEIGHT = 190;
    var div = document.getElementById('preview');
    if (file.files && file.files[0])
    {
        div.innerHTML ='<img id=imghead>';
        var img = document.getElementById('imghead');
        img.onload = function(){
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width  =  rect.width;
            img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
            img.style.marginTop = rect.top+'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt){img.src = evt.target.result;}
        reader.readAsDataURL(file.files[0]);
    }
    else //兼容IE
    {
        var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
        div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
    }
}
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight )
    {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if( rateWidth > rateHeight )
        {
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else
        {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    // param.left = Math.round((maxWidth - param.width) / 2);
    // param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}
$(function () {
    $('#myTab').tab('show');
    $('.font_style').click(function () {
        $(this).addcss('font_style_new');
    })

    $('#per_info').submit(function () {
        var formdata = new FormData($('#per_info')[0]);
        $.ajax({
            type: 'post',
            url: '/users/up_info',
            data: formdata,
            timeout: 3000,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if(data.res==1){
                    alert('修改成功')
                }else{
                    alert('修改失败')
                }
                // location.href = "/post";
            },
            error: function (error) {
                alert('2345')
            }
        });
        return false;
    });

});