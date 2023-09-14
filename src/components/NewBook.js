import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_BOOKS } from '../queries';

const NewBook = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [published, setPublished] = useState('');
	const [genre, setGenre] = useState('');
	const [genres, setGenres] = useState([]);

	const [addBook, { error }] = useMutation(ADD_BOOK, {
		// BUG: data returns null and any attempt to read cache returns null
		// apollo docs say cache must contain data for all of the queries fields
		// or it will return null
		update(cache, res) {
			cache.updateQuery({ query: ALL_BOOKS }, (data) => {
				return {
					allBooks: data.allBooks.concat(res.data.addBook),
				};
			});
		},
	});

	const submit = async (event) => {
		event.preventDefault();

		addBook({ variables: { title, author, published, genres } });

		setTitle('');
		setPublished('');
		setAuthor('');
		setGenres([]);
		setGenre('');
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre('');
	};

	if (error) {
		console.log(error.message);
		console.log(error.graphQLErrors);
	}

	return (
		<div>
			<h2>Add Book</h2>
			{error && <p>{error.message}</p>}
			<form onSubmit={submit}>
				<label>Title</label>
				<div>
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<label>Author</label>
				<div>
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<label>Published</label>
				<div>
					<input
						type="number"
						value={published}
						onChange={({ target }) => setPublished(Number(target.value))}
					/>
				</div>
				<label>Genres</label>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						Add genre
					</button>
				</div>
				<div>Genres: {genres.join(' ')}</div>
				<button type="submit">Create book</button>
			</form>
		</div>
	);
};

export default NewBook;
