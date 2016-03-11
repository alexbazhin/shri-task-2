(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Функция в интервале запускает renderWave, а после renderPath
     *
     * @param { [number,number][][] } waves массив волн
     * @param {[number, number][]} [path] путь в лабиринте, представленный парами координат
     * @param {number[][]} maze карта лабиринта
     */
    function render(waves, path, maze) {
            var i = 0,
                wait = true,
                waveInterval,
                pathInterval;

        waveInterval = setInterval(function () {
            if (i >= waves.length - 1) {
                wait = false;
                    clearInterval(waveInterval);
                }
            root.maze.renderWave(waves[i], maze);
                i++;
            },50);

        pathInterval = setInterval(function () {
            if (!wait) {
                root.maze.renderPath(maze, path);
                clearInterval(pathInterval);
            }
        }, 300);
    }

    root.maze.render = render;
})(this);
