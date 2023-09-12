// module imnports
import React from 'react';
import ReactDOM from 'react-dom/client';

// component imports
import App from './App';

// css imports
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);