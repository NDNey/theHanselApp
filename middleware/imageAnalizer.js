require("dotenv").config({ path: "./config/.env" });

const ComputerVisionClient =require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
const key = process.env.MS_COMPUTER_VISION_SUBSCRIPTION_KEY;
const endpoint = process.env.MS_COMPUTER_VISION_ENDPOINT;

const computerVisionClient = new ComputerVisionClient(
new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }),
endpoint
);

module.exports = computerVisionClient




// app.post('/messages', upload.single('uploadedFile'), async (req, res) => {
//     try {
//        let posterId = req.user._id;
//         let postedBy = req.user.local.email;
//         let plant = false
//       // Upload image to cloudinary
//       const result = await cloudinary.uploader.upload(req.file.path);
//       const brandURLImage = result.secure_url;
//       console.log('-------------------------------------------------');
//       console.log('DETECT OBJECTS');
//       console.log();
  
//       // <snippet_objects>
//       const objectURL = brandURLImage;
  
//       // Analyze a URL image
//       console.log('Analyzing objects in image...', objectURL.split('/').pop());
//       const objects = (
//         await computerVisionClient.analyzeImage(objectURL, {
//           visualFeatures: ['Objects'],
//         })
//       ).objects;
//       console.log('objects!!!!', objects);
  
//       // Print objects bounding box and confidence
//       if (objects.length) {
//         console.log(
//           `${objects.length} object${objects.length == 1 ? '' : 's'} found:`
//         );
//         for (const obj of objects) {
//           if (obj.object.includes('plant')) {
//             plant = true;
//           }
//           console.log(
//             'hello',
//             `    ${obj.object} (${obj.confidence.toFixed(
//               2
//             )}) at ${formatRectObjects(obj.rectangle)}`
//           );
//         }
//       } else {
//         console.log('No objects found.');
//       }
//       // </snippet_objects>
  
//       // <snippet_objectformat>
//       // Formats the bounding box
//       function formatRectObjects(rect) {
//         return (
//           `top=${rect.y}`.padEnd(10) +
//           `left=${rect.x}`.padEnd(10) +
//           `bottom=${rect.y + rect.h}`.padEnd(12) +
//           `right=${rect.x + rect.w}`.padEnd(10) +
//           `(${rect.w}x${rect.h})`
//         );
//       }
//       if(plant === true){
//          db.collection('messages').save({
//           name: req.body.name, 
//           msg: req.body.msg, 
//           img:req.file.filename,
//           image: result.secure_url,
//           cloudinaryId: result.public_id,
//           thumbUp: 0, 
//           thumbDown:0,
//           posterId: new mongoose.Types.ObjectId(posterId),
//           postedBy: postedBy,
//         }, (err, result) => {
//           if (err) return console.log(err)
//           console.log('saved to database')
//           res.redirect('/profile')
//         })
//       } else {
//         console.log('nice try loser!')
//         res.redirect('/profile')
//       }
      
//     } catch (err) {
//       console.log(err);
//     }
//   });