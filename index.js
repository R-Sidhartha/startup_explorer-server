const express = require('express');
const main = require('./db');
const cors=require('cors');
const StartUpRoutes = require('./routes/StartUpRoutes');
const app= express();
const PORT=process.env.PORT ||5001

main();
app.use(cors());
app.use(express.json());

app.use('/api/Startups',StartUpRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});