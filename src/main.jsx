import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {

	QueryClient,
	QueryClientProvider,
	
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// Create a client
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<ReactQueryDevtools initialIsOpen={true} />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</QueryClientProvider>
);
