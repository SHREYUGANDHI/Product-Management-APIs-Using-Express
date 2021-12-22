const express = require("express");
const product = require("../data/productData");
const company = require("../data/companyData");
const seller = require("../data/sellerData");
const router = express.Router();
router.use(express.json());

router.get("/",(req,res) => {
    res.json({data:["Product Page"]});
});

router.get("/list",(req,res) => {
    if(product.length === 0){
        return res.json({ data: "Product Empty"});
    }
    return res.json({data:product});
});

//add Product
router.post("/addProduct",(req,res) => {
    const prodId = req.body.productId;
    const tit = req.body.title;
    const pr = req.body.price;
    const cat = req.body.category;
    const comId = req.body.companyId;
    const sellId = req.body.sellerId;

    const prod = product.filter((p)=>p.productId === prodId);
    if(prod.length === 0){
        return res.json({ data:"Added product details succesfully",productId:prodId,title:tit,price:pr,category:cat,companyId:comId,sellerId:sellId});    
    } else {
        return res.json({data:"Product already Added!"})
    }
});

//fetch all products of a company
router.post("/fetchProductsCompany/:cid",(req,res) => {
    const cid = req.params.cid;
    const prod = product.filter((p)=>p.companyId === cid);

    if(prod.length === 0){
        return res.json({data:"not found any record!"})
    } else {
        return res.json({data:"Products Of Company",prod})
    }
});

//fetch all products of a seller
router.post("/fetchProductsSeller/:sid",(req,res) => {
    const sid = req.params.sid;
    const prod = product.filter((p)=> p.sellerId[0] === sid);

    if(prod.length === 0){
        return res.json({data:"not found any record!"})
    } else {
        return res.json({data:"Products Of Seller",prod})
    }
});

//update
router.post("/updateProduct",(req,res) => {
    const category = req.body.category;
    const productid = req.body.productId;
    
    const pname = product.filter((s)=> s.productId === productid);
    if(pname.length === 1)
    {
        return res.json({ data:"Updated Products category succesfully",New_category:category,For_Productid:productid});
    }
    else
    {
        return res.json({ data:"Couldn't Update"});
    }
});

//delete
router.post("/deleteProduct",(req,res) => {
    const productid = req.body.productId;
    
    const pname = product.filter((s)=> s.productId === productid);
    if(pname.length === 1)
    {
        return res.json({ data:"Deleted Products succesfully",Deleted:pname[0].title});
    }
    else
    {
        return res.json({ data:"Couldn't Delete"});
    }
});

module.exports = router;