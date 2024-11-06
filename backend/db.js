const mongoose = require('mongoose');


async function mongoDBconnection(url)
{
     mongoose.connect(url).then(()=>{
        console.log("Mongo DB Connected"); 
     }).catch((error)=>{
        console.log("error connecting: ", error);
     })  

     
}


module.exports = {mongoDBconnection}