import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import * as ReactDOM from "react-dom/client";
import Routes from './components/routes';
import './styles/app.scss';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
<QueryClientProvider client={new QueryClient()}>
<Routes/>
</QueryClientProvider>
);

