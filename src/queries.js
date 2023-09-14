import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
	query AllAuthors {
		allAuthors {
			name
			born
			bookCount
			id
		}
	}
`;

export const ALL_BOOKS = gql`
	query AllBooks($genre: String, $author: String) {
		allBooks(genre: $genre, author: $author) {
			title
			author {
				name
				id
			}
			published
			genres
			id
		}
	}
`;

export const ADD_BOOK = gql`
	mutation AddBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
			author {
				name
				id
			}
			published
			genres
			id
		}
	}
`;

export const EDIT_AUTHOR = gql`
	mutation EditAuthor($name: String!, $born: Int!) {
		editAuthor(name: $name, setBornTo: $born) {
			name
			bookCount
			born
			id
		}
	}
`;

export const ADD_USER = gql`
	mutation AddUser(
		$username: String!
		$password: String!
		$favoriteGenre: String!
	) {
		addUser(
			username: $username
			password: $password
			favoriteGenre: $favoriteGenre
		) {
			username
			favoriteGenre
			id
		}
	}
`;

export const LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;

export const GET_GENRES = gql`
	query AllGenres {
		allBooks {
			genres
		}
	}
`;

export const GET_ME = gql`
	query Me {
		me {
			favoriteGenre
			username
			id
		}
	}
`;
