import "dotenv/config";
import app from "./app.js";
import connection from "./config/connection.js";

connection();

app.get("/", (req, res) => {
  res.send("active");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server is active on port ${process.env.PORT}, mode ${process.env.NODE_MODE}`
  );
});
