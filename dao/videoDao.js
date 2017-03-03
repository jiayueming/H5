/**
 * Created by Administrator on 2016/9/19.
 */
var DBPool=require('../util/DBHelper-pool');
// var MD5=require('../util/MD5');
module.exports={
    getVideo:function(Id,callback) {
        DBPool.getConnection(function (client) {
            client.query('select Video_intro,Video_url from video where Video_id=?',[Id],function (error,result) {
                if(error){
                    console.log(error.message);
                    return;
                }
                callback(result);
            });
        });
    },
}