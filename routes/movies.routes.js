module.exports = (app) => {
    const movies = require("../controllers/movies.controllers.js");
    let router = require("express").Router();
  
    // Créer un nouveau film
    router.post("/", movies.create);
  
    // Récupérer tous les films
    router.get("/", movies.findAll);
  
    // Récupérer un film par ID
    router.get("/:id", movies.findOne);
  
    // Mettre à jour un film par ID
    router.put("/:id", movies.update);
  
    // Supprimer un film par ID
    router.delete("/:id", movies.delete);
  
    app.use("/api/movies", router);
  };
  
  