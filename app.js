// declaring varibales
var my_grid;
var rows,cols;
var resolution = 10;
var next;

const make_array = (rows,cols) => {

    // declare array;
    var arr = new Array();

    // creating 2-d array
    for(var i=0;i<cols;i++) {
        arr[i] = new Array(rows);
    }

    return arr;

}

function setup() {

    // declaring canvas
    createCanvas(1500,1500);  // height = 400 and width = 400
    rows = height / resolution;
    cols = width / resolution;

    // filling up grid with random values
    my_grid = make_array(rows,cols);
    next = make_array(rows,cols);
    for(var i=0;i<rows;i++) {
        for(var j=0;j<cols;j++) {
            my_grid[i][j] = floor(random(2));
        }
    }
}

function draw() {

    background(0);
    
    for(var i=0;i<rows;i++) {
        for(var j=0;j<cols;j++) {
            var x = i * resolution;
            var y = j * resolution;
            if(my_grid[i][j] == 1 ) {
                // fill this cell
                fill(255);
                stroke(0);
                rect(x,y,resolution-1,resolution-1);
            }
        }
    }

    for(var i=0;i<rows;i++) {
        for(var j=0;j<cols;j++) {

            var my_state = my_grid[i][j];

            // count live neighbours
            var neighbours = count_neighbours(my_grid,i,j);
            
            // based on count put values in next array
            if(my_state==0 && neighbours==3) {
                next[i][j] = 1;
            }
            else if(my_state==1 && (neighbours<2 || neighbours>3)) {
                next[i][j] = 0;
            }
            else  {
                next[i][j] = my_state;
            }
        }  
    }
    
    for(var i=0;i<rows;i++) {
        for(var j=0;j<cols;j++) {
            my_grid[i][j] = next[i][j];
        }
    } // swap value of next into my_grid array
}


const count_neighbours = (grid,x,y) => {
    var sum = 0;
    for(var i=-1;i<2;i++) {
        for(var j=-1;j<2;j++) {

            var row = (x+i+rows)%rows;
            var col = (y+j+cols)%cols;

            sum += my_grid[row][col];
        }
    }

    sum -=grid[x][y];
    return sum;
}
