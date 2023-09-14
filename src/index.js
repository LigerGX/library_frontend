import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
	from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './reset.css';
import './index.css';
import App from './App';

const authLink = setContext((request, { headers }) => {
	const token = localStorage.getItem('userToken');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : null,
		},
	};
});

const httpLink = createHttpLink({
	uri: 'http://localhost:4000',
});

const additiveLink = from([authLink, httpLink]);

const client = new ApolloClient({
	link: additiveLink,
	cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</Router>
);
