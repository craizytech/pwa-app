import { useState, useEffect, useCallback } from "react";
import "./InstallPrompt.css";

const DISMISS_KEY = "pwa-install-dismissed-at";
const DISMISS_DAYS = 7;
const CLOSE_ANIMATION_MS = 250;

function InstallPrompt() {
  // State to store the install prompt
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  // Controls whether the sheet is mounted
  const [isOpen, setIsOpen] = useState(false);
  // Plays the slide-down/fade-out animation before unmounting
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Respect a recent "not now" / dismissal so we don't nag the user
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const daysSince = (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);
      if (daysSince < DISMISS_DAYS) return;
    }

    // Listen for the beforeinstallprompt event
    // This event fires when the browser determines the PWA can be installed
    const handler = (e) => {
      // Prevent the browser's default install prompt
      e.preventDefault();

      // Save the event object for later use
      setDeferredPrompt(e);

      // Show our custom install sheet
      setIsOpen(true);

      console.log("PWA installation available!");
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Lock background scroll while the sheet is open
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeSheet = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, CLOSE_ANIMATION_MS);
  }, []);

  const handleDismiss = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    console.log("PWA installation dismissed");
    closeSheet();
  }, [closeSheet]);

  // Close on Escape for keyboard users
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") handleDismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleDismiss]);

  // Install button click handler
  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Trigger the saved install prompt
    deferredPrompt.prompt();

    // Wait for the user's choice
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`User choice: ${outcome}`);

    if (outcome === "accepted") {
      console.log("PWA installation completed!");
    } else {
      console.log("PWA installation cancelled");
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    }

    // The prompt can only be used once, so reset it
    setDeferredPrompt(null);
    closeSheet();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`install-backdrop${isClosing ? " install-backdrop--closing" : ""}`}
      onClick={handleDismiss}
    >
      <div
        className={`install-sheet${isClosing ? " install-sheet--closing" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Install app"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="install-sheet__handle" />

        <div className="install-sheet__content">
          <img src="/pwa-192x192.png" alt="" className="install-sheet__icon" />
          <div className="install-sheet__text">
            <p className="install-sheet__title">Install PWA App</p>
            <p className="install-sheet__subtitle">
              Add it to your home screen for a faster, full-screen experience.
            </p>
          </div>
        </div>

        <div className="install-sheet__actions">
          <button
            type="button"
            className="btn btn--ghost install-sheet__btn"
            onClick={handleDismiss}
          >
            Not now
          </button>
          <button
            type="button"
            className="btn btn--primary install-sheet__btn"
            onClick={handleInstall}
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstallPrompt;
