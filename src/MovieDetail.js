import React, { Component } from "react";
import axios from "axios";
import "./MovieDetail.css";

class MovieDetails extends Component {
  state = {
    eachMovieDetails: {},
  };
  componentDidMount() {
    axios
      .get(
        `http://www.omdbapi.com/?apikey=b9bd48a6&i=${this.props.location.state} `
      )
      .then((response) => {
        this.setState({ eachMovieDetails: response.data });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    let { eachMovieDetails } = this.state;
    return (
      eachMovieDetails && (
        <div className="container">
          <div className="movie-card">
            <div
              className="movie-header"
              style={{ backgroundImage: `url(${eachMovieDetails.Poster})` }}
            ></div>
            <div className="movie-content">
              <div className="movie-content-header">
                <h3 className="movie-title">{eachMovieDetails.Title}</h3>
              </div>
              <div className="movie-info">
                <div className="info-section">
                  <label>Released</label>
                  <span>{eachMovieDetails.Released}</span>
                </div>
                <div className="info-section">
                  <label>IMDB Rating</label>
                  <span>{eachMovieDetails.imdbRating}</span>
                </div>
                <div className="info-section">
                  <label>Rated</label>
                  <span>{eachMovieDetails.Rated}</span>
                </div>
                <div className="info-section">
                  <label>Runtime</label>
                  <span>{eachMovieDetails.Runtime}</span>
                </div>
              </div>
              <div className="plot" style={{ fontSize: "12px" }}>
                <p>{eachMovieDetails.Plot}</p>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default MovieDetails;
