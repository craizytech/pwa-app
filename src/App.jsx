import useOnlineStatus from "./hooks/useOnlineStatus";
import Offline from "./components/Offline";
import InstallPrompt from "./components/InstallPrompt";
import "./App.css";

// Desktop/laptop browsers already surface connectivity in their own UI chrome;
// the in-app banner is only useful on Android, where nothing else shows it.
const isAndroid = /android/i.test(navigator.userAgent);

function App() {
  const isOnline = useOnlineStatus();

  return (
    <div className="app">
      {!isOnline && isAndroid && (
        <div className="status-banner" role="status">
          ⚠️ You're offline — some features may be unavailable
        </div>
      )}

      {isOnline ? (
        <div className="home">
          <img src="/pwa-192x192.png" alt="" className="home__icon" />
          <h1>My First PWA</h1>
          <p>All features are available.</p>
          <span className="status-pill">
            <span className="status-dot" />
            Online
          </span>
        </div>
      ) : (
        <Offline />
      )}

      <InstallPrompt />
    </div>
  );
}

export default App
