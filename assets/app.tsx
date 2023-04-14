import React from 'react';
import * as ReactDOM from "react-dom/client";
import Routes from './components/routes';
import './styles/app.scss';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(<Routes/>);

