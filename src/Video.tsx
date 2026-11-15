import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const C={bg:'#05070d',white:'#f5f7fb',ego:'#ff426d',motivation:'#f6c85f',obsession:'#39e0e8'};
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};

const Backdrop:React.FC<{accent:string;progress:number}>=({accent,progress})=><AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 38%,#17243a 0%,#090e18 42%,#03050a 100%)'}}>
  <div style={{position:'absolute',inset:0,background:'linear-gradient(112deg,transparent 0%,'+accent+'14 48%,transparent 70%)'}}/>
  <div style={{position:'absolute',left:0,right:0,bottom:0,height:500,background:'linear-gradient(0deg,#02040a,transparent)'}}/>
  <div style={{position:'absolute',left:70,right:70,bottom:92,height:3,background:'#ffffff12'}}><div style={{width:(progress*100)+'%',height:'100%',background:accent,boxShadow:'0 0 18px '+accent}}/></div>
</AbsoluteFill>;

const Header:React.FC<{accent:string}>=({accent})=><div style={{position:'absolute',top:64,left:64,right:64}}>
  <div style={{display:'flex',alignItems:'center',gap:14}}><div style={{width:9,height:9,borderRadius:20,background:accent,boxShadow:'0 0 18px '+accent}}/><span style={{fontSize:19,letterSpacing:5,fontWeight:800,color:'#b9c5d6'}}>MENTALIDAD / DISCIPLINA</span><span style={{marginLeft:'auto',fontSize:18,color:'#728097'}}>01 — 03</span></div>
  <div style={{marginTop:28,fontSize:48,fontWeight:900,letterSpacing:-1.5,lineHeight:1.04,color:C.white}}>EGO <span style={{color:'#65738a'}}>VS</span> MOTIVACIÓN<br/><span style={{color:'#65738a'}}>VS</span> OBSESIÓN</div>
  <div style={{marginTop:22,width:104,height:5,borderRadius:8,background:accent,boxShadow:'0 0 20px '+accent}}/>
</div>;

const Chart:React.FC<{title:string;accent:string;kind:string;frame:number}>=({title,accent,kind,frame})=>{
 const p=interpolate(frame,[0,100],[0,1],clamp);
 const d=kind==='fall'?'M 0 76 C 45 66 58 4 106 16 S 164 86 220 91':kind==='wave'?'M 0 68 C 35 5 68 98 110 47 S 178 25 220 84':'M 0 88 C 48 83 78 70 112 51 S 174 15 220 5';
 return <div style={{flex:1,minWidth:0,borderRadius:22,padding:'22px 20px 10px',background:'linear-gradient(145deg,#111c2c,#080d17)',border:'1px solid #ffffff1c',boxShadow:'0 20px 50px #0008'}}>
  <div style={{fontSize:16,fontWeight:800,letterSpacing:1,color:accent}}>{title}</div>
  <svg viewBox="0 0 220 100" width="100%" height="100" style={{marginTop:8}}>{[25,50,75].map(y=><line key={y} x1="0" x2="220" y1={y} y2={y} stroke="#ffffff12" strokeDasharray="4 7"/>)}<path d={d} fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p} style={{filter:'drop-shadow(0 0 7px '+accent+')'}}/></svg>
 </div>;
};

