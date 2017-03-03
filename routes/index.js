var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao')
var postDao=require('../dao/postDao');
var courseDao=require('../dao/courseDao');
var commentDao=require('../dao/commentDao');
var videoDao=require('../dao/videoDao');
var favouriteDao=require('../dao/favouriteDao');
var mongodb=require('mongodb');
var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('boke', server, {safe:true});
router.get('/index', function(req, res, next) {
    var index=1;
    var account=16;
    var pages=1;//总页数
    if(req.query.index){
        index=req.query.index;
    }
    courseDao.getAllcourse(index,account,function(result){
        console.log("routes,books"+JSON.stringify(result));
        console.log('jiayueming'+result.total);
        pages=Math.ceil(result.total/account);
        console.log(">>>>"+pages);
        res.render('index',{pageAccount:pages,course:result.res});
    })
    // courseDao.getAllcourse(function(result){
    //     console.log('j头发干一会'+result.total);
    //     console.log(">>>>"+result.res);
    //     res.render('index',{posts:result.res,course:result.results});
    // })
    // res.render('index');
});
router.post('/index',function(req,res,next){
    var Id=req.query.Id;
    // videoDao.getVideo(Id,function(result){
    //     var key=result;
    //
    // })
    var index=1;
    var account=16;
    var pages=1;//总页数
    if(req.body.index){
        index=req.body.index;
    }
    courseDao.getAllcourse(index,account,function(result){
        console.log("routes,books"+JSON.stringify(result));
        console.log('jiayueming'+result.total);
        pages=Math.ceil(result.total/account);
        console.log(">>>>"+pages);
        res.render('index',{course:result.res,video:result});
    })
});
router.get('/course', function(req, res, next) {
    var index=1;
    var account=16;
    var pages=1;//总页数
    if(req.query.course){
        index=req.query.course;
    }
    courseDao.getAllcourse(index,account,function(result){
        console.log("routes,books"+JSON.stringify(result));
        console.log('jiayueming'+result.total);
        pages=Math.ceil(result.total/account);
        console.log(">>>>"+pages);
        res.render('course',{pageAccount:pages,course:result.res});
    })
    // courseDao.getAllcourse(function(result){
    //     console.log('j头发干一会'+result.total);
    //     console.log(">>>>"+result.res);
    //     res.render('index',{posts:result.res,course:result.results});
    // })
    // res.render('index');
});
router.post('/course',function(req,res,next){
    var Id=req.query.Id;
    var index=1;
    var account=16;
    var pages=1;//总页数
    if(req.body.index){
        index=req.body.index;
    }
    courseDao.getAllcourse(index,account,function(result){
        console.log("routes,books"+JSON.stringify(result));
        console.log('jiayueming'+result.total);
        pages=Math.ceil(result.total/account);
        console.log(">>>>"+pages);
        res.json({course:result.res,video:result});
    })
});
router.get('/login', function (req, res, next) {
    res.render('login');
});
router.get('/aboutus', function (req, res, next) {
    res.render('aboutus');
});
router.get('/regist', function (req, res, next) {
    res.render('regist');
});
router.get('/video', function (req, res, next) {
    var Id=req.query.Video_id;
    videoDao.getVideo(Id,function(result){
        console.log(result);
        res.render('video',{video:result});
    })

});
// router.get('/search', function (req, res, next) {
//     res.render('video');
// });

router.post('/login', function (req, res, next) {
    console.log('dddddd' + JSON.stringify(req.body));
    userDao.login(req.body,function (result) {
        var r = result[0].num;
        if (r == 0) {
            console.log("shi0a");
            res.json({result: 0});
        } else {
            console.log(JSON.stringify(result) + 'success');
            req.session.userEmail = req.body.Email;
            res.json({result: 1});
            // if (req.session.userEmail != undefined) {
            //   res.render('main',{userid:req.session.userEmail})
            // } else {
            //     res.render('main',{userid:req.session.userEmail})
            // }
        }
    });
})

router.post('/regist', function (req, res, next) {
    userDao.isReg(req.body.Email,function(result){
            if(result[0].num==0){
                userDao.regist(req.body,function(result_){
                    if(result_.affectedRows==1){
                        req.session.userEmail = req.body.Email;
                        res.json({res:0,userEmail:req.session.userEmail})
                    }else {
                        res.json({res:2})
                    }
                })
            } else {
                res.json({res:1});

            }
        }
    );

})

