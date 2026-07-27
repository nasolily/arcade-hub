export const HistorySection = ({ history = [] }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="rps-history-container">
      <h3 style={{ marginBottom: '15px' }}>Recent Battles</h3>
      <div className="history-badges">
        {history.slice(-5).reverse().map((entry, i) => {
          const pMove = (entry.playerMove || entry.player || "?")[0].toUpperCase();
          const cMove = (entry.cpuMove || entry.cpu || "?")[0].toUpperCase();
          const result = entry.outcome || entry.result || "tie";
          
          return (
            <div key={i} className={`history-badge ${result}`}>
              <span className="battle-text">{pMove} vs {cMove}</span>
              <span className="outcome-text">
                {result === 'player' ? 'WIN' : result === 'cpu' ? 'LOSS' : 'TIE'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};