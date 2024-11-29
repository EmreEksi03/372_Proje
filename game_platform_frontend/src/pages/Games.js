import React, { useState, useEffect } from 'react';
import api from '../api';

function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    api.get('/games')
      .then(response => setGames(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Games</h1>
      <div className="row">
        {games.map(game => (
          <div className="col-md-4 mb-4" key={game.game_id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="card-text">{game.description}</p>
                <p className="card-text"><strong>Price:</strong> ${game.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
