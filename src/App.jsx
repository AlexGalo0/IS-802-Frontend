import { UserProvider, AdminProvider } from "./context";
import { Router } from "./router/Router";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
	return (
		<AdminProvider>
			<UserProvider>
				<Router />
			</UserProvider>
		</AdminProvider>
	);
}

export default App;
