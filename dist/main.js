(()=>{"use strict";const e=e=>({createShip:(t,a)=>{e.ships.push(((e,t)=>{let a={name:t,length:e.length,coords:e,hits:[],sunk:!1};return Object.assign({state:a},(e=>({hit:t=>{e.hits.push(t)}}))(a),(e=>({isSunk:()=>{e.hits.length>=e.length&&(e.sunk=!0)}}))(a))})(t,a))}}),t=()=>{let t={missed_attacks:[],ships:[],open_coords:[]};return Object.assign({state:t},e(t),(e=>({receiveAttack:t=>{for(let a=0;a<e.ships.length;a+=1)if(e.ships[a].state.coords.includes(t))return e.ships[a].hit(t),e.ships[a].isSunk(),e.ships[a].state.sunk?e.ships.splice(a,1):"";e.missed_attacks.push(t)}}))(t),(e=>({shipsRemaining:()=>e.ships.length>0}))(t),(e=>({setOpenCoords:t=>{let a=[...Array(100).keys()].map((e=>e+t));e.ships.forEach((e=>{a=a.filter((t=>e.state.coords.indexOf(t)<0))})),e.open_coords=a}}))(t),(e=>({possibleHorizontalPlacements:t=>{let a=e.open_coords,s=[];return a.forEach(((e,l)=>{if(a[l+t-1]===e+t-1&&e%10+t-1<10){let a=[...Array(t)].map(((t,a)=>e+1*a));s.push(a)}})),s}}))(t),(e=>({possibleVerticalPlacements:t=>{let a=e.open_coords;a.sort(((e,t)=>e.toString().slice(-1)>t.toString().slice(-1)?1:e.toString().slice(-1)<t.toString().slice(-1)?-1:0));const s=[];return a.forEach(((e,l)=>{if(a[l+t-1]===e+10*(t-1)){let a=[...Array(t)].map(((t,a)=>e+10*a));s.push(a)}})),s}}))(t))},a=e=>{let t={is_human:e,available_moves:[]};return Object.assign({state:t},(e=>({launchAttack:t=>!!e.available_moves.includes(t)&&e.available_moves.splice(e.available_moves.indexOf(t),1)[0]}))(t),(e=>({randomCoord:()=>e.available_moves[~~(Math.random()*e.available_moves.length)]}))(t),(e=>({populateAvailableMoves:t=>{for(let a=0+t;a<100+t;a+=1)e.available_moves.push(a)}}))(t))},s=()=>{let e={board:null,tiles:{}};return Object.assign({state:e},(e=>({createBoard:t=>{const a=document.getElementById("gameboards_container"),s=document.createElement("div");s.setAttribute("class","gameboard"),s.setAttribute("id",t),a.appendChild(s),e.board=s}}))(e),(e=>({createTiles:(t,a)=>{for(let s=a;s<a+100;s+=1){const a=document.createElement("div");t?a.setAttribute("class","player2_tile"):a.setAttribute("class","player1_tile"),a.setAttribute("id",s),e.tiles[s]=a,e.board.appendChild(a)}}}))(e),{createShips:e=>{e.state.ships.forEach((e=>{e.state.coords.forEach((t=>{const a=document.getElementById(t);a.removeAttribute("class","player1_tile"),a.setAttribute("class","ship"),a.classList.add(e.state.name)}))}))}},(e=>({changeTileDisplay:(t,a,s)=>{let l=e.tiles[t];a&&null!=s?l.setAttribute("class","hit"):l.setAttribute("class","miss")}}))(e))},l=()=>{let e={player1:null,player2:null,player1Board:null,player2Board:null,player1DOMBoard:null,player2DOMBoard:null};return Object.assign({state:e},(e=>({initializeGame:(l,r)=>{e.player1=a(!0),e.player1.populateAvailableMoves(100),e.player1Board=t(),e.player1Board.state.ships=l,e.player2=a(!0),e.player2.populateAvailableMoves(0),e.player2Board=t(),e.player2Board.state.ships=r,e.player1DOMBoard=s(),e.player1DOMBoard.createBoard("player1_board"),e.player1DOMBoard.createTiles(!1,0),e.player1DOMBoard.createShips(e.player1Board),e.player2DOMBoard=s(),e.player2DOMBoard.createBoard("player2_board"),e.player2DOMBoard.createTiles(!0,100)}}))(e),(e=>({gameLoop:()=>{for(let t=100;t<200;t++)document.getElementById(t).addEventListener("click",(()=>{const a=e.player1.launchAttack(t);if(0!=a){const t=e.player2Board.receiveAttack(a);if(e.player2DOMBoard.changeTileDisplay(a,!0,t),!1===e.player2Board.shipsRemaining())return void events.emit("end game","Player 1");const s=e.player2.randomCoord(),l=e.player1Board.receiveAttack(e.player2.launchAttack(s));if(e.player1DOMBoard.changeTileDisplay(s,!0,l),!1===e.player1Board.shipsRemaining())return void events.emit("end game","Player 2")}}))}}))(e))},r=()=>{let e={gameboard:null,gameboardDOM:null,selected_ship_length:null,selected_ship_div:null,selected_ship_name:null,selected_ship_coords:null,horizontal:!0,vertical:!1,possible_horizontal_placements:null,possible_vertical_placements:null,placed_successfully:null,computer_gameboard:null};return Object.assign({state:e},(e=>({initialize:()=>{e.gameboard=t(),e.gameboardDOM=s(),e.gameboardDOM.createBoard("player1_board"),e.gameboardDOM.createTiles(!1,0),e.computer_gameboard=t()}}))(e),(e=>({random:()=>{let t;[[5,"Carrier"],[4,"Battleship"],[3,"Cruiser"],[3,"Submarine"],[2,"Destroyer"]].forEach((a=>{e.computer_gameboard.setOpenCoords(100),t=1==~~(100*Math.random()/50)?t=e.computer_gameboard.possibleHorizontalPlacements(a[0]):e.computer_gameboard.possibleVerticalPlacements(a[0]),e.computer_gameboard.createShip(t[~~(Math.random()*t.length)],a[1])}))}}))(e),(e=>({createDraggableShips:()=>{const t=document.getElementById("gameboards_container"),a=document.createElement("div");a.setAttribute("id","ship_container"),t.appendChild(a),[[5,"Carrier"],[4,"Battleship"],[3,"Cruiser"],[3,"Submarine"],[2,"Destroyer"]].forEach((t=>{const s=document.createElement("div");s.className="draggableShips",s.draggable="true",s.addEventListener("dragstart",(a=>{e.selected_ship_coords=null,e.selected_ship_length=t[0],e.placed_successfully=!1,e.selected_ship_div=s,e.selected_ship_name=t[1],e.gameboard.setOpenCoords(0),a.dataTransfer.setData("text/plain",a.target.id),setTimeout((()=>{a.target.classList.add("hide")}),0)})),s.addEventListener("dragend",(t=>{0==e.placed_successfully&&t.target.classList.remove("hide")}));for(let e=0;e<t[0];e++){let e=document.createElement("div");e.setAttribute("class","ship"),e.classList.add(t[1]),s.appendChild(e)}a.appendChild(s)}))}}))(e),(e=>({addTileListeners:()=>{document.querySelectorAll(".player1_tile").forEach((t=>{t.addEventListener("dragenter",(t=>{let a;a=!0===e.horizontal?e.gameboard.possibleHorizontalPlacements(e.selected_ship_length).filter((e=>e[0]==t.target.id)):e.gameboard.possibleVerticalPlacements(e.selected_ship_length).filter((e=>e[0]==t.target.id)),0==a.length?t.target.classList.add("invalid_drop"):t.target.classList.add("valid_drop")})),t.addEventListener("dragleave",(e=>{e.target.classList.remove("valid_drop"),e.target.classList.remove("invalid_drop")})),t.addEventListener("dragover",(e=>{e.preventDefault()})),t.addEventListener("drop",(t=>{let a;t.preventDefault(),t.target.classList.remove("valid_drop"),t.target.classList.remove("invalid_drop"),a=!0===e.horizontal?e.gameboard.possibleHorizontalPlacements(e.selected_ship_length).filter((e=>e[0]==t.target.id))[0]:e.gameboard.possibleVerticalPlacements(e.selected_ship_length).filter((e=>e[0]==t.target.id))[0],a?(e.gameboard.createShip(a,e.selected_ship_name),e.gameboardDOM.createShips(e.gameboard),e.placed_successfully=!0,5==e.gameboard.state.ships.length&&events.emit("ships placed",[e.gameboard.state.ships,e.computer_gameboard.state.ships])):e.selected_ship_div.classList.remove("hide")}))}))}}))(e),(e=>({addOrientationButton:()=>{let t=document.createElement("button");t.innerHTML="Rotate Ships",t.setAttribute("id","ship_orientation_button"),document.getElementById("ship_container").appendChild(t);let a=document.getElementsByClassName("draggableShips");t.addEventListener("click",(()=>{if(1==e.horizontal){e.horizontal=!1,e.vertical=!0;for(let e=0;e<a.length;e+=1)a[e].classList.add("vertical")}else{e.horizontal=!0,e.vertical=!1;for(let e=0;e<a.length;e+=1)a[e].classList.remove("vertical")}}))}}))(e))},i=()=>{let e={controller:l(),shipPlacement:r()};return Object.assign({controller:e.controller,endGame:function(){const e=document.getElementById("gameboards_container"),t=document.getElementById("gameover_container"),a=document.getElementById("New Game");t.style.display="inline-block",a.addEventListener("click",(()=>{if(null!=e.firstChild)for(;e.firstChild;)e.removeChild(e.firstChild);t.style.display="none",events.emit("get ship placement")}))},newGame:function(){e.shipPlacement.initialize(),e.shipPlacement.random(),e.shipPlacement.createDraggableShips(),e.shipPlacement.addTileListeners(),e.shipPlacement.addOrientationButton()},beginGame:function(e){const t=document.getElementById("gameboards_container");if(null!=t.firstChild)for(;t.firstChild;)t.removeChild(t.firstChild);let a=i();a.controller.initializeGame(e[0],e[1]),a.controller.gameLoop()}})};let n=i();n.newGame(),events.on("get ship placement",n.newGame),events.on("ships placed",n.beginGame),events.on("end game",n.endGame)})();