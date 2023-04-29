import { UserProvider, AdminProvider , UserMongoProvider} from "./context";
import { Router } from "./router/Router";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
	return (
		<AdminProvider>
			<UserProvider>
				<UserMongoProvider>
					<Router />
				</UserMongoProvider>
			</UserProvider>
		</AdminProvider>
	);
}

export default App;
