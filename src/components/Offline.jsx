function Offline() {
  return (
    <div className="offline-screen">
      <span className="offline-screen__icon" aria-hidden="true">
        🔌
      </span>
      <h1>You're offline</h1>
      <p>Check your internet connection — some features may still work from cache.</p>
      <button className="btn btn--primary" onClick={() => window.location.reload()}>
        Try again
      </button>
    </div>
  );
}

export default Offline;
