//Entry Point
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import ErrorBoundary from "./ErrorBoundary";

//Create App Component

ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
    document.getElementById('marvelApp')
)
