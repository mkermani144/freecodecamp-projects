import _ from 'lodash';
import graphlib, { Graph } from 'graphlib';

function initMap() {
  let map = _.chunk(_.fill(Array(20604), 0), 102);
  _.fill(map[0], -1);
  _.fill(map[201], -1);
  map = _.unzip(map);
  _.fill(map[0], -1);
  _.fill(map[101], -1);
  map = _.unzip(map);
  return map;
}

function initRooms(map, roomNum) {
  const rooms = [];
  let i = roomNum;
  while (i) {
    const x = _.random(70, 130);
    const y = _.random(30, 70);
    const goodPosition = _.every([map[x - 1][y - 1], map[x - 1][y], map[x - 1][y + 1],
                                  map[x][y - 1], map[x][y], map[x][y + 1],
                                  map[x + 1][y - 1], map[x + 1][y], map[x + 1][y + 1]],
                                  arg => arg === 0);
    if (goodPosition) {
      _.fill(map[x - 1], 1, y - 1, y + 2);
      _.fill(map[x], 1, y - 1, y + 2);
      _.fill(map[x + 1], 1, y - 1, y + 2);
      map[x - 1][0] = map[x - 1][101] = -1;
      map[x][0] = map[x][101] = -1;
      map[x + 1][0] = map[x + 1][101] = -1;

      i -= 1;

      rooms.push({
        start: {
          x: x - 1,
          y: y - 1,
        },
        end: {
          x: x + 1,
          y: y + 1,
        }
      });
    }
  }
  return rooms;
}

function findCellRoom(rooms, x, y) {
  let room = null;
  rooms.forEach((el, index) => {
    if (x >= el.start.x && x <= el.end.x && y >= el.start.y && y <= el.end.y) {
      room = index;
    }
  });
  return room;
}

function findNeighbours(map, rooms, id) {
  const startX = rooms[id].start.x;
  const endX = rooms[id].end.x;
  const startY = rooms[id].start.y;
  const endY = rooms[id].end.y;
  const neighbours = [];
  for (let i = startX; i <= endX; i += 1) {
    if (map[i][startY - 2]) {
      neighbours.push(findCellRoom(rooms, i, startY - 2));
    }
    if (map[i][endY + 2]) {
      neighbours.push(findCellRoom(rooms, i, endY + 2));
    }
  }
  for (let i = startY; i <= endY; i += 1) {
    if (map[startX - 2][i]) {
      neighbours.push(findCellRoom(rooms, startX - 2, i));
    }
    if (map[endX + 2][i]) {
      neighbours.push(findCellRoom(rooms, endX + 2, i));
    }
  }
  return _.uniq(neighbours);
}

function thereIsAPath(map, rooms) {
  const graph = new Graph({ directed: false });
  rooms.forEach((el, index) => {
    graph.setNode(index);
  });
  rooms.forEach((el, index) => {
    findNeighbours(map, rooms, index).forEach((el2) => {
      graph.setEdge(index, el2);
    });
  });
  return graphlib.alg.components(graph).length === 1;
}

function getBorder(map, rooms, id) {
  const startX = rooms[id].start.x;
  const endX = rooms[id].end.x;
  const startY = rooms[id].start.y;
  const endY = rooms[id].end.y;
  const border = [];
  const sub = [];
  let hasDoors = false;
  _.range(startX, endX + 1).forEach((el, index) => {
    if(map[startX + index][startY - 2] === 1) {
      if (map[startX + index][startY - 1]) {
        hasDoors = true;
      }
      sub.push({x: startX + index, y: startY - 1});
    } else {
      if (sub.length) {
        if (!hasDoors) {
          border.push(_.clone(sub));
        }
        hasDoors = false;
        sub.length = 0;
      }
    }
  });
  if (sub.length) {
    if (!hasDoors) {
      border.push(_.clone(sub));
    }
    hasDoors = false;
    sub.length = 0;
  }
  _.range(startX, endX + 1).forEach((el, index) => {
    if(map[startX + index][endY + 2] === 1) {
      if (map[startX + index][endY + 1]) {
        hasDoors = true;
      }
      sub.push({x: startX + index, y: endY + 1});
    } else {
      if (sub.length) {
        if (!hasDoors) {
          border.push(_.clone(sub));
        }
        hasDoors = false;
        sub.length = 0;
      }
    }
  });
  if (sub.length) {
    if (!hasDoors) {
      border.push(_.clone(sub));
    }
    hasDoors = false;
    sub.length = 0;
  }
  _.range(startY, endY + 1).forEach((el, index) => {
    if(map[startX - 2][startY + index] === 1) {
      if (map[startX - 1][startY + index]) {
        hasDoors = true;
      }
      sub.push({x: startX - 1, y: startY + index});
    } else {
      if (sub.length) {
        if (!hasDoors) {
          border.push(_.clone(sub));
        }
        hasDoors = false;
        sub.length = 0;
      }
    }
  });
  if (sub.length) {
    if (!hasDoors) {
      border.push(_.clone(sub));
    }
    hasDoors = false;
    sub.length = 0;
  }
  _.range(startY, endY + 1).forEach((el, index) => {
    if(map[endX + 2][startY + index] === 1) {
      if (map[endX + 1][startY + index]) {
        hasDoors = true;
      }
      sub.push({x: endX + 1, y: startY + index});
    } else {
      if (sub.length) {
        if (!hasDoors) {
          border.push(_.clone(sub));
        }
        hasDoors = false;
        sub.length = 0;
      }
    }
  });
  if (sub.length) {
    if (!hasDoors) {
      border.push(_.clone(sub));
    }
  }
  return border;
}

