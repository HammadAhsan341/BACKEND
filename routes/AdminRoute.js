const express = require("express");
const router = express.Router();
const multer = require('multer');
const { verifyAdmin } = require('../middlewares/auth');
const admin_controller = require("../controllers/AdminController");
const path = require("path");
const app = express();
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
// const candiname = (req, res) => {
//   // candidatename
//   try {
//     const candidate_name = req.body.candidate_name;
//     res.status(200).json({ success: true,  candidate_name });
//   } catch (err) {
//     // Process the uploaded image and voter name as needed
//     // ...
//     res.status(500).json({ success: false, msg: "CAnnot get the candidate name" });
//     // Send the file name and voter name as a response

//   }
// };
// app.post('/upload', upload.single('image'), candiname);



// Serve static files from the "public" directory
router.use(express.static('public'));
//Register Route
router.post('/register_candidate', upload.single('image'), verifyAdmin, admin_controller.register_candidate);

//Admin_Login Route
router.post('/Login_Admin', admin_controller.Login_Admin);

//candidate delete Route
router.delete('/delete_candidate/:id', admin_controller.delete_candidate);

//candidate update Route
router.put('/update_candidate/:id', admin_controller.update_candidate);
//candidate display all Route
router.get('/display_candidates', admin_controller.display_candidates);

// display result
router.get('/display_result', verifyAdmin, admin_controller.displayResult);

//Display all registered users
router.get("/display_users", verifyAdmin, admin_controller.displayUsers);
// //send candidate name 
//   router.get('/candiname',verifyAdmin, admin_controller.candiname)

module.exports = router;