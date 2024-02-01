
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{

    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) =>{

    const firstName = req.body.fName;
    const secondName = req.body.lName;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:secondName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/597a95b7f0"
    
    const Option ={
        method:"post",
        auth:"hosea:21fb278cec512983fff4385528dbf507-us17"
    }

    const request = https.request(url, Option, (response)=>{

        if (response.statusCode === 200) {

            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", (req, res)=>{
    res.redirect("/")
})

app.listen(3000, (req, res)=>{

    console.log("listening at port 3000");
})


// 21fb278cec512983fff4385528dbf507-us17
// 597a95b7f0
// https://<dc>.api.mailchimp.com/3.0/
// https://us6.api.mailchimp.com/3.0/