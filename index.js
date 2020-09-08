let roads1={
  "graph": {
    "directed": false,
    "nodes": [
      { "id": 0 },
      { "id": 1 },
      { "id": 2 },
      { "id": 3 },
      { "id": 4 }
    ],
    "edges": [
      {
        "source": 0,
        "target": 1,
        "metadata": {
          "distance": 5
        }
      },
      {
        "source": 1,
        "target": 3,
        "metadata": {
          "distance": 9
        }
      },
      {
        "source": 3,
        "target": 2,
        "metadata": {
          "distance": 6
        }
      },
      {
        "source": 2,
        "target": 4,
        "metadata": {
          "distance": 3
        }
      },
      {
        "source": 4,
        "target": 3,
        "metadata": {
          "distance": 8
        }
      },
      {
       "source": 4,
       "target": 0,
       "metadata": {
         "distance": 2
       }
     }
    ]
  }
}
let roads2={
  "graph": {
    "directed": false,
    "nodes": [
      { "id": 0 },
      { "id": 1 },
      { "id": 2 },
     
    ],
    "edges": [
      {
        "source": 0,
        "target": 1,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 1,
        "target": 2,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 0,
        "target": 2,
        "metadata": {
          "distance": 3
        }
      },
      
    ]
  }
}
let roads3={
  "graph": {
    "directed": false,
    "nodes": [
      { "id": 0 },
      { "id": 1 },
      { "id": 2 },
     
    ],
    "edges": [
      {
        "source": 0,
        "target": 1,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 1,
        "target": 2,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 0,
        "target": 2,
        "metadata": {
          "distance": 1
        }
      },
      
    ]
  }
}
let roads4={
  "graph": {
    "directed": false,
    "nodes": [
      { "id": 0 },
      { "id": 1 },
      { "id": 2 },
     
    ],
    "edges": [
      {
        "source": 0,
        "target": 1,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 1,
        "target": 2,
        "metadata": {
          "distance": 1
        }
      },
      {
        "source": 0,
        "target": 2,
        "metadata": {
          "distance": 2
        }
      },
      
    ]
  }
}
function navigate(roads, start, end) {
  let path = roads.graph.edges.map((e) => [e.source, e.target]);
  let result = iteratePath(start, end, path);
  result.forEach((path) => path.unshift(start));
  let distanceArray = [];
  result.forEach((e) => distanceArray.push(calculateDistance(e, roads)));
  return {
    distance: Math.min(...distanceArray),
    path: result[lowestDistanceIndex(distanceArray)],
  };
}

// Feedback 4:
// Good work.
// - distanceBetweenNodes can be improved by passing `roads.graph.edges` when it is called and using destructuring in for loop.
function distanceBetweenNodes(node1, node2,edges) {
  for (let i = 0; i < edges.length; i++) {
    if (
      (edges[i].source === node1 &&
        edges[i].target === node2) ||
      (edges[i].source === node2 &&
        edges[i].target === node1)
    ) {
      return edges[i].metadata.distance;
    }
  }
}
function lowestDistanceIndex(a) {
  var lowest = 0;
  for (var i = 1; i < a.length; i++) {
    if (a[i] < a[lowest]) lowest = i;
  }
  return lowest;
}
function calculateDistance(path, roads) {
  let distance = 0;
  for (let i = 0; i < path.length - 1; i++) {
    distance =
      distance + parseInt(distanceBetweenNodes(path[i], path[i + 1], roads.graph.edges));
  }
  return distance;
}
function getNodesContainingStart(start, path) {
  return (temp = path.filter((e) => e[0] === start || e[1] === start));
}
function updateStart(node, start) {
  return node[0] === start ? node[1] : node[0];
}
function iteratePath(start, end, path) {
  let result = [];
  let candidateNodes = [];
  if (startAndEndPresentInPath(start, end, path)) {
    result.push([end]);
    return result;
  }
  let nodesContainingStart = getNodesContainingStart(start, path);
  if (nodesContainingStart.length === 0) {
    return result;
  }
  for (let i = 0; i < nodesContainingStart.length; i++) {
    candidateNodes = getCandidateNodes(nodesContainingStart[i], path);
    let newStart = updateStart(nodesContainingStart[i], start);
    let output = iteratePath(newStart, end, candidateNodes);
    if (output.length !== 0) {
      output.forEach((e)=>e.unshift(newStart));
      result = result.concat(output);
    }
  }
  return result;
}
function startAndEndPresentInPath(start, end, path) {
  return path.some(
    ([point1,point2]) => (point1 === start && point2 === end) || (point2 === start && point1 === end)
  );
}
function getCandidateNodes(node, path) {
  return path.filter((e) => e !== node);
}
console.log(navigate(roads1, 2, 0));
console.log(navigate(roads1, 0, 2));
console.log(navigate(roads2, 0, 2));
console.log(navigate(roads2, 2, 0));
console.log(navigate(roads2, 2, 1));
console.log(navigate(roads3, 0, 2));
console.log(navigate(roads4, 0, 2));


