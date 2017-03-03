/**
 * Created by Administrator on 2016/9/14.
 */
var express=require('express');
var router = express.Router();
var postDao=require('../dao/postDao');

router.get('/post',function(req,res,next){
    var index=1;
    var account=3;
    var pages=1;//总页数
    if(req.query.index){
        index=req.query.index;
    }
    postDao.getPost(postId,index,account,function(result){
        console.log("routes,books"+JSON.stringify(result));
        console.log('jiayueming'+result.total);
        pages=Math.ceil(result.total/account);
        console.log(">>>>"+pages);
        res.render('post',{pageAccount:pages,posts:result.res});
    })

});
router.post('/post',function(req,res,next){
    var index=1;
    var account=3;
    var pages=1;//总页数
    if(req.body.index){
        index=req.body.index;
    }
    postDao.getPost(index,account,function(result){
        console.log("routes,books"+JSON.stringify(result));
        console.log('jiayueming'+result.total);
        pages=Math.ceil(result.total/account);
        console.log(">>>>"+pages);
        res.json({posts:result.res});
    })
});

router.post('/aaaa',function(req,res,next){
    postDao.hotPost(function(result){
        console.log('最热帖子')
        console.log('jiayueminghhhhhh'+result.total);
        console.log(result.res);
        res.json({hotPosts:result.res});
    })
})
router.post('/in_love',function (req,res,next) {
    var postId=req.body.postId;
    postDao.insert_love(postId,function (result) {
            if(result.affectedRows==1){
                res.json({in_love:1})
            } else{
            res.json({in_love:0})
        }
    })

})
//取消赞
router.post('/del_love',function (req,res,next) {
    var postId=req.body.postId;
    postDao.del_love(postId,function (result) {
        if(result.affectedRows==1){
            res.json({del_love:1})
        } else{
            res.json({del_love:0})
        }
    })

})


// exports.router=router;
module.exports = router;
