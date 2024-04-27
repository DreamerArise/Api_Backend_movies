module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: { type: String, required: true },
        synopsis: { type: String, required: true },
        releaseDate: { type: Date, required: true },
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Movie = mongoose.model("movie", schema);
    return Movie;
  };

  