// # Road Navigation
// Road systems can be imagined as a graph of intersections connected by lines. The advantage of this is it makes it easier to find the shortest path between any two intersections.

// ## Task
// Write a function that takes as arguments:

// - A graph of the road system
// - The starting intersection (node)
// - The ending intersection (node)

// And returns an object containing information about the shortest path.

// ## Format of the road graph

// As an example, this is what one road graph could look like (in JSON):
// ```json
// {
//   "graph": {
//     "directed": false,
//     "nodes": [
//       { "id": 0 },
//       { "id": 1 },
//       { "id": 2 },
//        { "id": 3 }
//     ],
//     "edges": [
//       {
//         "source": 0,
//         "target": 1,
//         "metadata": {
//           "distance": 5
//         }
//       },
//       {
//         "source": 1,
//         "target": 3,
//         "metadata": {
//           "distance": 9
//         }
//       },
//       {
//         "source": 3,
//         "target": 2,
//         "metadata": {
//           "distance": 6
//         }
//       },
//       {
//         "source": 2,
//         "target": 4,
//         "metadata": {
//           "distance": 3
//         }
//       },
//       {
//         "source": 4,
//         "target": 3,
//         "metadata": {
//           "distance": 8
//         }
//       },
//       {
//        "source": 4,
//        "target": 0,
//        "metadata": {
//          "distance": 2
//        }
//      }
//     ]
//   }
// }
// ```

// Additionally, all edges are *two way roads* (undirected), so you don't need to worry about that. Which node is in `source` 
// and which is in `target` does not matter. Edges may contain the property `label`, which is just a street name and not necessary 
// for you to use.

// And remember, the goal is to *minimize* the sum of all the `metadata.distance` properties of edges used.

// ## Format of return value
// The return value should be an *object* with properties `distance` and `path`.

// `distance` should be the number that is the total sum of the distance metadata on each edge used.

// `path` should be an *array of numbers*, where each number is the id of a node used along the path from the start to the end.

// For example, if the shortest path from node 1 to node id 2 was going from node 1 to node 3 to node 2, then the result should be [1, 3, 2]. You must include the starting and ending nodes in the path.

// If two paths have the same distance, it does not matter which one you return (which won't happen in the tests).

// ## Example
// In the example road graph, if it is asked to find the path from node id 2 to node id 0, the function call would be

// ```js
//     navigate(roads, 2, 0) // Where roads is the example graph structure
// ```
// And you should return
// ```
//     {
//       "distance": 5,
//       "path": [ 2, 4, 0 ]
//     }
// ```

// ## Notes
// - If two paths have the same distance, it doesn't matter which one you return (which won't happen in the tests).
// - Make sure to include the starting and ending nodes in the path.
// - The order of the path array *does* matter.
// - Distance between 2 nodes is located in the `metadata.distance` property of the edge connecting them.





// Feedback 3:
// - use map to create the path list
// - In indexOfSmallest change variable name a to something more meaningful.
// - getNodesContainingStart should be using .filter
// - startAndEndPresentInPath should be using .some and destructuring
// - getCandidateNodes should be just filtering the path