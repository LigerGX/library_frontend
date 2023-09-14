import { Link } from 'react-router-dom';

const Header = ({ user, handleLogout }) => {
	return (
		<header className="site-header">
			<h1>
				<Link to="/" className="light-text">
					Library
				</Link>
			</h1>
			<nav>
				<ul>
					<li>
						<Link to="/authors" className="light-text">
							Authors
						</Link>
					</li>
					<li>
						<Link to="/books" className="light-text">
							Books
						</Link>
					</li>
					{user && (
						<li>
							<Link to="/add" className="light-text">
								Add Book
							</Link>
						</li>
					)}
					{!user && (
						<li>
							<Link to="/login" className="light-text">
								Login
							</Link>
						</li>
					)}
					{!user && (
						<li>
							<Link to="/signup" className="light-text">
								Signup
							</Link>
						</li>
					)}
					{user && (
						<li>
							<Link to="/recommend" className="light-text">
								Recommend
							</Link>
						</li>
					)}
					{user && (
						<li>
							<button onClick={handleLogout}>Logout</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
