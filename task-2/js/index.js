(function (root) {
    var map = root.maze.MAZE_Y;

    document.querySelector('.outer').appendChild( root.maze.createMap(map) );

    var arrPathAndWave = root.maze.solution(map, 1, 0);

    root.maze.render(arrPathAndWave[0], arrPathAndWave[1], map);

})(this);
