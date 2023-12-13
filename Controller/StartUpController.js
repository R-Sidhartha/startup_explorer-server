const StartUp = require("../models/StartUpSchema");

const StartUpController = {
  getAllStartUps: async (req, res) => {
    try {
      const startUps = await StartUp.find().sort({ SNo: -1 });;
      res.json(startUps);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createStartUp: async (req, res) => {
    try {
      // Find the document with the highest SNo
      const highestSNoDocument = await StartUp.findOne({}, {}, { sort: { SNo: -1 } });
      // Calculate the next serial number
      const nextSNo = highestSNoDocument ? highestSNoDocument.SNo + 1 : 1;
      // Assign the calculated serial number to the new startup data
      const startUpData = req.body;
      startUpData.SNo = nextSNo;  
      // Create the startup record in the database
      const startUp = await StartUp.create({ ...startUpData });
  
      // Return the created startup data as a response
      res.json(startUp);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  

  updateStartUp: async (req, res) => {
    const { id } = req.params;
    const newstartupData = req.body;
    if ("SNo" in newstartupData) {
        return res.status(400).json({ message: "Cannot update 'SNo' field" });
      }
    try {
      const updateStartUp = await StartUp.findByIdAndUpdate(
        id,
        newstartupData,
        {
          new: true,
        }
      );
      if (!updateStartUp) {
        return res.status(404).json({ message: "StartUp not found" });
      }
      res.json(updateStartUp);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteStartUp: async (req, res) => {
    const { id } = req.params;
    try {
      const startUp = await StartUp.findByIdAndDelete(id);
      if (!startUp) {
        return res.status(404).json({ message: "StartUp not found" });
      }
  
      const startupsToUpdate = await StartUp.find({ SNo: { $gt: startUp.SNo } });
  
      for (const startupToUpdate of startupsToUpdate) {
        startupToUpdate.SNo -= 1;
        await startupToUpdate.save();
      }
  
      res.json({ Success: "Startup has been deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
};
module.exports = StartUpController;
