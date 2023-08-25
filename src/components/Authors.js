import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import SetBirthYear from './SetBirthYear';

const Authors = () => {
	const authorQuery = useQuery(ALL_AUTHORS);

	if (authorQuery.loading) {
		return <p>Loading...</p>;
	}

	const authors = authorQuery.data.allAuthors;

	return (
		<div>
			<h2>Authors</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Born</th>
						<th>Books</th>
					</tr>
				</thead>
				<tbody>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born ? a.born : '?'}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<SetBirthYear authors={authors} />
		</div>
	);
};

export default Authors;
