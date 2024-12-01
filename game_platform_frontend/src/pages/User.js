import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState('');

  useEffect(() => {
    // Fetch user info
    api.get(`/users/${id}`)
      .then(response => setUser(response.data))
      .catch(err => console.error(err));

    // Fetch purchase history
    api.get(`/purchases/user/${id}`)
      .then(response => setPurchases(response.data))
      .catch(err => console.error(err));

    // Fetch user's friends
    api.get(`/users/${id}/friends`)
      .then(response => setFriends(response.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleFriendChange = (e) => {
    setSelectedFriend(e.target.value);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h1>{user.username}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>

      <h2 className="mt-4">Friends</h2>
      <div className="mb-3">
        <select 
          className="form-control" 
          value={selectedFriend} 
          onChange={handleFriendChange}
        >
          <option value="">Friends</option>
          {friends.map(friend => (
            <option key={friend.user_id} value={friend.user_id}>
              {friend.username}
            </option>
          ))}
        </select>
      </div>

      <h2 className="mt-4">Purchase History</h2>
      <ul className="list-group">
        {purchases.map(purchase => (
          <li key={purchase.purchase_id} className="list-group-item">
            {purchase.game_title} - Purchased on {new Date(purchase.purchase_date).toLocaleDateString()} for ${purchase.price_at_purchase}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
