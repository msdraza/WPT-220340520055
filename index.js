const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(express.static("sf"));

let dbpara = {
    host: 'localhost',
    user: 'Maswood',
    password: 'msd123',
    database: 'cdac22',
	port:3306
}
const connection = mysql.createConnection(dbpara);

app.get("/getdtls",(req,resp)=>{
    let book_id = req.query.book_id;
    console.log(book_id);

    console.log("Connection Successful");

    let output = {status:false,bookdtls:{ book_id:0, book_name: "", price: 0 }}

    connection.query("select * from book where book_id = ?", [book_id],
     (err, res1) => {
         if(err){
             console.log("Some Error"+err)
         }
         else{
             if(res1.length>0){
                 output.status = true;
                 for(let i = 0; i< res1.length; i++)
                 console.log(res1[i].book_id +" "+res1[i].book_name+" "+res1[i].price);
             }else{
                 console.log("Book Not Found");
             }
         }
         resp.send(output);
     });
});


app.get("/insertdtls",(req,resp)=>{

    let bookdtls = {book_id: req.query.book_id,book_name: req.query.book_name,price: req.query.book_id};
  

    let output = {status:false}

    connection.query('insert into book (book_id, book_name,price)values (?,?,?)', [bookdtls.book_id, bookdtls.book_name,bookdtls.price],
     (err, res2) => {
         if(err){
             console.log("Some Error"+err)
         }
         else{
             if(res2.affectedRows > 0){
                console.log("Insert Successfull");
                output.status = true;
             }else{
                 console.log("Insert Failed");
             }
         }
         resp.send(output);
     });
});

app.listen(8081,()=>{
    console.log("Listening at Port Number 8081......");
});