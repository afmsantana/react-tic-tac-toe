import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = (props) => {

    const [player1, setPlayer1] = useState("")
    const [player2, setPlayer2] = useState("")

    let game = {
        player1,
        setPlayer1,
        player2,
        setPlayer2
    };

    return <GameContext.Provider value={game}>{props.children}</GameContext.Provider>;
};