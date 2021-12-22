const express = require("express");
const seller = require("../data/sellerData");
const product = require("../data/productData");
const router = express.Router();
router.use(express.json());

router.get("/",(req,res) => {
    res.json({data:["seller page"]});
});

router.get("/list",(req,res) => {
    res.json({data:seller});
});

//Add Seller
router.post("/addSeller",(req,res) => {

    const sellId = req.body.sellerId;
    const name = req.body.name;
    const productId = req.body.productId;

    const sell = seller.filter((s)=>s.sellerId === sellId);
    if(sell.length === 0){
         return res.json({ data:"Added Seller details succesfully",sellerId:sellId,name:name,productId:productId});
    } else {
        return res.json({data:"seller already Added!"})
    }
});

//fetch seller details based on product name
router.post("/sellerDetailProduct",(req,res) => {

    const name1 = req.body.title;    
    const pname = product.filter((p)=> (p.title === name1));
    
    if(pname.length === 1)
    {
        const seller_id = pname[0].sellerId;
        const sell = seller.filter((s)=> (s.sellerId[0] == seller_id));
        if(sell.length === 1)
        {
            return res.json({ data:"company details",product_item:name1,Seller_id:seller_id,Seller_name:sell[0].name,Product_id:sell[0].productId});
        }
    }
    else
    {
        return res.json({ data:"No Such seller"});
    }
});

//update
router.post("/updateSeller",(req,res) => {
    const sellerid = req.body.sellerId;
    const productid = req.body.productId;
    
    const sname = seller.filter((s)=> s.sellerId === sellerid);
    if(sname.length === 1)
    {
        return res.json({ data:"Updated Seller Products succesfully",sellerId:sellerid,productId:productid });
    }
    else
    {
        return res.json({ data:"Couldn't Update"});
    }
});

//delete
router.post("/deleteSeller",(req,res) => {
    const sellerid = req.body.sellerId;
    
    const sname = seller.filter((s)=> s.sellerId === sellerid);
    if(sname.length === 1)
    {
        return res.json({ data:"Deleted Seller succesfully",Deleted:sname[0].name});
    }
    else
    {
        return res.json({ data:"Couldn't Delete"});
    }
});

module.exports = router;