import { UserProvider } from "./context/UserProvider";
import { Router } from "./router/Router";
function App() {
	return (
		<UserProvider>
			<Router/>
		</UserProvider>
	);
}

export default App;
