const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const { connect } = require("react-redux");
const encoder = bodyParser.urlencoded();

const db = mysql.createPool({
  host: "bogdan",
  user: "bogdan",
  password: "dinamo0011",
  database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM contact_db";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

 app.get("/",function(req,res){
   res.sendFile(__dirname + "/loginform.html" )
 })
 app.post("/",encoder,function(req,res){
  var usr = req.body.username;
  var pwd = req.body.password;
  db.query("select * from users_db where user = ?  and password = ? ",[usr,pwd],function(error, results, fields){
    if(results.length > 0){
      res.redirect("http://localhost:3000");
    }
    else{
      res.redirect("/");
    }
    res.end();

  })
})

app.get("http://localhost:3000",function(req,res){
  res.sendFile(__dirname + "http://localhost:3000" )
})

app.get("/api/getUser",(req, res) => {
  const sqlGet = "SELECT * FROM login_url";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { name, email, transport, grad_aglomerare, punct_plecare, punct_sosire, ora_plecare , durata, observatii, nivel_satisfactie} = req.body;
  const sqlInsert =
    "INSERT INTO contact_db (name, email, transport, grad_aglomerare, punct_plecare, punct_sosire, ora_plecare, durata, observatii, nivel_satisfactie) VALUES (?,?,?,?,?,?,?,?,?,?)";
  db.query(sqlInsert, [name, email, transport, grad_aglomerare,punct_plecare,punct_sosire, ora_plecare, durata, observatii, nivel_satisfactie], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/register",function(req,res){
  res.sendFile(__dirname + "/register.html" )
})

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});


app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const {name, email, transport, grad_aglomerare, punct_plecare, punct_sosire, ora_plecare, durata, observatii, nivel_satisfactie} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, transport = ?, grad_aglomerare=?, punct_plecare=?, punct_sosire=?, ora_plecare=?, durata=?, observatii=?, nivel_satisfactie=? WHERE id = ?";
    db.query(sqlUpdate, [name, email, transport,grad_aglomerare, punct_plecare, punct_sosire, ora_plecare, durata, observatii, nivel_satisfactie, id], (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    });
  });

app.post("/", (req, res) => {
  //   const sqlInsert =
  //     "INSERT INTO contact_db (name, email, transport) VALUES ('john doe', 'johndoe@gmail.com',34455666
  //   db.query(sqlInsert, (error, result) => {
  //     console.log("error", error);
  //     console.log("result", result);
  //     res.send("Hello Express");
  //   });
});

// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json());
// app.use(cookieParser());
// app.set('view engine', 'html');

// const authController = require('./controllers/auth');

// const router = express.Router();

// router.post('/register', authController.register)

// app.use('/', require('./routes/pages'));
// app.use('/auth', require('./routes/auth'));

app.listen(3009, () => {
  console.log("Server is running on port 3009");
});
