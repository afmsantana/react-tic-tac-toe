# React - Tic-Tac-Toe

Based on the [Tutorial: Tic-Tac-Toe – React](https://react.dev/learn/tutorial-tic-tac-toe)

## Running the Application

1. Run `npm install` to install all the needed modules before running.

2. Use `npm start` to start the application on [http://localhost:3000](http://localhost:3000)

3. If you want to build the application for production (to the `build` folder) you can use `npm run build`

## Modules Used

- React

- React-dom

- React-scripts

- [TailwindCSS CLI](https://tailwindcss.com/docs/installation)

- [React Router DOM](https://reactrouter.com/en/main)

## Developed Tic-Tac-Toe

Although this application was based on the tutorial provided by React it has some changes. I implemented all the functions provided by the tutorial included the final improvements they suggest us to do. I will start by enumerate how these were solved and then I will explain the improvements I made to the application.

1. **For the current move only, show “You are at move #…” instead of a button** - I used conditional rendering so when the list is displaying  the current play it changes the button to text.
   
   ```jsx
   const moves = history.map((squares, move) => { //[plays], index
      let description = 'Go to #' + move + ": " + moveHistory[move];
      return (
      <li key={"m" + move}>
            {move === (history.length - 1) ? 
             <div className="p-2">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-t-md text-center w-32">#{move}</div>
                <div className="p-2 border border-black">Playing</div>
             </div>
             :
             <div onClick={() => jumpTo(move)} className="p-2">
               <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-t-md text-center cursor-pointer w-32">{description}</div>
             </div>}
      </li>);
   });
   ```

2. **Rewrite `Board` to use two loops to make the squares instead of hardcoding them** - I basically created an empty matrix using 2 arrays so we could have a 3x3 board. With that empty board created we just need to insert each square and its values into the matrix (we fill the rows with the values and render them one at a time).
   
   ```jsx
   const board = Array(3).fill(null).map((_, i) => {
        const row = Array(3).fill(null).map((_, j) => 
           <Square key={"s"+ (3 * i + j)} 
                   className={"square"}
                   value={squares[3 * i + j]} 
                   onSquareClick={() => handleClick(i,j)}/>);
        return (
           <div key={"r" + i} className="board-row">
              {row}
           </div>
        );
   });
   ```

3. **Add a toggle button that lets you sort the moves in either ascending or descending order.** - I just added a button to change a boolean variable called *descending*. By clicking the button the boolean value changes and according if the value is true or false the order of the list changes.
   
   ```jsx
   const [descending, setDescending] = useState(false);
   
   const descendingMoves = history.map((squares, move) => { //[plays], index
      let description = 'Go to #' + move + ": " + moveHistory[move];
      (...)
   }
   
   const ascendingMoves = history.slice().reverse().map((squares, move) => { //[plays], index
      let description = 'Go to #' + (history.length - 1 - move) + ": " + moveHistory[history.length-1-move];
      (...)
   }
   
   <div className="flex flex-row space-x-4 mb-4 border-t border-b p-2 mt-4 border-black">
      <button className="bg-amber-800 rounded-md py-1 px-2 text-white border border-black" onClick={() => setDescending(!descending)}>Change</button>
   </div>
   {descending ? 
      <ol className="px-2 flex flex-row flex-wrap">{descendingMoves}</ol> : 
      <ol className="px-2 flex flex-row flex-wrap">{ascendingMoves}</ol>}
   ```

4. **When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).** -  I just used the winner variable to save the positions that gave the win to the player along with the player that won the game. Besides that I added a condition to the class that is going to be applied to the square on the board. If the square is part of the line that gave the win to the player then the square will turn yellow and white otherwise.
   
   ```jsx
   
   function calculateWinner(squares) {
      const lines = [
             [0, 1, 2],
             [3, 4, 5],
             [6, 7, 8],
             [0, 3, 6],
             [1, 4, 7],
             [2, 5, 8],
             [0, 4, 8],
             [2, 4, 6]
       ];
       for (let i = 0; i < lines.length; i++) {
             const [a, b, c] = lines[i];
             if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
               return [squares[a],lines[i]];
             }
       }
       return null;
   }
   
   let winner = calculateWinner(squares);
   
   const board = Array(3).fill(null).map((_, i) => {
       const row = Array(3).fill(null).map((_, j) => 
               <Square key={"s"+ (3 * i + j)} 
                       className={winner ? winner[1].includes((3 * i + j)) ? "square bg-yellow-400" : "square" : "square"}
                       value={squares[3 * i + j]} 
                       onSquareClick={() => handleClick(i,j)}/>);
       return (
             <div key={"r" + i} className="board-row">
               {row}
             </div>
       );
   });
   ```

5. **Display the location for each move in the format (row, col) in the move history list.** - I saved the position clicked along with the **squares** by using the *handleClick* function. While squares were saved in **history**, the positions were saved in **moveHistory**. Then we could show the positions in the format (row,col) along with the squares if needed.
   
   ```jsx
   function handleClick(i,j) {
       (...)    
       handlePlay(nextSquares,'(' + i + ',' + j + ')');
   }
   
   function handlePlay(nextSquares,nextMove) {
       const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
       const nextMoveHistory = [...moveHistory.slice(0, currentMove + 1), nextMove];
       setHistory(nextHistory);
       setMoveHistory(nextMoveHistory)
       setCurrentMove(nextHistory.length - 1);
   }
   
   //TEXT
   const moves = history.map((squares, move) => { //[plays], index
       let description = 'Go to #' + move + ": " + moveHistory[move];
       (...)
   }
   ```

Besides solving these additional tasks I also added new features to this tutorial that I enumerate below and you can see them by running the application. It is the best way to understand them.

- I added Routing to the application so we could have a **Game** page (where we are playing the tic-tac-toe game and we can see all the game movements) and a **Results** Page (where we can check which player is winning in terms of games).

- I added a **GameContext** where all the Game data regarding players, game history and scores is being saved. *Context* is used in React so we can have global variables that are going to be used by different components without the need to pass  them as a parameter of each component, avoiding having a chain of variables as parameters. All we need to do to use this context is to stablish a provider of that context on a top level of the application and then insert the following line of code `const context = useContext(GameContext)` on the components we want to use that context.
  
  ```jsx
  root.render(
    <StrictMode>
      <GameProvider>
        <BrowserRouter>
          <Navigator>
            <Routes>
              <Route path ="/" element={<Navigate to="/game" />} />
              <Route path ="/game" element={<Game />} />
              <Route path ="/results" element={<GameResults />} />
            </Routes>
          </Navigator>
        </BrowserRouter>
      </GameProvider>
    </StrictMode>
  );
  ```

- I create a **player1** and **player2** variables to save the names defined by players and also the scores of each player in the results.

- I also added a **gameHistory** that saves all the game boards that ended in a player win or draw, so the players can see the previous games in the Results section.

- I created a **PlaysBoard** to show the board of the previous plays for a Game on the Game Plays section and a **ResultsBoard** to show the **gameHistory** boards so the players can see the previous games on the Results Games section. The difference between this boards is that the **ResultsBoard** highligths the winner in yellow if the board did not end in a DRAW.

- I added a button in the Game section so when a game ends the players have the hability to **reset the game** without the need to refresh the page, so they can keep track of their score in results section (the previous plays are displaying ascending on default so the players can see the reset button, on mobile, on the Plays list when the game ends, otherwise it will appear on the last elements of the list when the game ends). I also added a reset button in the Results section so the players have the hability to **reset their scores and game history**. This way players can change or they can start the games from 0.

## Tic-Tac-Toe Screen Examples

#### Game (WEB)

![](/Users/afms/Desktop/React/react-tic-tac-toe/screens/Game-Web.png)

#### Results (WEB)

![](/Users/afms/Desktop/React/react-tic-tac-toe/screens/Results-Web.png)

#### Game (Mobile)

<img title="" src="file:///Users/afms/Desktop/React/react-tic-tac-toe/screens/Game-Mobile.png" alt="" width="200" data-align="inline">

#### Results (Mobile)

<img src="file:///Users/afms/Desktop/React/react-tic-tac-toe/screens/Results-Mobile.png" title="" alt="" width="202">
