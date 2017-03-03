/**
 * Created by Administrator on 2016/9/14.
 */


$(function () {
    $('#denglu').click(function () {
        $('.modal_login').modal('toggle');
    })
    $('#zhuce').click(function () {
        $('.modal_regist').modal('toggle');
    })
//显示用户名

    $('#regist_email').focus(function () {
        $('#mess1').text('请输入正确的邮箱格式').addClass('state1');
    }).blur(function(){
        if($('#regist_email').val().search(/^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}com$/)==-1){
            $('#mess1').text('请输入正确的邮箱格式').addClass('state1');
        }else{
            $('#mess1').empty();
            $('#mess1').append(
                '<span><img src="../images/true.png"></span>'
            )
            ok1=true;
        }
    })
    $('#regist_pass').focus(function(){
        var pass=$('#regist_pass').val();
        $('#mess2').text('密码不少于6位').addClass('state1');
    }).blur(function(){
        if($('#regist_pass').val().search(/^[0-9a-zA-Z_]{6,15}$/)==-1){
            $('#mess2').text('密码格式错误').addClass('state1');
        }else{
            $('#mess2').empty();
            $('#mess2').append(
                '<span><img src="../images/true.png"></span>'
            )
            ok2=true;
        }
    })
    // if(ok1&&ok2){
    //     location.href = '/main';
    // }

    //登录验证

    $('#inp_email').focus(function () {
        $('#mess3').empty();
        $('#mess3').append(
            '<span><img src="../images/false.png"></span>'
        )
    }).blur(function(){
        if($('#inp_email').val().search(/^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}com$/)==-1){
            $('#mess3').empty();
            $('#mess3').append(
                '<span><img src="../images/false.png"></span>'
            )
        }else{
            $('#mess3').empty();
            $('#mess3').append(
                '<span><img src="../images/true.png"></span>'
            )
            ok1=true;
        }
    })
    $('#inp_pass').focus(function(){
        $('#mess4').text('密码不少于6位').addClass('state1');
    }).blur(function(){
        if($('#inp_pass').val().search(/^[0-9a-zA-Z_]{6,15}$/)==-1){
            $('#mess4').text('密码格式错误').addClass('state1');
        }else{
            $('#mess4').empty();
            $('#mess4').append(
                '<span><img src="../images/true.png"></span>'
            )
            ok2=true;
        }
    })

    $('#login_form').submit(function(){
        $.ajax({
            type:'post',
            url:'/login',
            data:$(this).serialize(),
            datatype:'json',
            timeout:3000,
            // async:false,
            success:function (d) {

                if(d.result==1){
                    alert("登录成功")
                    location.href="/main";
                }else{
                    alert('登录失败')
                }
            },
            error:function (error) {
                alert('erroryyyy'+error.messages);
                alert("jiayuemingerr")
            }
        })
        return false;
    });
    $('#regist_zhuce').click(function () {
        if(ok1&&ok2){
            $('#regist_form').submit(function () {
                // console.log('iiiiii'+ $(this).serialize())
                $.ajax({
                    type: 'post',
                    url: '/regist',
                    data: $(this).serialize(),
                    timeout: 3000,
                    dataType: 'json',
                    success: function (d) {
                        alert("zhuce")
                        if (d.res==0) {
                            location.href = '/main';
                        }else if(d.res==1){
                            alert('该用户已注册')
                        }else {
                            alert('注册失败')
                        }
                    },
                    error: function (error) {
                        alert('2345')
                    }
                });
                return false;
            });
        }else{
            return false;
        }

    })

    $.ajax({
        type: 'post',
        url: '/get_userInfo',
        data: {name: '请求用户名'},
        dataType: 'json',
        success: function (data) {
            if (data.result) {
                $('#user_box').empty();
                $('#user_box').append(
                    '<li class="headYuan"><a href="#" id="zhuce"><img src="/images/touxiang.png"></li>' +
                    '<li><a href="#" id="denglu">' + data.res + '</a></li>' +
                    '<li class="dropdown">' +
                    '<a href="#" class="dropdown-toggle" data-toggle="dropdown">个人中心 <span class="caret"></span></a>' +
                    '<ul class="dropdown-menu" role="menu">' +
                    '<li><a href="/users/person_setup">我的设置</a></li>' +
                    '<li><a href="/users/Test">我的试题</a></li>' +
                    '<li><a href="/users/personal">我的收藏</a></li>' +
                    '<li class="divider"></li>' +
                    '<li id="exit"><a href="#">退出</a></li>' +
                    '</ul>' +
                    '</li>'
                )
            }
            $('#exit').click(function () {
                alert('zou lgggg')
                    $.ajax({
                        type: 'post',
                        url: '/exit',
                        data: {name:'注销'},
                        dataType: 'json',
                        success:function (data) {
                            alert('zou l')
                            if(data.res==1){
                                location.href='/main';
                            }
                        },
                        error:function (error) {
                            console.log(error.message);
                            alert('注销失败');
                        }
                    })
            })
        },
        error: function (error) {
            alert('bbbbbbbbbb');
        }
    });

    var app = angular.module('myApp', []);

    /*自定义标签 */
    app.controller('validateCtrl', function($scope) {
        //            所赋的value必须满足表单的验证规则
        $scope.Password= "请输入密码";
        $scope.email= "luke@qq.com";
    });



})
