import { Link } from 'react-router-dom';

const Header = () => {
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
					<li>
						<Link to="/add" className="light-text">
							Add Book
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
