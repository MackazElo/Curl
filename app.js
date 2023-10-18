const querystring = require("querystring");
const { Curl } = require("node-libcurl");

const curlTest = new Curl();

const terminate = curlTest.close.bind(curlTest);

curlTest.setOpt(Curl.option.URL, "https://api.orderry.com/token/new");
curlTest.setOpt(Curl.option.POST, true);
curlTest.setOpt(Curl.option.SSL_VERIFYPEER, false);

curlTest.setOpt(
  Curl.option.POSTFIELDS,
  querystring.stringify({
    api_key: "3308ebede5444d1b9360cdca310a6470"
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
