import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR } from '../queries';

const SetBirthYear = ({ authors }) => {
	const [name, setName] = useState('');
	const [born, setBorn] = useState('');

	const [editAuthor] = useMutation(EDIT_AUTHOR);

	const handleSubmit = (e) => {
		e.preventDefault();

		editAuthor({ variables: { name, born } });
	};

	return (
		<div>
			<h3>Set birth year</h3>
			<form onSubmit={handleSubmit}>
				<label>Name</label>
				<div>
					<select value={name} onChange={(e) => setName(e.target.value)}>
						{authors.map((author) => {
							return (
								<option value={author.name} key={author.id}>
									{author.name}
								</option>
							);
						})}
					</select>
				</div>
				<label>Born</label>
				<div>
					<input
						value={born}
						type="number"
						onChange={(e) => setBorn(Number(e.target.value))}
					/>
				</div>
				<button>Update author</button>
			</form>
		</div>
	);
};

export default SetBirthYear;
