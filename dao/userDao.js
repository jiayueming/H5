/**
 * Created by lzhan on 16/8/31.
 */


//验证账号密码在这里实现   返回 0或1
var DBPool=require('../util/DBHelper-pool');
// var MD5=require('../util/MD5');
module.exports={
    login:function (user_info,callback) {
        DBPool.getConnection(function (client) {
//调用视图
            client.query('select count(*) num from user_info where Email=? and Password=? ',[user_info.Email,user_info.Password],function (error,result) {
                if(error){
                    console.log(error.message);
                    return;
                }
                console.log(JSON.stringify(result));
                callback(result);
                client.release();

            });
        });
    },
    isReg:function (id,callback) {
        DBPool.getConnection(function (client) {
//调用视图
            client.query('select count(*) num from user_info where Email=? ',[id],function (error,result) {
                if(error){
                    console.log(error.message);
                    return;
                }
                console.log(JSON.stringify(result));
                callback(result);
                client.release();

            });
        });
    },
    regist:function (user_info,callback) {
        DBPool.getConnection(function (client) {
//调用视图
            console.log(user_info)
            client.query('insert into user_info(Email,Password) values(?,?)',[user_info.Email,user_info.Password],function (error,result) {
                if(error){
                    console.log(error.message);
                    callback({affectedRows:1});
                    return;
                }

                callback(result);
                client.release();

            });
        });
    },
    update_info:function(info,email,callback){
        DBPool.getConnection(function (client) {
            //调用视图
                client.query('UPDATE user_info SET Nickname =?,Position=?,Sex=?,Head=?,Autograph=?,birth=? WHERE Email = ? ',[info.Nickname,info.postion,info.sex,info.img,info.Autograph,info.birth,email],function(error,result) {
                    if (error) {
                        console.log(error.message);
                        return;
                    }
                    console.log('改信息' + JSON.stringify(result));
                    callback(result);
                    client.release();
                })
        })
    },
//显示用户头像
    user_img:function (email,callback) {
        DBPool.getConnection(function (client) {
            //调用视图
            client.query('select Head from user_info where=? ',[email],function(error,result) {
                if (error) {
                    console.log(error.message);
                    return;
                }
                console.log('头像' + JSON.stringify(result));
                callback(result);
                client.release();
            })
        })
    },
    check_info:function (email,callback) {
        DBPool.getConnection(function (client) {
            //调用视图
            client.query('select User_id from user_info where Email=?',[email],function(error,result1){
                if(error){
                    console.log(error.message);
                    return;
                }
                client.query('select * from user_info where User_id=? ',[result1[0].User_id],function (error,result) {
                    if (error) {
                        console.log(error.message);
                        return;
                    }
                    console.log('个人信息' + JSON.stringify(result));
                    callback(result);
                    client.release();
                })
            });

        });
    }

};

