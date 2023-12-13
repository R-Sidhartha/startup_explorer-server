const mongoose=require('mongoose');

const StartUpSchema=new mongoose.Schema({
    SNo: {
        type: Number,
        required: true,
        unique: true
      },
      Date: {
        type: String,
      },
    StartupName:{
        type: String,
        required: true,
        unique: true
    },
    IndustryVertical:{
        type: String,
    },
    SubVertical:{
        type: String,
    },
    CityLocation:{
        type: String,
    },
    InvestorsName:{
        type: String,
    },
    InvestmentType:{
        type: String,
    },
    AmountInUSD: {
        type: String, 
      },
    Remarks:{
        type: String,
    },
})

const StartUpDetails=mongoose.model('StartUpDetails',StartUpSchema);
module.exports = StartUpDetails;
