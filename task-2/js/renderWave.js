(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Функция прорисовывает волну
     *
     * @param {[number, number][]} wave волна, представленная парами координат клеток
     * @param {number[][]} maze карта лабиринта
     */
    function renderWave(wave, maze) {
        var arrCells = document.querySelectorAll('.maze__cell'),
            mazeWidth = maze[0].length,
            curX,
            curY;

        for (var j = 0; j < wave.length; j++) {
            curX = wave[j][0];
            curY = wave[j][1];

            arrCells[curY * mazeWidth + curX].classList.add("maze_cell_wave");
        }
    }

    root.maze.renderWave = renderWave;
})(this);