const Desk:React.FC<{type:string;accent:string;frame:number}>=({type,accent,frame})=>{
 const tilt=type==='ego'?interpolate(frame,[0,100,150],[0,-14,16],clamp):type==='motivation'?interpolate(frame,[0,150],[0,10],clamp):0;
 const slump=type==='motivation'?interpolate(frame,[0,150],[0,25],clamp):0;
 const title=type==='ego'?'Necesita demostrar.':type==='motivation'?'Depende de las ganas.':'Construye constancia.';
 const copy=type==='ego'?'El ego sube rápido, presume demasiado y termina perdiendo el control.':type==='motivation'?'Te impulsa a comenzar, pero se apaga cuando llegan los días difíciles.':'Sigue trabajando incluso cuando nadie está mirando.';
 return <div style={{position:'relative',height:490,marginTop:28,borderRadius:28,overflow:'hidden',background:'linear-gradient(145deg,#101a29ee,#080d16f5)',border:'1px solid #ffffff20',boxShadow:'0 30px 90px #0009'}}>
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 76% 46%,'+accent+'20,transparent 55%)'}}/>
  <div style={{position:'absolute',left:32,top:30,fontSize:18,letterSpacing:3,fontWeight:900,color:accent}}>{type==='ego'?'01 / EGO':type==='motivation'?'02 / MOTIVACIÓN':'03 / OBSESIÓN'}</div>
  <div style={{position:'absolute',left:32,top:88,width:470}}><div style={{fontSize:36,fontWeight:900,color:C.white,lineHeight:1.05}}>{title}</div><div style={{fontSize:21,lineHeight:1.45,color:'#aebbd0',marginTop:18,maxWidth:440}}>{copy}</div></div>
  <svg viewBox="0 0 360 330" width="360" height="330" style={{position:'absolute',right:0,bottom:24,filter:'drop-shadow(0 0 24px '+accent+'35)'}}>
   <ellipse cx="190" cy="294" rx="155" ry="18" fill="#0009"/>
   <path d="M36 222 H324 L302 242 H56Z" fill="#253349" stroke="#60738d" strokeWidth="2"/><path d="M64 242 L76 300 M298 242 L286 300" stroke="#52647c" strokeWidth="12" strokeLinecap="round"/>
   <rect x="118" y="151" width="112" height="72" rx="8" fill="#101c2b" stroke={accent} strokeWidth="3"/><rect x="128" y="161" width="92" height="51" rx="3" fill="#07121d"/><path d="M137 196 L155 184 L171 190 L190 171 L210 177" fill="none" stroke={accent} strokeWidth="3"/>
   <path d="M173 223 V239 H195" stroke="#71849d" strokeWidth="7" fill="none"/>
   <g transform={'translate(0 '+slump+') rotate('+tilt+' 174 180)'}>
    <circle cx="174" cy="84" r="28" fill="#d6deeb"/><path d="M151 81 Q174 47 198 78 L195 87 Q175 72 152 91Z" fill="#182131"/>
    {type==='ego'&&<rect x="150" y="79" width="48" height="10" rx="5" fill="#080c14"/>}
    <path d="M146 119 Q174 103 202 119 L216 201 Q174 220 132 201Z" fill="#d7e0ec"/>
    <path d="M145 136 L111 177 L126 190 L161 161 M203 136 L232 171 L220 187 L191 160" fill="none" stroke="#d7e0ec" strokeWidth="13" strokeLinecap="round"/>
    <path d="M151 201 L143 262 H171 L181 211 M190 207 L205 262 H232 L213 198" fill="#aebbd0"/>
   </g>
   {type==='motivation'&&<g><rect x="260" y="44" width="58" height="28" rx="5" fill="none" stroke={accent} strokeWidth="3"/><rect x="265" y="49" width={48*interpolate(frame,[0,150],[1,.04],clamp)} height="18" rx="3" fill={accent}/></g>}
   {type==='obsession'&&Array.from({length:8},(_,i)=><g key={i} transform={'translate('+(245+(i%3)*24)+','+(245-Math.floor(i/3)*18)+')'}><rect width="25" height="13" rx="2" fill="#238451" stroke="#a2ffca"/><path d="M3 5 H22" stroke="#d3ffe2"/></g>)}
  </svg>
 </div>;
};

const Captions:React.FC<{frame:number}>=({frame})=>{
 const sets=[{s:0,e:150,w:['El ego quiere','demostrar que es','el mejor. Pero','tarde o temprano,','termina cayendo.']},{s:150,e:300,w:['La motivación te','impulsa a comenzar,','pero desaparece','cuando llegan los','días difíciles.']},{s:300,e:480,w:['La obsesión','construye disciplina.','Sigue trabajando','incluso cuando','nadie está mirando.']},{s:480,e:570,w:['No dependas de','las ganas.','Construye constancia.']}];
 const a=sets.find(x=>frame>=x.s&&frame<x.e)||sets[3];const i=Math.min(a.w.length-1,Math.floor((frame-a.s)/((a.e-a.s)/a.w.length)));
 return <div style={{position:'absolute',left:65,right:65,bottom:154,textAlign:'center',fontSize:38,fontWeight:900,lineHeight:1.12,textShadow:'0 4px 20px #000,0 2px 5px #000'}}>{a.w.map((w,j)=><span key={j} style={{display:'inline-block',margin:'0 7px',color:j===i?'#ffe16b':'#f7f8fc'}}>{w}</span>)}</div>;
};

