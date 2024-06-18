const express=require('express');
const app=express();
const port= 5000;

const bodyParser=require('body-parser'); 



app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.use(bodyParser.urlencoded({extended: false}))
app.get('/submit',function(req,res){
  console.log("Data Saved");
})

const {Pool,Client}= require('pg');

const connectionString='postgresql://postgres:Parkavi@19@localhost:5432/workplace'


const client= new Client({
    connectionString:connectionString
})


// app.post("/",(req,res)=>{
//     const { f_name,mail,phone}=req.body
//     client.connect()
//     client.query('INSERT INTO db VALUES ($1, $2, $3)', [f_name, mail,phone], (err,res)=> {
//         console.log(err,res);
//         client.end()
//     })
   
//     res.sendFile(__dirname + "/index.html");
//   })



  app.post("/",(req,res)=>{
    const { f_name,mail,phone}=req.body
    client.connect()
    client.query('SELECT * FROM db VALUES ($1, $2, $3)', [f_name, mail,phone], (err,res)=> {
        console.log(err,res);
        client.end()
    })
   
    res.sendFile(__dirname + "/index.html");
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });