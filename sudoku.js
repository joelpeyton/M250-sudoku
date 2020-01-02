class Sudoku {
    constructor() {
        //instance variables
        this.boardOutline = document.querySelector(".board");
        this.board;
        this.generate = document.querySelector(".new");
        this.generate.addEventListener("click", ()=> this.refresh());
    }
    
    // creates div tags and append to main page
    build() {
        for (var i = 0; i < 9; i++){
            for (var j = 0; j < 9; j++){
                var innerBlock = document.createElement("div");
                innerBlock.className = "innerBlock";
                this.boardOutline.appendChild(innerBlock);
                if (i == 2 || i == 5){
                    innerBlock.style.borderBottomWidth = "3px";
                }
                if (j == 2 || j == 5){
                    innerBlock.style.borderRightWidth = "3px";
                }
                
            }
        }
    } 
    
    // generates a new set of numbers and changes board
    refresh() { 
        this.board = this.getBoard([]);
        var allNumbers = [];
        for (var i = 0; i < this.board.length; i++){
            allNumbers = allNumbers.concat(this.board[i]);
        }    
        var blocks = document.querySelectorAll(".innerBlock");
        var count = 0;
        blocks.forEach(function(block){
            block.textContent = allNumbers[count];
            count++;
        });
    }                
    
    // returns the numbers in the column in relation to current position in row 
    getColumn(board, rowPos){  
        var column = [];
        for (var i = 0; i < board.length; i++){
            column.push(board[i][rowPos]);
        }
        return column;
    }
    
    // returns the numbers in the block in relation to current position in row and current row in board
    getBlock(board, rowPos){
        var block = [];
        var vertBlock = Math.floor(rowPos / 3) * 3; // # determines which block column in  
        var finish = vertBlock + 3; // # block column end point
        var horzBlock = Math.floor(board.length / 3) * 3; // # determines which block row in 
        for (var j = horzBlock; j < board.length; j++){
            for (var k = vertBlock; k < finish; k++){
                block.push(board[j][k]);
            }
        }
        return block;
    }
    
    // returns a number from available choices
    getNumber(block, column, numbers){
        // populate 'used' with those numbers in the current block
        var used = block;
        // push the numbers in the current column into 'used'
        for (var i = 0; i < column.length; i++){
            if (!(block.includes(column[i]))){
                used.push(column[i]);
            }
        }
        // popoulate 'choices' with the difference of 'numbers' and 'used' 
        var choices = [];
        for (var j = 0; j < numbers.length; j++){
            if (!(used.includes(numbers[j]))){
                choices.push(numbers[j]);
            }
        }
        // pick a random number if available
        if (choices.length == 0) { 
            return null;
        } else {
            return choices[Math.floor(Math.random() * choices.length)];
        }
    }

    // return a populated row with the latest random number
    getRow(block, column, number, numbers, row){
        if (!(column.includes(number)) && !(block.includes(number))){
            row.push(number);
            var index = numbers.indexOf(number);
            if (index > -1) {
                numbers.splice(index, 1); 
            }
        }
        return row;
    }
    
    // return a completed sudoku board
    getBoard(board){
        while (board.length < 9) {
            var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            var row = [];
            var unlucky = false;
            while (row.length < 9){		
                var column = this.getColumn(board, row.length);
                var block = this.getBlock(board, row.length);
                var number = this.getNumber(block, column, numbers);
                if (!number){
                    unlucky = true;
                    break;
                }
                row = this.getRow(block, column, number, numbers, row);
            }
            if (!unlucky){ 
                board.push(row);
            }
        }
        return board;
    }

}

s = new Sudoku();
s.build();




