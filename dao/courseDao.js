/**
 * Created by Administrator on 2016/9/14.
 */
var DBPool=require('../util/DBHelper-pool');
module.exports={
    getCourse:function(callback) {
        DBPool.getConnection(function (client) {
                client.query('select Course_name,img_url,Video_id from course limit ?,?',[0,8],function (error,results) {
                    if(error){
                        console.log(error.message);
                        return;
                    }
                    client.query('select Title,Post_id from post limit ?,?',[0,4],function (error,result) {
                        if(error){
                            console.log(error.message);
                            return;
                        }
                        // console.log(JSON.stringify(result));
                        callback({results:results,res:result});
                        client.release();
                    });
                });
            });

    },
    getAllcourse:function (index,account,callback) {
        DBPool.getConnection(function (client) {
            client.query('select count(*) total from course',function (error,totalAccount) {
                if(error){
                    console.log(error.message);
                    return;
                }
                client.query('select Course_name,img_url,Video_id from course limit ?,?',[(index-1)*account,account],function (error,result) {
                    if(error){
                        console.log(error.message);
                        return;
                    }
                    // console.log(JSON.stringify(result));
                    callback({total:totalAccount[0].total,res:result});
                    client.release();
                });

            });

        })

    },
    get_stage:function(stageId,callback){
        DBPool.getConnection(function (client) {

                client.query('select Course_name,img_url,Video_id from course where Stage_id=? ',[stageId],function (error,result) {
                    if(error){
                        console.log(error.message);
                        return;
                    }
                    console.log('1234567'+JSON.stringify(result));
                    callback({res:result});
                    client.release();

            })
        })
    }
}
