const LuminaCore = (() => {
 const realms=[
  {id:'bloom',name:'Petal Grove',subtitle:'Make a flower pattern',tag:'PATTERNS & POSSIBILITIES',color:'#dbece3',title:'A garden of patterns',gift:'Pattern keeper',description:'You helped the flowers find their rhythm.'},
  {id:'tide',name:'Tide Pools',subtitle:'Bring water to Omi',tag:'TURN · CONNECT · DISCOVER',color:'#dcebf0',title:'A river for a friend',gift:'River maker',description:'Your winding rivers brought the tide pools to life.'},
  {id:'stars',name:'Star Path',subtitle:'Follow the lanterns',tag:'STEPS & SEQUENCES',color:'#e7dff0',title:'Light a little path',gift:'Stargazer',description:'Your lanterns made a path across the sky.'},
  {id:'time',name:'Tomorrow Tree',subtitle:'Explore yesterday & tomorrow',tag:'A LITTLE ADVENTURE IN TIME',color:'#f2e5cf',title:'A seed of tomorrow',gift:'Time gardener',description:'A small seed became a home for a butterfly.'}
 ];
 const symbols=[{glyph:'✿',label:'Flower',color:'#a96989'},{glyph:'☾',label:'Moon',color:'#8d79b4'},{glyph:'✦',label:'Star',color:'#aa8234'}];
 const patterns=[{series:[0,1,0],answer:1,hint:'Flower, moon, flower… the two shapes take turns.'},{series:[2,2,0,2,2],answer:0,hint:'Two stars, then a flower. Two stars, then a…'},{series:[0,1,2,0,1],answer:2,hint:'Flower, moon, star. The same three repeat.'}];
 const sequences=[[0,1,2],[1,0,2,1],[2,0,1,0,2]];
 const homes=[{glyph:'●',name:'Round',color:'#a784b7'},{glyph:'▲',name:'Triangle',color:'#7fa996'},{glyph:'■',name:'Square',color:'#c99d64'}];
 const creatures=[{name:'Omi',kind:'the octopus',glyph:'🐙',target:0},{name:'Pip',kind:'the little fish',glyph:'🐠',target:1},{name:'Cora',kind:'the crab',glyph:'🦀',target:2}];
 function cleanProgress(input){return Object.fromEntries(realms.map(r=>[r.id,Math.min(3,Math.max(0,Number.isFinite(input?.[r.id])?Math.floor(input[r.id]):0))]));}
 function makePuzzle(realm,round,visit=0){
  const shift=(visit+round)%3;
  if(realm==='bloom'){const a=shift,b=(shift+1)%3,c=(shift+2)%3;const motif=round===0?[a,b]:round===1?[a,a,b]:[a,b,c];const prefix=Array.from({length:motif.length+2},(_,i)=>motif[i%motif.length]);return {motif,prefix,answers:[],needed:round+2};}
  if(realm==='stars'){const base=[[0,1,2,0],[1,0,2,1,2],[2,0,1,0,2,1]][round];return {sequence:base.map(i=>(i+shift)%3)};}
  if(realm==='tide'){const n=round===0?2:3,paths=round===0?[[0,1,3],[0,2,3]]:round===1?[[0,1,4,3,6,7,8],[0,3,4,1,2,5,8]]:[[0,1,2,5,4,3,6,7,8],[0,3,6,7,4,1,2,5,8]];const path=paths[visit%paths.length],cells=Array.from({length:n*n},(_,i)=>({ports:i%2?[0,2]:[0,1],turn:((i+visit)%3)+1}));function dir(a,b){return b===a-n?0:b===a+1?1:b===a+n?2:3;}path.forEach((at,i)=>{cells[at].ports=[i===0?3:dir(at,path[i-1]),i===path.length-1?2:dir(at,path[i+1])];});return {n,path,cells};}
  return {step:0};
 }
 function pipePorts(cell){return cell.ports.map(p=>(p+cell.turn)%4);}
 function pipeFlow(puzzle){const {n,cells}=puzzle,seen=new Set(),queue=[];if(pipePorts(cells[0]).includes(3))queue.push(0);while(queue.length){const at=queue.shift();if(seen.has(at))continue;seen.add(at);for(const side of pipePorts(cells[at])){const row=Math.floor(at/n),col=at%n;if(side===0&&row===0||side===1&&col===n-1||side===2&&row===n-1||side===3&&col===0)continue;const to=at+[-n,1,n,-1][side];if(pipePorts(cells[to]).includes((side+2)%4)&&!seen.has(to))queue.push(to);}}return {seen:[...seen],complete:seen.has(n*n-1)&&pipePorts(cells[n*n-1]).includes(2)};}
 function nextPattern(puzzle){return puzzle.motif[(puzzle.prefix.length+puzzle.answers.length)%puzzle.motif.length];}
 function count(p){return realms.reduce((n,r)=>n+(p[r.id]||0),0);}
 function correct(realm,round,choice,cursor=0){if(realm==='bloom')return patterns[round].answer===choice;if(realm==='tide')return creatures[round].target===choice;if(realm==='stars')return sequences[round][cursor]===choice;return round===choice;}
 function advance(progress,realm,round){const next={...progress};next[realm]=Math.max(next[realm]||0,Math.min(round+1,3));return next;}
 return {realms,symbols,patterns,sequences,homes,creatures,cleanProgress,count,correct,advance,makePuzzle,pipePorts,pipeFlow,nextPattern};
})();
