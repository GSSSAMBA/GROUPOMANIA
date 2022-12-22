const mongoose = require("mongoose");


mongoose
    // .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.vmotzji.mongodb.net/?retryWrites=true&w=majority",
    .connect("mongodb+srv://GSSSAMBA:Mongodbb@grouppmania-v-01-deploy.hdpwmir.mongodb.net/test",

        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Failed to connect to MondoDB", err)); 