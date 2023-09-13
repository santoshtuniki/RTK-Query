// module imnports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApiProvider } from '@reduxjs/toolkit/query/react';

// component imports
import App from './App';
import { apiSlice } from './features/api/apiSlice';

// css imports
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ApiProvider api={apiSlice}>
			<App />
		</ApiProvider>
	</React.StrictMode>
);