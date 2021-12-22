const express = require("express");
const company = require("../data/companyData");
const product = require("../data/productData");
const router = express.Router();
router.use(express.json());

router.get("/",(req,res) => {
    res.json({data:"company page"});
});

router.get("/list",(req,res) => {
    res.json({data:company});
});

//add Company
router.post("/addCompony",(req,res) => {
    const compId = req.body.companyId;
    const name = req.body.name;
    const productId = req.body.productId;

    const comp = company.filter((p)=>p.companyId === compId);
    if(comp.length === 0){
        return res.json({ data:"Added Company details succesfully",companyId:compId,name:name,productId:productId});
    } else {
        return res.json({data:"Company already Added!"})
    }
});


//fetch company details based on product name
router.post("/companyDetailProduct/:title",(req,res) => {
    const pname = req.params.title;
    const prod = product.filter((p)=>p.title === pname);

    if(prod.length === 0){
        return res.json({data:"not found any record!"})
    } else {
        const pid = prod.productId;
        const comp = company.filter((p)=>p.productId === pid);
        return res.json({data:prod})
    }
});

//update
router.post("/updateCompany",(req,res) => {
    const companyid = req.body.companyId;
    const productid = req.body.productId;
    
    const cname = company.filter((c)=> c.companyId === companyid);
    if(cname.length === 1)
    {
        return res.json({ data:"Updated Company Products succesfully",company_id:companyid,New_Productid:productid});
    }
    else
    {
        return res.json({ data:"Couldn't Update"});
    }
});

//delete
router.post("/deleteCompany",(req,res) => {
    const companyid = req.body.companyId;
    
    const cname = company.filter((c)=> c.companyId === companyid);
    if(cname.length === 1)
    {
        return res.json({ data:"Deleted Company succesfully",Deleted:cname[0].name});
    }
    else
    {
        return res.json({ data:"Couldn't Delete"});
    }
});

module.exports = router;