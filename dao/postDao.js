/**
 * Created by Administrator on 2016/9/14.
 */
var DBPool=require('../util/DBHelper-pool');
// function getPost(index,account,callback) {
// //account表示页面大小
//     DBPool.getConnection(function (client) {
//         //调用视图
//         client.query('select count(*) total from post',function (error,totalAccount) {
//             if(error){
//                 console.log(error.message);
//                 return;
//             }
//             client.query('select Title,Post_content,CONCAT_WS("-",year(Post_date),month(Post_date),day(Post_date)) Post_date from post order by Post_date asc limit ?,?',[(index-1)*account,account],function (error,result) {
//                 if(error){
//                     console.log(error.message);
//                     return;
//                 }
//                 // console.log(JSON.stringify(result));
//                 callback({total:totalAccount[0].total,res:result});
//                 client.release();
//             });
//         });
//
//     });
// }
module.exports={
    getPost:function(index,account,callback) {
        DBPool.getConnection(function (client) {
            //调用视图
            client.query('select count(*) total from post',function (error,totalAccount) {
                if(error){
                    console.log(error.message);
                    return;
                }
                client.query('select Title,substring(Post_content,1,30) Post_content,Post_id,CONCAT_WS("-",year(Post_date),month(Post_date),day(Post_date)) time from post order by Post_date desc limit ?,?',[(index-1)*account,account],function (error,result) {
                    if(error){
                        console.log(error.message);
                        return;
                    }


                        callback({total:totalAccount[0].total,res:result});
                        client.release();

                    // console.log(JSON.stringify(result));

                });
            });

        });
    },
    search:function(title,callback) {
        DBPool.getConnection(function (client) {
            client.query('select count(*) number from post WHERE Title LIKE ?',['%'+title+'%'], function (error, totalAccount) {
                if (error) {
                    console.log(error.message);
                    return;
                }

                client.query('select Title,substring(Post_content,1,30) Post_content,CONCAT_WS("-",year(Post_date),month(Post_date),day(Post_date)) Post_date from post WHERE Title LIKE ? ',['%'+title+'%'],function (error,result) {
                    if(error){
                        console.log(error.message);
                        return;
                    }
                    // console.log(JSON.stringify(result));
                    callback({res:result});
                    console.log('TANGG总数'+totalAccount[0].number);
                    console.log('TANGG'+JSON.stringify(result))
                    client.release();
                });
             })
        })
    },
    hotPost:function(callback){
        DBPool.getConnection(function (client) {
            client.query('select Title,Post_id from post limit ?,?',[0,4],function (error,result) {
                if(error){
                    console.log(error.message);
                    return;
                }
                // console.log(JSON.stringify(result));
                callback({res:result});
                client.release();
            });
        });
    },
    put_post:function(put,email,date,callback){
        DBPool.getConnection(function (client) {
            //调用视图
            client.query('select User_id from user_info where Email=?',[email],function(error,result1) {
                if (error) {
                    console.log(error.message);
                    return;
                }
                client.query('INSERT INTO post(User_id,Title,Post_content,picture,Post_date,Type_id) VALUES(?,?,?,?,?,?)',[result1[0].User_id,put.title,put.content,put.img,date,put.typeId],function(error,result) {
                    if (error) {
                        console.log(error.message);
                        return;
                    }
                    console.log('发帖子' + JSON.stringify(result));
                    callback(result);
                    client.release();
                })
            })
        })
    },
    post_detail:function(postId,callback){
        DBPool.getConnection(function (client) {
            client.query('select Title,Post_content,Post_id,CONCAT_WS("-",year(Post_date),month(Post_date),day(Post_date)) Post_date from post where Post_id=?',[postId],function (error,result) {
                if(error){
                    console.log(error.message);
                    return;
                }

                console.log('detail post'+JSON.stringify(result));
                callback({res:result});
                client.release();
                });
        });
    },
    insert_love:function(postId,callback){
        DBPool.getConnection(function (client) {
                client.query('UPDATE post SET love_state=? where Post_id=?',[1,postId],function (error,result) {
                    if(error){
                        console.log(error.message);
                        return;
                    }
                    console.log('love'+JSON.stringify(result));
                    callback(result);
                    client.release();
                });
        });
    },
    del_love:function(postId,callback){
        DBPool.getConnection(function (client) {
            client.query('UPDATE post SET love_state=? where Post_id=?',[0,postId],function (error,result) {
                if(error){
                    console.log(error.message);
                    return;
                }
                console.log('love'+JSON.stringify(result));
                callback(result);
                client.release();
            });
        });
    },
    fav_post:function(index,account,callback) {
        DBPool.getConnection(function (client) {
            //调用视图
            client.query('select count(*) total from post',function (error,totalAccount) {
                if(error){
                    console.log(error.message);
                    return;
                }
                client.query('select Title,substring(Post_content,1,30) Post_content,Post_id,CONCAT_WS("-",year(Post_date),month(Post_date),day(Post_date)) time from post ORDER BY (SELECT count(*) from favorite where favorite.Post_id=post.Post_id )DESC limit ?,?',[(index-1)*account,account],function (error,result) {
                    if(error){
                        console.log(error.message);
                        return;
                    }

                    console.log(result)
                    callback({total:totalAccount[0].total,res:result});
                    client.release();

                    // console.log(JSON.stringify(result));

                });
            });

        });
    },
    // get_author:function (postId,callback) {
    //     DBPool.getConnection(function (client) {
    //         client.query('SELECT User_id from post WHERE Post_id=?',[postId],function (error,result1) {
    //             if (error) {
    //                 console.log(error.message);
    //                 return;
    //             }
    //             client.query('SELECT Nickname from user_info WHERE Post_id=?',[result1[0].User_id],function (error,result) {
    //                 if (error) {
    //                     console.log(error.message);
    //                     return;
    //                 }
    //                 console.log('nickname' + JSON.stringify(result));
    //                 callback(result);
    //                 client.release();
    //             })
    //         });
    //     });
    // }
}
// exports.getPost=getPost;
