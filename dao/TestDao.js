/**
 * Created by Administrator on 2016/9/22.
 */
var DBPool=require('../util/DBHelper-pool');
module.exports={
    get_test:function(index,account,callback){
        DBPool.getConnection(function (client) {
            client.query('select count(*) total from test_bank',function (error,totalAccount) {
                if(error){
                    console.log(error.message);
                    return;
                }
                client.query('select Test_name,ChoiceA,ChoiceB,ChoiceC,ChoiceD from test_bank limit ?,?',[(index-1)*account,account],function (error,result) {
                    if(error){
                        console.log(error.message);
                        return;
                    }
                    console.log('题库'+JSON.stringify(result));
                    callback({total:totalAccount[0].total,res:result});
                    client.release();
                });

            });

        })
    }
}