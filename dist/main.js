(()=>{"use strict";const t=t=>({createShip:(e,s)=>{t.ships.push(((t,e)=>{let s={name:e,length:t.length,coords:t,hits:[],sunk:!1};return Object.assign({state:s},(t=>({hit:e=>{t.hits.push(e)}}))(s),(t=>({isSunk:()=>{t.hits.length>=t.length&&(t.sunk=!0)}}))(s))})(e,s))}}),e=()=>{let e={missed_attacks:[],ships:[]};return Object.assign({state:e},t(e),(t=>({receiveAttack:e=>{for(let s=0;s<t.ships.length;s+=1)if(t.ships[s].state.coords.includes(e))return t.ships[s].hit(e),t.ships[s].isSunk(),t.ships[s].state.sunk?t.ships.splice(s,1):"";t.missed_attacks.push(e)}}))(e),(t=>({shipsRemaining:()=>t.ships.length>0}))(e))},s=t=>{let e={is_human:t,available_moves:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99]};return Object.assign({state:e},(t=>({launchAttack:e=>!!t.available_moves.includes(e)&&t.available_moves.splice(t.available_moves.indexOf(e),1)[0]}))(e),(t=>({randomCoord:()=>t.available_moves[~~(Math.random()*t.available_moves.length)]}))(e))};function a(t){const e=document.getElementById("content"),s=document.createElement("div");return s.setAttribute("class","gameboard"),s.setAttribute("id",t),e.appendChild(s),s}function i(t,e,s){for(let a=s;a<s+100;a+=1){const s=document.createElement("div");e?s.setAttribute("class","player2_tile"):s.setAttribute("class","player1_tile"),s.setAttribute("id",a),t.appendChild(s)}}!function(){s(!0);let t=e();t.createShip([0,1,2,3,4],"Carrier"),s(!0);let n=e();var r;n.createShip([100,101,102,103,104],"Carrier"),r=t,i(a("gameboard1"),!1,0),r.state.ships.forEach((t=>{t.state.coords.forEach((t=>{const e=document.getElementById(t.toString());e.removeAttribute("class","player1_tile"),e.setAttribute("class","ship")}))})),i(a("gameboard1"),!0,100)}()})();