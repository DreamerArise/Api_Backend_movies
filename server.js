const express = require("express");

const app = express();

const logger = require("morgan");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/movies.routes")(app);

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log(`Connected to the database '${db.url}' !`);
  })
  .catch(err => {
    console.log(`Cannot connect to the database '${db.url}' !`, err);
    process.exit();
  });

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to top movies application." });
});

app.post('/movies', async (req, res) => {
    try {
      const newMovie = new Movie(req.body);
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/movies/:id', async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedMovie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
 
  app.delete('/movies/:id', async (req, res) => {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
    

  

app.listen(PORT, () => {
  console.log(`Backend express server is running on port ${PORT}.`);
});

