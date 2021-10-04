//connect to node app
const express = require ('express');
const mysql2 = require ('mysql2')

const PORT = process.env.PORT || 3000;
const app = express();
//connect the node app with mySQLserver

const con = mysql2.createConnection({
    host : "localhost",
    port : 3306,
    user: "root",
    password: "nfrx705X",
    database: "school",
});

con.connect((err) => {
    if(!err){
        console.log("connected to mySQL server at port 3306");
    }
});
//create a database

app.get("/create-schooldb", (req,res) => {
    let sql2 = "CREATE DATABASE school";
    con.query(sql2, (err, result) => {
        if(!err){
            res.send("Suecessfully created the database...");
        }else{
            throw err;
            res.send("failed to create the database...");
        }
    })
});

//create a table
app.get("/create-student-table", (req,res) => {
    let sql2 = "CREATE TABLE student(id int AUTO_INCREMENT,  fname varchar(50), lname varchar(50), age int, PRIMARY KEY(id))";
    con.query(sql2, (err, result) => {
        if(!err){
            res.send(result);
        }else{
            
            res.send("failed to create student table...");
        }
    })
});


//drop a table
app.get("/delete-student-table", (req,res) => {
    let sql2 = "DROP TABLE student";
    con.query(sql2, (err, result) => {
        if(!err){
            res.send(result);
        }else{
            
            res.send("failed to delete student table...");
        }
    })
});

//perform CRUD operations
//C - create 
app.get("/insert-student", (req,res) => {
    let newRow = {fname: "Juan", lname: "Dela Cruz", age: 19 };
    let sql2 = "INSERT INTO student SET ?";
    con.query(sql2, newRow, (err, result) => {
        if(!err){
            res.send(result);
        }else{
            throw err
            res.send("failed to insert in to student table...");
        }
    });
});

//R - read
app.get("/read-student", (req,res) => {
    let sql2 = "SELECT * FROM student";
    con.query(sql2, (err, result) => {
        if(!err){
            res.send(result);
        }else{
            throw err
            res.send("failed to read student table...");
        }
    });
});

//U - update
app.get("/update-student", (req,res) => {
    let sql2 = "UPDATE student SET fname='John' WHERE id=1";
    con.query(sql2, (err, result) => {
        if(!err){
            res.send(result);
        }else{
            throw err
            res.send("failed to update student table");
        }
    });
});

// D- delete
app.get("/delete-student", (req,res) => {
    let sql2 = "DELETE FROM student WHERE id=1";
    con.query(sql2, (err, result) => {
        if(!err){
            res.send(result);
        }else{
            throw err
            res.send("failed to update student table");
        }
    });
});

//join tables
app.get("/read-student2", (req,res) => {
    let sql2 = "SELECT student.id, student.fname, student.lname, section.code, section.course" +
    " FROM student" +
    " INNER JOIN section" +
    " ON student.secid = section.secid";
    con.query(sql2, (err, result) => {
        if(!err){
            res.send(result);
        }else{
            throw err
            res.send("failed to read student table");
        }
    });
});
//call stored procedure

app.get("/call-student2", (req,res) => {
    let sql2 = "CALL DisplayStudent()";
    con.query(sql2, (err, result) => {
        if(!err){
            res.send(result);
        }else{
            throw err
            res.send("failed to call DisplayStudent() pocedure");
        }
    });
});

app.listen(PORT, () =>{
    console.log("listening to port " + PORT + "...")
});