const mysql = require('mysql');

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "1234",
    port : "3306",
    database : "project_sm",
    dateStrings : 'date'
})

exports.getAllMemos = function(callback){
    connection.query('SELECT * FROM sumoon ORDER BY no DESC;',(err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

//페이지추가
exports.insertMemo = function(title, writer, content, callback){
    connection.query(`INSERT INTO sumoon(title,writer,content,day) VALUES('${title}','${writer}','${content}',now())`, (err, result) => {
        if(err) throw err;
        callback();
    });
 }
 
 //리딩
 exports.page = function(no, callback){
    connection.query(`SELECT * FROM sumoon WHERE no=?`,[no],(err, result) => {
        if(err) {
            throw err;}
        callback(result);
    });
 }




 //리스트수정페이지
 exports.update = function(no, callback){
    connection.query(`SELECT * FROM sumoon WHERE no=?`,[no],(err, row, fields) => {
        if(err) {
            throw err;}
        callback(row);
    });
 }
 //리스트수정작업
 exports.update_process = function(no, title, writer, content, callback){
    connection.query(`UPDATE sumoon set title = "${title}",writer = "${writer}", content = "${content}" WHERE no = ${no}`, (err, result) => {
        if(err) throw err;
        callback();
    });
 }

 //리스트삭제
 exports.remove = function(no, callback){
    connection.query(`DELETE FROM sumoon WHERE no = ${no}`,(err, result) => {
        if(err) throw err;
        callback();
    });
 }



