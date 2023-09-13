// module imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// component imports
import App from './App';
import { store } from './app/store';

// css imports
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);