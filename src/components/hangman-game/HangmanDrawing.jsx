export function HangmanDrawing({ mistakes }) {
  const bodyParts = [
    <circle key="head" cx="200" cy="80" r="20" stroke="white" strokeWidth="4" fill="none" />,
    <line key="body" x1="200" y1="100" x2="200" y2="150" stroke="white" strokeWidth="4" />,
    <line key="l-arm" x1="200" y1="120" x2="170" y2="140" stroke="white" strokeWidth="4" />,
    <line key="r-arm" x1="200" y1="120" x2="230" y2="140" stroke="white" strokeWidth="4" />,
    <line key="l-leg" x1="200" y1="150" x2="180" y2="190" stroke="white" strokeWidth="4" />,
    <line key="r-leg" x1="200" y1="150" x2="220" y2="190" stroke="white" strokeWidth="4" />,
  ];

  return (
    <svg height="250" width="300" style={{ margin: '0 auto', display: 'block' }}>
      {/* gallows */}
      <line x1="60" y1="230" x2="250" y2="230" stroke="white" strokeWidth="4" />
      <line x1="100" y1="230" x2="100" y2="30" stroke="white" strokeWidth="4" />
      <line x1="100" y1="30" x2="200" y2="30" stroke="white" strokeWidth="4" />
      <line x1="200" y1="30" x2="200" y2="60" stroke="white" strokeWidth="4" />
      
      {/* body parts (only show based on mistakes) */}
      {bodyParts.slice(0, mistakes)}
    </svg>
  );
}