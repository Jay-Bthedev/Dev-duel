import { useState } from "react";
import Card from "./Card";

//  Standard Cards 
const STANDARD_DECK = [
  { id: 1, name: "Junior Dev", rarity: "Common", attack: 2, defense: 2, icon: "💻", description: "Breaks prod on Fridays." },
  { id: 2, name: "Full Stack", rarity: "Rare", attack: 5, defense: 4, icon: "🚀", description: "Can center a div." },
  { id: 3, name: "Manager", rarity: "Common", attack: 2, defense: 5, icon: "📅", description: "Let's sync up later." },
  { id: 4, name: "Bug", rarity: "Common", attack: 1, defense: 1, icon: "🐛", description: "It's a feature." },
  { id: 5, name: "AI Copilot", rarity: "Rare", attack: 6, defense: 3, icon: "🤖", description: "Writes code faster than you." },
];

// Legendary Card 
const LEGENDARY_CARD = { 
  id: 99, 
  name: "Vitalik", 
  rarity: "Legendary", 
  attack: 10, 
  defense: 10, 
  icon: "🦄", 
  description: "The Blockchain Founder." 
};

const GameBoard = ({ isGuest }) => {
  const [playerHand, setPlayerHand] = useState([]);
  const [enemyHand, setEnemyHand] = useState([]);
  const [gameState, setGameState] = useState('idle');
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, enemy: 0 });

  const dealCards = () => {
    //Create Base Deck 
    let deck = [...STANDARD_DECK, ...STANDARD_DECK, ...STANDARD_DECK];

    //  WALLET BONUS: If user is NOT a guest, add the Legendary Card
    if (!isGuest) {
      deck.push(LEGENDARY_CARD);
    }

    // Shuffle
    deck = deck.sort(() => Math.random() - 0.5);
    
    // Deal
    setPlayerHand(deck.slice(0, 3));
    setEnemyHand(deck.slice(3, 6));
    
    // Start Game
    setGameState('playing');
    setResult(null);
  };

  const fight = () => {
    const playerPower = playerHand.reduce((sum, card) => sum + card.attack, 0);
    const enemyPower = enemyHand.reduce((sum, card) => sum + card.attack, 0);

    let outcome = "";
    if (playerPower > enemyPower) {
      outcome = "Victory! 🏆";
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else if (playerPower < enemyPower) {
      outcome = "Defeat... 💀";
      setScore(prev => ({ ...prev, enemy: prev.enemy + 1 }));
    } else {
      outcome = "Draw 🤝";
    }

    setResult(outcome);
    setGameState('finished');
  };

  const resetGame = () => {
    setScore({ player: 0, enemy: 0 });
    setGameState('idle');
    setPlayerHand([]);
    setEnemyHand([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 p-4 w-full max-w-6xl mx-auto">
      
      {/* --- BONUS NOTIFICATION (Only shows if connected) --- */}
      {!isGuest && gameState === 'idle' && (
        <div className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-xs font-bold border border-yellow-500/50 animate-pulse mb-4">
          ✨ WALLET CONNECTED: LEGENDARY CARDS UNLOCKED
        </div>
      )}

      {/* --- SCOREBOARD --- */}
      <div className="relative flex justify-between items-center w-full max-w-md bg-slate-800 rounded-xl p-4 border border-slate-700 shadow-xl mb-4">
        <div className="text-center w-1/3">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Enemy</p>
          <p className="text-3xl font-black text-red-500">{score.enemy}</p>
        </div>
        <div className="flex flex-col items-center justify-center w-1/3">
          <div className="text-xl font-mono text-gray-600 font-bold mb-1">VS</div>
          <button 
            onClick={resetGame}
            title="Reset Score"
            className="text-[10px] uppercase font-bold text-gray-500 hover:text-white bg-slate-700 hover:bg-red-600 px-3 py-1 rounded-full transition-colors"
          >
            Reset
          </button>
        </div>
        <div className="text-center w-1/3">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">You</p>
          <p className="text-3xl font-black text-blue-500">{score.player}</p>
        </div>
      </div>

      {/* --- ENEMY ZONE --- */}
      <div className="text-center w-full">
        <div className="flex gap-2 md:gap-4 justify-center min-h-[14rem]">
          {enemyHand.length > 0 ? enemyHand.map((card, index) => (
            <Card 
              key={`enemy-${index}`} 
              card={card} 
              isFlipped={gameState !== 'finished'} 
              onClick={() => {}} 
            />
          )) : (
            <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-slate-700 rounded-xl p-8">
              <p className="text-slate-600 font-mono">Waiting for neural link...</p>
            </div>
          )}
        </div>
      </div>

      {/* --- CONTROLS --- */}
      <div className="h-24 flex items-center justify-center w-full z-10 my-4">
        {gameState === 'idle' && (
          <button 
            onClick={dealCards} 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-cyan-500/20 transition-all transform hover:scale-105"
          >
            INITIALIZE BATTLE
          </button>
        )}

        {gameState === 'playing' && (
          <button 
            onClick={fight} 
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-12 rounded-full shadow-lg shadow-red-500/40 transition-all transform hover:scale-110 active:scale-95 animate-pulse"
          >
            ATTACK! ⚔️
          </button>
        )}

        {gameState === 'finished' && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <h2 className={`text-3xl md:text-5xl font-black mb-2 drop-shadow-lg ${result.includes('Victory') ? 'text-yellow-400' : 'text-gray-200'}`}>
              {result}
            </h2>
            <button onClick={dealCards} className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-full text-sm font-bold text-white transition-colors">
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* --- PLAYER ZONE --- */}
      <div className="text-center w-full">
        <div className="flex gap-2 md:gap-4 justify-center min-h-[14rem]">
          {playerHand.length > 0 ? playerHand.map((card, index) => (
            <Card key={`player-${index}`} card={card} isFlipped={false} onClick={() => {}} />
          )) : (
            <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-slate-700 rounded-xl p-8">
               <p className="text-slate-600 font-mono">Deck Empty</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default GameBoard;