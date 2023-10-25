const express = require('express');
const app = express();
const PORT = 8080;
const database = require('./database.js');






		
        




import('node-fetch').then(fetchModule => {
    const fetch = fetchModule.default;
    // Now you can use fetch here
});
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
async function newtext(title, line){
    await fs.appendFile(title, JSON.stringify(line)+`,
 `, function (err) {
        if (err) throw err;
      });
}
async function newline(title, line){
    await fs.appendFile(title, `,
`, function (err) {
        if (err) throw err;
      });
}
async function endfile(title, line){
    await fs.appendFile(title, JSON.stringify(line), function (err) {
        if (err) throw err;
      });
}
async function finfile(title){
      await fs.appendFile(title, "]}", function (err) {
        if (err) throw err;
      });
}

async function json_mainn() {
    try {
        const token = await get_token(appi);
        const page = '1'
        const warehouse = '79538'
        let url_categories = ` https://api.orderry.com/warehouse/categories/?token=${token}`



        const title = "file1.json" 
        await newfile(title, `{"data":[`)

        let products = ""

        let categories = (await ffetch(url_categories))
        console.log(categories.data.length)
        let i = 0 
        while(i<categories.data.length){
            console.log("cat: "+i)
            let category = categories.data[i].id
            let url_products=`https://api.orderry.com/warehouse/goods/${warehouse}?token=${token}&categories[]=${category}`
            // console.log(url_products)
            products = (await ffetch(url_products))
            let pages = Math.ceil(products.count/50)
            // console.log("max p: "+pages) 
            let p = 0;
            while(p<pages){
                p++
                // console.log("current p "+p)
                let url_products=`https://api.orderry.com/warehouse/goods/${warehouse}?token=${token}&categories[]=${category}&page=${p}`
                // console.log(url_products)
                products = (await ffetch(url_products))
                // console.log(products)
                let j = 0
                while(j<products.data.length){
                  
                    let product = products.data[j]
                    // console.log(product)
                    // await newline(title, product)
                    await newtext(title, product)
                    await newtext(title, product)
                    j++
                }
            }
           
            i++
        }
        // console.info(products)
        // console.log(categories.data[0].id)
        // console.log(typeof categories.data[0])

     
        // console.log(products)
        // console.log(products.data[0].id)
        // console.log(typeof products.data[0])
        let closeing = {lorem: "ipsum"};
        

        await endfile(title, closeing)
        await finfile(title)
        console.log("Fin")



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

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)

app.use(express.json())


app.get('/ti', (req, res) => {
    res.status(200).send({
        tshirt: '👕',
        size: 'XS'
    })
});
app.get('/json', (req, res) => {
    json_mainn()
    res.status(200).send({
        tshirt: '👕',
        size: 'XS'
    })
});
app.get('/que', (req, res) => {

    async function db_main() {
        try {
            const token = await get_token(appi);
            const page = '1'
            const warehouse = '79538'
            let url_categories = ` https://api.orderry.com/warehouse/categories/?token=${token}`
    
    
    
            let products = ""
    
            let categories = (await ffetch(url_categories))
            console.log("Updating database from API")
            var query = 'TRUNCATE TABLE `orderry_api`.`warehouse_products`';
                   
                    
            database.query(query, function(error, data){

                
                // console.log(query)
                // console.log(error)
                // console.log(data)

            });

            
            let i = 0 
            while(i<categories.data.length){
                let procent = Math.ceil((i/categories.data.length)*100)
                console.log(`${procent}%`)
                let category = categories.data[i].id
                let url_products=`https://api.orderry.com/warehouse/goods/${warehouse}?token=${token}&categories[]=${category}`
                products = (await ffetch(url_products))
                let pages = Math.ceil(products.count/50)
                let p = 0;
                while(p<pages){
                    p++
                    let url_products=`https://api.orderry.com/warehouse/goods/${warehouse}?token=${token}&categories[]=${category}&page=${p}`
                    products = (await ffetch(url_products))
                    let j = 0
                     while(j<products.data.length){
                  
                        let product = products.data[j]



                    var query = `INSERT INTO warehouse_products (id, code, title, image, price, article, residue, category_id, category_title, parent_id, description, custom_fields, warranty, warranty_period) VALUES (${product.id}, "${product.code}", "${product.title}", "${product.image}", 0, "${product.article}", ${product.residue}, ${product.category.id}, "${product.category.title}", ${product.category.parent_id}, "${product.description}", "${product.custom_fields}", ${product.warranty}, ${product.warranty_period})`;
                    
                    
                    database.query(query, function(error, data){

                        
                        // console.log(query)
                        // console.log(error)
                        // console.log(data)

                    });



                        
                        j++
                    }
                    
                }
               
                i++
            }
            console.log("Fin")
    
    
    
        } catch (error) {
            console.error("Error in mainn:", error);
        }
    }

    db_main()
    
    res.status(200).send({
        tshirt: '👕',
        size: 'XS'
    })
});
app.get('/post', (req, res) => {

    async function post_main() {
        try {
            const token = await get_token(appi);
            const page = '1'
            const warehouse = '79538'
            let url_categories = ` https://api.orderry.com/warehouse/categories/?token=${token}`
    
    
    
            let products = ""
    
            let categories = (await ffetch(url_categories))
            console.log("Updating database from API")
                   
                    
         
            let i = 0 
            while(i<categories.data.length){
                
                i++
            }
            console.log("Fin")
    
    
    
        } catch (error) {
            console.error("Error in mainn:", error);
        }
    }

    post_main()
    
    res.status(200).send({
        tshirt: '👕',
        size: 'XS'
    })
});