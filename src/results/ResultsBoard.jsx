import Square from "../Square";

export default function ResultsBoard({ squares, win }) {

    const board = Array(3).fill(null).map((_, i) => {
        const row = Array(3).fill(null).map((_, j) => 
            <Square key={"s"+ (3 * i + j)} 
                    className={win ? win.includes((3 * i + j)) ? "square-tiny bg-yellow-400" : "square-tiny" : "square-tiny"}
                    value={squares[3 * i + j]}/>);
        return (
          <div key={"r" + i} className="board-row">
            {row}
          </div>
        );
    });

    return (
    <>
        {board}
    </>);
}