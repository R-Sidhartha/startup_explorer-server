const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const StartUpController=require("../Controller/StartUpController");
const StartUpValidationRules = [
  body("StartupName").isString().optional().isLength({ min: 3 })
  .withMessage("Startup Name should be at least 3 characters"),
  body("IndustryVertical").isString().optional().isLength({ min: 3 })
  .withMessage("IndustryVertical should be at least 3 characters"),
  body("CityLocation").isString().optional().isLength({ min: 3 })
  .withMessage("CityLocation should be at least 3 characters"),
  body("InvestorsName").isString().optional().isLength({ min: 3 })
  .withMessage("Investors Name should be at least 3 characters"),
  body("InvestmentType").isString().optional().isLength({ min: 3 })
  .withMessage("Investment Type Name should be at least 3 characters"),
];
// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
// CRUD routes
router.get('/', StartUpController.getAllStartUps);
router.post('/create',StartUpValidationRules,validate, StartUpController.createStartUp);
router.put('/update/:id',StartUpValidationRules,validate, StartUpController.updateStartUp);
router.delete('/delete/:id', StartUpController.deleteStartUp);

module.exports = router;