let index=0,show=false,mode='order',list=[...questions];
let wrong=JSON.parse(localStorage.getItem('wrong')||'[]');
let star=JSON.parse(localStorage.getItem('star')||'[]');

function render(){
 const q=list[index];
 type.innerText=q.type;
 question.innerText=q.question;
 answer.innerText=show?q.answer:'';
 showBtn.style.display=mode==='exam'?'none':'block';
 progress.innerText=`第 ${index+1} / ${list.length} 题`;
 modeDiv();
}
function toggleAnswer(){show=!show;render();}
function next(){if(index<list.length-1){index++;show=false;render();}}
function prev(){if(index>0){index--;show=false;render();}}
function shuffle(a){return a.sort(()=>Math.random()-0.5);}
function setMode(m){mode=m;index=0;show=false;
 if(m==='random')list=shuffle([...questions]);
 else list=[...questions];
 render();
}
function markWrong(){const q=list[index];
 if(!wrong.includes(q)){wrong.push(q);localStorage.setItem('wrong',JSON.stringify(wrong));alert('已加入错题');}}
function markStar(){const q=list[index];
 if(!star.includes(q)){star.push(q);localStorage.setItem('star',JSON.stringify(star));alert('已标记重点');}}
function reviewWrong(){if(!wrong.length){alert('暂无错题');return;}
 list=[...wrong];index=0;show=false;mode='wrong';render();}
function modeDiv(){
 const m={order:'📘 顺序刷题',random:'🔀 随机刷题',exam:'⏱ 考试模式',wrong:'❌ 错题复习'};
 document.getElementById('mode').innerText=m[mode]||'';
}
render();
