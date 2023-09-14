import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../queries';
import { useNavigate } from 'react-router-dom';

// for simplicities sake users will be redirected to login page after signup
// consider automatically signing in users after signup
const Signup = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [favoriteGenre, setFavoriteGenre] = useState('');
	const navigate = useNavigate();

	const [addUser, { loading, error }] = useMutation(ADD_USER);

	const handleSubmit = (e) => {
		e.preventDefault();
		addUser({
			variables: {
				username,
				password,
				favoriteGenre,
			},
		});
		navigate('/login');
	};

	if (loading) {
		return <p>Adding user...</p>;
	}

	if (error) {
		return <p>Error adding user: {error.message}</p>;
	}

	return (
		<div>
			<h2>Signup</h2>
			<form onSubmit={handleSubmit}>
				<label for="login-username">Username</label>
				<div>
					<input
						id="login-username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<label>Password</label>
				<div for="login-password">
					<input
						id="login-password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<label>Favorite Genre</label>
				<div>
					<input
						id="login-genre"
						value={favoriteGenre}
						onChange={(e) => setFavoriteGenre(e.target.value)}
					/>
				</div>
				<button>Signup</button>
			</form>
		</div>
	);
};

export default Signup;
