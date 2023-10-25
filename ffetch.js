


import('node-fetch').then(fetchModule => {
    const fetch = fetchModule.default;
    // Now you can use fetch here
});
import('express').then(expressModule => {
    const express = expressModule.default;
    // Now you can use fetch here
});
const app = express();
const PORT = 8080;

var fs = require('fs');
const { title } = require('process');


const appi = '3308ebede5444d1b9360cdca310a6470'

let token = ""


async function get_token(api_key) {
    let url = `https://api.orderry.com/token/new?api_key=${api_key}`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        token = data.token;
        // console.log("tk: " + token);
        return token;
    } catch (error) {
        console.error("Error fetching token:", error);
        throw error; // Throw the error to be caught by the caller if necessary
    }
}

async function get_warehouse(){

}

async function ffetch(url){
    try{
        let response = await fetch(url);
        let data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching token:", error);
        throw error; // Throw the error to be caught by the caller if necessary
    }
}

async function newfile(title, line){
    fs.writeFile(title, line, function (err) {
        if (err) throw err;
      });


   
}
async function newline(title, line){
    
    
    await fs.appendFile(title, `
${line}`, function (err) {
        if (err) throw err;
      });
    


   
}

async function mainn() {
    try {
        const token = await get_token(appi);
        const page = '1'
        const warehouse = '79538'
        let url_categories = ` https://api.orderry.com/warehouse/categories/?token=${token}`



        const title = "file1.txt" 
        newfile(title, "single id")

        let products = ""

        let categories = (await ffetch(url_categories))
        console.log(categories.data.length)
        let i = 0 
        while(i<categories.data.length){
            let category = categories.data[i].id
            let url_residue=`https://api.orderry.com/warehouse/goods/${warehouse}?token=${token}&categories[]=${category}&page=${page}`
            products += (await ffetch(url_residue))
            // let j = 0
            // while(j<products.data.length){
            //     let product = products.data[j].id
            //     console.log(product)
            //     newline(title, product)
            //     j++
            // }
            i++
        }
        console.log(products)
        // console.log(categories.data[0].id)
        // console.log(typeof categories.data[0])

     
        // console.log(products)
        // console.log(products.data[0].id)
        // console.log(typeof products.data[0])
        


        
        




    } catch (error) {
        console.error("Error in mainn:", error);
    }
}




// async function get_token(api_key){
//     let url = `https://api.orderry.com/token/new?api_key=${api_key}`
//     fetch(url).then((res)=>{
//         return res.json();
//     }).then((resp)=>{
//         token = resp.token;
//         console.log("tk: "+token)
//         return token
//     });
// }



// async function mainn(){
//     await get_token(appi)
//     await console.log("a")
// }

// mainn()

// async function logg(t){

//     await console.log("token: "+t)
//      console.log("token: "+await get_token(appi))
// }



// get_token(appi).then((tk)=>{logg(tk)})
// fetch('https://api.orderry.com/warehouse/goods/79538?token=742150cb901dd2ab4851a3afe29c00e479677f3e&categories[]=357869&page=1').then((res)=>{
//     return res.json();
// }).then((json)=>{
//     console.log(json);
// });
