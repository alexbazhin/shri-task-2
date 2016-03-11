(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Функция создает волну, добавляет её в arrWaves, помечает клетки как проверенные.
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {[number, number][]} wave предыдущая волна, представленная списком пар координат клеток
     * @param {boolean[][]} checkedCells карта состояний клеток, представленная двумерной
     * матрицей булевских переменных
     * @returns {[number, number][]} сформированная волна
     */
    function createWave(maze, wave, checkedCells) {
        var newWave = [],
            curX,
            curY;

        for (var i = 0; i < wave.length; i++) {
            curX = wave[i][0];
            curY = wave[i][1];

            if ((maze[curY][curX + 1] == EMPTY) && (!checkedCells[curY][curX + 1])) {
                newWave.push([curX + 1, curY]);
                checkedCells[curY][curX + 1] = true;
            }
            if ((maze[curY][curX - 1] == EMPTY) && (!checkedCells[curY][curX - 1])) {
                newWave.push([curX - 1, curY]);
                checkedCells[curY][curX - 1] = true;
            }
            if ((curY < maze.length) && (maze[curY + 1][curX] == EMPTY) && (!checkedCells[curY + 1][curX])) {
                newWave.push([curX, curY + 1]);
                checkedCells[curY + 1][curX] = true;
            }
            if ((curY > 0) && (maze[curY - 1][curX] == EMPTY) && (!checkedCells[curY - 1][curX])) {
                newWave.push([curX, curY - 1]);
                checkedCells[curY - 1][curX] = true;
            }
        }
        return newWave;
    }

    /**
     * Функция возвращает координаты клетки из последней wave.
     *
     * @param {[number,number][]} wave последняя волна
     * @param {number[][]} maze карта лабиринта
     * @returns {[number,number]} клетка из последней волны
     */
    function findLostCell(wave, maze) {
        for (var i = 0; i < wave.length; i++) {
            if (wave[i][1] == maze.length - 1) {
                return [wave[i][0], maze.length - 1];
            }
        }
    }

    /**
     * Функция возвращает координаты клетки из предыдущей wave, стоящую рядом с cell
     *
     * @param {[number,number]} cell текущая клетка, представленная парой координат
     * @param {[number,number][]} wave предыдущая волна
     * @returns {[number,number]} клетка из предыдущей волны
     */
    function findPrevCell(cell, wave) {
        var cellX = cell[0],
            cellY = cell[1],
            waveCellX,
            waveCellY;
        
        for (var i = 0; i < wave.length; i++) {
             waveCellX = wave[i][0];
             waveCellY = wave[i][1];

            if (((waveCellX == cellX - 1) && (waveCellY == cellY)) ||
                ((waveCellX == cellX + 1) && (waveCellY == cellY)) ||
                ((waveCellX == cellX) && (waveCellY == cellY - 1)) ||
                ((waveCellX == cellX) && (waveCellY == cellY + 1))) {
                return [waveCellX, waveCellY];
            }
        }
    }

    /**
     * Функция проверяет, есть ли в волне конечная вершина.
     *
     * @param {[number,number][]} wave волна
     * @param {number[][]} maze карта лабиринта
     * @returns {boolean} результат
     */
    function isInWave(wave, maze) {
        for (var i = 0; i < wave.length; i++) {
            if (wave[i][1] == maze.length - 1) return true;
        }
        return false;
    }

    /**
     * Функция находит путь к выходу, возвращает массив, состоящий из пути и массива волн
     *
     * @param {number[][]} maze карта лабиринта
     * @param {number} startX координата точки старта по оси X
     * @param {number} startY координата точки старта по оси Y
     * @returns {[ [number,number][][], [number,number][] ]} массив, состоящий из пути и массива волн
     */
    function solution(maze, startX, startY) {

        var checkedCells = [];
        //noinspection JSDuplicatedDeclaration
        for (var i = 0; i < maze.length; i++) {
            checkedCells[i] = [];
            for (var j = 0; j < maze[0].length; j++) {
                checkedCells[i][j] = false;
            }
        }
        checkedCells[startY][startX] = true;

        var wavesArr = [];
        var newWave = [];
        newWave.push([startX, startY]);
        wavesArr.push(newWave);

        while (!isInWave(newWave, maze)) {
            newWave = createWave(maze, newWave, checkedCells);

            wavesArr.push(newWave);

            if (newWave.length == 0) return [wavesArr, []];
        }

        var path = [];
        var curCell = findLostCell(wavesArr[wavesArr.length - 1], maze);
        path.push(curCell);

        //noinspection JSDuplicatedDeclaration
        for (var i = wavesArr.length - 2; i >= 0; i--) {
            curCell = findPrevCell(curCell, wavesArr[i]);
            path.push(curCell);
        }
        path.reverse();

        return [wavesArr, path];
    }

    root.maze.solution = solution;
})(this);
