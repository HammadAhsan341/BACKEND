const express = require("express");
const router = express.Router();
const multer = require('multer');
const {verifyAdmin}= require('../middlewares/auth');
const admin_controller = require("../controllers/AdminController");
const path = require("path");
// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/partyimages'));
    },
    filename: (req, file, cb) => {
      const name = Date.now() + '-' + file.originalname;
      cb(null, name);
    },
  });
  
  const upload = multer({ storage });
  
  // Serve static files from the "public" directory
  router.use(express.static('public'));
//Register Route
router.post('/register_candidate', upload.single('image'),verifyAdmin,admin_controller.register_candidate);

//Admin_Login Route
router.post('/Login_Admin',admin_controller.Login_Admin);

//candidate delete Route
router.delete('/delete_candidate/:id',verifyAdmin,admin_controller.delete_candidate);

//candidate update Route
router.put('/update_candidate/:id',verifyAdmin,admin_controller.update_candidate);
//candidate display all Route
router.get('/display_candidates',verifyAdmin,admin_controller.display_candidates);

// display result
router.get('/display_result',verifyAdmin,admin_controller.displayResult);

module.exports = router;