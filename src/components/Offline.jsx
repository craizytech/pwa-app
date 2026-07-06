import { WifiOffIcon } from "./icons";

function Offline() {
  return (
    <div className="offline-screen">
      <WifiOffIcon />
      <h1>You're offline</h1>
      <p>Check your internet connection — some features may still work from cache.</p>
      <button className="btn btn--primary" onClick={() => window.location.reload()}>
        Try again
      </button>
    </div>
  );
}

export default Offline;
