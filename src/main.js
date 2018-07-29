import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user-router";
import datasource from "./config/datasource";
export const dbInstance = datasource();
console.log("Teste = >");
const app = express();
app.use(bodyParser.json());
app.use("/user", new userRouter().createRoutes());

(async function main() {
  try {
    app.listen("3000", function() {
      console.log("connected on port 3000");
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    console.log("unable to connect to the database => ");
    // throw error;
  }
})();
