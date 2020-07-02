import React, { Component } from "react";
import axios from "axios";
import "./App.css";
// import { fetchMovies } from "./actions";
// import { connect } from "react-redux";
// import MovieBoard from "./components/MovieBoard.js";
// import { Banner } from "./components/Banner.js";
// import { Footer } from "./components/Footer.js";
// import Message from "./components/Message";
// import debounce from "lodash/debounce";

class App extends Component {
  state = {
    movieList: [],
    movieName: "",
    movieItem: "",
    notFound: false,
  };
  componentDidMount() {
    axios
      .get("http://www.omdbapi.com/?apikey=b9bd48a6&s=man&type=movie ")
      .then((response) => {
        console.log(response);
        this.setState({ movieList: response.data.Search });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  timeout = null;
  handleChange = (event) => {
    this.setState({ movieName: event.target.value });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      axios
        .get(
          `http://www.omdbapi.com/?apikey=b9bd48a6&s=${this.state.movieName}&type=movie `
        )
        .then((response) => {
          console.log(response);
          this.setState({ movieList: response.data.Search });
        })
        .catch((error) => {
          this.setState({ notFound: true });
          console.log(error);
        });
    }, 1000);
  };

  navigateToMovieDetail = (imdbID) => {
    this.props.history.push("/movie-detail", imdbID);
  };
  render() {
    return (
      <>
        <div className="movie-container">
          <input
            id="searchBox"
            className="form-control"
            type="text"
            value={this.state.movieName}
            onChange={(event) => this.handleChange(event)}
            placeholder="Enter movie name to search...."
          />
          {this.state.movieList &&
            this.state.movieList.map((movie) => {
              return (
                <>
                  <div
                    className="movie-card-main"
                    onClick={() => this.navigateToMovieDetail(movie.imdbID)}
                  >
                    <img
                      height="250"
                      width="170"
                      src={movie.Poster}
                      alt={movie.Title}
                    />
                    <div className="movie-title">{movie.Title}</div>
                  </div>
                </>
              );
            })}
          {this.state.notFound && <h3>Movies are not found</h3>}
        </div>
      </>
    );
  }
}

export default App;
