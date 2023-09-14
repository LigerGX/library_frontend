import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { ALL_BOOKS } from '../queries';
import { uid } from 'uid';

const Books = () => {
	const [genre, setGenre] = useState('');
	const [genres, setGenres] = useState([]);

	const { data, loading, error } = useQuery(ALL_BOOKS, {
		variables: {
			genre,
		},
	});

	useEffect(() => {
		// only set the genres state when all books are initially fetched
		// otherwise not all genres will be available in the select form
		if (data && genres.length === 0) {
			// go through all books retrieving the genres from each
			// then reduce them into an array of unique genres
			const genres = data.allBooks
				.flatMap((book) => {
					return book.genres;
				})
				.reduce((total, value) => {
					// check if genre is in array, then add if it is not
					if (!total.some((item) => item === value)) {
						return total.concat(value);
					}

					return total; // genre is present in array
				}, []);

			setGenres(genres);
		}
	}, [data, genres]);

	const handleSelect = (e) => {
		setGenre(e.target.value);
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		console.log(error);
		return <p>Could not fetch books</p>;
	}

	const books = data.allBooks;

	return (
		<div>
			<h2>Books</h2>

			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Author</th>
						<th>Published</th>
					</tr>
				</thead>
				<tbody>
					{books.map((book) => (
						<tr key={book.title}>
							<td>{book.title}</td>
							<td>{book.author.name}</td>
							<td>{book.published}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div>
				<h3>Filter by genre</h3>
				<select value={genre} onChange={handleSelect}>
					<option value={''}>All</option>
					{genres.map((genre) => {
						return (
							<option value={genre} key={uid()}>
								{genre}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);
};

export default Books;
