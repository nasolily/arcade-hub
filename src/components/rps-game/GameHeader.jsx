export function GameHeader({ difficulty }) {
  return (
    <>
      <div className="difficulty-info">
        <span>
          Difficulty: <strong id="current-difficulty">{difficulty}</strong>
        </span>
      </div>
    </>
  );
}
