const db = require("../models");
const Movie = db.movies;

// Créer et sauvegarder un nouveau film
exports.create = function (req, res) {
  // Validation de la requête
  if (!req.body.title) {
    res.status(400).send({ message: "Le titre ne peut pas être vide!" });
    return;
  }

  // Créer un film
  const movie = new Movie({
    title: req.body.title,
    synopsis: req.body.synopsis,
    releaseDate: req.body.releaseDate,
  });

  // Sauvegarder le film dans la base de données
  movie
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la création du film.",
      });
    });
};

// Récupérer tous les films
exports.findAll = (req, res) => {
  const title = req.query.title; // Filtrer par titre si nécessaire
  let condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Movie.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des films.",
      });
    });
};

// Récupérer un film par ID
exports.findOne = (req, res) => {
  Movie.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Film non trouvé avec l'ID " + req.params.id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur lors de la recherche du film avec l'ID " + req.params.id,
      });
    });
};

// Mettre à jour un film par ID
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Les données à mettre à jour ne peuvent pas être vides!" });
    return;
  }

  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Film non trouvé avec l'ID " + req.params.id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur lors de la mise à jour du film avec l'ID " + req.params.id,
      });
    });
};

// Supprimer un film par ID
exports.delete = (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Film non trouvé avec l'ID " + req.params.id });
      } else {
        res.status(204).end(); // Pas de contenu pour indiquer que la suppression a réussi
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur lors de la suppression du film avec l'ID " + req.params.id,
      });
    });
};


