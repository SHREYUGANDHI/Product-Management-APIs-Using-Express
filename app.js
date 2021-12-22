const express = require('express');
const app = express();
app.use(express.json());
const port = 5000;

const productRoute = require("./routes/productRoute");
const sellerRoute = require("./routes/sellerRoute");
const companyRoute = require("./routes/companyRoute");

app.get('/', (req, res) => res.send('Welcome to product management!'));
app.use("/product", productRoute);
app.use("/seller", sellerRoute);
app.use("/company", companyRoute);

app.listen(port, () => console.log(`App listening on port port!`));