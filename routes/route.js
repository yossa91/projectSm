const { json } = require('express');
const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const router = express.Router();


const {check, validationResult} = require('express-validator');
const db = require("./../db.js");




router.use(expressLayouts);

//메인페이지 연결
router.get('/', (req,res) => {
    res.render('index.ejs');
});


router.get('/intro', (req,res) => {
  res.render('Seomun_intro.ejs');
});
router.get('/list', (req,res) => {
  res.render('Seomun_list.ejs');
});


//qna 페이지,글작성,글확인--------------------

router.get('/qna', (req,res) => {
  db.getAllMemos((rows) => {
      res.render('Seomun_qna', { rows : rows });
    }
  );
});
router.get('/newMemo',(req,res) => {
  res.render('Seomun_notice');  
});


router.post('/store', check('title').isLength({min:1 , max:100}),
  function(req,res, next){
    let errs = validationResult(req);
    console.log(errs);
    if(errs['errors'].length > 0){
      res.render('Seomun_notice',{errs : errs['errors']});
    }else{
      let param = JSON.parse(JSON.stringify(req.body));
      let title = param['title'];
      let writer = param['writer'];
      let content = param['content'];
      db.insertMemo(title, writer, content, function(){
        res.redirect('/qna');
      });
    }
  });

  router.get('/page/:no', (req, res) => {
    var no = req.params.no;
    db.page(no, (result) => {
      res.render('Seomun_notice_list',{result : result});
    });
  });

//글수정
router.get('/update/:no',(req, res) => {
  var no = req.params.no;
  db.update(no, (row) => {
    if(typeof no === 'undefined' || row.length <= 0){
      res.status(404).json({error : 'undefined memo'});
    }else{
      res.render('Seomun_notice_update',{row});
    }
  });
});

//글수정중
router.post('/update/:no', [check('title').isByteLength({min:1 , max:300})],(req, res) =>{
    let errs = validationResult(req);
    let param = JSON.parse(JSON.stringify(req.body));
    var no = req.params.no;
    let title = param['title'];
    let writer = param['writer'];
    let content = param['content'];
    if(errs['errors'].length > 0){
      db.update_process(no, (row) => {
        res.render('Seomun_notice_update', {row : row[0], errs : errs['errors']} );
      });
    }else{
      db.update_process(no, title,writer, content, () => {
        res.redirect('/qna');
      });
    }
  });

//글삭제
  router.get('/delete/:no', (req, res) => {
    var no = req.params.no;
    db.remove(no, () => {
      res.redirect('/qna');
    });


  });


//qna 페이지,글작성,글확인--------------------

//로그인페이지,회원가입
router.get('/login', (req,res) => {
  res.render('login.ejs');
});
router.get('/signup_member_type', (req,res) => {
  res.render('signup_member.ejs');
});
router.get('/signup', (req,res) => {
  res.render('signup_list.ejs');
});


module.exports = router;