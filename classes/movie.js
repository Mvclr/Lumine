class Movie {
    
    
    constructor(title, actors, director, year, imdbRating, runtime) {
        this.title = title;
        this.actors = actors;
        this.director = director;
        this.year = year;
        this.imdbRating = imdbRating;
        this.runtime = runtime;
        this.posterUrl = '';
    }
    
    getTitle() {
        return this.title;
    }
    
    getActors() {
        return this.actors;
    }
    
    getDirector() {
        return this.director;
    }
    
    getYear() {
        return this.year;
    }
    
    getImdbRating() {
        return this.imdbRating;
    }
    
    getRuntime() {
        return this.runtime;
    }
}

export default Movie;