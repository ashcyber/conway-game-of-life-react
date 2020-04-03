import React from 'react';
import Grid from './Grid'; 
import { FaPlay, FaPause, FaRandom, FaRedo } from "react-icons/fa";
import './main.css';

/*
Reference: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

Rule 1) Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Rule 2) Any live cell with two or three live neighbours lives on to the next generation. -> Nothing Happens 
Rule 3) Any live cell with more than three live neighbours dies, as if by overpopulation.
Rule 4) Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

*/

class Main extends React.Component { 
  constructor() { 
    super(); 
    this.speed = 100; 
    this.rows = 30; 
    this.cols = 50; 

    this.clearGrid = new Array(this.rows).fill().map(() => new Array(this.cols).fill(false))
    
    this.state = { 
      generations: 0, 
      grid:this.clearGrid 
    }
  }

  selectBox = (row, col) => {
    let newGrid = this.deepCopy(this.state.grid); 
    newGrid[row][col] = true; 
    this.setState({
      ...this.state, 
      grid: newGrid 
    })
  }

  handlePlay = () => {
    clearInterval(this.intervalId); 
    this.intervalId = setInterval(this.play, this.speed); 
  }

  play = () => {
    let grid = this.state.grid; 
    let gridCopy = this.deepCopy(this.state.grid)

    let dir_r = [-1,-1,0,1,1,1,0,-1] 
    let dir_c = [0,1,1,1,0,-1,-1,-1]; 

    for(let r = 0; r < this.rows; r++) { 
      for(let c = 0; c < this.cols; c++){ 
        let liveCount = 0; 

        // Visit Neighbours and Update Count 
        for(let n = 0; n < dir_r.length; n++) { 
          let rr = r + dir_r[n]; 
          let cc = c + dir_c[n]; 

          if(rr < 0) rr = this.rows - 1; 
          if(cc < 0) cc = this.cols - 1; 

          if(rr >= this.rows) rr = rr % this.rows; 
          if(cc >= this.cols) cc = cc % this.cols; 

          if(rr < 0 && rr >= this.rows) continue; 
          if(cc < 0 && cc >= this.cols) continue; 

          if(grid[rr][cc] === true) liveCount++; 
        }

        // Under & Over Population 
        if(grid[r][c] && (liveCount < 2 || liveCount > 3)) gridCopy[r][c] = false; 

        // Reproduction 
        if(!grid[r][c] && liveCount === 3) gridCopy[r][c] = true; 
      }
    }

    this.setState({
      grid: gridCopy,
      generations: this.state.generations + 1
    })
  }

  initRandomGrid = () => { 
    let copyGrid = this.deepCopy(this.state.grid); 
    copyGrid = copyGrid.map((row,i) => row.map((val, j)=> {
      return Math.floor(Math.random() * 5) === 1 ? true : false
    })); 

    this.setState({
      ...this.state, 
      grid: copyGrid
    }) 
  }

  deepCopy = (arr) => {
    return JSON.parse(JSON.stringify(arr))
  }

  reset = () => {
    clearInterval(this.intervalId); 
    this.setState({grid: this.clearGrid, generations: 0})

  }

  componentDidMount() { 
    this.initRandomGrid();
    this.handlePlay();  
  }

  

  
  render() { 
    return (
      <div>
        <h1>Conway's Game of Life - React</h1>
        <div className="control-btns center">
          <FaPlay onClick={() => this.handlePlay()}/>
          <FaPause onClick={() => clearInterval(this.intervalId)}/>
          <FaRandom onClick={() => this.initRandomGrid()} />
          <FaRedo onClick={() => this.reset()} />
        </div>
        <Grid
          grid={this.state.grid}
          cols={this.cols}
          rows={this.rows}
          selectBox={this.selectBox}
        /> 
        <h2>Generations: {this.state.generations}</h2>
      </div>
    )
  }
}

export default Main;
