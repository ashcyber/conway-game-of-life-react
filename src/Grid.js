import React from 'react';


const Box = (props) => {

    const selectBox = () => {
        props.selectBox(props.row, props.col)
    }

    return (
        <div
            className={props.boxClass}
            onClick={() => selectBox()}
        />
    )
}


class Grid extends React.Component {

    constructor(props) {
        super();
        this.width = props.cols * 16;
    }

    render() {
        let rowsArr = []; 

        for(let r = 0; r < this.props.rows; r++) { 
            for(let c = 0; c < this.props.cols; c++) { 
                let boxClass = this.props.grid[r][c] ? "box on" : "box off"; 
                let boxId = `${r}_${c}_box`

                rowsArr.push(
                    <Box 
                        boxClass={boxClass}
                        boxId={boxId}
                        key={boxId}
                        row={r}
                        col={c}
                        selectBox={this.props.selectBox}
                    />
                )
            }
        }

        
        return (
            <div className="grid" style={{ width: this.width}}>
                {rowsArr}
            </div>
        )
    }
}

export default Grid; 