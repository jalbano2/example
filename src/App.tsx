import { useState, useCallback, useEffect, useRef } from 'react';
import HomeScreen from './screens/HomeScreen';
import VehicleDetailScreen from './screens/VehicleDetailScreen';
import CredentialViewerScreen from './screens/CredentialViewerScreen';
import BackBlockOverlay from './components/BackBlockOverlay';

type Screen = 'home' | 'vehicleDetail' | 'credentialViewer';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('credentialViewer');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [backBlocked, setBackBlocked] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateTo = useCallback((screen: Screen) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setIsTransitioning(false);
      window.scrollTo(0, 0);
    }, 150);
  }, []);

  const handleBackAttempt = useCallback(() => {
    if (backBlocked) return;
    setBackBlocked(true);
    timerRef.current = setTimeout(() => {
      setBackBlocked(false);
    }, 10000);
  }, [backBlocked]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const onPopState = () => {
      window.history.pushState(null, '', window.location.href);
      handleBackAttempt();
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [handleBackAttempt]);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F5F5F5] relative shadow-2xl">
      {backBlocked && <BackBlockOverlay />}
      <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {currentScreen === 'home' && (
          <HomeScreen onNavigateToDetail={() => navigateTo('vehicleDetail')} />
        )}
        {currentScreen === 'vehicleDetail' && (
          <VehicleDetailScreen
            onBack={() => navigateTo('home')}
            onViewCredential={() => navigateTo('credentialViewer')}
          />
        )}
        {currentScreen === 'credentialViewer' && (
          <CredentialViewerScreen onBack={handleBackAttempt} />
        )}
      </div>
    </div>
  );
}

export default App;
