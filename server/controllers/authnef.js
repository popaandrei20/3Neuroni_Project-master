
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    console.log(req.body);
    const { name, user, password, passwordConfirm } = req.body;
    db.query('SELECT user from users_db WHERE user = ?', [user], async (err, results) => {
        if (err) {
            console.log(err);
        } else {
            if (results.length > 0) {
                return res.sendFile(__dirname + "register.html", {
                    message: 'The username is already in use'
                })
            } else if (password != passwordConfirm) {
                return res.sendFile(__dirname + "register.html", {
                    message: 'Password dont match'
                });
            }
        }
  
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
  
        db.query('INSERT INTO users_db SET ?', { user: user, password: hashedPassword }, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                return res.sendFile(__dirname + "register.html", {
                    message: 'User registered'
                });
            }
        })
    })
    res.send("Form submitted");
  }