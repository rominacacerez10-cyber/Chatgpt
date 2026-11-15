import asyncio, os, wave
import numpy as np
import edge_tts
os.makedirs("public/audio",exist_ok=True)
TEXT=("El ego quiere demostrar que es el mejor. Pero tarde o temprano, termina cayendo. "
"La motivación te impulsa a comenzar, pero desaparece cuando llegan los días difíciles. "
"La obsesión construye disciplina. Sigue trabajando incluso cuando nadie está mirando. "
"No dependas de las ganas. Construye constancia.")
async def voice():
 await edge_tts.Communicate(TEXT,"es-ES-AlvaroNeural",rate="-8%",pitch="-12Hz").save("public/audio/voiceover.mp3")
def wav(path,data,sr=48000):
 data=np.clip(data,-1,1); pcm=(data*32767).astype(np.int16)
 with wave.open(path,"wb") as f:
  f.setnchannels(2);f.setsampwidth(2);f.setframerate(sr);f.writeframes(pcm.reshape(-1,2).tobytes())
def music():
 sr=48000;dur=19;t=np.arange(sr*dur)/sr
 pad=sum(np.sin(2*np.pi*h*t+.15*np.sin(2*np.pi*.08*t)) for h in [55,65.41,82.41,110])/4
 sub=.22*np.sin(2*np.pi*41.2*t);pulse=(np.sin(2*np.pi*1.35*t)>0)*.055
 env=np.minimum(1,t/1.8)*np.minimum(1,(dur-t)/2)
 m=(pad*.12+sub+pulse+.015*np.sin(2*np.pi*440*t))*env
 wav("public/audio/music.wav",np.column_stack([m,np.roll(m,180)]),sr)
def effects():
 sr=48000;dur=19;t=np.arange(sr*dur)/sr;out=np.zeros_like(t)
 for at,amp in [(0.15,.30),(5,.24),(10,.28),(16,.36)]:
  x=t-at;mask=(x>=0)&(x<1.3);q=x[mask]
  noise=np.random.default_rng(int(at*100)).normal(0,1,len(q))
  out[mask]+=amp*(np.sin(2*np.pi*(95+180*np.exp(-q*2))*q)*np.exp(-q*3)*.7+noise*np.exp(-q*7)*.18)
 wav("public/audio/effects.wav",np.column_stack([out,np.roll(out,95)]),sr)
async def main():
 await voice();music();effects()
asyncio.run(main())
