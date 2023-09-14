import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Recommendations = ({ user }) => {
	const { data, loading, error } = useQuery(ALL_BOOKS, {
		variables: {
			genre: `${user.favoriteGenre}`,
		},
	});

	if (!user) {
		return <p>User not logged in</p>;
	}

	return (
		<div>
			<h2>Recommendations</h2>
			{loading && <p>Finding recommendations</p>}
			{error && <p>{error.message}</p>}
			{data && (
				<div>
					<p>Books in your favorite genre {`${user.favoriteGenre}`}</p>
					<table>
						<thead>
							<tr>
								<th>Title</th>
								<th>Author</th>
								<th>Published</th>
							</tr>
						</thead>
						<tbody>
							{data.allBooks.map((book) => {
								return (
									<tr key={book.id}>
										<td>{book.title}</td>
										<td>{book.author.name}</td>
										<td>{book.published}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default Recommendations;
