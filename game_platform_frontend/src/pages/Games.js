import React, { useState, useEffect } from 'react';
import api from '../api';

function Games() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  // State to manage the dropdown visibility for each game
  const [showMetadata, setShowMetadata] = useState({});

  useEffect(() => {
    api.get('/games')
      .then(response => {
        setGames(response.data);
        setFilteredGames(response.data);
        const uniqueGenres = [...new Set(response.data.map(game => game.genre))];
        setGenres(uniqueGenres);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterGames(e.target.value, selectedGenre);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    filterGames(searchQuery, e.target.value);
  };

  const filterGames = (query, genre) => {
    let filtered = games;
    if (query) {
      filtered = filtered.filter(game => game.title.toLowerCase().includes(query.toLowerCase()));
    }
    if (genre) {
      filtered = filtered.filter(game => game.genre === genre);
    }
    setFilteredGames(filtered);
  };

  const formatMetadata = (metadata) => {
    try {
      const parsedMetadata = JSON.parse(metadata);
      return (
        <div>
          <p><strong>Developer:</strong> {parsedMetadata.developer}</p>
          <p><strong>Platforms:</strong> {parsedMetadata.platforms.join(', ')}</p>
        </div>
      );
    } catch (error) {
      return <p>No additional info available</p>;
    }
  };

  const toggleMetadataDropdown = (gameId) => {
    setShowMetadata(prevState => ({
      ...prevState,
      [gameId]: !prevState[gameId] // Toggle visibility for the specific game
    }));
  };

  return (
    <div className="container mt-5">
      <h1>Games</h1>
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control mr-3"
          placeholder="Search games..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select
          className="form-control"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <div className="row">
        {filteredGames.map(game => (
          <div className="col-md-4 mb-4" key={game.game_id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="card-text"><strong>Description:</strong> {game.description}</p>
                <p className="card-text"><strong>Release Date:</strong> {new Date(game.release_date).toLocaleDateString()}</p>
                <p className="card-text"><strong>Price:</strong> ${game.price}</p>
                <p className="card-text"><strong>Genre:</strong> {game.genre}</p>
                <div className="card-text">
                  <button
                    className="btn btn-dark" // Added the btn-dark class for dark style
                    onClick={() => toggleMetadataDropdown(game.game_id)}
                  >
                    {showMetadata[game.game_id] ? 'Hide Additional Info' : 'Show Additional Info'}
                  </button>
                  {showMetadata[game.game_id] && (
                    <div className="mt-2">
                      <strong>Additional Info:</strong>
                      {formatMetadata(game.metadata)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
