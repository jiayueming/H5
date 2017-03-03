/**
 * Created by Administrator on 2016/9/20.
 */
var DBPool=require('../util/DBHelper-pool');
// var MD5=require('../util/MD5');
module.exports={
    favourite_Post:function (email,favorite,callback) {
        DBPool.getConnection(function (client) {
            client.query('select User_id from user_info where Email=?',[email],function(error,result1){
                if(error){
                    console.log(error.message);
                    return;
                }
                console.log(JSON.stringify(result1))
            client.query('insert into favorite (User_id,Post_id) values (?,?)',[result1[0].User_id,favorite],function (error,result) {
                if(error){
                    console.log(error.message);
                    return;
                }
                // callback(result)
                console.log(JSON.stringify(result));
                callback({email:result1,res:result})
                client.release();
                })
            });
        })
    },
    get_favourite:function (email,callback) {
        DBPool.getConnection(function (client) {
            //调用视图
            client.query('select User_id from user_info where Email=?',[email],function(error,result1){
                if(error){
                    console.log(error.message);
                    return;
                }
                client.query('select DISTINCT Title,favorite.Post_id from post,favorite where favorite.Post_id=post.Post_id and favorite.User_id=? ',[result1[0].User_id],function (error,result) {
                    if (error) {
                        console.log(error.message);
                        return;
                    }
                    console.log('fav' + JSON.stringify(result));
                    callback(result);
                   client.release();
                })
            });

        });
    },
    cancel_favourite:function (email,del_postId,callback) {
        DBPool.getConnection(function (client) {
            client.query('select User_id from user_info where Email=?',[email],function(error,result1) {
                if (error) {
                    console.log(error.message);
                    return;
                }
                client.query('DELETE  from favorite where  User_id=? and Post_id=? ',[result1[0].User_id,del_postId],function (error,result) {
                    if (error) {
                        console.log(error.message);
                        return;
                    }
                    console.log('hjgwehvesf' + JSON.stringify(result));
                    callback(result);
                    client.release();
                })
            })
        })
    }

}