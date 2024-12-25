import React from 'react';

interface NumericKeypadProps {
  onNumberClick: (number: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  position?: { x: number; y: number };
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({ onNumberClick, onClear, onSubmit, position }) => {
  const buttonStyle = `
    w-12 h-12 
    text-white font-bold 
    bg-[rgb(113,75,103)] 
    hover:bg-[rgb(93,55,83)]
    transition-colors
    rounded-lg
    flex items-center justify-center
  `;

  return (
    <div 
      className="absolute bg-white rounded-lg shadow-lg p-2 z-50 transform scale-90"
      style={{ 
        top: position?.y || '50%', 
        left: position?.x || '50%',
        transform: 'translate(-50%, -50%) scale(0.9)'
      }}
    >
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num.toString())}
            className={buttonStyle}
          >
            {num}
          </button>
        ))}
        <button onClick={onClear} className={`${buttonStyle} bg-[rgb(93,55,83)]`}>C</button>
        <button onClick={() => onNumberClick('0')} className={buttonStyle}>0</button>
        <button onClick={onSubmit} className={`${buttonStyle} bg-[rgb(133,95,123)]`}>✓</button>
      </div>
    </div>
  );
};

export default NumericKeypad;