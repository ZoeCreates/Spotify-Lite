const app = require("./app");
const connectDB = require("./config/database.js");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
