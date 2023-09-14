import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useApolloClient, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Recommendations from './components/Recommendations';
import { GET_ME } from './queries';

const App = () => {
	const [user, setUser] = useState(null);
	const client = useApolloClient();
	const { data } = useQuery(GET_ME);
	const navigate = useNavigate();

	useEffect(() => {
		if (data) {
			setUser(data.me);
		}
	}, [data]);

	const handleLogout = () => {
		setUser(null);
		localStorage.removeItem('userToken');
		client.resetStore();
		navigate('/');
	};

	return (
		<div className="app">
			<Header user={user} handleLogout={handleLogout} />
			<main>
				<Routes>
					<Route path="/authors" element={<Authors />} />
					<Route path="/books" element={<Books />} />
					<Route path="/add" element={<NewBook />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/recommend" element={<Recommendations user={user} />} />
					<Route path="/" element={<LandingPage />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
};

export default App;
