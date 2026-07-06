import useOnlineStatus from "./hooks/useOnlineStatus";
import Offline from "./components/Offline";
import InstallPrompt from "./components/InstallPrompt";
import { AlertTriangleIcon } from "./components/icons";
import "./App.css";

// Desktop/laptop browsers already surface connectivity in their own UI chrome;
// the in-app banner is only useful on Android, where nothing else shows it.
const isAndroid = /android/i.test(navigator.userAgent);

function App() {
  const isOnline = useOnlineStatus();

  return (
    <div className="app">
      <header className="app-bar">
        <div className="app-bar__brand">
          <img src="/vuna-192x192.png" alt="" className="app-bar__icon" />
          <span className="app-bar__name">Vuna POS</span>
        </div>
        <span className="app-bar__status">
          <span className={`app-bar__dot${isOnline ? "" : " app-bar__dot--offline"}`} />
          {isOnline ? "Online" : "Offline"}
        </span>
      </header>

      {!isOnline && isAndroid && (
        <div className="status-banner" role="status">
          <AlertTriangleIcon />
          You're offline — some features may be unavailable
        </div>
      )}

      {isOnline ? (
        <div className="home">
          <p>All features are available.</p>
        </div>
      ) : (
        <Offline />
      )}

      <InstallPrompt />
    </div>
  );
}

export default App
