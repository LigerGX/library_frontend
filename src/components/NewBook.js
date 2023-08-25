import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries';

const NewBook = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [published, setPublished] = useState('');
	const [genre, setGenre] = useState('');
	const [genres, setGenres] = useState([]);

	const [addBook] = useMutation(ADD_BOOK, {
		refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
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

	return (
		<div>
			<h2>Add Book</h2>
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
