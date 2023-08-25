import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = () => {
	const booksQuery = useQuery(ALL_BOOKS);

	if (booksQuery.loading) {
		return <p>Loading...</p>;
	}

	const books = booksQuery.data.allBooks;

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
					{books.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Books;
