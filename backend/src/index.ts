import app from "./app";
import { connectToDatabase } from "./db/connection";

const port = process.env.PORT || 5000;
//only listen to port 3000 when successfully connected to the database
connectToDatabase()
  .then(() => {
    app.listen(port, () => console.log(`App running on PORT NUMBER ${port}`));
  })
  .catch((err) => console.log(err));
