const express = require("express");;
const bodyParser = require("body-parser")

const { stringify } = require("querystring")
const { SlowBuffer } = require("buffer");
const { Console } = require("console");
 
// document.cookie = "csrftoken=cRMhaK4LeBLNZZ9sI1y2Y9UMpN02pDsQ";


const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use("/", express.static("public"));

app.post("/cat", (req, res) => {
    const querystring = require("querystring");
    const { Curl } = require("node-libcurl");
    
    const curlToken = new Curl();
    
    
    
    curlToken.setOpt(Curl.option.URL, "https://api.orderry.com/warehouse/goods/79538");
    curlToken.setOpt(Curl.option.POST, true);
    curlToken.setOpt(Curl.option.SSL_VERIFYPEER, false);
    
    
    
    const curlTest = new Curl();
    
    
    curlToken.setOpt(
      Curl.option.POSTFIELDS,
      querystring.stringify({
        csrftoken: "cf36cb7f9adc02351b401f46f47aebc0e60aece9",
        DEBUG: true
      })
    );
    
    let tokenn = "";
    curlToken.on("end", function (statusCode, data, headers) {
        console.log(data)
        res.send(data)
      this.close();
    });
    
    curlToken.on("error", function(error) {
      console.error("Error occurred:", error);
      this.close();
    });
    console.info(tokenn)
    console.log("Sending request...");
    curlToken.perform();
    
    function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
   
            });


var port = 5500
app.listen(port);
console.log("Started at port "+port);