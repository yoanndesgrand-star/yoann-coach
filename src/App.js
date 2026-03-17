import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════ */
const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { min-height: 100vh; font-family: 'DM Sans', sans-serif; background: #f5f0e8; color: #1a1a1a; }
  .app { min-height: 100vh; background: linear-gradient(145deg, #f5f0e8 0%, #ede8dc 50%, #f0ece3 100%); }
  .df { font-family: 'Cormorant Garamond', serif; }

  .btn { border: none; border-radius: 5px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; letter-spacing: 0.07em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 8px; }
  .btn-p  { background: #1a2e1a; color: #f5f0e8; padding: 13px 30px; font-size: 13px; }
  .btn-p:hover  { background: #2d4a2d; transform: translateY(-1px); }
  .btn-p:disabled { background: #ccc; cursor: not-allowed; transform: none; }
  .btn-s  { background: transparent; color: #1a2e1a; border: 1px solid #1a2e1a; padding: 11px 24px; font-size: 13px; }
  .btn-s:hover  { background: #1a2e1a; color: #f5f0e8; }
  .btn-d  { background: transparent; color: #8b2a2a; border: 1px solid #8b2a2a; padding: 8px 16px; font-size: 12px; }
  .btn-d:hover  { background: #8b2a2a; color: white; }
  .btn-g  { background: #b8962e; color: #fff; border: none; padding: 9px 18px; font-size: 12px; }
  .btn-g:hover  { background: #9a7a22; }
  .btn-gcal { background: #fff; color: #1a1a1a; border: 1px solid #d0ccbf; padding: 11px 22px; font-size: 13px; border-radius: 5px; font-family: 'DM Sans',sans-serif; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 10px; }
  .btn-gcal:hover { border-color: #4285F4; color: #4285F4; }
  .btn-gcal:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-sms { background: #25D366; color: white; border: none; padding: 10px 20px; font-size: 13px; border-radius: 5px; font-family: 'DM Sans',sans-serif; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; }
  .btn-sms:hover { background: #1eb558; }
  .btn-sms:disabled { background: #ccc; cursor: not-allowed; }

  .card { background: rgba(255,255,255,0.72); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.92); border-radius: 14px; padding: 28px; }

  .tag { padding: 3px 11px; border-radius: 20px; font-size: 11px; font-weight: 500; letter-spacing: 0.05em; white-space: nowrap; }
  .tag-green { background: #e8f5e8; color: #2d6a2d; }
  .tag-red   { background: #fde8e8; color: #8b2a2a; }
  .tag-gold  { background: #fdf3d8; color: #8a6820; }
  .tag-blue  { background: #e8f0fe; color: #1a73e8; }
  .tag-gray  { background: #f0ece3; color: #888; }

  .field { display: flex; flex-direction: column; gap: 6px; }
  .field label { font-size: 11px; color: #888; letter-spacing: 0.08em; text-transform: uppercase; }
  .input { width: 100%; padding: 12px 16px; border: 1px solid #d5cfc3; border-radius: 6px; background: rgba(255,255,255,0.85); font-family: 'DM Sans',sans-serif; font-size: 14px; color: #1a1a1a; outline: none; transition: border-color 0.2s; }
  .input:focus { border-color: #1a2e1a; }
  select.input { cursor: pointer; }

  .tabs { display: flex; gap: 4px; background: rgba(255,255,255,0.5); padding: 6px; border-radius: 10px; margin-bottom: 28px; flex-wrap: wrap; }
  .tab { flex: 1; min-width: 100px; padding: 10px 12px; border: none; border-radius: 7px; background: transparent; font-family: 'DM Sans',sans-serif; font-size: 13px; color: #666; cursor: pointer; transition: all 0.2s; text-align: center; white-space: nowrap; }
  .tab.on { background: #1a2e1a; color: #f5f0e8; }
  .tab:hover:not(.on) { background: rgba(26,46,26,0.08); }

  .cal-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 4px; margin-top: 12px; }
  .cal-d { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 13px; cursor: default; transition: all 0.15s; }
  .cal-d.free { background: #e8f0e8; color: #1a2e1a; cursor: pointer; font-weight: 500; }
  .cal-d.free:hover { background: #d0e4d0; }
  .cal-d.sel { background: #1a2e1a !important; color: #f5f0e8 !important; }
  .cal-d.now { border: 2px solid #b8962e; }
  .cal-d.past { opacity: 0.3; }

  .slot { padding: 10px 16px; border-radius: 8px; border: 1px solid #d5cfc3; background: rgba(255,255,255,0.8); cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .slot:hover:not(.na) { border-color: #1a2e1a; background: white; }
  .slot.na { opacity: 0.4; cursor: not-allowed; }
  .slot.pick { border-color: #1a2e1a; background: #f0f5f0; }

  .badge { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg,#b8962e,#d4b04a); display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: 700; box-shadow: 0 4px 12px rgba(184,150,46,0.4); font-family: 'Cormorant Garamond',serif; flex-shrink: 0; }

  .notif { position: fixed; top: 20px; right: 20px; padding: 14px 20px; border-radius: 10px; font-size: 14px; z-index: 1000; box-shadow: 0 8px 24px rgba(0,0,0,0.2); animation: sIn 0.3s ease; max-width: 320px; line-height: 1.4; }
  .notif.ok   { background: #1a2e1a; color: #f5f0e8; }
  .notif.err  { background: #8b2a2a; color: white; }
  .notif.info { background: #1a73e8; color: white; }
  @keyframes sIn { from { transform: translateX(120%); opacity:0; } to { transform: translateX(0); opacity:1; } }

  .row { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: rgba(255,255,255,0.6); border-radius: 8px; border: 1px solid rgba(255,255,255,0.9); gap: 12px; flex-wrap: wrap; }
  .divider { height: 1px; background: linear-gradient(to right,transparent,#d5cfc3,transparent); margin: 20px 0; }
  .logo { width: 36px; height: 36px; background: linear-gradient(135deg,#1a2e1a,#2d4a2d); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #b8962e; font-size: 16px; font-family: 'Cormorant Garamond',serif; font-weight: 600; flex-shrink: 0; }

  .avatar { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg,#1a2e1a,#2d4a2d); display: flex; align-items: center; justify-content: center; color: #b8962e; font-family: 'Cormorant Garamond',serif; font-size: 20px; font-weight: 600; flex-shrink: 0; }

  .gcal-banner { background: linear-gradient(135deg,#e8f0fe,#f0f4ff); border: 1px solid #c5d5f8; border-radius: 10px; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  .spin { animation: rot 1s linear infinite; display: inline-block; }
  @keyframes rot { from {transform:rotate(0deg);} to {transform:rotate(360deg);} }
  .sms-preview { background: #f0ece3; border-radius: 12px; padding: 12px 16px; font-size: 13px; color: #444; border-left: 3px solid #25D366; font-style: italic; margin-top: 10px; }

  .hist-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-radius: 8px; gap: 12px; flex-wrap: wrap; }
  .hist-row.future { background: rgba(232,245,232,0.6); border: 1px solid rgba(200,232,200,0.8); }
  .hist-row.past-ok { background: rgba(255,255,255,0.5); border: 1px solid rgba(220,220,210,0.7); }
  .hist-row.cancelled { background: rgba(253,232,232,0.4); border: 1px solid rgba(220,180,180,0.5); opacity: 0.7; }

  .stat-box { background: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.9); border-radius: 10px; padding: 16px 20px; text-align: center; }

  .password-strength { height: 4px; border-radius: 2px; margin-top: 6px; transition: all 0.3s; }
`;

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
const DAYS_FR   = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
const MONTHS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

const fmt  = d => { const x=new Date(d); return `${x.getDate()} ${MONTHS_FR[x.getMonth()]} ${x.getFullYear()}`; };
const fmtS = d => { const x=new Date(d); return `${String(x.getDate()).padStart(2,'0')}/${String(x.getMonth()+1).padStart(2,'0')}/${x.getFullYear()}`; };

function hoursUntil(dateStr, timeStr) {
  const [h,m] = timeStr.split(':').map(Number);
  const d = new Date(dateStr); d.setHours(h,m,0,0);
  return (d - new Date()) / 3600000;
}
const freeCancelable = (ds,ts) => hoursUntil(ds,ts) > 12;
const isFuture       = (ds,ts) => hoursUntil(ds,ts) > 0;

const today = new Date();
function makeDate(days, h) {
  const d = new Date(today); d.setDate(d.getDate()+days); d.setHours(0,0,0,0);
  return { dateStr: d.toISOString().split('T')[0], timeStr: `${String(h).padStart(2,'0')}:00` };
}

function hashPwd(p) {
  let h = 0;
  for (let i=0; i<p.length; i++) { h = ((h<<5)-h)+p.charCodeAt(i); h|=0; }
  return h.toString(36);
}

function pwdStrength(p) {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

function initials(name) {
  return name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
}

/* ═══════════════════════════════════════════════════════════════
   INITIAL DATA
═══════════════════════════════════════════════════════════════ */
let sid = 200;
const INIT_SLOTS = [
  { id:`s${sid++}`, ...makeDate(1,9),  duration:60, booked:false, bookedBy:null, blockedByGcal:false, gcalEvent:null },
  { id:`s${sid++}`, ...makeDate(1,11), duration:60, booked:false, bookedBy:null, blockedByGcal:false, gcalEvent:null },
  { id:`s${sid++}`, ...makeDate(1,14), duration:60, booked:false, bookedBy:null, blockedByGcal:false, gcalEvent:null },
  { id:`s${sid++}`, ...makeDate(2,9),  duration:60, booked:false, bookedBy:null, blockedByGcal:false, gcalEvent:null },
  { id:`s${sid++}`, ...makeDate(2,16), duration:60, booked:false, bookedBy:null, blockedByGcal:false, gcalEvent:null },
  { id:`s${sid++}`, ...makeDate(3,10), duration:60, booked:false, bookedBy:null, blockedByGcal:false, gcalEvent:null },
  { id:`s${sid++}`, ...makeDate(3,18), duration:60, booked:false, bookedBy:null, blockedByGcal:false, gcalEvent:null },
  { id:`s${sid++}`, ...makeDate(5,9),  duration:60, booked:false, bookedBy:null, blockedByGcal:false, gcalEvent:null },
  { id:`s${sid++}`, ...makeDate(5,11), duration:60, booked:false, bookedBy:null, blockedByGcal:false, gcalEvent:null },
  { id:`s${sid++}`, ...makeDate(6,14), duration:60, booked:false, bookedBy:null, blockedByGcal:false, gcalEvent:null },
  { id:`s${sid++}`, ...makeDate(7,9),  duration:60, booked:false, bookedBy:null, blockedByGcal:false, gcalEvent:null },
  { id:`s${sid++}`, ...makeDate(7,11), duration:60, booked:false, bookedBy:null, blockedByGcal:false, gcalEvent:null },
  // Quelques séances passées pour démo historique
  { id:`s${sid++}`, ...makeDate(-7,10), duration:60, booked:true, bookedBy:'demo', blockedByGcal:false, gcalEvent:null },
  { id:`s${sid++}`, ...makeDate(-14,9), duration:60, booked:true, bookedBy:'demo', blockedByGcal:false, gcalEvent:null },
];

const DEMO_CLIENT = {
  id:'demo', name:'Sophie Martin', email:'sophie@demo.com', phone:'+33612345678',
  pwdHash: hashPwd('demo1234'), credits:5, createdAt: Date.now() - 30*24*3600000
};

/* ═══════════════════════════════════════════════════════════════
   NOTIFICATION HOOK
═══════════════════════════════════════════════════════════════ */
function useNotif() {
  const [n, setN] = useState(null);
  const show = (msg, type='ok') => { setN({msg,type}); setTimeout(()=>setN(null),4000); };
  return [n, show];
}

/* ═══════════════════════════════════════════════════════════════
   STORAGE HELPERS
═══════════════════════════════════════════════════════════════ */
async function storageGet(key) {
  try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; }
  catch { return null; }
}
async function storageSet(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
}

/* ═══════════════════════════════════════════════════════════════
   LOGIN / SIGNUP SCREEN
═══════════════════════════════════════════════════════════════ */
function AuthScreen({ onLogin, clients, setClients }) {
  const [mode, setMode] = useState('login'); // login | signup | forgot
  const [form, setForm] = useState({ name:'', email:'', phone:'', pwd:'', pwd2:'' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const f = (k,v) => { setForm(p=>({...p,[k]:v})); setErr(''); };
  const str = pwdStrength(form.pwd);
  const strColor = ['#eee','#e74c3c','#e67e22','#2ecc71','#1a7a3a'][str];

  const handleLogin = async () => {
    if (!form.email || !form.pwd) return setErr('Remplis tous les champs.');
    setLoading(true);
    await new Promise(r=>setTimeout(r,400));

    // Check stored clients first, then in-memory
    const storedClients = await storageGet('clients') || clients;
    const found = storedClients.find(c => c.email.toLowerCase() === form.email.toLowerCase());
    if (!found) { setErr('Aucun compte trouvé avec cet email.'); setLoading(false); return; }
    if (found.pwdHash !== hashPwd(form.pwd)) { setErr('Mot de passe incorrect.'); setLoading(false); return; }
    onLogin({ type:'client', ...found });
    setLoading(false);
  };

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.pwd) return setErr('Remplis tous les champs obligatoires.');
    if (form.pwd !== form.pwd2) return setErr('Les mots de passe ne correspondent pas.');
    if (str < 2) return setErr('Mot de passe trop faible (8 caract. min, majuscule ou chiffre).');
    setLoading(true);
    await new Promise(r=>setTimeout(r,400));

    const storedClients = await storageGet('clients') || clients;
    if (storedClients.find(c => c.email.toLowerCase() === form.email.toLowerCase())) {
      setErr('Un compte existe déjà avec cet email.'); setLoading(false); return;
    }
    const newClient = {
      id: `c${Date.now()}`, name: form.name.trim(), email: form.email.trim(),
      phone: form.phone.trim(), pwdHash: hashPwd(form.pwd), credits: 0, createdAt: Date.now()
    };
    const updated = [...storedClients, newClient];
    setClients(updated);
    await storageSet('clients', updated);
    onLogin({ type:'client', ...newClient });
    setLoading(false);
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ width:'100%', maxWidth:430 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ display:'flex', justifyContent:'center', marginBottom:16 }}>
            <div className="logo" style={{ width:60, height:60, fontSize:28, borderRadius:14 }}>Y</div>
          </div>
          <h1 className="df" style={{ fontSize:38, fontWeight:300, color:'#1a2e1a', letterSpacing:'0.02em' }}>Yoann Coach</h1>
          <p style={{ color:'#999', fontSize:13, marginTop:8, letterSpacing:'0.06em' }}></p>
          <p style={{ color:'#aaa', fontSize:12, marginTop:4 }}>Le 33 Fauche · Paris 16e</p>
        </div>

        <div className="card">
          {/* Mode switcher */}
          {mode !== 'forgot' && (
            <div style={{ display:'flex', gap:8, marginBottom:28, background:'#f0ece3', padding:5, borderRadius:8 }}>
              {[['login','Se connecter'],['signup','Créer un compte']].map(([m,l])=>(
                <button key={m} onClick={()=>{setMode(m);setErr('');}} style={{
                  flex:1, padding:'10px', border:'none', borderRadius:6,
                  background: mode===m?'white':'transparent', color: mode===m?'#1a2e1a':'#999',
                  fontFamily:"'DM Sans',sans-serif", fontSize:13, cursor:'pointer',
                  fontWeight: mode===m?500:400, boxShadow: mode===m?'0 1px 4px rgba(0,0,0,0.1)':'none',
                  transition:'all 0.2s', textTransform:'uppercase', letterSpacing:'0.05em'
                }}>{l}</button>
              ))}
            </div>
          )}

          {/* ── LOGIN ── */}
          {mode === 'login' && (
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div className="field">
                <label>Email</label>
                <input className="input" type="email" placeholder="sophie@email.com" value={form.email} onChange={e=>f('email',e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
              </div>
              <div className="field">
                <label>Mot de passe</label>
                <div style={{ position:'relative' }}>
                  <input className="input" type={showPwd?'text':'password'} placeholder="••••••••" value={form.pwd} onChange={e=>f('pwd',e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} style={{ paddingRight:44 }}/>
                  <button onClick={()=>setShowPwd(p=>!p)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16, color:'#aaa' }}>{showPwd?'🙈':'👁'}</button>
                </div>
              </div>
              {err && <p style={{ color:'#8b2a2a', fontSize:13 }}>{err}</p>}
              <button className="btn btn-p" onClick={handleLogin} disabled={loading} style={{ marginTop:6, justifyContent:'center' }}>
                {loading ? <><span className="spin">⟳</span> Connexion...</> : 'Se connecter'}
              </button>
              <p style={{ fontSize:12, textAlign:'center', color:'#aaa' }}>
                <span onClick={()=>{setMode('forgot');setErr('');}} style={{ cursor:'pointer', textDecoration:'underline', color:'#b8962e' }}>Mot de passe oublié ?</span>
              </p>
              <div className="divider"/>
              <p style={{ fontSize:12, color:'#bbb', textAlign:'center' }}>Démo client : <strong>sophie@demo.com</strong> / <strong>demo1234</strong></p>
              <p style={{ fontSize:12, color:'#bbb', textAlign:'center' }}>Admin : mot de passe <strong>yoann33</strong></p>
            </div>
          )}

          {/* ── SIGNUP ── */}
          {mode === 'signup' && (
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div className="field">
                <label>Prénom et Nom *</label>
                <input className="input" type="text" placeholder="Sophie Martin" value={form.name} onChange={e=>f('name',e.target.value)}/>
              </div>
              <div className="field">
                <label>Email *</label>
                <input className="input" type="email" placeholder="sophie@email.com" value={form.email} onChange={e=>f('email',e.target.value)}/>
              </div>
              <div className="field">
                <label>Téléphone (pour les rappels SMS)</label>
                <input className="input" type="tel" placeholder="+33612345678" value={form.phone} onChange={e=>f('phone',e.target.value)}/>
              </div>
              <div className="field">
                <label>Mot de passe *</label>
                <div style={{ position:'relative' }}>
                  <input className="input" type={showPwd?'text':'password'} placeholder="Minimum 8 caractères" value={form.pwd} onChange={e=>f('pwd',e.target.value)} style={{ paddingRight:44 }}/>
                  <button onClick={()=>setShowPwd(p=>!p)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16, color:'#aaa' }}>{showPwd?'🙈':'👁'}</button>
                </div>
                {form.pwd && (
                  <>
                    <div className="password-strength" style={{ background:strColor, width:`${str*25}%` }}/>
                    <span style={{ fontSize:11, color:strColor }}>{['','Trop faible','Faible','Correct','Fort'][str]}</span>
                  </>
                )}
              </div>
              <div className="field">
                <label>Confirmer le mot de passe *</label>
                <input className="input" type="password" placeholder="••••••••" value={form.pwd2} onChange={e=>f('pwd2',e.target.value)}/>
                {form.pwd2 && form.pwd !== form.pwd2 && <span style={{ fontSize:11, color:'#e74c3c' }}>Les mots de passe ne correspondent pas</span>}
              </div>
              {err && <p style={{ color:'#8b2a2a', fontSize:13 }}>{err}</p>}
              <button className="btn btn-p" onClick={handleSignup} disabled={loading} style={{ marginTop:8, justifyContent:'center' }}>
                {loading ? <><span className="spin">⟳</span> Création...</> : 'Créer mon compte'}
              </button>
              <p style={{ fontSize:12, color:'#aaa', textAlign:'center' }}>
                Déjà un compte ? <span onClick={()=>{setMode('login');setErr('');}} style={{ cursor:'pointer', textDecoration:'underline', color:'#1a2e1a' }}>Se connecter</span>
              </p>
            </div>
          )}

          {/* ── FORGOT ── */}
          {mode === 'forgot' && (
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div style={{ textAlign:'center' }}>
                <p className="df" style={{ fontSize:24, fontWeight:400, marginBottom:8 }}>Mot de passe oublié</p>
                <p style={{ fontSize:13, color:'#888' }}>En version démo, contactez directement Yoann pour réinitialiser votre mot de passe.</p>
              </div>
              <div className="field">
                <label>Votre email</label>
                <input className="input" type="email" placeholder="sophie@email.com" value={form.email} onChange={e=>f('email',e.target.value)}/>
              </div>
              <button className="btn btn-p" style={{ justifyContent:'center' }} onClick={()=>{ if(form.email) { alert(`Un email de réinitialisation sera envoyé à ${form.email} (fonctionnalité prod)`); setMode('login'); }}}>
                Envoyer un lien
              </button>
              <p style={{ fontSize:12, textAlign:'center' }}>
                <span onClick={()=>setMode('login')} style={{ cursor:'pointer', color:'#888', textDecoration:'underline' }}>← Retour à la connexion</span>
              </p>
            </div>
          )}
        </div>

        {/* Admin shortcut */}
        <p style={{ textAlign:'center', marginTop:20, fontSize:12, color:'#bbb' }}>
          Admin ? <span style={{ cursor:'pointer', textDecoration:'underline', color:'#888' }} onClick={()=>{
            const p = prompt('Mot de passe admin :');
            if (p==='yoann33'||p==='admin') onLogin({type:'admin'});
            else if(p!==null) alert('Mot de passe incorrect');
          }}>Connexion admin →</span>
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CLIENT VIEW
═══════════════════════════════════════════════════════════════ */
function ClientView({ user, slots, bookings, onBook, onCancel, onLogout, onUpdateProfile }) {
  const [tab, setTab] = useState('book');
  const [selDate, setSelDate] = useState(null);
  const [selSlot, setSelSlot] = useState(null);
  const [calMonth, setCalMonth] = useState(new Date());
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ name:user.name, phone:user.phone||'' });
  const [, showNotif] = useNotif();

  const myBookings = bookings.filter(b => b.clientId===user.id);
  const myConfirmed = myBookings.filter(b => b.status==='confirmed');
  const myFuture = myConfirmed.filter(b => { const s=slots.find(sl=>sl.id===b.slotId); return s&&isFuture(s.dateStr,s.timeStr); });
  const myPast   = myBookings.filter(b => { const s=slots.find(sl=>sl.id===b.slotId); return s&&!isFuture(s.dateStr,s.timeStr); });

  const year=calMonth.getFullYear(), month=calMonth.getMonth();
  const firstDay=new Date(year,month,1), lastDay=new Date(year,month+1,0);
  const startDow=(firstDay.getDay()+6)%7;
  const days=[]; for(let i=0;i<startDow;i++)days.push(null); for(let d=1;d<=lastDay.getDate();d++)days.push(d);
  const todayStr=today.toISOString().split('T')[0];
  const freeDates=new Set(slots.filter(s=>!s.booked&&!s.blockedByGcal&&isFuture(s.dateStr,s.timeStr)).map(s=>s.dateStr));
  const ds=d=>new Date(year,month,d).toISOString().split('T')[0];
  const slotsOnDay=slots.filter(s=>s.dateStr===selDate);

  return (
    <div style={{ maxWidth:740, margin:'0 auto', padding:'20px 16px' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <img src="/logo.jpg" alt="logo" style={{width:40,height:40,borderRadius:"50%",objectFit:"cover"}} />
          <div>
            <h2 className="df" style={{ fontSize:22, fontWeight:400 }}>Yoann Coach</h2>
            <p style={{ fontSize:12, color:'#888' }}>Le 33 Fauche · Paris 16e</p>
          </div>
        </div>
        <button onClick={onLogout} style={{ background:'none', border:'1px solid #d5cfc3', borderRadius:6, padding:'8px 14px', fontSize:12, color:'#888', cursor:'pointer' }}>Déconnexion</button>
      </div>

      <div className="tabs">
        <button className={`tab ${tab==='book'?'on':''}`} onClick={()=>setTab('book')}>📅 Réserver</button>
        <button className={`tab ${tab==='upcoming'?'on':''}`} onClick={()=>setTab('upcoming')}>À venir {myFuture.length>0&&`(${myFuture.length})`}</button>
        <button className={`tab ${tab==='history'?'on':''}`} onClick={()=>setTab('history')}>Historique</button>
        <button className={`tab ${tab==='account'?'on':''}`} onClick={()=>setTab('account')}>Mon compte</button>
      </div>

      {/* ── RÉSERVER ── */}
      {tab==='book' && (
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <div className="card">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <h3 className="df" style={{ fontSize:22, fontWeight:400 }}>{MONTHS_FR[month]} {year}</h3>
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={()=>setCalMonth(new Date(year,month-1,1))} style={{ background:'none', border:'1px solid #d5cfc3', borderRadius:6, width:32, height:32, cursor:'pointer', fontSize:16 }}>‹</button>
                <button onClick={()=>setCalMonth(new Date(year,month+1,1))} style={{ background:'none', border:'1px solid #d5cfc3', borderRadius:6, width:32, height:32, cursor:'pointer', fontSize:16 }}>›</button>
              </div>
            </div>
            <div className="cal-grid">
              {DAYS_FR.map(d=><div key={d} style={{ textAlign:'center', fontSize:11, color:'#aaa', letterSpacing:'0.05em', padding:'4px 0', textTransform:'uppercase' }}>{d}</div>)}
              {days.map((d,i)=>{
                if(!d) return <div key={`e${i}`}/>;
                const s=ds(d), isPast=s<todayStr, hasFree=freeDates.has(s);
                return <div key={d}
                  className={`cal-d ${hasFree&&!isPast?'free':''} ${s===selDate?'sel':''} ${isPast?'past':''} ${s===todayStr?'now':''}`}
                  onClick={()=>{if(hasFree&&!isPast){setSelDate(s);setSelSlot(null);}}}>
                  {d}
                </div>;
              })}
            </div>
          </div>

          {selDate && (
            <div className="card">
              <h3 style={{ fontSize:15, fontWeight:500, marginBottom:16 }}>{fmt(selDate)}</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {slotsOnDay.map(s=>{
                  const na=s.booked||s.blockedByGcal;
                  return (
                    <div key={s.id} className={`slot ${na?'na':''} ${selSlot?.id===s.id?'pick':''}`} onClick={()=>!na&&setSelSlot(s)}>
                      <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                        <span style={{ fontSize:20, fontFamily:"'Cormorant Garamond',serif", color:na?'#aaa':'#1a2e1a' }}>{s.timeStr}</span>
                        <span style={{ fontSize:13, color:'#888' }}>{s.duration} min</span>
                      </div>
                      {s.blockedByGcal?<span className="tag tag-blue">📅 Indisponible</span>:s.booked?<span className="tag tag-gray">Réservé</span>:<span className="tag tag-green">1 crédit</span>}
                    </div>
                  );
                })}
              </div>
              {selSlot && (
                <div style={{ marginTop:20 }}>
                  <div className="divider"/>
                  <div style={{ background:'#f0f5f0', borderRadius:8, padding:'14px 16px', marginBottom:16 }}>
                    <p style={{ fontSize:14, color:'#1a2e1a' }}>
                      <strong>{fmt(selDate)}</strong> à <strong>{selSlot.timeStr}</strong> · {selSlot.duration} min
                    </p>
                    <p style={{ fontSize:12, color:'#888', marginTop:4 }}>Annulation gratuite jusqu'à <strong>12h avant</strong> la séance.</p>
                  </div>
                  {user.credits<1 && <p style={{ color:'#8b2a2a', fontSize:13, marginBottom:12 }}>⚠ Crédits insuffisants. Contactez Yoann.</p>}
                  <button className="btn btn-p" disabled={user.credits<1} style={{ width:'100%', justifyContent:'center' }}
                    onClick={()=>{onBook(selSlot);setSelSlot(null);setSelDate(null);}}>
                    Confirmer — 1 crédit
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── À VENIR ── */}
      {tab==='upcoming' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {myFuture.length===0 ? (
            <div className="card" style={{ textAlign:'center', padding:48 }}>
              <p className="df" style={{ fontSize:26, color:'#aaa', fontWeight:300 }}>Aucune séance à venir</p>
              <p style={{ fontSize:13, color:'#bbb', marginTop:10 }}>Réservez un créneau dans l'onglet "Réserver".</p>
              <button className="btn btn-s" style={{ marginTop:20 }} onClick={()=>setTab('book')}>Voir les créneaux →</button>
            </div>
          ) : myFuture.map(b=>{
            const slot=slots.find(s=>s.id===b.slotId); if(!slot) return null;
            const freeC=freeCancelable(slot.dateStr,slot.timeStr);
            const h=Math.round(hoursUntil(slot.dateStr,slot.timeStr));
            return (
              <div key={b.id} className="hist-row future">
                <div>
                  <p style={{ fontWeight:600, fontSize:15 }}>{fmt(slot.dateStr)} à {slot.timeStr}</p>
                  <p style={{ fontSize:12, color:'#555', marginTop:3 }}>{slot.duration} min · Le 33 Fauche</p>
                  <p style={{ fontSize:11, color:'#888', marginTop:2 }}>
                    {h<24 ? `Dans ${h}h` : `Dans ${Math.round(h/24)} jour(s)`}
                    {!freeC && <span style={{ color:'#e67e22' }}> · Annulation payante</span>}
                  </p>
                </div>
                <button className="btn btn-d" onClick={()=>onCancel(b,slot)}>
                  {freeC?'Annuler':'Annuler (−1 crédit)'}
                </button>
              </div>
            );
          })}
          <div style={{ background:'rgba(184,150,46,0.08)', border:'1px solid rgba(184,150,46,0.3)', borderRadius:10, padding:'14px 18px' }}>
            <p style={{ fontSize:12, color:'#8a6820' }}>💡 <strong>Politique d'annulation :</strong> gratuite jusqu'à 12h avant. Au-delà, 1 crédit est débité.</p>
          </div>
        </div>
      )}

      {/* ── HISTORIQUE ── */}
      {tab==='history' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {[
              {n:myBookings.filter(b=>b.status==='confirmed').length, l:'Séances réservées', icon:'🏋️'},
              {n:myPast.filter(b=>b.status==='confirmed').length, l:'Séances effectuées', icon:'✅'},
              {n:myBookings.filter(b=>b.status==='cancelled').length, l:'Annulations', icon:'❌'},
            ].map(({n,l,icon})=>(
              <div key={l} className="stat-box">
                <p style={{ fontSize:24 }}>{icon}</p>
                <p className="df" style={{ fontSize:28, fontWeight:600, color:'#1a2e1a', margin:'4px 0' }}>{n}</p>
                <p style={{ fontSize:11, color:'#888', letterSpacing:'0.04em' }}>{l}</p>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 className="df" style={{ fontSize:20, fontWeight:400, marginBottom:16 }}>Toutes mes séances</h3>
            {myPast.length===0 ? <p style={{ color:'#aaa', fontSize:14 }}>Aucune séance passée.</p> : (
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[...myPast].reverse().map(b=>{
                  const slot=slots.find(s=>s.id===b.slotId); if(!slot) return null;
                  const done=b.status==='confirmed';
                  return (
                    <div key={b.id} className={`hist-row ${done?'past-ok':'cancelled'}`}>
                      <div>
                        <p style={{ fontWeight:500 }}>{fmt(slot.dateStr)} · {slot.timeStr}</p>
                        <p style={{ fontSize:12, color:'#888', marginTop:2 }}>{slot.duration} min</p>
                      </div>
                      <span className={`tag ${done?'tag-gold':'tag-red'}`}>
                        {done?'✓ Effectuée':'Annulée'+(b.creditLost?' (crédit perdu)':'')}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MON COMPTE ── */}
      {tab==='account' && (
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {/* Credit card */}
          <div style={{ background:'linear-gradient(135deg,#1a2e1a,#2d4a2d)', borderRadius:16, padding:'28px 32px', color:'white' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <p style={{ fontSize:11, opacity:0.6, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:6 }}>Solde de crédits</p>
                <p className="df" style={{ fontSize:64, fontWeight:600, lineHeight:1, color:'#d4b04a' }}>{user.credits}</p>
                <p style={{ fontSize:13, opacity:0.7, marginTop:8 }}>crédit{user.credits!==1?'s':''} restant{user.credits!==1?'s':''}</p>
              </div>
              <div className="logo" style={{ width:48, height:48, fontSize:22, borderRadius:12 }}>Y</div>
            </div>
            <div className="divider" style={{ background:'rgba(255,255,255,0.15)' }}/>
            <div style={{ display:'flex', gap:28 }}>
              <div>
                <p style={{ fontSize:11, opacity:0.5, letterSpacing:'0.08em', textTransform:'uppercase' }}>Séances à venir</p>
                <p style={{ fontSize:20, fontWeight:500, marginTop:2 }}>{myFuture.length}</p>
              </div>
              <div>
                <p style={{ fontSize:11, opacity:0.5, letterSpacing:'0.08em', textTransform:'uppercase' }}>Séances totales</p>
                <p style={{ fontSize:20, fontWeight:500, marginTop:2 }}>{myBookings.filter(b=>b.status==='confirmed').length}</p>
              </div>
              <div>
                <p style={{ fontSize:11, opacity:0.5, letterSpacing:'0.08em', textTransform:'uppercase' }}>Membre depuis</p>
                <p style={{ fontSize:20, fontWeight:500, marginTop:2 }}>{new Date(user.createdAt||Date.now()).toLocaleDateString('fr-FR',{month:'short',year:'numeric'})}</p>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="card">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <h3 className="df" style={{ fontSize:20, fontWeight:400 }}>Mes informations</h3>
              <button className="btn btn-s" style={{ padding:'8px 16px', fontSize:12 }} onClick={()=>setEditMode(p=>!p)}>
                {editMode?'Annuler':'Modifier'}
              </button>
            </div>
            <div style={{ display:'flex', gap:16, alignItems:'center', marginBottom:20 }}>
              <div className="avatar">{initials(user.name)}</div>
              <div>
                <p style={{ fontWeight:600, fontSize:17 }}>{user.name}</p>
                <p style={{ fontSize:13, color:'#888' }}>{user.email}</p>
              </div>
            </div>
            {editMode ? (
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div className="field">
                  <label>Nom complet</label>
                  <input className="input" value={profileForm.name} onChange={e=>setProfileForm(p=>({...p,name:e.target.value}))}/>
                </div>
                <div className="field">
                  <label>Téléphone</label>
                  <input className="input" type="tel" value={profileForm.phone} onChange={e=>setProfileForm(p=>({...p,phone:e.target.value}))}/>
                </div>
                <button className="btn btn-p" style={{ alignSelf:'flex-start' }} onClick={()=>{onUpdateProfile(profileForm);setEditMode(false);}}>
                  Enregistrer
                </button>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {[['Email',user.email],['Téléphone',user.phone||'Non renseigné'],['Membre depuis',new Date(user.createdAt||Date.now()).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})]].map(([l,v])=>(
                  <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #f0ece3' }}>
                    <span style={{ fontSize:13, color:'#888' }}>{l}</span>
                    <span style={{ fontSize:13, fontWeight:500 }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Policy reminder */}
          <div style={{ background:'rgba(184,150,46,0.08)', border:'1px solid rgba(184,150,46,0.3)', borderRadius:10, padding:'16px 20px' }}>
            <p style={{ fontSize:13, color:'#8a6820', lineHeight:1.7 }}>
              💡 <strong>Rappel :</strong> 1 crédit = 1 séance (60 min). Annulation gratuite jusqu'à 12h avant la séance. Au-delà, 1 crédit est débité même en cas d'annulation.
            </p>
          </div>

          <button className="btn btn-d" style={{ alignSelf:'flex-start' }} onClick={onLogout}>Se déconnecter</button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ADMIN VIEW (inchangé, simplifié pour la place)
═══════════════════════════════════════════════════════════════ */
function AdminView({ slots, setSlots, bookings, clients, onAddSlot, onDeleteSlot, onUpdateCredits, onLogout, onAddClient, showNotif }) {
  const [tab, setTab] = useState('agenda');
  const [newSlot, setNewSlot] = useState({ dateStr:'', timeStr:'', duration:'60' });
  const [creditEdits, setCreditEdits] = useState({});
  const [newClient, setNewClient] = useState({ name:'', email:'', phone:'', credits:'0' });
  const [reminderMsg, setReminderMsg] = useState("Bonjour {prenom} 👋 Rappel de votre séance demain à {heure} au 33 Fauche. À bientôt !");
  const [smsSent, setSmsSent] = useState({});
  const [smsSending, setSmsSending] = useState({});
  const [gcalLoading, setGcalLoading] = useState(false);
  const [gcalSynced, setGcalSynced] = useState(false);
  const [gcalEvents, setGcalEvents] = useState([]);

  const upcoming = bookings.filter(b=>{const s=slots.find(sl=>sl.id===b.slotId);return s&&isFuture(s.dateStr,s.timeStr)&&b.status==='confirmed';});
  const tomorrowStr = (()=>{const d=new Date(today);d.setDate(d.getDate()+1);return d.toISOString().split('T')[0];})();
  const tomorrowBkgs = bookings.filter(b=>{const s=slots.find(sl=>sl.id===b.slotId);return s&&s.dateStr===tomorrowStr&&b.status==='confirmed';});
  const blockedCount = slots.filter(s=>s.blockedByGcal).length;

  const handleGCalSync = async () => {
    setGcalLoading(true);
    showNotif('Connexion à Google Calendar...','info');
    await new Promise(r=>setTimeout(r,1200));
    const demo = [
      { title:'Réunion Harmony', date:makeDate(1,14).dateStr, startTime:'14:00', endTime:'16:00' },
      { title:'Déjeuner Pro',    date:makeDate(3,10).dateStr, startTime:'10:00', endTime:'12:00' },
    ];
    setGcalEvents(demo);
    setSlots(prev=>prev.map(s=>{
      const h=parseInt(s.timeStr.split(':')[0]);
      const end=h+Math.ceil(s.duration/60);
      const blocked=demo.some(ev=>{
        if(ev.date!==s.dateStr)return false;
        const es=parseInt(ev.startTime.split(':')[0]),ee=parseInt(ev.endTime.split(':')[0]);
        return h<ee&&end>es;
      });
      return {...s,blockedByGcal:blocked,gcalEvent:blocked?demo.find(ev=>ev.date===s.dateStr)?.title:null};
    }));
    setGcalSynced(true);
    setGcalLoading(false);
    showNotif(`✓ ${demo.length} événements importés — ${demo.filter(()=>true).length} créneaux vérifiés`);
  };

  const handleSendSMS = async (b) => {
    const s=slots.find(sl=>sl.id===b.slotId), c=clients.find(cl=>cl.id===b.clientId);
    if(!s||!c)return;
    const msg=reminderMsg.replace('{prenom}',c.name.split(' ')[0]).replace('{heure}',s.timeStr);
    setSmsSending(p=>({...p,[b.id]:true}));
    await new Promise(r=>setTimeout(r,800));
    setSmsSending(p=>({...p,[b.id]:false}));
    setSmsSent(p=>({...p,[b.id]:true}));
    showNotif(`SMS envoyé à ${c.name} (${c.phone||'no phone'})`);
  };

  return (
    <div style={{ maxWidth:920, margin:'0 auto', padding:'20px 16px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <img src="/logo.jpg" alt="logo" style={{width:40,height:40,borderRadius:"50%",objectFit:"cover"}} />
          <div><h2 className="df" style={{ fontSize:24, fontWeight:400 }}>Dashboard Admin</h2><p style={{ fontSize:12, color:'#888' }}>Le 33 Fauche · Paris 16e</p></div>
        </div>
        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
          <div style={{ display:'flex', gap:20, background:'rgba(255,255,255,0.6)', padding:'10px 20px', borderRadius:8, border:'1px solid rgba(255,255,255,0.9)' }}>
            {[{n:upcoming.length,l:'Réservés'},{n:slots.filter(s=>!s.booked&&!s.blockedByGcal&&isFuture(s.dateStr,s.timeStr)).length,l:'Dispo'},{n:clients.length,l:'Clients'}].map(({n,l})=>(
              <div key={l} style={{ textAlign:'center' }}>
                <p className="df" style={{ fontSize:22, color:'#1a2e1a', fontWeight:600 }}>{n}</p>
                <p style={{ fontSize:10, color:'#aaa', textTransform:'uppercase', letterSpacing:'0.05em' }}>{l}</p>
              </div>
            ))}
          </div>
          <button onClick={onLogout} style={{ background:'none', border:'1px solid #d5cfc3', borderRadius:6, padding:'8px 14px', fontSize:12, color:'#888', cursor:'pointer' }}>Quitter</button>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab==='agenda'?'on':''}`} onClick={()=>setTab('agenda')}>Disponibilités</button>
        <button className={`tab ${tab==='bookings'?'on':''}`} onClick={()=>setTab('bookings')}>Réservations</button>
        <button className={`tab ${tab==='clients'?'on':''}`} onClick={()=>setTab('clients')}>Clients & Crédits</button>
        <button className={`tab ${tab==='sms'?'on':''}`} onClick={()=>setTab('sms')}>SMS Rappels</button>
      </div>

      {tab==='agenda' && (
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <div className="gcal-banner">
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <span style={{ fontSize:28 }}>📅</span>
              <div>
                <p style={{ fontSize:14, fontWeight:500, color:'#1a2e1a' }}>{gcalSynced?`Synchronisé — ${blockedCount} créneau(x) bloqué(s)`:'Synchroniser Google Calendar'}</p>
                <p style={{ fontSize:12, color:'#5f6368', marginTop:2 }}>{gcalSynced?'Les créneaux sont automatiquement bloqués si un événement existe dans votre agenda.':'Vos événements Google Cal bloqueront automatiquement les créneaux correspondants.'}</p>
              </div>
            </div>
            <button className="btn-gcal" onClick={handleGCalSync} disabled={gcalLoading}>
              {gcalLoading?<><span className="spin">⟳</span> Synchro...</>:gcalSynced?'↻ Re-sync':'Connecter Google Calendar'}
            </button>
          </div>

          {gcalEvents.length>0&&(
            <div style={{ background:'rgba(232,240,254,0.6)', border:'1px solid #c5d5f8', borderRadius:10, padding:'16px 20px' }}>
              <p style={{ fontSize:13, fontWeight:500, color:'#1a73e8', marginBottom:10 }}>Événements importés</p>
              {gcalEvents.map((ev,i)=>(
                <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid rgba(197,213,248,0.4)', fontSize:13 }}>
                  <span>{ev.title}</span><span style={{ color:'#666' }}>{ev.date} · {ev.startTime}–{ev.endTime}</span>
                </div>
              ))}
            </div>
          )}

          <div className="card">
            <h3 className="df" style={{ fontSize:20, fontWeight:400, marginBottom:20 }}>Ajouter un créneau</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14 }}>
              <div className="field"><label>Date</label><input type="date" className="input" value={newSlot.dateStr} onChange={e=>setNewSlot(p=>({...p,dateStr:e.target.value}))}/></div>
              <div className="field"><label>Heure</label><input type="time" className="input" value={newSlot.timeStr} onChange={e=>setNewSlot(p=>({...p,timeStr:e.target.value}))}/></div>
              <div className="field"><label>Durée</label><select className="input" value={newSlot.duration} onChange={e=>setNewSlot(p=>({...p,duration:e.target.value}))}>{['30','45','60','90'].map(d=><option key={d} value={d}>{d} min</option>)}</select></div>
            </div>
            <button className="btn btn-p" style={{ marginTop:18 }} onClick={()=>{if(!newSlot.dateStr||!newSlot.timeStr)return;onAddSlot({...newSlot,duration:parseInt(newSlot.duration)});setNewSlot({dateStr:'',timeStr:'',duration:'60'});}}>+ Ajouter</button>
          </div>

          <div className="card">
            <h3 className="df" style={{ fontSize:20, fontWeight:400, marginBottom:16 }}>Créneaux à venir</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {slots.filter(s=>isFuture(s.dateStr,s.timeStr)).sort((a,b)=>(a.dateStr+a.timeStr).localeCompare(b.dateStr+b.timeStr)).map(s=>{
                const bk=bookings.find(b=>b.slotId===s.id&&b.status==='confirmed');
                const cl=bk?clients.find(c=>c.id===bk.clientId):null;
                return (
                  <div key={s.id} className="row">
                    <div><p style={{ fontWeight:500 }}>{fmt(s.dateStr)} · {s.timeStr}</p><p style={{ fontSize:12, color:'#888', marginTop:2 }}>{s.duration} min</p></div>
                    <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                      {s.blockedByGcal?<span className="tag tag-blue">📅 {s.gcalEvent||'Google Cal'}</span>:s.booked?<span className="tag tag-gold">👤 {cl?.name||'—'}</span>:<span className="tag tag-green">Disponible</span>}
                      {!s.booked&&!s.blockedByGcal&&<button className="btn btn-d" onClick={()=>onDeleteSlot(s.id)}>Supprimer</button>}
                    </div>
                  </div>
                );
              })}
              {slots.filter(s=>isFuture(s.dateStr,s.timeStr)).length===0&&<p style={{ color:'#aaa', fontSize:14 }}>Aucun créneau à venir.</p>}
            </div>
          </div>
        </div>
      )}

      {tab==='bookings' && (
        <div className="card">
          <h3 className="df" style={{ fontSize:20, fontWeight:400, marginBottom:16 }}>Toutes les réservations</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {bookings.length===0?<p style={{ color:'#aaa', fontSize:14 }}>Aucune réservation.</p>:bookings.sort((a,b)=>b.bookedAt-a.bookedAt).map(b=>{
              const s=slots.find(sl=>sl.id===b.slotId),c=clients.find(cl=>cl.id===b.clientId);
              if(!s||!c)return null;
              return(
                <div key={b.id} className="row">
                  <div>
                    <p style={{ fontWeight:500 }}>{c.name}</p>
                    <p style={{ fontSize:12, color:'#888', marginTop:2 }}>{fmt(s.dateStr)} · {s.timeStr} · {s.duration} min</p>
                  </div>
                  <span className={`tag ${b.status==='confirmed'?'tag-green':'tag-red'}`}>{b.status==='confirmed'?'Confirmée':'Annulée'+(b.creditLost?' (crédit perdu)':'')}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab==='clients' && (
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <div className="card">
            <h3 className="df" style={{ fontSize:20, fontWeight:400, marginBottom:20 }}>Ajouter un client manuellement</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 70px', gap:12 }}>
              {[['Nom','text','Prénom Nom','name'],['Email','email','email@...','email'],['Téléphone','tel','+336...','phone']].map(([l,t,p,k])=>(
                <div key={k} className="field"><label>{l}</label><input type={t} className="input" placeholder={p} value={newClient[k]} onChange={e=>setNewClient(p=>({...p,[k]:e.target.value}))}/></div>
              ))}
              <div className="field"><label>Crédits</label><input type="number" className="input" min="0" value={newClient.credits} onChange={e=>setNewClient(p=>({...p,credits:e.target.value}))}/></div>
            </div>
            <button className="btn btn-p" style={{ marginTop:18 }} onClick={()=>{if(!newClient.name||!newClient.email)return;onAddClient({name:newClient.name,email:newClient.email,phone:newClient.phone,credits:parseInt(newClient.credits)||0});setNewClient({name:'',email:'',phone:'',credits:'0'});}}>+ Ajouter</button>
          </div>
          <div className="card">
            <h3 className="df" style={{ fontSize:20, fontWeight:400, marginBottom:16 }}>Gérer les crédits</h3>
            {clients.map(c=>(
              <div key={c.id} className="row" style={{ marginBottom:8 }}>
                <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                  <div className="avatar" style={{ width:38, height:38, fontSize:14 }}>{initials(c.name)}</div>
                  <div><p style={{ fontWeight:500 }}>{c.name}</p><p style={{ fontSize:12, color:'#888' }}>{c.email}</p></div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div className="badge" style={{ width:40, height:40, fontSize:16 }}>{c.credits}</div>
                  <input type="number" className="input" style={{ width:70, padding:'8px 10px' }} placeholder="±" value={creditEdits[c.id]??''} onChange={e=>setCreditEdits(p=>({...p,[c.id]:e.target.value}))}/>
                  <button className="btn btn-g" onClick={()=>{const val=parseInt(creditEdits[c.id]||'0');if(!isNaN(val)&&val!==0){onUpdateCredits(c.id,val);setCreditEdits(p=>({...p,[c.id]:''}));}}}>+/−</button>
                </div>
              </div>
            ))}
            <p style={{ fontSize:12, color:'#aaa', marginTop:12 }}>Exemple : +5 pour ajouter 5 crédits, −1 pour en retirer 1.</p>
          </div>
        </div>
      )}

      {tab==='sms' && (
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <div className="card">
            <h3 className="df" style={{ fontSize:20, fontWeight:400, marginBottom:16 }}>Séances demain — {fmt(tomorrowStr)}</h3>
            {tomorrowBkgs.length===0?<p style={{ color:'#aaa', fontSize:14 }}>Aucune séance prévue demain.</p>:(
              <>
                {tomorrowBkgs.map(b=>{
                  const s=slots.find(sl=>sl.id===b.slotId),c=clients.find(cl=>cl.id===b.clientId);
                  if(!s||!c)return null;
                  const msg=reminderMsg.replace('{prenom}',c.name.split(' ')[0]).replace('{heure}',s.timeStr);
                  return(
                    <div key={b.id} style={{ background:'rgba(255,255,255,0.6)', borderRadius:8, padding:'14px 16px', marginBottom:8, border:'1px solid rgba(255,255,255,0.9)' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
                        <div><p style={{ fontWeight:500 }}>{c.name} <span style={{ color:'#888', fontSize:12, fontWeight:400 }}>· {c.phone||'Pas de tel.'}</span></p><p style={{ fontSize:12, color:'#888', marginTop:2 }}>{s.timeStr} · {s.duration} min</p></div>
                        {smsSent[b.id]?<span className="tag tag-green">✓ Envoyé</span>:<button className="btn-sms" onClick={()=>handleSendSMS(b)} disabled={smsSending[b.id]}>{smsSending[b.id]?<><span className="spin">⟳</span> Envoi...</>:'📱 SMS'}</button>}
                      </div>
                      <div className="sms-preview">"{msg}"</div>
                    </div>
                  );
                })}
                <button className="btn-sms" style={{ marginTop:8 }} onClick={async()=>{for(const b of tomorrowBkgs)if(!smsSent[b.id])await handleSendSMS(b);}}>
                  📱 Envoyer à tous ({tomorrowBkgs.length})
                </button>
              </>
            )}
          </div>
          <div className="card">
            <h3 className="df" style={{ fontSize:20, fontWeight:400, marginBottom:12 }}>Message SMS</h3>
            <p style={{ fontSize:12, color:'#888', marginBottom:10 }}>Variables : <code style={{ background:'#f0ece3', padding:'2px 6px', borderRadius:4 }}>{'{prenom}'}</code> <code style={{ background:'#f0ece3', padding:'2px 6px', borderRadius:4 }}>{'{heure}'}</code></p>
            <textarea className="input" rows={3} value={reminderMsg} onChange={e=>setReminderMsg(e.target.value)} style={{ resize:'vertical' }}/>
            <div className="divider"/>
            <div style={{ background:'rgba(37,211,102,0.08)', border:'1px solid rgba(37,211,102,0.3)', borderRadius:8, padding:'14px 16px' }}>
              <p style={{ fontSize:12, fontWeight:500, color:'#1a7a3a', marginBottom:6 }}>📱 Production : SMS via Twilio</p>
              <p style={{ fontSize:12, color:'#555', lineHeight:1.7 }}>Variables à configurer : <code style={{ background:'#f0ece3', padding:'1px 5px', borderRadius:3 }}>TWILIO_SID</code>, <code style={{ background:'#f0ece3', padding:'1px 5px', borderRadius:3 }}>TWILIO_TOKEN</code>, <code style={{ background:'#f0ece3', padding:'1px 5px', borderRadius:3 }}>TWILIO_PHONE</code>. Coût : ~0,08€/SMS.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [clients, setClients] = useState([DEMO_CLIENT]);
  const [slots, setSlots] = useState(INIT_SLOTS);
  const [bookings, setBookings] = useState([
    // Demo bookings for demo account
    { id:'b_demo1', clientId:'demo', slotId: INIT_SLOTS.find(s=>makeDate(-7,10).dateStr===s.dateStr)?.id, status:'confirmed', bookedAt: Date.now()-7*24*3600000 },
    { id:'b_demo2', clientId:'demo', slotId: INIT_SLOTS.find(s=>makeDate(-14,9).dateStr===s.dateStr)?.id, status:'confirmed', bookedAt: Date.now()-14*24*3600000 },
  ].filter(b=>b.slotId));
  const [notif, showNotif] = useNotif();
  const [loading, setLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    (async () => {
      const sc = await storageGet('clients');
      const ss = await storageGet('slots');
      const sb = await storageGet('bookings');
      if (sc) setClients(sc);
      if (ss) setSlots(ss);
      if (sb) setBookings(sb);
      setLoading(false);
    })();
  }, []);

  const save = async (c, s, b) => {
    await storageSet('clients', c);
    await storageSet('slots', s);
    await storageSet('bookings', b);
  };

  const handleLogin = (user) => { setCurrentUser(user); };

  const handleBook = async (slot) => {
    const client = clients.find(c => c.id===currentUser.id);
    if (!client||client.credits<1) return showNotif('Crédits insuffisants !','err');
    const ns = slots.map(s => s.id===slot.id?{...s,booked:true,bookedBy:currentUser.id}:s);
    const nc = clients.map(c => c.id===currentUser.id?{...c,credits:c.credits-1}:c);
    const nb = [...bookings, {id:`b${Date.now()}`,clientId:currentUser.id,slotId:slot.id,status:'confirmed',bookedAt:Date.now()}];
    setSlots(ns); setClients(nc); setBookings(nb);
    setCurrentUser(p=>({...p,credits:p.credits-1}));
    await save(nc,ns,nb);
    showNotif(`Séance réservée le ${fmt(slot.dateStr)} à ${slot.timeStr} ✓`);
  };

  const handleCancel = async (booking, slot) => {
    const free = freeCancelable(slot.dateStr, slot.timeStr);
    const ns = slots.map(s => s.id===slot.id?{...s,booked:false,bookedBy:null}:s);
    const nb = bookings.map(b => b.id===booking.id?{...b,status:'cancelled',creditLost:!free}:b);
    let nc = clients;
    if (free) {
      nc = clients.map(c => c.id===currentUser.id?{...c,credits:c.credits+1}:c);
      setCurrentUser(p=>({...p,credits:p.credits+1}));
    }
    setSlots(ns); setClients(nc); setBookings(nb);
    await save(nc,ns,nb);
    showNotif(free?'Séance annulée — crédit remboursé ✓':'Annulation tardive — 1 crédit débité.', free?'ok':'err');
  };

  const handleUpdateProfile = async (form) => {
    const nc = clients.map(c => c.id===currentUser.id?{...c,...form}:c);
    setClients(nc); setCurrentUser(p=>({...p,...form}));
    await storageSet('clients', nc);
    showNotif('Profil mis à jour ✓');
  };

  const handleAddSlot = async (s) => {
    const ns = [...slots, {id:`s${Date.now()}`,...s,booked:false,bookedBy:null,blockedByGcal:false,gcalEvent:null}];
    setSlots(ns); await storageSet('slots',ns); showNotif('Créneau ajouté ✓');
  };

  const handleDeleteSlot = async (id) => {
    const ns = slots.filter(s=>s.id!==id);
    setSlots(ns); await storageSet('slots',ns); showNotif('Créneau supprimé.');
  };

  const handleUpdateCredits = async (cid, delta) => {
    const nc = clients.map(c=>c.id===cid?{...c,credits:Math.max(0,c.credits+delta)}:c);
    setClients(nc);
    if (currentUser?.id===cid) setCurrentUser(p=>({...p,credits:Math.max(0,p.credits+delta)}));
    await storageSet('clients',nc);
    showNotif(`Crédits mis à jour (${delta>0?'+':''}${delta}) ✓`);
  };

  const handleAddClient = async (c) => {
    const nc = [...clients, {id:`c${Date.now()}`,pwdHash:hashPwd('temp1234'),createdAt:Date.now(),...c}];
    setClients(nc); await storageSet('clients',nc);
    showNotif(`${c.name} ajouté(e) — mdp temporaire : temp1234`);
  };

  const syncedUser = currentUser?.type==='client'
    ? {...currentUser, credits:clients.find(c=>c.id===currentUser.id)?.credits??currentUser.credits}
    : currentUser;

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <style>{STYLE}</style>
      <div style={{ textAlign:'center' }}>
        <div className="logo" style={{ width:56, height:56, fontSize:26, margin:'0 auto 20px' }}>Y</div>
        <p className="df" style={{ fontSize:24, fontWeight:300, color:'#1a2e1a' }}>Chargement...</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">
        {notif && <div className={`notif ${notif.type}`}>{notif.msg}</div>}
        {!currentUser ? (
          <AuthScreen onLogin={handleLogin} clients={clients} setClients={setClients}/>
        ) : currentUser.type==='admin' ? (
          <AdminView
            slots={slots} setSlots={setSlots} bookings={bookings} clients={clients}
            onAddSlot={handleAddSlot} onDeleteSlot={handleDeleteSlot}
            onUpdateCredits={handleUpdateCredits} onAddClient={handleAddClient}
            onLogout={()=>setCurrentUser(null)} showNotif={showNotif}
          />
        ) : (
          <ClientView
            user={syncedUser} slots={slots} bookings={bookings}
            onBook={handleBook} onCancel={handleCancel}
            onLogout={()=>setCurrentUser(null)} onUpdateProfile={handleUpdateProfile}
          />
        )}
      </div>
    </>
  );
}
