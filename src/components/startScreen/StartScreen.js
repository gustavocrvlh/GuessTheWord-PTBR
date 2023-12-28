import "./StartScreen.css";

const StartScreen = ({ startGame}) =>  {
  return (
    <div className="start">

        <h1>Guess The Word</h1>

        <button onClick={startGame}>Jogar</button>

    </div>
  );
};

export default StartScreen