const Money:React.FC<{frame:number}>=({frame})=><AbsoluteFill style={{pointerEvents:'none'}}>{Array.from({length:12},(_,i)=>{const y=((i*181+frame*(1.2+i%3*.28))%2050)-100;const x=(i*137+Math.sin(frame*.025+i)*70)%1080;return <div key={i} style={{position:'absolute',left:x,top:y,width:42,height:21,border:'1px solid #8cf2b4aa',borderRadius:4,background:'linear-gradient(135deg,#1d8154,#10442f)',opacity:.3,transform:'rotate('+Math.sin(frame*.04+i)*35+'deg)'}}/>})}</AbsoluteFill>;

export const EgoMotivacionObsesion:React.FC=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const sec=frame/fps;
 const scene=sec<5?'ego':sec<10?'motivation':sec<16?'obsession':'outro';
 const accent=scene==='ego'?C.ego:scene==='motivation'?C.motivation:C.obsession;
 const zoom=interpolate(frame,[0,570],[1.035,1],{...clamp,easing:Easing.out(Easing.quad)});
 return <AbsoluteFill style={{background:C.bg,color:C.white,fontFamily:'Arial,Helvetica,sans-serif',overflow:'hidden'}}>
  <div style={{position:'absolute',inset:0,transform:'scale('+zoom+')'}}>
   <Backdrop accent={accent} progress={frame/570}/>
   <div style={{position:'absolute',inset:0,opacity:.23,backgroundImage:'linear-gradient(#6b8cb51a 1px,transparent 1px),linear-gradient(90deg,#6b8cb51a 1px,transparent 1px)',backgroundSize:'90px 90px'}}/>
   <Header accent={accent}/>
   {scene!=='outro'&&<div style={{position:'absolute',top:315,left:64,right:64,display:'flex',gap:12}}><Chart title="EGO / CAÍDA" accent={C.ego} kind="fall" frame={frame}/><Chart title="MOTIVACIÓN / VARIABLE" accent={C.motivation} kind="wave" frame={frame}/><Chart title="OBSESIÓN / PROGRESO" accent={C.obsession} kind="rise" frame={frame}/></div>}
   {scene==='ego'&&<div style={{position:'absolute',top:570,left:64,right:64}}><Desk type="ego" accent={C.ego} frame={frame}/></div>}
   {scene==='motivation'&&<div style={{position:'absolute',top:570,left:64,right:64}}><Desk type="motivation" accent={C.motivation} frame={frame-150}/></div>}
   {scene==='obsession'&&<div style={{position:'absolute',top:570,left:64,right:64}}><Desk type="obsession" accent={C.obsession} frame={frame-300}/><Money frame={frame}/></div>}
   {scene==='outro'&&<AbsoluteFill style={{alignItems:'center',justifyContent:'center',textAlign:'center',padding:80}}><div style={{fontSize:24,fontWeight:800,letterSpacing:6,color:C.obsession,marginBottom:35}}>LA DIFERENCIA ESTÁ EN LO QUE HACES</div><div style={{fontSize:76,fontWeight:950,lineHeight:1.02,letterSpacing:-3}}>NO ESPERES<br/><span style={{color:C.obsession,textShadow:'0 0 35px #39e0e866'}}>A TENER GANAS.</span></div><div style={{marginTop:42,fontSize:40,fontWeight:800}}>CONSTRUYE CONSTANCIA.</div><div style={{marginTop:50,width:120,height:5,background:C.obsession,boxShadow:'0 0 20px '+C.obsession}}/></AbsoluteFill>}
   {scene!=='outro'&&<div style={{position:'absolute',top:1100,left:90,right:90,fontSize:16,letterSpacing:4,color:'#8ea0b8',fontWeight:800,textAlign:'center'}}>ENFOQUE • DISCIPLINA • RESULTADOS</div>}
   <Captions frame={frame}/>
   <div style={{position:'absolute',bottom:45,left:70,fontSize:14,color:'#74849b',letterSpacing:3,fontWeight:800}}>MENTALIDAD IMPARABLE</div>
   <div style={{position:'absolute',bottom:45,right:70,fontSize:14,color:'#74849b',letterSpacing:2}}>{Math.floor(sec/60)}:{(sec%60).toFixed(1).padStart(4,'0')}</div>
  </div>
  <Audio src={staticFile('audio/voiceover.mp3')} volume={1}/><Audio src={staticFile('audio/music.wav')} volume={0.23}/><Audio src={staticFile('audio/effects.wav')} volume={0.34}/>
 </AbsoluteFill>;
};
