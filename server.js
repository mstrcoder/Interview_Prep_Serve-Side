const app = require('./app');
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Interview:12345@cluster0.z0rxw.mongodb.net/Interview_Prep?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((con) => {
    // console.log(con.connection);
    console.log("We are Connected to the Database");
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

// process.on("unhandledRejection", (err) => {
//   // console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });


// process.on("uncaughtException", (err) => {
//   // console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// process.on('SIGTERM',()=>{
//   console.log('Sigterm Recived')
//     // console.log(err.name, err.message);
//     server.close(() => {
//     });
// })