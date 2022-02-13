const request = require('request-promise');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const  FlipkartSchema = require('./flipkartSchema');
const  SnapdealSchema = require('./snapdealSchema');
const  AmazonSchemas = require('./amazonschema');


const amazondata= [];
const flipkartdata= [];
const snapdealdata= [];

const connectMongoDB = async()=>{
    await mongoose.connect('mongodb+srv://Yuvaraj:Admin123@cluster0.lpdgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
   // mongoose.Promise = global.Promise;
    console.log("Connection estabished successfully");
}

const searchItem=['Shirt','jeans','pants','chair'];



module.exports={
    amazon: ()=>{


        for(i=0; i<=searchItem.length;i++)
        {
           scappering= async()=>{
            
            const webPage= await request.get('https://www.amazon.in/s?k='+searchItem[i]);
            const $ = await cheerio.load(webPage);
        
            $('.s-asin').each((i,el)=> {
                const id = $(el).attr('data-asin');
                // const brand = $(el).find('h5 .a-size-base-plus').text();
                 const title = $(el).find('h2 span').text();  
                const price = $(el).find('.a-price-whole').text();
                const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                const image = $(el).find('.s-image').attr('src');
                
                const details = {id,title,price,rating,image};
                amazondata.push(details)
                AmazonSchemas.create({
                      id : id,
                      title: title,             
                      price:price,
                      rating:rating,
                      image:image,             
                  }).then((list)=> {
                      console.log(list)
                  }); 
                
            });
        
            return amazondata;
        
        }
        
        
        
        const initial = async()=>
        {
            await connectMongoDB();
            const scappered = await scappering();
            console.log(' scapping is done #######');
            return scappered;
        }
        
        initial();
        
        
        }
        
        
        
        },
        flipkart: ()=>{
    
    
            for(i=0; i<=searchItem.length;i++)
            {
               scappering= async()=>{
                
                const webPage= await request.get('https://www.flipkart.com/search?q='+searchItem[i]);
                const $ = await cheerio.load(webPage);
            
                $('.s-asin').each((i,el)=> {
                    const id = $(el).attr('data-asin');                   
                    const title = $(el).find('h2 span').text();  
                    const price = $(el).find('.a-price-whole').text();
                    const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                    const image = $(el).find('.s-image').attr('src');
                    const details = {id,title,price,rating,image};
                    flipkartdata.push(details)
                    FlipkartSchema.create({
                          id : id,
                          title: title,             
                          price:price,
                          rating:rating,
                          image:image,             
                      }).then((list)=> {
                          console.log(list)
                      }); 
                    
                });
            
                return flipkartdata;
            
            }
            
            
            
            const initial = async()=>
            {
                await connectMongoDB();
                const scappered = await scappering();
                console.log(' scapping is done #######');
                return scappered;
            }
            
            initial();
            
            
            }
            
            
            
            },
            snapdeal: ()=>{
        
        
                for(i=0; i<=searchItem.length;i++)
                {
                   scappering= async()=>{
                    
                    const webPage= await request.get('https://www.snapdeal.com/search?keyword='+searchItem[i]);
                    const $ = await cheerio.load(webPage);
                
                    $('.s-asin').each((i,el)=> {
                        const id = $(el).attr('data-asin');
                       
                         const title = $(el).find('h2 span').text();  
                        const price = $(el).find('.a-price-whole').text();
                        const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                        const image = $(el).find('.s-image').attr('src');
                        
                        const details = {id,title,price,rating,image};
                        snapdealdata.push(details)
                        SnapdealSchema.create({
                              id : id,
                              title: title,             
                              price:price,
                              rating:rating,
                              image:image,             
                          }).then((list)=> {
                              console.log(list)
                          }); 
                        
                    });
                
                    return snapdealdata;
                
                }
                
                
                
                const initial = async()=>
                {
                    await connectMongoDB();
                    const scappered = await scappering();
                    console.log(' scapping is done #######');
                    return scappered;
                }
                
                initial();
                
                
                }
                
                
                
                }












}