export default function createMap() {
  let map = initMap();
  const rooms = initRooms(map, 15);
  const cheatEslint = true;
  while (cheatEslint) {
    const randomRoomNum = _.random(14);
    const randomRoomStart = rooms[randomRoomNum].start;
    const randomRoomEnd = rooms[randomRoomNum].end;
    if (randomRoomEnd.x - randomRoomStart.x > 25 || randomRoomEnd.y - randomRoomStart.y > 25) {
      continue;
    }
    const growthMode = _.sample(['right', 'left', 'top', 'down']);
    switch (growthMode) {
    case 'right': {
      const neighbourColN = [];
      const pushNeighbours = (el) => {
        neighbourColN.push(map[randomRoomEnd.x + 2][randomRoomStart.y + el]);
      };
      _.range((randomRoomEnd.y - randomRoomStart.y) + 1).forEach(pushNeighbours);
      if (_.every(neighbourColN, el => el === 0)) {
        _.fill(map[randomRoomEnd.x + 1], 1, randomRoomStart.y, randomRoomEnd.y + 1);
        rooms[randomRoomNum].end.x += 1;
      }
      break;
    }
    case 'left': {
      const neighbourColP = [];
      const pushNeighbours = (el) => {
        neighbourColP.push(map[randomRoomStart.x - 2][randomRoomStart.y + el]);
      };
      _.range((randomRoomEnd.y - randomRoomStart.y) + 1).forEach(pushNeighbours);
      if (_.every(neighbourColP, el => el === 0)) {
        _.fill(map[randomRoomStart.x - 1], 1, randomRoomStart.y, randomRoomEnd.y + 1);
        rooms[randomRoomNum].start.x -= 1;
      }
      break;
    }
    case 'down': {
      const neighbourColU = [];
      const pushNeighbours = (el) => {
        neighbourColU.push(map[randomRoomStart.x + el][randomRoomEnd.y + 2]);
      };
      _.range((randomRoomEnd.x - randomRoomStart.x) + 1).forEach(pushNeighbours);
      if (_.every(neighbourColU, el => el === 0)) {
        map = _.unzip(map);
        _.fill(map[randomRoomEnd.y + 1], 1, randomRoomStart.x, randomRoomEnd.x + 1);
        map = _.unzip(map);
        rooms[randomRoomNum].end.y += 1;
      }
      break;
    }
    case 'top': {
      const neighbourColO = [];
      const pushNeighbours = (el) => {
        neighbourColO.push(map[randomRoomStart.x + el][randomRoomStart.y - 2]);
      };
      _.range((randomRoomEnd.x - randomRoomStart.x) + 1).forEach(pushNeighbours);
      if (_.every(neighbourColO, el => el === 0)) {
        map = _.unzip(map);
        _.fill(map[randomRoomStart.y - 1], 1, randomRoomStart.x, randomRoomEnd.x + 1);
        map = _.unzip(map);
        rooms[randomRoomNum].start.y -= 1;
      }
      break;
    }
    default:
      break;
    }
    if (thereIsAPath(map, rooms)) {
      break;
    }
  }
  rooms.forEach((el, index) => {
    const border = getBorder(map, rooms, index);
    if (border.length) {
      border.forEach((el) => {
        const choice = _.sample(el);
        map[choice.x][choice.y] = 1;
      })
    }
  });
  return map;
}
