import React from "react";
import "./SortingVisualizer.css";

class Tuple {
  constructor(first, second, operation) {
    this.first = first;
    this.second = second;
    this.operation = operation;
  }
}

class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      sortingAlgorithm: "",
      size: "",
      speed: "",
      barColor: "",
      pointerColor: "",
      sort: false,
      randomize: false,
    };
    this.sorted = false;
    this.width = 0;
    this.height = 0;
  }

  componentDidMount() {
    this.width = window.screen.width;
    this.height = window.screen.height;
    let controllerData = this.props.controllerData;
    let temp = new Set();
    while (temp.size !== parseInt(controllerData["size"])) {
      temp.add(this.getRandomElement());
    }
    temp = Array.from(temp);
    this.setState({
      arr: temp,
      sortingAlgorithm: controllerData["sortingAlgorithm"],
      size: controllerData["size"],
      speed: controllerData["speed"],
      barColor: this.getColor(controllerData["barColor"]),
      pointerColor: this.getColor(controllerData["pointerColor"]),
      sortedColor: this.getColor(controllerData["sortedColor"]),
      sort: controllerData["sort"],
      randomize: controllerData["randomize"],
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.controllerData !== this.props.controllerData) {
      let controllerData = this.props.controllerData;
      let cd = {};
      if (controllerData["sort"] === true) {
        cd = {
          sortingAlgorithm: controllerData["sortingAlgorithm"],
          size: controllerData["size"],
          speed: controllerData["speed"],
          barColor: this.getColor(controllerData["barColor"]),
          pointerColor: this.getColor(controllerData["pointerColor"]),
          sortedColor: this.getColor(controllerData["sortedColor"]),
          sort: controllerData["sort"],
          randomize: controllerData["randomize"],
        };
        switch (controllerData.sortingAlgorithm) {
          case "Heap Sort":
            this.setState(cd, function () {
              this.heapSort();
            });
            break;

          case "Insertion Sort":
            this.setState(cd, function () {
              this.insertionSort();
            });
            break;

          case "Merge Sort":
            this.setState(cd, function () {
              this.mergeSortUtil();
            });
            break;

          case "Quick Sort":
            this.setState(cd, function () {
              this.quickSortUtil();
            });
            break;

          case "Selection Sort":
            this.setState(cd, function () {
              this.selectionSort();
            });
            break;

          default:
            this.setState(cd, function () {
              this.bubbleSort();
            });
            break;
        }
      } else {
        let newState = {};
        let temp = new Set();
        if (parseInt(this.state["size"]) !== parseInt(controllerData["size"])) {
          newState["sortingAlgorithm"] = controllerData["sortingAlgorithm"];
          newState["size"] = parseInt(controllerData["size"]);
          newState["speed"] = controllerData["speed"];
          newState["barColor"] = this.getColor(controllerData["barColor"]);
          newState["pointerColor"] = this.getColor(
            controllerData["pointerColor"]
          );
          newState["sortedColor"] = this.getColor(
            controllerData["sortedColor"]
          );
          newState["randomize"] = controllerData["randomize"];
          newState["sort"] = controllerData["sort"];
          while (temp.size !== newState["size"]) {
            temp.add(this.getRandomElement());
          }
          temp = Array.from(temp);
          newState["arr"] = temp;
        } else {
          if (controllerData["randomize"] === true) {
            newState["sortingAlgorithm"] = controllerData["sortingAlgorithm"];
            newState["size"] = parseInt(controllerData["size"]);
            newState["speed"] = controllerData["speed"];
            newState["barColor"] = this.getColor(controllerData["barColor"]);
            newState["pointerColor"] = this.getColor(
              controllerData["pointerColor"]
            );
            newState["sortedColor"] = this.getColor(
              controllerData["sortedColor"]
            );
            newState["randomize"] = controllerData["randomize"];
            newState["sort"] = controllerData["sort"];
            while (temp.size !== newState["size"]) {
              temp.add(this.getRandomElement());
            }
            temp = Array.from(temp);
            newState["arr"] = temp;
            let array = document.getElementsByClassName("arr");
            for (let e = 0; e < array.length; e++)
              array[e].style.backgroundColor = newState["barColor"];
          } else {
            newState["sortingAlgorithm"] = controllerData["sortingAlgorithm"];
            newState["size"] = parseInt(controllerData["size"]);
            newState["barColor"] = this.getColor(controllerData["barColor"]);
            newState["pointerColor"] = this.getColor(
              controllerData["pointerColor"]
            );
            newState["sortedColor"] = this.getColor(
              controllerData["sortedColor"]
            );
            newState["speed"] = controllerData["speed"];
            newState["arr"] = this.state.arr;
          }
        }
        this.setState(newState);
      }
    }
  } //component did update ends

  async bubbleSort() {
    //Setting Time complexities
    document.getElementById("Time_Worst").innerText="O(N^2)";
    document.getElementById("Time_Average").innerText="Θ(N^2)";
    document.getElementById("Time_Best").innerText="Ω(N)";
    //Setting Space complexity
    document.getElementById("Space_Worst").innerText="O(1)";
    this.sorted = false;
    this.props.visualizerDataHandler(this.sorted);
    let array = document.getElementsByClassName("arr");
    let n = array.length;
    let e, f, eIndex, fIndex;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        array[j].style.backgroundColor = this.state.pointerColor;
        array[j + 1].style.backgroundColor = this.state.pointerColor;
        e = parseInt(array[j].innerHTML);
        eIndex = j;
        f = parseInt(array[j + 1].innerHTML);
        fIndex = j + 1;
        if (e > f) {
          let i_val = array[eIndex].innerHTML;
          let wid = array[eIndex].style.width;
          array[eIndex].innerHTML = array[fIndex].innerHTML;
          array[eIndex].style.width = array[fIndex].style.width;
          array[fIndex].innerHTML = i_val;
          array[fIndex].style.width = wid;
          if (this.state.randomize === true) return;
          await this.sleep(this.getSpeed(this.state.speed));
          if (this.state.randomize === true) return;
        }
        array[j].style.backgroundColor = this.state.barColor;
        array[j + 1].style.backgroundColor = this.state.barColor;
      }
      array[n - i - 1].style.backgroundColor = this.state.sortedColor;
    }
    array[0].style.backgroundColor = this.state.sortedColor;
    this.sorted = true;
    this.props.visualizerDataHandler(this.sorted);
  }

  async heapSort() {
     //Setting Time complexities
     document.getElementById("Time_Worst").innerText="O(N log N)";
     document.getElementById("Time_Average").innerText="Θ(N log N)";
     document.getElementById("Time_Best").innerText="Ω(N log N)";
     //Setting Space complexity
     document.getElementById("Space_Worst").innerText="O(1)";
    this.sorted = false;
    this.props.visualizerDataHandler(this.sorted);
    let arr = document.getElementsByClassName("arr");
    let temp, tempWidth;
    let leftIndex, rightIndex, x, y;
    let end;
    //building heap
    for (let e = 1; e < arr.length; e++) {
      let i = e;
      while (i > 0) {
        if (
          parseInt(arr[i].innerHTML) >
          parseInt(arr[Math.floor((i - 1) / 2)].innerHTML)
        ) {
          x = i;
          y = Math.floor((i - 1) / 2);
          temp = arr[x].innerHTML;
          tempWidth = arr[x].style.width;
          arr[x].style.backgroundColor = this.state.pointerColor;
          arr[y].style.backgroundColor = this.state.pointerColor;
          arr[x].innerHTML = arr[y].innerHTML;
          arr[x].style.width = arr[y].style.width;
          arr[y].innerHTML = temp;
          arr[y].style.width = tempWidth;
          await this.sleep(this.getSpeed(this.state.speed));
          arr[x].style.backgroundColor = this.state.barColor;
          arr[y].style.backgroundColor = this.state.barColor;
          i = y;
        } else {
          break;
        }
      }
      if (this.state.randomize === true) return;
      await this.sleep(this.getSpeed(this.state.speed));
      if (this.state.randomize === true) return;
    }
    //heapify
    for (let e = arr.length - 1; e > 0; e--) {
      arr[0].style.backgroundColor = this.state.pointerColor;
      arr[e].style.backgroundColor = this.state.pointerColor;
      temp = arr[0].innerHTML;
      tempWidth = arr[0].style.width;
      arr[0].innerHTML = arr[e].innerHTML;
      arr[0].style.width = arr[e].style.width;
      arr[e].innerHTML = temp;
      arr[e].style.width = tempWidth;
      await this.sleep(this.getSpeed(this.state.speed));
      arr[0].style.backgroundColor = this.state.barColor;
      arr[e].style.backgroundColor = this.state.barColor;
      end = e - 1;
      let i = 0;
      while (i <= end) {
        leftIndex = 2 * i + 1;
        if (leftIndex > end) break;
        rightIndex = 2 * i + 2;
        if (rightIndex > end) rightIndex = leftIndex;
        if (
          parseInt(arr[i].innerHTML) >=
          Math.max(
            parseInt(arr[leftIndex].innerHTML),
            parseInt(arr[rightIndex].innerHTML)
          )
        )
          break;
        if (
          parseInt(arr[leftIndex].innerHTML) >=
          parseInt(arr[rightIndex].innerHTML)
        ) {
          x = i;
          y = leftIndex;
          arr[x].style.backgroundColor = this.state.pointerColor;
          arr[y].style.backgroundColor = this.state.pointerColor;
          temp = arr[x].innerHTML;
          tempWidth = arr[x].style.width;
          arr[x].innerHTML = arr[y].innerHTML;
          arr[x].style.width = arr[y].style.width;
          arr[y].innerHTML = temp;
          arr[y].style.width = tempWidth;
          await this.sleep(this.getSpeed(this.state.speed));
          arr[x].style.backgroundColor = this.state.barColor;
          arr[y].style.backgroundColor = this.state.barColor;
          i = leftIndex;
        } else {
          x = i;
          y = rightIndex;
          arr[x].style.backgroundColor = this.state.pointerColor;
          arr[y].style.backgroundColor = this.state.pointerColor;
          temp = arr[x].innerHTML;
          tempWidth = arr[x].style.width;
          arr[x].innerHTML = arr[y].innerHTML;
          arr[x].style.width = arr[y].style.width;
          arr[y].innerHTML = temp;
          arr[y].style.width = tempWidth;
          if (this.state.randomize === true) return;
          await this.sleep(this.getSpeed(this.state.speed));
          if (this.state.randomize === true) return;
          arr[x].style.backgroundColor = this.state.barColor;
          arr[y].style.backgroundColor = this.state.barColor;
          i = rightIndex;
        }
      }
      if (this.state.randomize === true) return;
      await this.sleep(this.getSpeed(this.state.speed));
      if (this.state.randomize === true) return;
      arr[e].style.backgroundColor = this.state.sortedColor;
    }
    arr[0].style.backgroundColor = this.state.sortedColor;
    this.sorted = true;
    this.props.visualizerDataHandler(this.sorted);
  }

  async insertionSort() {
      //Setting Time complexities
      document.getElementById("Time_Worst").innerText="O(N^2)";
      document.getElementById("Time_Average").innerText="Θ(N^2)";
      document.getElementById("Time_Best").innerText="Ω(N)";
      //Setting Space complexity
      document.getElementById("Space_Worst").innerText="O(1)";  
    this.sorted = false;
    this.props.visualizerDataHandler(this.sorted);
    let array = document.getElementsByClassName("arr");
    let n = array.length;
    let p, g, i_val, wid, j_val, j_wid;
    for (let i = 1; i <= n - 1; i++) {
      p = i;
      array[i].style.backgroundColor = this.state.pointerColor;
      i_val = parseInt(array[p].innerHTML);
      wid = array[p].style.width;
      for (let j = p - 1; j >= 0; j--, p--) {
        j_val = parseInt(array[j].innerHTML);
        j_wid = array[j].style.width;
        g = j;
        array[g].style.backgroundColor = this.state.pointerColor;
        if (i_val >= j_val) {
          if (this.state.randomize === true) return;
          await this.sleep(this.getSpeed(this.state.speed));
          if (this.state.randomize === true) return;
          array[g].style.backgroundColor = this.state.sortedColor;
          break;
        }
        array[j + 1].innerHTML = j_val;
        array[j + 1].style.width = j_wid;
        if (this.state.randomize === true) return;
        await this.sleep(this.getSpeed(this.state.speed));
        if (this.state.randomize === true) return;
        array[g].style.backgroundColor = this.state.sortedColor;
      }
      array[i].style.backgroundColor = this.state.sortedColor;
      array[p].innerHTML = i_val;
      array[p].style.width = wid;
    }
    this.sorted = true;
    this.props.visualizerDataHandler(this.sorted);
  }

  async mergeSortUtil() {
    //Setting Time complexities
    document.getElementById("Time_Worst").innerText="O(N log N)";
    document.getElementById("Time_Average").innerText="Θ(N log N)";
    document.getElementById("Time_Best").innerText="Ω(N log N)";
    //Setting Space complexity
    document.getElementById("Space_Worst").innerText="O(N)";
    this.sorted = false;
    this.props.visualizerDataHandler(this.sorted);
    let graphics = [];
    let arr = this.state.arr.slice();
    let low = 0;
    let high = arr.length - 1;
    this.mergeSort(arr, low, high, graphics);
    let array = document.getElementsByClassName("arr");
    for (let i = 0; i < graphics.length; i++) {
      if (graphics[i].operation === "add") {
        array[graphics[i].first].style.backgroundColor = this.state.pointerColor;
        array[graphics[i].second].style.backgroundColor =
          this.state.pointerColor;
      }
      if (graphics[i].operation === "remove") {
        array[graphics[i].first].style.backgroundColor = this.state.barColor;
        array[graphics[i].second].style.backgroundColor = this.state.barColor;
      }
      if (graphics[i].operation === "swap") {
        array[graphics[i].first].innerHTML = graphics[i].second;
        array[graphics[i].first].style.width = graphics[i].second + "px";
        array[graphics[i].first].style.backgroundColor = this.state.sortedColor;
      }
      if (this.state.randomize === true) return;
      await this.sleep(this.getSpeed(this.state.speed));
      if (this.state.randomize === true) return;
    }
    this.sorted = true;
    this.props.visualizerDataHandler(this.sorted);
  }

  mergeSort(arr, low, high, graphics) {
    if (low >= high) return;
    var middle = Math.floor((low + high) / 2);
    this.mergeSort(arr, low, middle, graphics);
    this.mergeSort(arr, middle + 1, high, graphics);
    this.merge(arr, low, high, graphics);
  }

  merge(arr, low, high, graphics) {
    let middle = Math.floor((low + high) / 2);
    let temp = new Array(high - low + 1);
    let i = low;
    let j = middle + 1;
    let r = 0;
    while (i <= middle && j <= high) {
      graphics.push(new Tuple(i, j, "add"));
      graphics.push(new Tuple(i, j, "remove"));
      if (arr[i] <= arr[j]) {
        temp[r] = arr[i];
        r++;
        i++;
      } else {
        temp[r] = arr[j];
        r++;
        j++;
      }
    }
    while (i <= middle) {
      graphics.push(new Tuple(i, i, "add"));
      graphics.push(new Tuple(i, i, "remove"));
      temp[r] = arr[i];
      r++;
      i++;
    }
    while (j <= high) {
      graphics.push(new Tuple(j, j, "add"));
      graphics.push(new Tuple(j, j, "remove"));
      temp[r] = arr[j];
      r++;
      j++;
    }
    i = low;
    for (let k = 0; k < temp.length; ) {
      graphics.push(new Tuple(i, temp[k], "swap"));
      arr[i] = temp[k];
      i++;
      k++;
    }
  }

  async quickSortUtil() {
     //Setting Time complexities
     document.getElementById("Time_Worst").innerText="O(N^2)";
     document.getElementById("Time_Average").innerText="Θ(N log N)";
     document.getElementById("Time_Best").innerText="Ω(N log N)";
     //Setting Space complexity
     document.getElementById("Space_Worst").innerText="O(log N)"; 
    this.sorted = false;
    this.props.visualizerDataHandler(this.sorted);
    let arr = this.state.arr.slice();
    let low = 0;
    let high = arr.length - 1;
    let graphics = [];
    let i_val, wid;
    let sorted = this.state.arr.slice().sort(function (a, b) {
      return a - b;
    });
    this.quickSort(arr, low, high, graphics, sorted);
    let array = document.getElementsByClassName("arr");
    for (let i = 0; i < graphics.length; i++) {
      if (graphics[i].operation === "add") {
        array[graphics[i].first].style.backgroundColor = this.state.pointerColor;
        array[graphics[i].second].style.backgroundColor =
          this.state.pointerColor;
        if (this.state.randomize === true) return;
        await this.sleep(this.getSpeed(this.state.speed) / 2);
        if (this.state.randomize === true) return;
      }
      if (graphics[i].operation === "fix") {
        array[graphics[i].first].style.backgroundColor = this.state.sortedColor;
        array[graphics[i].second].style.backgroundColor = this.state.sortedColor;
      }
      if (graphics[i].operation === "remove") {
        array[graphics[i].first].style.backgroundColor = this.state.barColor;
        array[graphics[i].first].style.backgroundColor = this.state.barColor;
      }
      if (graphics[i].operation === "swap") {
        if (this.state.randomize === true) return;
        await this.sleep(this.getSpeed(this.state.speed) / 2);
        if (this.state.randomize === true) return;
        i_val = array[graphics[i].first].innerHTML;
        wid = array[graphics[i].first].style.width;
        array[graphics[i].first].innerHTML = array[graphics[i].second].innerHTML;
        array[graphics[i].first].style.width =
          array[graphics[i].second].style.width;
        array[graphics[i].second].innerHTML = i_val;
        array[graphics[i].second].style.width = wid;
        if (this.state.randomize === true) return;
        await this.sleep(this.getSpeed(this.state.speed) / 2);
        if (this.state.randomize === true) return;
      }
    }
    this.sorted = true;
    this.props.visualizerDataHandler(this.sorted);
  }

  quickSort(arr, low, high, graphics, sorted) {
    if (low < high) {
      let pi = this.partition(arr, low, high, graphics, sorted);
      this.quickSort(arr, low, pi - 1, graphics, sorted);
      this.quickSort(arr, pi + 1, high, graphics, sorted);
    }
  }

  partition(arr, low, high, graphics, sorted) {
    let g;
    let pivot = arr[high];
    let i = low - 1;
    graphics.push(new Tuple(high, high, "add"));
    for (let j = low; j <= high - 1; j++) {
      graphics.push(new Tuple(j, j, "add"));
      if (arr[j] < pivot) {
        i++;
        g = arr[i];
        arr[i] = arr[j];
        arr[j] = g;
        graphics.push(new Tuple(i, j, "add"));
        graphics.push(new Tuple(i, j, "remove"));
        graphics.push(new Tuple(i, j, "swap"));
      }
      graphics.push(new Tuple(j, j, "remove"));
    }
    g = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = g;
    graphics.push(new Tuple(i + 1, high, "add"));
    graphics.push(new Tuple(i + 1, high, "remove"));
    graphics.push(new Tuple(i + 1, high, "swap"));
    graphics.push(new Tuple(high, high, "remove"));
    for (let k = 0; k < arr.length; k++) {
      if (arr[k] === sorted[k]) {
        graphics.push(new Tuple(k, k, "fix"));
      }
    }
    graphics.push(new Tuple(i + 1, i + 1, "fix"));
    return i + 1;
  }

  async selectionSort() {
      //Setting Time complexities
      document.getElementById("Time_Worst").innerText="O(N^2)";
      document.getElementById("Time_Average").innerText="Θ(N^2)";
      document.getElementById("Time_Best").innerText="Ω(N^2)";
      //Setting Space complexity
      document.getElementById("Space_Worst").innerText="O(1)";
    this.sorted = false;
    this.props.visualizerDataHandler(this.sorted);
    let array = document.getElementsByClassName("arr");
    let n = array.length;
    let m, r, i_val, wid;
    for (let i = 0; i < n - 1; i++) {
      m = i;
      for (let j = i + 1; j < n; j++) {
        r = m;
        array[r].style.backgroundColor = this.state.pointerColor;
        array[j].style.backgroundColor = this.state.pointerColor;
        if (parseInt(array[j].innerHTML) < parseInt(array[m].innerHTML)) {
          m = j;
        }
        if (this.state.randomize === true) return;
        await this.sleep(this.getSpeed(this.state.speed));
        if (this.state.randomize === true) return;
        array[r].style.backgroundColor = this.state.barColor;
        array[j].style.backgroundColor = this.state.barColor;
      }
      array[i].style.backgroundColor = this.state.sortedColor;
      wid = array[i].style.width;
      i_val = parseInt(array[i].innerHTML);
      array[i].innerHTML = parseInt(array[m].innerHTML);
      array[i].style.width = array[m].style.width;
      array[m].innerHTML = i_val;
      array[m].style.width = wid;
    }
    array[n - 1].style.backgroundColor = this.state.sortedColor;
    this.sorted = true;
    this.props.visualizerDataHandler(this.sorted);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getSpeed(speed) {
    switch (speed) {
      case "Very Fast":
        return 25;
      case "Normal":
        return 250;
      case "Slow":
        return 500;
      case "Very Slow":
        return 1000;
      default:
        return 100;
    }
  }

  getColor(barColor) {
    switch (barColor) {
      case "Black":
        return "#000000";
      case "Green":
        return "#009933";
      case "Red":
        return "#cc0000";
      case "Yellow":
        return "#cccc00";
      default:
        return "#000050";
    }
  }

  getBarHeight() {
    let height =
      (this.height - 150 - parseInt(this.state.size) * 5) /
      parseInt(this.state.size);
    return height;
  }

  getfontHeight() {
    let fontHeight =
      (this.height -200 - parseInt(this.state.size) * 5) /
      parseInt(this.state.size);
    return fontHeight - 8;
  }

  getRandomElement() {
    var max = 0;
    var min = 50;
    if (this.width < 768) max = (this.width * 8) / 10;
    else max = (this.width * 6) / 10;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render() {
    return (
      <div id="barView">
        {this.state.arr.map((value, idx) => (
          <div
            className="arr"
            key={idx}
            style={{
              width: `${value + 10}px`,
              backgroundColor: `${this.state.barColor}`,
              height: `${this.getBarHeight()}px`,
              fontSize: `${this.getfontHeight()}px`,
            }}
          >
            {value}
          </div>
        ))}
      </div>
    );
  }
}

export default SortingVisualizer;
