export function getAIConfig(req){
  const key=String(req.headers['x-jarvis-api-key']||'').trim();
  const model=String(req.headers['x-jarvis-model']||'').trim();
  const base='https://api.openai-proxy.org/v1';
  if(!key){const e=new Error('请先在 Jarvis 设置中填写你自己的 CloseAI API Key');e.status=401;throw e}
  if(!model){const e=new Error('请先填写模型名称');e.status=400;throw e}
  if(key.length>512||model.length>120){const e=new Error('AI 配置格式异常');e.status=400;throw e}
  return {key,model,base};
}

export function handleConfigError(res,e){
  return res.status(e?.status||500).json({error:String(e?.message||e||'AI 配置错误')});
}
