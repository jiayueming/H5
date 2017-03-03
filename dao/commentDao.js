/**
 * Created by Administrator on 2016/9/19.
 */
var DBPool=require('../util/DBHelper-pool');
// var MD5=require('../util/MD5');
module.exports= {
    comment_Post: function (postId, comment_content, email, time, replyId, callback) {
        DBPool.getConnection(function (client) {
            //调用视图

            client.query('select User_id from user_info where Email=?', [email], function (error, result1) {
                if (error) {
                    console.log(error.message);
                    return;
                }
                console.log(result1);
                client.query('insert into comments(Post_id,User_id,Comment_content,Comment_time,Reply_id) values (?,?,?,?,?)', [postId, result1[0].User_id, comment_content, time, replyId], function (error, result) {
                    if (error) {
                        console.log(error.message);
                        return
                    }
                    // console.log('comment detailiiiiiiiiiiiiiiiiiii' + JSON.stringify(result));
                    callback({res: result});;
                    client.release();

                })
            })
        })
    },
    get_comment:function(postId,callback){
        DBPool.getConnection(function (client) {
            client.query('select Comment_time,Comment_content,Nickname from comments,user_info where comments.User_id=user_info.User_id and Post_id=?',[postId],function (error,result) {
                if (error) {
                    console.log(error.message);
                    return;
                }
                console.log('comment detail' + JSON.stringify(result));
                callback(result);
                client.release();
            })
        })
    }
}