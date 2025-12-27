import { useState, useEffect } from "react";
import { WagmiProvider, useAccount } from 'wagmi';
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from './wagmi';
import GameBoard from './components/GameBoard';

const queryClient = new QueryClient();

const GameContent = () => {
  const { isConnected } = useAccount();
  const [isGuest, setIsGuest] = useState(false);

  // If user connects wallet, automatically disable guest mode so they are "logged in"
  useEffect(() => {
    if (isConnected) setIsGuest(false);
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <nav className="flex justify-between items-center p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          DEV DUEL
        </h1>
        <div className="flex gap-4 items-center">
          {isGuest && !isConnected && <span className="text-gray-500 text-sm">Guest Mode</span>}
          <ConnectButton accountStatus="avatar" />
        </div>
      </nav>

      <main className="container mx-auto py-8">
        {/* SHOW GAME IF: Connected OR Guest */}
        {isConnected || isGuest ? (
          <GameBoard isGuest={!isConnected} />
        ) : (
          /* LOGIN SCREEN */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="relative bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-2xl max-w-lg mx-4">
              <h2 className="text-4xl font-black text-white mb-2">SYSTEM LOCKED</h2>
              <p className="text-slate-400 mb-6">
                Connect your wallet to unlock <b>Legendary Cards</b> and save your score.
              </p>
              
              <div className="flex flex-col gap-4 items-center">
                 <ConnectButton label="Connect Wallet" />
                 
                 <div className="flex items-center gap-2 w-full">
                    <div className="h-px bg-slate-600 flex-1"></div>
                    <span className="text-slate-500 text-xs uppercase">or</span>
                    <div className="h-px bg-slate-600 flex-1"></div>
                 </div>

                 <button 
                   onClick={() => setIsGuest(true)}
                   className="text-slate-400 hover:text-white underline text-sm transition-colors"
                 >
                   Enter as Guest (No Save)
                 </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <GameContent />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;