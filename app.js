const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const fxnHtml = require("./util");
const pdf = require("html-pdf");
const path = require('path');
app.use(express.static('public'))
app.use(cors());
app.use(express.json())
app.listen(PORT,()=>console.log("Server is listening at",PORT))


app.post("/getPdf",async(req,res)=>{

    try{
        const  html =  fxnHtml({fullname:req.body.fullname, address:req.body.address})
        const tm = Date.now();

        await new Promise((resolve,reject)=>{
            pdf.create(html, { "orientation": "landscape" }).toFile(`./public/upload_${tm}.pdf`, async function (err, res) {
                console.log("Creating pdf")
                resolve();

            });
            
        })
        return res.status(200).json({success:true, dataMessage:`http://localhost:4000/upload_${tm}.pdf`});
    }catch(err){
        return res.status(404).json({success:false, errorMessage:err.message})
    }

})