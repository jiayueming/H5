var express = require('express');
var router = express.Router();
var favouriteDao=require('../dao/favouriteDao');
var postDao=require('../dao/postDao');
var userDao=require('../dao/userDao');
var TestDao=require('../dao/TestDao');
var courseDao=require('../dao/courseDao');
var commentDao=require('../dao/commentDao');
var formidable=require('formidable');
var util=require('util');
var AVATAR_UPLOAD_FOLDER='/upload/';
var createUnique=require('../util/createUnique');
var fs=require('fs');

router.get('/personal', function (req, res, next) {
    res.render('personal');
});
router.get('/put_post', function (req, res, next) {
    res.render('put_post');
});
router.get('/person_setup', function (req, res, next) {
    res.render('person_setup');
});


router.post('/get_fav',function(req,res,next){
    var email=req.session.userEmail;
    favouriteDao.get_favourite(email,function(result){
        console.log('jiayueming');
        console.log(result);
        res.json({favourites:result,userEmail:req.session.userEmail});
    })
});
router.post('/del_fav',function(req,res,next){
    var email=req.session.userEmail;
    var del_postId=req.body.del_postId;
    console.log('I want delete'+del_postId);
    console.log('del favbabab')
    favouriteDao.cancel_favourite(email,del_postId,function(result){
        console.log('jiayueming');
        console.log(result);
        res.json({del_favs:result,userEmail:req.session.userEmail});
    })
});
router.post('/post_content',function(req,res,next){
    var myDate = new Date();
    var new_time=myDate.toLocaleDateString();//可以获取当前日期
    var email=req.session.userEmail;
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编码
    form.parse(req, function(err, fields, files) {
        // if (err) {
        //     res.locals.error = err;
        //     // response.render("uploads");
        //     return;
        // }
        var extName ='';  //后缀名
        console.log('files.in_file.type: '+files.form_file.type);
        switch (files.form_file.type) {  //此处in_file  为页面端 <input type=file name=in_file>
            case 'image/jpeg':
                extName = 'jpeg';
                break;
            case 'image/jpg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if(extName.length == 0){
            res.json({'res':'errorrr pic type'});
            return;
        }else{
            form.uploadDir = "../public"+AVATAR_UPLOAD_FOLDER;     //设置上传目录
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024;   //文件大小
            console.log('here');
            var avatarName = Math.random() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            console.log('img name'+avatarName)
            console.log(newPath);
            console.log("old"+files.form_file.path);
            var readStream=fs.createReadStream(files.form_file.path);
            var writeStream=fs.createWriteStream(newPath);
            readStream.pipe(writeStream);
            // fs.renameSync(files.form_file.path, newPath);  //重命名
            // res.locals.success = '上传成功..........';
            var put={};
            put.title=fields.title;
            put.content=fields.post_content;
            put.img=avatarName;
            put.typeId=fields.post_type;
            console.log("add img ---end");
            res.json({'res':'okkkkkkk'});
        }
        postDao.put_post(put,email,new_time,function(result){
            console.log('发帖哎哎哎');
            console.log(result);
            // res.json({newPost:result,userEmail:req.session.userEmail});
        })
    });
});
router.post('/up_info',function(req,res,next){
    console.log('wanshanaaaa');
    var email=req.session.userEmail;
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编码
    form.parse(req, function(err, fields, files) {
        // if (err) {
        //     res.locals.error = err;
        //     // response.render("uploads");
        //     return;
        // }
        var extName = '';  //后缀名
        console.log('files.in_file.type: ' + files.form_file2.type);
        switch (files.form_file2.type) {  //此处in_file  为页面端 <input type=file name=in_file>
            case 'image/jpeg':
                extName = 'jpeg';
                break;
            case 'image/jpg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if (extName.length == 0) {
            res.json({'res': 'errorrr pic type'});
            return;
        } else {
            form.uploadDir = "../public" + AVATAR_UPLOAD_FOLDER;     //设置上传目录
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024;   //文件大小
            console.log('here');
            var avatarName = Math.random() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            console.log('img name' + avatarName)
            console.log(newPath);
            console.log("old" + files.form_file2.path);
            var readStream = fs.createReadStream(files.form_file2.path);
            var writeStream = fs.createWriteStream(newPath);
            readStream.pipe(writeStream);
            // fs.renameSync(files.form_file.path, newPath);  //重命名
            // res.locals.success = '上传成功..........';
            var info = {};
            info.Nickname = fields.Nickname;
            info.postion = fields.postion;
            info.img = avatarName;
            info.sex = fields.sex;
            info.Autograph = fields.Autograph;
            console.log("add img ---end");
            res.json({res: 1});
        }
        userDao.update_info(info,email,function(result){
            console.log('完善信息');
            console.log(result);
            // res.json({newPost:result,userEmail:req.session.userEmail});
        })
    })
})

router.get('/postDetail', function (req, res, next) {
    var Id=req.query.Post_id;
    postDao.post_detail(Id,function(result){
        commentDao.get_comment(Id,function (result_) {
            console.log(result);
            res.render('postDetail',{detail:result.res,comments:result.res1,email:req.session.userEmail,comments1: result_});
        })

    })
});
router.post('/get_comments',function (req,res,next) {
    var postId=req.body.postId;
    console.log('JJJJ'+postId)
    commentDao.get_comment(postId,function (result) {

        res.json({comments: result.res});
    })
})
router.post('/comment',function (req,res,next) {
    var email=req.session.userEmail;
    var postId=req.body.Post_id;
    var comment_content=req.body.comment_content;
    var time=new Date().toLocaleDateString();
    var replyId=1;
    // console.log('jjjj'+email)
    commentDao.comment_Post(postId,comment_content,email,time,replyId,function(result){
        if(result.res.affectedRows==1){
            commentDao.get_comment(postId,function (result) {
                res.json({comments: result.res});
            })
        }

        console.log(result.res)
        // res.json({res:result.res});
    })

})

router.get('/Test',function(req,res,next){
    var index=1;
    var account=6;
    var pages=1;//总页数
    console.log('fghjk');
    if(req.query.index){
        index=req.query.index;
    }
    TestDao.get_test(index,account,function(result){
        console.log("TEST"+JSON.stringify(result));
        console.log('jiayueming'+result.total);
        pages=Math.ceil(result.total/account);
        console.log(">>>>"+pages);
        res.render('Test',{pageAccount:pages,tests:result.res});
    })

});
router.post('/Test',function(req,res,next){
    var index=1;
    var account=6;
    var pages=1;//总页数
    if(req.body.index){
        index=req.body.index;
    }
    postDao.get_test(index,account,function(result){
        console.log("TEST"+JSON.stringify(result));
        console.log('jiayueming'+result.total);
        pages=Math.ceil(result.total/account);
        console.log(">>>>"+pages);
        res.json({tests:result.res});
    })
});
router.post('/get_stage',function(req,res,next){
    var stageId=req.body.stageId;
    courseDao.get_stage(stageId,function (result) {
        res.json({stageCourse:result.res});
    })
})
router.post('/get_info',function (req,res,next) {
    console.log( req.body);
    var email=req.session.userEmail;
    userDao.check_info(email,function (result) {
        res.json({info:result});
    })
})
module.exports = router;
