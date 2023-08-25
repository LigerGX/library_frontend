import { Routes, Route } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';

const App = () => {
	return (
		<div className="app">
			<Header />
			<main>
				<Routes>
					<Route path="/authors" element={<Authors />} />
					<Route path="/books" element={<Books />} />
					<Route path="/add" element={<NewBook />} />
					<Route path="/" element={<LandingPage />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
};

export default App;
