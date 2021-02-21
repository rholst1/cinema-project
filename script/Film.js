export default class DatabaseController {
  constructor(title, productionCountries, productionYear, length, genres, ageGroup, language,
    subtitles, director, actors, description, detailedDescription, id) {
    this.title = title;
    this.productionCountries = productionCountries;
    this.productionYear = productionYear;
    this.length = length;
    this.genres = genres;
    this.ageGroup = ageGroup;
    this.language = language;
    this.subtitles = subtitles;
    this.director = director;
    this.actors = actors;
    this.description = description;
    this.detailedDescription = detailedDescription;
    this.id = null;
    if (id != undefined) {
      this.id = id;
    }
  }
}

