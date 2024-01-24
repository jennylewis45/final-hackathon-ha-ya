const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://maria:12345678maria@cluster0.k8ux1za.mongodb.net/?retryWrites=true&w=majority"
  )

  .then(() => {
    console.log("mongoDB connected");
  })
  .catch(() => {
    console.log("failed");
  });

const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true
},
  password: {
    type: String,
    require: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Resultss = mongoose.model("Resultss", newSchema);
module.exports = Resultss;


