const querystring = require("querystring");
const { Curl } = require("node-libcurl");

const curlToken = new Curl();



curlToken.setOpt(Curl.option.URL, "https://api.orderry.com/token/new");
curlToken.setOpt(Curl.option.POST, true);
curlToken.setOpt(Curl.option.SSL_VERIFYPEER, false);



const curlTest = new Curl();


curlToken.setOpt(
  Curl.option.POSTFIELDS,
  querystring.stringify({
    api_key: "3308ebede5444d1b9360cdca310a6470"
  })
);

let tokenn = "";
curlToken.on("end", function (statusCode, data, headers) {
    tokenn = data.split('"');
    tokenn = tokenn[3]
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
async function toks() {
    
    await sleep(300);
    console.log(2);
    
    console.info(tokenn)
    



      

const terminate = curlTest.close.bind(curlTest);

curlTest.setOpt(Curl.option.URL, "https://api.orderry.com/warehouse/goods/79538");
curlTest.setOpt(Curl.option.POST, true);
curlTest.setOpt(Curl.option.SSL_VERIFYPEER, false);

curlTest.setOpt(
  Curl.option.POSTFIELDS,
  querystring.stringify({
    token: ""
  })
);

curlTest.on("end", function (statusCode, data, headers) {
  console.info("Status code " + statusCode);
  console.info("***");
  console.info("Our response: " + data);
  console.info("***");
  console.info("Length: " + data.length);
  console.info("***");
  console.info("Total time taken: " + this.getInfo("TOTAL_TIME"));

  this.close();
});

curlTest.on("error", function(error) {
  console.error("Error occurred:", error);
  this.close();
});

console.log("Sending request...");
curlTest.perform();




  }
  toks()