router.get('/mongo', function (req, res, next) {
    db.open(function (error, db) {
        if (error) {
            return;
        }
        db.collection('comments', {safe: true}, function (err, collection) {
            if (err) {
                console.log(err);
            }

            // collection.find({commentId:'001'}).toArray(function(err,docs) {
            //     likes = docs[0].like;
            // });

                collection.update({commentId:'001'}, {$inc:{'like':1}},{safe: true},(function (err, res) {
                    if(err){
                        console.log(err.message);
                        return;
                    }
                    console.log(res.result);
                    db.close();
                })
                );
        });
        res.render('mongo');
    });
})
//post
router.get('/post', function (req, res, next) {
        var index = 1;
        var account = 3;
        var pages = 1;//总页数
        if (req.query.index) {
            index = req.query.index;
        }
        postDao.getPost(index, account, function (result) {
            console.log("routes,books" + JSON.stringify(result));
            console.log('jiayueming' + result.total);
            pages = Math.ceil(result.total / account);
            console.log(">>>>" + pages);
            res.render('post', {pageAccount: pages, posts: result.res, userEmail: req.session.userEmail});
        })
    });
    router.post('/post', function (req, res, next) {
        var index = 1;
        var account = 3;
        var pages = 1;//总页数
        if (req.body.index) {
            index = req.body.index;
        }
        postDao.getPost(index, account, function (result) {
            console.log("routes,books" + JSON.stringify(result));
            console.log('jiayueming' + result.total);
            pages = Math.ceil(result.total / account);
            console.log(">>>>" + pages);
            res.json({posts: result.res});
        })
    });
    router.post('/search', function (req, res, next) {
        console.log('搜索')
        // var index = 1;
        // var acount = 3;
        // var pages = 1;
        var content = '';
        if (req.body.index) {
            console.log('213456')
            index = req.body.index;
            console.log(index);
        }
        if (req.body.con) {
            content = req.body.con;
            req.session.con = req.body.con;
        }
        if (content.length == 0) {
            console.log('JIAYUEMING')
            postDao.getPost(index, acount, function (result) {
                pages = Math.ceil(result.total/acount);
                res.json({pageAcount: pages, posts: result.res});
            })
        } else {
            postDao.search(req.body.con,function (result) {
                console.log(req.body.con)
                // pages = Math.ceil(result.total / acount);
                // console.log('pages' + pages);
                // console.log(result.res)
                res.json({ posts: result.res});
            })
        }

    });
    router.get('/main', function (req, res, next) {
        courseDao.getCourse(function (result) {
            console.log(">>>>" + result.res);
            res.render('main', {posts: result.res, course: result.results});
        })

    });
    router.post('/comment_post', function (req, res, next) {
        console.log(req.session.userId);
        var comment = req.body;
        comment.commentor_id = req.session.userEmail;
        commentDao.comment_Post(comment, comment.commentor_id, function (result) {
            if (result.res) {
                //插入评论成功
                res.json({result: 1, commentor_id: req.session.userId})
            } else {
                res.json({result: 0});
            }
            console.log(">>>>" + result.res);
            res.json({comment: res});
        });
    });
    router.post('/favourite_post', function (req, res, next) {
        var email = req.session.userEmail;
        console.log(req.session.userEmail);
        var postid = req.body.postId;
        console.log('tiezi' + req.body.postId)
        //点赞图片的id
        var id = req.body.id;
        console.log(req.body.id);
        favouriteDao.favourite_Post(email, postid, function (result) {
           // console.log('jiayeuruer');
            res.json({res: 0})
        })

    });
    //显示用户名
    router.post('/get_userInfo',function(req,res,next){
        console.log('wertyui..................')
        console.log(req.session.userEmail)
        if(req.session.userEmail){
            res.json({result:1,res:req.session.userEmail});

        }else{
            res.json({result:0});
            console.log('没有登录');
        }

        // userDao.user_img(email,function (result) {
        //     console.log('tou xiang');
        //     res.json({head:result})
        // })
});
    router.post('/exit',function (req,res,next) {

        req.session.userEmail='';
        if(req.session.userEmail==''){
            console.log('fffffffffff')
            res.json({res:1,result:req.session.userEmail})
        }else{
            res.json({res:0})
        }
    })

router.post('/get_fav_post', function (req, res, next) {
    var index = 1;
    var account = 3;
    var pages = 1;//总页数
    if (req.body.index) {
        index = req.body.index;
    }
    postDao.fav_post(index, account, function (result) {
        console.log("ttttttttttttt" + JSON.stringify(result.res));
        console.log('jiayueming' + result.total);
        pages = Math.ceil(result.total / account);
        console.log(">>>>j" + pages);
        res.json({hotposts: result.res,pageAcount: pages});
    })
});
router.post('/indexuu', function (req, res, next) {
    var index = 1;
    var account = 3;
    var pages = 1;//总页数
    if (req.body.index) {
        index = req.body.index;
    }
    postDao.fav_post(index, account, function (result) {
        console.log("ttttttttttttt" + JSON.stringify(result.res));
        console.log('jiayueming' + result.total);
        pages = Math.ceil(result.total / account);
        console.log(">>>>j" + pages);
        res.json({hotposts: result.res,pageAcount: pages});
    })
});
    module.exports = router;
