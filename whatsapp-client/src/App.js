import Messenger from './components/Messenger';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/AccountProvider';
import './App.css'
import GeneralProvider from './context/GeneralContext';
function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
      <AccountProvider>
        <GeneralProvider>
          <Messenger />
        </GeneralProvider>
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
