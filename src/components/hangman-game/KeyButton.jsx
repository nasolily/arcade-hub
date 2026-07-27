export function KeyButton({ letter, onClick, isUsed, disabled }) {
  return (
    <button 
      disabled={isUsed || disabled} 
      onClick={() => onClick(letter)}
      className={`key-btn ${isUsed ? 'used' : ''}`}
    >
      {letter.toUpperCase()}
    </button>
  );
}