import {getAIConfig,handleConfigError} from './_client.js';
function outText(d){if(d.output_text)return d.output_text;let s='';for(const i of d.output||[])for(const c of i.content||[])if(c.type==='output_text'&&c.text)s+=c.text;return s.trim()}
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 let key,base,model;try{({key,base,model}=getAIConfig(req))}catch(e){return handleConfigError(res,e)}
 try{
  const r=await fetch(`${base}/responses`,{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model,instructions:'你是连接测试器。',input:'只回复 OK'})});
  const d=await r.json();if(!r.ok)return res.status(r.status).json({error:d?.error?.message||'模型连接失败'});
  return res.status(200).json({ok:true,model,reply:outText(d).slice(0,40)||'OK'});
 }catch(e){return res.status(500).json({error:String(e?.message||e)})}
}
