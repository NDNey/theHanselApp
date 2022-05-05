require("dotenv").config({ path: "./config/.env" });
const Nylas = require('nylas');
const { default: Draft } = require('nylas/lib/models/draft');



Nylas.config({
    clientId:process.env.NYLAS_CLIENT_ID,
    clientSecret: process.env.NYLAS_CLIENT_SECRET,
});

const nylas = Nylas.with(process.env.ACCESS_TOKEN);


// kkk
// Send the draft
module.exports = {Draft ,nylas}
// draft.send().then(message => {
//     console.log(`${message.id} was sent`);
// });   


