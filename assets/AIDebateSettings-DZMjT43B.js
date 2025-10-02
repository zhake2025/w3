import{u as ye,U as Ce,V as U,r as m,j as e,B as t,a as J,A as ke,T as Ie,I as b,b as Se,d as a,P as E,bk as M,e as I,af as N,_ as z,bl as we,G as f,f as x,g as W,ac as L,an as $,i as F,b1 as q,bm as De,k as X,m as K,n as Y,H as Ae,J as Re,S as Ee,K as S,o as H,t as Q}from"./index-ClMP7OXS.js";import{D as Ne}from"./DropdownModelSelector-CnmP-xBT.js";import{P as V}from"./plus-Kx2MljPW.js";import{F as ze}from"./folder-open-BdHNBEiD.js";import"./ListSubheader-DMlgbBxX.js";const w={MAX_ROUNDS:5,MAX_TOKENS_PER_ROUND:1e3,TIMEOUT_MINUTES:10,MODERATOR_ENABLED:!0,SUMMARY_ENABLED:!0},We=()=>{const Z=ye(),ee=Ce(),se=U(s=>s.settings.providers||[]),ne=U(s=>s.settings.showAIDebateButton??!0),u=se.flatMap(s=>s.models.filter(n=>n.enabled).map(n=>({...n,providerName:s.name}))),[i,G]=m.useState({enabled:!1,maxRounds:w.MAX_ROUNDS,autoEndConditions:{consensusReached:!0,maxTokensPerRound:w.MAX_TOKENS_PER_ROUND,timeoutMinutes:w.TIMEOUT_MINUTES},roles:[],moderatorEnabled:w.MODERATOR_ENABLED,summaryEnabled:w.SUMMARY_ENABLED}),[g,_]=m.useState([]),[oe,j]=m.useState(!1),[v,P]=m.useState(null),[y,D]=m.useState(""),[O,A]=m.useState(""),[te,C]=m.useState(!1),[k,B]=m.useState(null),[l,p]=m.useState({name:"",description:"",systemPrompt:"",modelId:"",color:"#2196f3",stance:"pro"}),d=[{name:"正方辩手",description:"支持观点的辩论者",systemPrompt:`你是一位专业的正方辩论者，具有以下特点：

🎯 **核心职责**
- 坚定支持和论证正方观点
- 提供有力的证据和逻辑论证
- 反驳对方的质疑和攻击

💡 **辩论风格**
- 逻辑清晰，论证有力
- 引用具体事实、数据和案例
- 保持理性和专业的态度
- 语言简洁明了，重点突出

📋 **回应要求**
- 每次发言控制在150-200字
- 先明确表达立场，再提供论证
- 适当反驳对方观点
- 结尾要有力且令人信服

请始终站在正方立场，为你的观点据理力争！`,stance:"pro",color:"#4caf50"},{name:"反方辩手",description:"反对观点的辩论者",systemPrompt:`你是一位犀利的反方辩论者，具有以下特点：

🎯 **核心职责**
- 坚决反对正方观点
- 揭示对方论证的漏洞和问题
- 提出有力的反驳和质疑

💡 **辩论风格**
- 思维敏锐，善于发现问题
- 用事实和逻辑拆解对方论证
- 提出替代方案或反面证据
- 保持批判性思维

📋 **回应要求**
- 每次发言控制在150-200字
- 直接指出对方观点的问题
- 提供反面证据或案例
- 语气坚定但保持礼貌

请始终站在反方立场，用理性和事实挑战对方观点！`,stance:"con",color:"#f44336"},{name:"中立分析师",description:"客观理性的分析者",systemPrompt:`你是一位客观中立的分析师，具有以下特点：

🎯 **核心职责**
- 客观分析双方观点的优缺点
- 指出论证中的逻辑问题或亮点
- 提供平衡的视角和见解

💡 **分析风格**
- 保持绝对中立，不偏向任何一方
- 用理性和逻辑评估论证质量
- 指出可能被忽视的角度
- 寻找双方的共同点

📋 **回应要求**
- 每次发言控制在150-200字
- 平衡评价双方观点
- 指出论证的强弱之处
- 提出新的思考角度

请保持中立立场，为辩论提供客观理性的分析！`,stance:"neutral",color:"#ff9800"},{name:"辩论主持人",description:"控制节奏的主持人",systemPrompt:`你是一位专业的辩论主持人，具有以下职责：

🎯 **核心职责**
- 引导辩论方向和节奏
- 总结各方要点和分歧
- 判断讨论是否充分
- 决定何时结束辩论

💡 **主持风格**
- 公正中立，不偏向任何一方
- 善于总结和归纳要点
- 能够发现讨论的关键问题
- 控制辩论节奏和质量

📋 **回应要求**
- 每次发言控制在150-200字
- 总结前面的主要观点
- 指出需要进一步讨论的问题
- 推动辩论深入进行

⚠️ **重要：结束辩论的条件**
只有在以下情况下才明确说"建议结束辩论"：
1. 已经进行了至少3轮完整辩论
2. 各方观点出现明显重复
3. 讨论已经非常充分，没有新的观点
4. 达成了某种程度的共识

在前几轮中，请专注于推动讨论深入，而不是急于结束！`,stance:"moderator",color:"#9c27b0"},{name:"法律专家",description:"从法律角度分析问题",systemPrompt:`你是一位资深法律专家，从法律角度参与辩论：

🎯 **专业视角**
- 从法律法规角度分析问题
- 引用相关法条和判例
- 分析法律风险和合规性
- 考虑法律实施的可行性

💡 **专业特长**
- 熟悉各类法律法规
- 了解司法实践和判例
- 能够识别法律漏洞和风险
- 具备严谨的法律思维

📋 **发言要求**
- 每次发言150-200字
- 引用具体法条或判例
- 分析法律层面的利弊
- 保持专业和严谨

请从法律专业角度为辩论提供有价值的见解！`,stance:"neutral",color:"#795548"},{name:"经济学家",description:"从经济角度评估影响",systemPrompt:`你是一位经济学专家，从经济角度参与辩论：

🎯 **专业视角**
- 分析经济成本和收益
- 评估市场影响和效率
- 考虑宏观和微观经济效应
- 预测长期经济后果

💡 **专业特长**
- 掌握经济学理论和模型
- 了解市场运行机制
- 能够量化分析影响
- 具备数据分析能力

📋 **发言要求**
- 每次发言150-200字
- 提供经济数据或理论支撑
- 分析成本效益
- 考虑经济可持续性

请从经济学角度为辩论提供专业的分析和建议！`,stance:"neutral",color:"#607d8b"},{name:"技术专家",description:"从技术可行性角度分析",systemPrompt:`你是一位技术专家，从技术角度参与辩论：

🎯 **专业视角**
- 分析技术可行性和难度
- 评估技术风险和挑战
- 考虑技术发展趋势
- 预测技术实现的时间和成本

💡 **专业特长**
- 掌握前沿技术发展
- 了解技术实现的复杂性
- 能够评估技术方案
- 具备工程思维

📋 **发言要求**
- 每次发言150-200字
- 提供技术事实和数据
- 分析实现的技术路径
- 指出技术限制和可能性

请从技术专业角度为辩论提供切实可行的分析！`,stance:"neutral",color:"#3f51b5"},{name:"社会学者",description:"从社会影响角度思考",systemPrompt:`你是一位社会学专家，从社会角度参与辩论：

🎯 **专业视角**
- 分析社会影响和后果
- 考虑不同群体的利益
- 评估社会公平性
- 关注文化和价值观影响

💡 **专业特长**
- 了解社会结构和动态
- 关注弱势群体权益
- 具备人文关怀
- 能够预测社会反应

📋 **发言要求**
- 每次发言150-200字
- 关注社会公平和正义
- 考虑不同群体的感受
- 分析社会接受度

请从社会学角度为辩论提供人文关怀的视角！`,stance:"neutral",color:"#e91e63"},{name:"总结分析师",description:"专门负责辩论总结分析",systemPrompt:`你是一位专业的辞论总结分析师，具有以下特点：

🎯 **核心职责**
- 客观分析整个辩论过程
- 总结各方的核心观点和论据
- 识别争议焦点和共识点
- 提供平衡的结论和建议

💡 **分析风格**
- 保持绝对客观和中立
- 深度分析论证逻辑和质量
- 识别辩论中的亮点和不足
- 提供建设性的思考和启发

📋 **总结要求**
- 结构化呈现分析结果
- 平衡评价各方表现
- 指出论证的强弱之处
- 提供深度思考和建议
- 避免偏向任何一方

请为辩论提供专业、深入、平衡的总结分析！`,stance:"summary",color:"#607d8b"},{name:"魔鬼代言人",description:"专门提出反对意见",systemPrompt:`你是"魔鬼代言人"，专门提出反对和质疑：

🎯 **核心职责**
- 对任何观点都提出质疑
- 寻找论证中的薄弱环节
- 提出极端或边缘情况
- 挑战常规思维

💡 **思维特点**
- 批判性思维极强
- 善于发现问题和漏洞
- 不怕提出不受欢迎的观点
- 推动深度思考

📋 **发言要求**
- 每次发言150-200字
- 必须提出质疑或反对
- 指出可能的风险和问题
- 挑战主流观点

请扮演好魔鬼代言人的角色，为辩论带来更深层的思考！`,stance:"con",color:"#424242"},{name:"实用主义者",description:"关注实际操作和效果",systemPrompt:`你是一位实用主义者，关注实际可操作性：

🎯 **核心关注**
- 实际操作的可行性
- 实施成本和效果
- 现实条件和限制
- 短期和长期的实用性

💡 **思维特点**
- 务实理性，不空谈理论
- 关注具体实施细节
- 重视成本效益分析
- 追求实际效果

📋 **发言要求**
- 每次发言150-200字
- 关注实际操作层面
- 分析实施的难点和方法
- 提供具体可行的建议

请从实用主义角度为辩论提供务实的见解！`,stance:"neutral",color:"#8bc34a"}];m.useEffect(()=>{(()=>{try{const n=localStorage.getItem("aiDebateConfig");if(n){const h=JSON.parse(n);G(h)}const r=localStorage.getItem("aiDebateConfigGroups");if(r){const h=JSON.parse(r);_(h)}}catch(n){console.error("加载AI辩论配置失败:",n)}})()},[]);const c=s=>{try{localStorage.setItem("aiDebateConfig",JSON.stringify(s)),G(s)}catch(n){console.error("保存AI辩论配置失败:",n)}},T=s=>{try{localStorage.setItem("aiDebateConfigGroups",JSON.stringify(s)),_(s)}catch(n){console.error("保存分组配置失败:",n)}},re=()=>{P(null),D(""),A(""),j(!0)},ae=s=>{P(s),D(s.name),A(s.description),j(!0)},ie=()=>{if(!y.trim())return;const s=Date.now();let n;if(v)n=g.map(r=>r.id===v.id?{...r,name:y.trim(),description:O.trim(),updatedAt:s}:r);else{const r={id:`group_${s}`,name:y.trim(),description:O.trim(),config:JSON.parse(JSON.stringify(i)),createdAt:s,updatedAt:s};n=[...g,r]}T(n),j(!1)},le=s=>{if(window.confirm("确定要删除这个配置分组吗？此操作不可撤销。")){const n=g.filter(r=>r.id!==s);T(n)}},de=s=>{G(JSON.parse(JSON.stringify(s.config))),c(s.config)},ce=s=>{const n=g.map(r=>r.id===s?{...r,config:JSON.parse(JSON.stringify(i)),updatedAt:Date.now()}:r);T(n),Q.success("分组配置已更新！","更新成功")},xe=()=>{Z("/settings")},me=()=>{B(null),p({name:"",description:"",systemPrompt:"",modelId:"",color:"#2196f3",stance:"pro"}),C(!0)},pe=s=>{B(s),p(s),C(!0)},he=s=>{const n={...i,roles:i.roles.filter(r=>r.id!==s)};c(n)},ue=()=>{if(!l.name||!l.systemPrompt)return;const s={id:k?.id||`role_${Date.now()}`,name:l.name,description:l.description||"",systemPrompt:l.systemPrompt,modelId:l.modelId,color:l.color||"#2196f3",stance:l.stance||"pro"};let n;k?n=i.roles.map(h=>h.id===k.id?s:h):n=[...i.roles,s];const r={...i,roles:n};c(r),C(!1)},be=s=>{p({...l,...s})},R=s=>{let n=[];const r=u.length>0?u[0].id:"";switch(s){case"basic":n=[d.find(o=>o.name==="正方辩手"),d.find(o=>o.name==="反方辩手"),d.find(o=>o.name==="辩论主持人")];break;case"professional":n=[d.find(o=>o.name==="正方辩手"),d.find(o=>o.name==="反方辩手"),d.find(o=>o.name==="中立分析师"),d.find(o=>o.name==="辩论主持人")];break;case"expert":n=[d.find(o=>o.name==="法律专家"),d.find(o=>o.name==="经济学家"),d.find(o=>o.name==="技术专家"),d.find(o=>o.name==="辩论主持人")];break;case"comprehensive":n=[d.find(o=>o.name==="正方辩手"),d.find(o=>o.name==="反方辩手"),d.find(o=>o.name==="中立分析师"),d.find(o=>o.name==="法律专家"),d.find(o=>o.name==="经济学家"),d.find(o=>o.name==="辩论主持人")];break}const h=n.map((o,ve)=>({id:`role_${Date.now()}_${ve}`,name:o.name,description:o.description,systemPrompt:o.systemPrompt,modelId:r,color:o.color,stance:o.stance})),fe={...i,enabled:!0,roles:h};c(fe);const ge=s==="basic"?"基础辩论":s==="professional"?"专业辩论":s==="expert"?"专家论坛":"全面分析",je=u.length>0?u[0].name:"无可用模型";Q.success(`已成功配置"${ge}"场景！包含 ${h.length} 个角色，已自动配置默认模型：${je}`,"场景配置成功",{duration:8e3})};return e.jsxs(t,{sx:{flexGrow:1,display:"flex",flexDirection:"column",height:"100vh",bgcolor:s=>s.palette.mode==="light"?J(s.palette.primary.main,.02):J(s.palette.background.default,.9)},children:[e.jsx(ke,{position:"fixed",elevation:0,sx:{zIndex:s=>s.zIndex.drawer+1,bgcolor:"background.paper",color:"text.primary",borderBottom:1,borderColor:"divider",backdropFilter:"blur(8px)"},children:e.jsxs(Ie,{children:[e.jsx(b,{edge:"start",color:"inherit",onClick:xe,"aria-label":"back",sx:{color:s=>s.palette.primary.main},children:e.jsx(Se,{size:20})}),e.jsx(a,{variant:"h6",component:"div",sx:{flexGrow:1,fontWeight:600,backgroundImage:"linear-gradient(90deg, #9333EA, #754AB4)",backgroundClip:"text",color:"transparent"},children:"AI辩论设置"})]})}),e.jsxs(t,{sx:{flexGrow:1,overflowY:"auto",p:{xs:1,sm:2},mt:8,"&::-webkit-scrollbar":{width:{xs:"4px",sm:"6px"}},"&::-webkit-scrollbar-thumb":{backgroundColor:"rgba(0,0,0,0.1)",borderRadius:"3px"}},children:[e.jsxs(E,{elevation:0,sx:{mb:2,borderRadius:2,border:"1px solid",borderColor:"divider",overflow:"hidden",bgcolor:"background.paper",boxShadow:"0 4px 12px rgba(0,0,0,0.05)"},children:[e.jsxs(t,{sx:{p:{xs:1.5,sm:2},bgcolor:"rgba(0,0,0,0.01)"},children:[e.jsxs(a,{variant:"subtitle1",sx:{fontWeight:600,fontSize:{xs:"1rem",sm:"1.1rem"},display:"flex",alignItems:"center"},children:[e.jsx(M,{size:20,color:"#06b6d4"}),"基本设置"]}),e.jsx(a,{variant:"body2",color:"text.secondary",sx:{fontSize:{xs:"0.8rem",sm:"0.875rem"}},children:"配置AI辩论功能的基础参数和选项"})]}),e.jsx(I,{}),e.jsxs(t,{sx:{p:{xs:1.5,sm:2}},children:[e.jsx(N,{control:e.jsx(z,{checked:i.enabled,onChange:s=>c({...i,enabled:s.target.checked})}),label:"启用AI辩论功能",sx:{mb:2}}),e.jsx(N,{control:e.jsx(z,{checked:ne,onChange:s=>ee(we(s.target.checked))}),label:"在输入框显示AI辩论按钮",sx:{mb:2}}),e.jsxs(t,{sx:{display:"grid",gridTemplateColumns:{xs:"1fr",md:"1fr 1fr"},gap:2},children:[e.jsx(f,{label:"最大辩论轮数",value:i.maxRounds,onChange:s=>{const n=s.target.value;if(n==="")c({...i,maxRounds:0});else{const r=parseInt(n);isNaN(r)||c({...i,maxRounds:r})}},helperText:"输入数字，建议1-20轮"}),e.jsx(f,{label:"每轮最大Token数",value:i.autoEndConditions.maxTokensPerRound,onChange:s=>{const n=s.target.value;if(n==="")c({...i,autoEndConditions:{...i.autoEndConditions,maxTokensPerRound:0}});else{const r=parseInt(n);isNaN(r)||c({...i,autoEndConditions:{...i.autoEndConditions,maxTokensPerRound:r}})}},helperText:"输入数字，建议100-4000"})]}),e.jsxs(t,{sx:{mt:2},children:[e.jsx(N,{control:e.jsx(z,{checked:i.moderatorEnabled,onChange:s=>c({...i,moderatorEnabled:s.target.checked})}),label:"启用主持人角色"}),e.jsx(N,{control:e.jsx(z,{checked:i.summaryEnabled,onChange:s=>c({...i,summaryEnabled:s.target.checked})}),label:"自动生成辩论总结",sx:{ml:2}})]})]})]}),e.jsxs(E,{elevation:0,sx:{mb:2,borderRadius:2,border:"1px solid",borderColor:"divider",overflow:"hidden",bgcolor:"background.paper",boxShadow:"0 4px 12px rgba(0,0,0,0.05)"},children:[e.jsxs(t,{sx:{p:{xs:1.5,sm:2},bgcolor:"rgba(0,0,0,0.01)"},children:[e.jsxs(a,{variant:"subtitle1",sx:{fontWeight:600,fontSize:{xs:"1rem",sm:"1.1rem"},display:"flex",alignItems:"center"},children:[e.jsx(M,{size:20,color:"#8b5cf6"}),"快速配置"]}),e.jsx(a,{variant:"body2",color:"text.secondary",sx:{fontSize:{xs:"0.8rem",sm:"0.875rem"}},children:"为新手用户提供一键配置，快速创建完整的辩论场景"})]}),e.jsx(I,{}),e.jsx(t,{sx:{p:{xs:1.5,sm:2}},children:e.jsxs(t,{sx:{display:"grid",gridTemplateColumns:{xs:"1fr",md:"repeat(2, 1fr)"},gap:2},children:[e.jsxs(x,{variant:"outlined",onClick:()=>R("basic"),sx:{p:2,textAlign:"left",flexDirection:"column",alignItems:"flex-start"},children:[e.jsx(a,{variant:"subtitle1",sx:{fontWeight:600,mb:.5},children:"🎯 基础辩论"}),e.jsx(a,{variant:"caption",color:"text.secondary",children:"正方 + 反方 + 主持人（3角色）"})]}),e.jsxs(x,{variant:"outlined",onClick:()=>R("professional"),sx:{p:2,textAlign:"left",flexDirection:"column",alignItems:"flex-start"},children:[e.jsx(a,{variant:"subtitle1",sx:{fontWeight:600,mb:.5},children:"🏛️ 专业辩论"}),e.jsx(a,{variant:"caption",color:"text.secondary",children:"正方 + 反方 + 中立分析师 + 主持人（4角色）"})]}),e.jsxs(x,{variant:"outlined",onClick:()=>R("expert"),sx:{p:2,textAlign:"left",flexDirection:"column",alignItems:"flex-start"},children:[e.jsx(a,{variant:"subtitle1",sx:{fontWeight:600,mb:.5},children:"🎓 专家论坛"}),e.jsx(a,{variant:"caption",color:"text.secondary",children:"法律专家 + 经济学家 + 技术专家 + 主持人（4角色）"})]}),e.jsxs(x,{variant:"outlined",onClick:()=>R("comprehensive"),sx:{p:2,textAlign:"left",flexDirection:"column",alignItems:"flex-start"},children:[e.jsx(a,{variant:"subtitle1",sx:{fontWeight:600,mb:.5},children:"🌟 全面分析"}),e.jsx(a,{variant:"caption",color:"text.secondary",children:"6个不同角色的全方位辩论"})]})]})})]}),e.jsxs(E,{elevation:0,sx:{mb:2,borderRadius:2,border:"1px solid",borderColor:"divider",overflow:"hidden",bgcolor:"background.paper",boxShadow:"0 4px 12px rgba(0,0,0,0.05)"},children:[e.jsx(t,{sx:{p:{xs:1.5,sm:2},bgcolor:"rgba(0,0,0,0.01)"},children:e.jsxs(t,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs(t,{children:[e.jsx(a,{variant:"subtitle1",sx:{fontWeight:600,fontSize:{xs:"1rem",sm:"1.1rem"}},children:"辩论角色管理"}),e.jsx(a,{variant:"body2",color:"text.secondary",sx:{fontSize:{xs:"0.8rem",sm:"0.875rem"}},children:"创建和管理AI辩论中的各种角色"})]}),e.jsx(x,{variant:"contained",startIcon:e.jsx(V,{size:16}),onClick:me,sx:{background:"linear-gradient(90deg, #9333EA, #754AB4)",fontWeight:600,"&:hover":{background:"linear-gradient(90deg, #8324DB, #6D3CAF)"}},children:"添加角色"})]})}),e.jsx(I,{}),e.jsx(t,{sx:{p:{xs:1.5,sm:2}},children:i.roles.length===0?e.jsx(W,{severity:"info",sx:{mb:2},children:'还没有配置任何辩论角色。点击"添加角色"开始配置。'}):e.jsx(t,{sx:{display:"flex",flexDirection:"column",gap:1},children:i.roles.map(s=>e.jsxs(t,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",p:1.5,border:1,borderColor:"divider",borderLeft:`4px solid ${s.color||"#2196f3"}`,borderRadius:1,bgcolor:"background.paper",transition:"all 0.2s ease","&:hover":{bgcolor:"action.hover",borderColor:"primary.main"}},children:[e.jsxs(t,{sx:{display:"flex",alignItems:"center",flexGrow:1,minWidth:0},children:[e.jsx(M,{size:16,color:s.color||"#2196f3"}),e.jsxs(t,{sx:{minWidth:0,flexGrow:1},children:[e.jsxs(t,{sx:{display:"flex",alignItems:"center",gap:1,mb:.5},children:[e.jsx(a,{variant:"body2",sx:{fontWeight:600},children:s.name}),e.jsx(L,{label:s.stance==="pro"?"正方":s.stance==="con"?"反方":s.stance==="neutral"?"中立":s.stance==="moderator"?"主持人":"总结",size:"small",sx:{bgcolor:s.color||"#2196f3",color:"white",fontWeight:600,height:"20px",fontSize:"0.7rem"}})]}),e.jsxs(a,{variant:"caption",color:"text.secondary",sx:{display:"block"},children:[s.description," • ",s.modelId?u.find(n=>n.id===s.modelId)?.name||"未知模型":"默认模型"]})]})]}),e.jsxs(t,{sx:{display:"flex",alignItems:"center",gap:.5,ml:2},children:[e.jsx(b,{size:"small",onClick:()=>pe(s),title:"编辑角色",children:e.jsx($,{size:16})}),e.jsx(b,{size:"small",onClick:()=>he(s.id),color:"error",title:"删除角色",children:e.jsx(F,{size:16})})]})]},s.id))})})]}),e.jsxs(E,{elevation:0,sx:{mb:2,borderRadius:2,border:"1px solid",borderColor:"divider",overflow:"hidden",bgcolor:"background.paper",boxShadow:"0 4px 12px rgba(0,0,0,0.05)"},children:[e.jsx(t,{sx:{p:{xs:1.5,sm:2},bgcolor:"rgba(0,0,0,0.01)"},children:e.jsxs(t,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs(t,{children:[e.jsx(a,{variant:"subtitle1",sx:{fontWeight:600,fontSize:{xs:"1rem",sm:"1.1rem"}},children:"配置分组管理"}),e.jsx(a,{variant:"body2",color:"text.secondary",sx:{fontSize:{xs:"0.8rem",sm:"0.875rem"}},children:"保存和管理不同用途的辩论配置"})]}),e.jsx(x,{variant:"contained",startIcon:e.jsx(V,{size:16}),onClick:re,sx:{background:"linear-gradient(90deg, #f59e0b, #d97706)",fontWeight:600,"&:hover":{background:"linear-gradient(90deg, #d97706, #b45309)"}},children:"新建分组"})]})}),e.jsx(I,{}),e.jsx(t,{sx:{p:{xs:1.5,sm:2}},children:g.length===0?e.jsx(W,{severity:"info",children:'还没有保存任何配置分组。点击"新建分组"开始创建。'}):e.jsx(t,{sx:{display:"flex",flexDirection:"column",gap:1},children:g.map(s=>e.jsxs(t,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",p:1.5,border:1,borderColor:"divider",borderRadius:1,bgcolor:"background.paper",transition:"all 0.2s ease","&:hover":{bgcolor:"action.hover",borderColor:"primary.main"}},children:[e.jsxs(t,{sx:{display:"flex",alignItems:"center",flexGrow:1,minWidth:0},children:[e.jsx(ze,{size:16,color:"text.secondary"}),e.jsxs(t,{sx:{minWidth:0,flexGrow:1},children:[e.jsx(a,{variant:"body2",sx:{fontWeight:600,mb:.5},children:s.name}),e.jsxs(a,{variant:"caption",color:"text.secondary",sx:{display:"block"},children:[s.config.roles.length," 个角色 • ",new Date(s.updatedAt).toLocaleDateString()]})]})]}),e.jsxs(t,{sx:{display:"flex",alignItems:"center",gap:.5,ml:2},children:[e.jsx(x,{size:"small",onClick:()=>de(s),variant:"outlined",sx:{minWidth:"auto",px:1},children:"加载"}),e.jsx(b,{size:"small",onClick:()=>ae(s),title:"编辑",children:e.jsx($,{size:16})}),e.jsx(b,{size:"small",onClick:()=>ce(s.id),title:"保存当前配置到此分组",color:"primary",children:e.jsx(q,{size:16})}),e.jsx(b,{size:"small",onClick:()=>{P(null),D(`${s.name} - 副本`),A(`基于 ${s.name} 创建的副本`),j(!0)},title:"复制",children:e.jsx(De,{size:16})}),e.jsx(b,{size:"small",onClick:()=>le(s.id),color:"error",title:"删除",children:e.jsx(F,{size:16})})]})]},s.id))})})]})]}),e.jsxs(X,{open:te,onClose:()=>C(!1),maxWidth:"md",fullWidth:!0,children:[e.jsx(K,{children:k?"编辑角色":"添加新角色"}),e.jsxs(Y,{children:[!k&&e.jsxs(t,{sx:{mb:3},children:[e.jsx(a,{variant:"subtitle2",sx:{mb:1},children:"快速模板："}),e.jsx(t,{sx:{display:"flex",gap:1,flexWrap:"wrap"},children:d.map((s,n)=>e.jsx(L,{label:s.name,onClick:()=>be(s),sx:{bgcolor:s.color,color:"white"}},n))}),e.jsx(I,{sx:{my:2}})]}),e.jsxs(t,{sx:{display:"grid",gap:2},children:[e.jsx(f,{label:"角色名称",value:l.name||"",onChange:s=>p({...l,name:s.target.value}),required:!0}),e.jsx(f,{label:"角色描述",value:l.description||"",onChange:s=>p({...l,description:s.target.value}),multiline:!0,rows:2}),e.jsxs(Ae,{sx:{mb:2},children:[e.jsx(Re,{children:"角色立场"}),e.jsxs(Ee,{value:l.stance||"pro",onChange:s=>p({...l,stance:s.target.value}),children:[e.jsx(S,{value:"pro",children:"正方"}),e.jsx(S,{value:"con",children:"反方"}),e.jsx(S,{value:"neutral",children:"中立"}),e.jsx(S,{value:"moderator",children:"主持人"}),e.jsx(S,{value:"summary",children:"总结"})]})]}),e.jsxs(t,{sx:{mb:2},children:[e.jsx(a,{variant:"subtitle2",sx:{mb:1},children:"指定模型（可选）"}),e.jsx(Ne,{selectedModel:u.find(s=>s.id===l.modelId)||null,availableModels:u,handleModelSelect:s=>p({...l,modelId:s?.id||""})}),e.jsx(a,{variant:"caption",color:"text.secondary",sx:{mt:.5,display:"block"},children:"留空则使用默认模型"})]}),e.jsx(f,{label:"系统提示词",value:l.systemPrompt||"",onChange:s=>p({...l,systemPrompt:s.target.value}),multiline:!0,rows:6,required:!0,helperText:"定义这个AI角色的行为、立场和回应风格"}),e.jsxs(t,{children:[e.jsx(a,{variant:"subtitle2",sx:{mb:1},children:"角色颜色"}),e.jsx("input",{type:"color",value:l.color||"#2196f3",onChange:s=>p({...l,color:s.target.value}),style:{width:"100%",height:"40px",border:"none",borderRadius:"4px"}})]})]})]}),e.jsxs(H,{children:[e.jsx(x,{onClick:()=>C(!1),children:"取消"}),e.jsx(x,{onClick:ue,variant:"contained",disabled:!l.name||!l.systemPrompt,children:"保存"})]})]}),e.jsxs(X,{open:oe,onClose:()=>j(!1),maxWidth:"sm",fullWidth:!0,children:[e.jsx(K,{children:v?"编辑配置分组":"新建配置分组"}),e.jsx(Y,{children:e.jsxs(t,{sx:{display:"grid",gap:2,mt:1},children:[e.jsx(f,{label:"分组名称",value:y,onChange:s=>D(s.target.value),required:!0,placeholder:"例如：学术辩论、商业分析、技术讨论"}),e.jsx(f,{label:"分组描述",value:O,onChange:s=>A(s.target.value),multiline:!0,rows:3,placeholder:"描述这个配置分组的用途和特点"}),!v&&e.jsx(W,{severity:"info",children:"将保存当前的所有配置（包括角色设置、轮数限制等）到这个分组中。"})]})}),e.jsxs(H,{children:[e.jsx(x,{onClick:()=>j(!1),children:"取消"}),e.jsx(x,{onClick:ie,variant:"contained",disabled:!y.trim(),startIcon:e.jsx(q,{size:20}),children:v?"保存修改":"创建分组"})]})]})]})};export{We as default};
