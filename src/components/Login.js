import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN, GET_ME } from '../queries';

// if user loads webpage on this component first an error will occur
// user is not logged in automatically immediately so an error occurs
// since they techincally can't access this route
// find some way of allowing time for the automatic login process to happen
const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const [login, { error, loading }] = useMutation(LOGIN, {
		onCompleted: () => {
			navigate('/');
		},
		refetchQueries: (res) => {
			// need to set the user token in local storage before refetching
			// so that the link context can set the authorization properly
			localStorage.setItem('userToken', res.data.login.value);
			return [GET_ME];
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		login({
			variables: {
				username,
				password,
			},
		});
		setUsername('');
		setPassword('');
	};

	if (error) {
		return <p>Error logging in</p>;
	}

	if (loading) {
		return <p>Logging in</p>;
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="login-username">Username</label>
				<div>
					<input
						id="login-username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<label>Password</label>
				<div htmlFor="login-password">
					<input
						id="login-password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button>Login</button>
			</form>
		</div>
	);
};

export default Login;
