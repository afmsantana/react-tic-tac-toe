import Square from "../Square";

export default function PlaysBoard({ squares }) {

    const board = Array(3).fill(null).map((_, i) => {
        const row = Array(3).fill(null).map((_, j) => 
            <Square key={"s"+ (3 * i + j)} 
                    className={"square-tiny"}
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