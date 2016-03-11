(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Функция прорисовывает путь
     *
     * @param {number[][]} maze схема лабиринта
     * @param {[number, number][]} [path] маршрут
     */
    function renderPath(maze, path) {
        if (!path || !path.length) return;
            var point,
                i;

            for (i = 0; i < path.length; i++) {
                point = path[i];
                maze[point[1]][point[0]] = PATH;
            }
            point = path[path.length - 1];
            maze[point[1]][point[0]] = CURRENT;


        var arrCells = document.querySelectorAll('.maze__cell'),
            mazeWidth = maze[0].length,
            cellX,
            cellY,
            curCell;

        for (curCell = 0; curCell < arrCells.length; curCell++) {
            cellX = (curCell<mazeWidth) ? curCell : curCell % mazeWidth;
            cellY = curCell / mazeWidth ^ 0;

            switch (maze[cellY][cellX]) {

                case PATH:
                    arrCells[mazeWidth*cellY + cellX].classList.remove('maze_cell_wave');
                    arrCells[mazeWidth*cellY + cellX].classList.add('maze__cell_path');
                    break;

                case CURRENT:
                    arrCells[mazeWidth*cellY + cellX].classList.remove('maze_cell_wave');
                    arrCells[mazeWidth*cellY + cellX].classList.add('maze__cell_current');
                    break;
            }
        }
    }

    root.maze.renderPath = renderPath;
})(this);
