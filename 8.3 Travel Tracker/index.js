import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgres23",
  port: 5432
});

db.connect();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page
app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  res.render("index.ejs", { countries: countries, total: countries.length });
  db.end();
});

//Handle user input
app.post("/add", async (req, res) =>{
  let countryName = req.body.country.trim();
  let locations = [];
  const countryNames = await db.query("SELECT country_name FROM countries");
  // countryNames.rows.forEach((name) => {
  //     locations.push(name.country_name)      
  // });
  console.log(countryName);  
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
