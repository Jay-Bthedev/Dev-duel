import { motion } from "framer-motion";

const Card = ({ card, onClick, isFlipped }) => {
  // Determine border color based on rarity (simulated)
  const borderColor = card.rarity === 'Legendary' ? 'border-yellow-400' : 'border-gray-600';

  return (
    <div className="perspective-1000 w-32 h-48 md:w-40 md:h-56 cursor-pointer" onClick={onClick}>
      <motion.div
        className="relative w-full h-full transform-style-3d transition-all duration-500"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, animationDirection: "normal" }}
      >
        {/* FRONT OF CARD (Visible when NOT flipped) */}
        <div className={`absolute w-full h-full bg-slate-800 border-2 ${borderColor} rounded-xl backface-hidden flex flex-col items-center justify-between p-2 shadow-xl shadow-blue-500/20`}>
          <div className="text-xs font-bold text-gray-400 self-start">{card.rarity}</div>
          <div className="text-4xl">{card.icon}</div>
          <div className="text-center">
            <h3 className="font-bold text-sm md:text-md text-white">{card.name}</h3>
            <p className="text-[10px] text-gray-300">{card.description}</p>
          </div>
          <div className="flex justify-between w-full text-xs font-mono font-bold">
            <span className="text-red-400">ATK {card.attack}</span>
            <span className="text-green-400">DEF {card.defense}</span>
          </div>
        </div>

        {/* BACK OF CARD (Visible when flipped) */}
        <div 
          className="absolute w-full h-full bg-gradient-to-br from-blue-600 to-indigo-900 border-2 border-blue-400 rounded-xl backface-hidden flex items-center justify-center rotate-y-180 shadow-xl"
        >
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;