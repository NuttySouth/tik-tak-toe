const cells = document.querySelectorAll("td");
const display = document.querySelector('.display');
const grid = new Array(9).fill(undefined);

document.querySelector('.refresh').addEventListener('click', ()=> window.location.reload());

const playerFactory = (name, image) => {
  const getName = () => name;
  const getImage = () => image;
  let playerScore = 0;
  const increaseScore = () => playerScore++;
  const getPlayerScore = () => playerScore;
  return { getName, getImage, increaseScore, getPlayerScore };
};

const playerOne = playerFactory("Player-One", "images/Ximage.png");
const playerTwo = playerFactory("Player-Two", "images/circleImage.png");

let currentPlayer = playerOne;

Array.from(cells).forEach((cell) => {
  cell.addEventListener("click", (event) => {
    let index = event.target.id;
    if(grid[index] == null){
        grid[index] = currentPlayer.getName();
        event.target.style = `background: url(${currentPlayer.getImage()}); background-repeat: no-repeat; background-position:center; background-size: 60px 60px;`;
        if(checkIfWin()){
            let header = document.createElement('h1');
            header.textContent = `${currentPlayer.getName()} WON!!`;
            display.appendChild(header);
        }
        currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
    } else {
        console.log('already taken');
    }
  });
});

function checkIfWin(){
    if((grid[0] == grid[1] && grid[1] == grid[2] && grid[0] != undefined && grid[2] != undefined) ||
    (grid[3] == grid[4] && grid[4] == grid[5] && grid[3] != undefined && grid[5] != undefined) ||
    (grid[6] == grid[7] && grid[7] == grid[8] && grid[6] != undefined && grid[8] != undefined)||
    (grid[0] == grid[3] && grid[3] == grid[6] && grid[0] != undefined && grid[6] != undefined) ||
    (grid[1] == grid[4] && grid[4] == grid[7] && grid[1] != undefined && grid[7] != undefined) ||
    (grid[2] == grid[5] && grid[5] == grid[8] && grid[2] != undefined && grid[8] != undefined) ||
    (grid[0] == grid[4] && grid[4] == grid[8] && grid[0] != undefined && grid[8] != undefined) ||
    (grid[2] == grid[4] && grid[4] == grid[6] && grid[2] != undefined && grid[6] != undefined)){
        return true
    }

    return false;
}