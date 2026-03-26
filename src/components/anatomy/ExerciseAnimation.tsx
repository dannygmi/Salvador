'use client'

/**
 * Looping SVG exercise animations — one per poseId.
 * Each uses CSS keyframes inside a <style> tag so they loop forever.
 * Dark background, warm accent lines, ~2-3 s cycle.
 */

import type { FC } from 'react'

interface Props { size?: number }

/* ─── Shared styles ─────────────────────────────────────────────────────── */
const LINE = { stroke: '#D0C8B8', strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }
const JOINT = { fill: '#D0C8B8', stroke: 'none' }
const ACCENT = { stroke: '#E8A84B', strokeWidth: 3.5, strokeLinecap: 'round' as const, fill: 'none' }
const BG = '#161412'

/* ─── Prone Press-Up (McKenzie Extension) ───────────────────────────────── */
export const PronePressAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 280 110" width={size} height={size * 110 / 280} style={{ background: BG, borderRadius: 12 }}>
    <style>{`
      @keyframes pp-arms { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(-52deg)} }
      @keyframes pp-head { 0%,100%{transform:translateY(0)} 45%,55%{transform:translateY(-14px)} }
      @keyframes pp-spine { 0%,100%{d:path("M80,70 Q140,68 200,70")} 45%,55%{d:path("M80,70 Q140,58 200,70")} }
      .pp-la { transform-origin:80px 62px; animation: pp-arms 2.4s ease-in-out infinite; }
      .pp-ra { transform-origin:80px 62px; animation: pp-arms 2.4s ease-in-out infinite; }
      .pp-head { transform-origin:210px 55px; animation: pp-head 2.4s ease-in-out infinite; }
    `}</style>
    {/* floor */}
    <line x1="30" y1="82" x2="250" y2="82" stroke="#2A2A2A" strokeWidth="2"/>
    {/* legs flat */}
    <line x1="100" y1="76" x2="40" y2="80" {...LINE}/>
    <line x1="130" y1="76" x2="70" y2="80" {...LINE}/>
    {/* spine arc — animates to arch */}
    <path d="M80,70 Q140,68 200,70" {...ACCENT} strokeWidth={4}/>
    {/* pelvis stays on floor */}
    <circle cx="110" cy="74" r="4" {...JOINT}/>
    {/* left arm */}
    <g className="pp-la">
      <line x1="80" y1="62" x2="58" y2="80" {...LINE}/>
      <circle cx="58" cy="80" r="3" {...JOINT}/>
    </g>
    {/* right arm */}
    <g className="pp-ra">
      <line x1="80" y1="62" x2="100" y2="80" {...LINE}/>
      <circle cx="100" cy="80" r="3" {...JOINT}/>
    </g>
    {/* torso */}
    <line x1="80" y1="62" x2="175" y2="68" {...LINE}/>
    {/* head */}
    <g className="pp-head">
      <circle cx="210" cy="55" r="11" {...LINE}/>
      <line x1="200" y1="62" x2="185" y2="68" {...LINE}/>
    </g>
    {/* label */}
    <text x="140" y="102" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Outfit,sans-serif">Prone Press-Up</text>
  </svg>
)

/* ─── Pelvic Tilt ────────────────────────────────────────────────────────── */
export const PelvicTiltAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 280 120" width={size} height={size * 120 / 280} style={{ background: BG, borderRadius: 12 }}>
    <style>{`
      @keyframes pt-pelvis { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(12deg)} }
      @keyframes pt-low { 0%,100%{transform:translateY(0)} 45%,55%{transform:translateY(4px)} }
      .pt-pelvis { transform-origin:140px 72px; animation: pt-pelvis 2s ease-in-out infinite; }
      .pt-low { transform-origin:140px 72px; animation: pt-low 2s ease-in-out infinite; }
    `}</style>
    <line x1="20" y1="92" x2="260" y2="92" stroke="#2A2A2A" strokeWidth="2"/>
    {/* head */}
    <circle cx="220" cy="56" r="11" {...LINE}/>
    <line x1="210" y1="64" x2="200" y2="70" {...LINE}/>
    {/* torso */}
    <path d="M200,70 Q170,72 140,72" {...LINE}/>
    {/* upper legs bent */}
    <g className="pt-pelvis">
      <line x1="140" y1="72" x2="120" y2="90" {...ACCENT}/>
      <line x1="148" y1="72" x2="130" y2="90" {...ACCENT}/>
      <circle cx="140" cy="72" r="4" {...JOINT}/>
    </g>
    {/* lower legs */}
    <line x1="120" y1="90" x2="80" y2="90" {...LINE}/>
    <line x1="130" y1="90" x2="90" y2="90" {...LINE}/>
    {/* lower back highlight */}
    <path d="M155,70 Q148,71 140,72" stroke="#E85B5B" strokeWidth="4" strokeLinecap="round" fill="none"/>
    {/* arms by side */}
    <line x1="195" y1="72" x2="175" y2="88" {...LINE}/>
    <line x1="205" y1="72" x2="185" y2="88" {...LINE}/>
    <text x="140" y="112" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Outfit,sans-serif">Pelvic Tilt</text>
  </svg>
)

/* ─── Knee-to-Chest ──────────────────────────────────────────────────────── */
export const KneeChestAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 280 120" width={size} height={size * 120 / 280} style={{ background: BG, borderRadius: 12 }}>
    <style>{`
      @keyframes kc-knee { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(-42deg)} }
      @keyframes kc-arms { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(-30deg)} }
      .kc-leg { transform-origin:155px 72px; animation: kc-knee 2.5s ease-in-out infinite; }
      .kc-arm { transform-origin:185px 68px; animation: kc-arms 2.5s ease-in-out infinite; }
    `}</style>
    <line x1="20" y1="88" x2="260" y2="88" stroke="#2A2A2A" strokeWidth="2"/>
    <circle cx="230" cy="52" r="11" {...LINE}/>
    <line x1="220" y1="60" x2="200" y2="67" {...LINE}/>
    <path d="M200,67 Q178,70 155,72" {...LINE}/>
    {/* static right leg */}
    <line x1="155" y1="72" x2="125" y2="88" {...LINE}/>
    <line x1="125" y1="88" x2="80" y2="88" {...LINE}/>
    {/* animated left leg */}
    <g className="kc-leg">
      <line x1="155" y1="72" x2="145" y2="88" {...ACCENT}/>
      <line x1="145" y1="88" x2="155" y2="72" {...ACCENT}/>
      <circle cx="155" cy="72" r="4" {...JOINT}/>
    </g>
    {/* arms pull knee */}
    <g className="kc-arm">
      <line x1="185" y1="68" x2="170" y2="82" {...LINE}/>
      <line x1="195" y1="68" x2="182" y2="82" {...LINE}/>
    </g>
    <circle cx="155" cy="72" r="4" {...JOINT}/>
    <text x="140" y="108" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Outfit,sans-serif">Single Knee-to-Chest</text>
  </svg>
)

/* ─── Sciatic Nerve Glide (seated) ──────────────────────────────────────── */
export const NerveGlideAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 280 130" width={size} height={size * 130 / 280} style={{ background: BG, borderRadius: 12 }}>
    <style>{`
      @keyframes ng-leg { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(-55deg)} }
      @keyframes ng-head { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(18deg)} }
      .ng-leg { transform-origin:148px 88px; animation: ng-leg 2.2s ease-in-out infinite; }
      .ng-head { transform-origin:175px 40px; animation: ng-head 2.2s ease-in-out infinite; }
    `}</style>
    {/* chair */}
    <rect x="100" y="85" width="80" height="6" rx="2" fill="#2A2A2A"/>
    <line x1="110" y1="91" x2="110" y2="118" stroke="#2A2A2A" strokeWidth="4"/>
    <line x1="170" y1="91" x2="170" y2="118" stroke="#2A2A2A" strokeWidth="4"/>
    {/* torso upright */}
    <path d="M140,88 Q148,70 148,50" {...LINE}/>
    {/* head */}
    <g className="ng-head">
      <circle cx="175" cy="40" r="11" {...LINE}/>
      <line x1="166" y1="48" x2="160" y2="52" {...LINE}/>
    </g>
    {/* static leg */}
    <line x1="120" y1="88" x2="120" y2="118" {...LINE}/>
    <line x1="120" y1="118" x2="105" y2="118" {...LINE}/>
    {/* animated leg */}
    <g className="ng-leg">
      <line x1="148" y1="88" x2="148" y2="115" {...ACCENT}/>
      <line x1="148" y1="115" x2="175" y2="115" {...ACCENT}/>
      <circle cx="148" cy="88" r="4" {...JOINT}/>
    </g>
    {/* arms */}
    <line x1="148" y1="60" x2="130" y2="78" {...LINE}/>
    <line x1="148" y1="60" x2="162" y2="78" {...LINE}/>
    <text x="140" y="126" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Outfit,sans-serif">Sciatic Nerve Glide</text>
  </svg>
)

/* ─── Dead Bug ───────────────────────────────────────────────────────────── */
export const DeadBugAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 280 120" width={size} height={size * 120 / 280} style={{ background: BG, borderRadius: 12 }}>
    <style>{`
      @keyframes db-rarm { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(70deg)} }
      @keyframes db-lleg { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(65deg)} }
      @keyframes db-larm { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(-70deg)} }
      @keyframes db-rleg { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(-65deg)} }
      .db-rarm { transform-origin:148px 60px; animation: db-rarm 2.8s ease-in-out infinite; }
      .db-larm { transform-origin:132px 60px; animation: db-larm 2.8s ease-in-out 1.4s infinite; }
      .db-lleg { transform-origin:140px 75px; animation: db-lleg 2.8s ease-in-out 1.4s infinite; }
      .db-rleg { transform-origin:148px 75px; animation: db-rleg 2.8s ease-in-out infinite; }
    `}</style>
    <line x1="20" y1="88" x2="260" y2="88" stroke="#2A2A2A" strokeWidth="2"/>
    {/* body on back */}
    <path d="M90,68 Q140,64 190,68" {...LINE}/>
    <circle cx="205" cy="58" r="11" {...LINE}/>
    <line x1="194" y1="65" x2="188" y2="68" {...LINE}/>
    {/* spine stays flat indicator */}
    <path d="M110,72 Q140,74 170,72" stroke="#E85B5B" strokeWidth="2" strokeDasharray="4 3" fill="none"/>
    {/* right arm up → extends */}
    <g className="db-rarm">
      <line x1="148" y1="60" x2="148" y2="38" {...ACCENT}/>
      <circle cx="148" cy="38" r="3" {...JOINT}/>
    </g>
    {/* left arm up */}
    <g className="db-larm">
      <line x1="132" y1="60" x2="132" y2="38" {...LINE}/>
      <circle cx="132" cy="38" r="3" {...JOINT}/>
    </g>
    {/* right leg 90° → extends */}
    <g className="db-rleg">
      <line x1="148" y1="75" x2="165" y2="55" {...LINE}/>
      <line x1="165" y1="55" x2="180" y2="55" {...LINE}/>
    </g>
    {/* left leg 90° → stays bent */}
    <g className="db-lleg">
      <line x1="140" y1="75" x2="125" y2="55" {...ACCENT}/>
      <line x1="125" y1="55" x2="108" y2="55" {...ACCENT}/>
    </g>
    <text x="140" y="104" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Outfit,sans-serif">Dead Bug</text>
  </svg>
)

/* ─── Bird Dog ───────────────────────────────────────────────────────────── */
export const BirdDogAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 280 120" width={size} height={size * 120 / 280} style={{ background: BG, borderRadius: 12 }}>
    <style>{`
      @keyframes bd-arm { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(-38deg)} }
      @keyframes bd-leg { 0%,100%{transform:rotate(0deg)} 45%,55%{transform:rotate(38deg)} }
      .bd-arm { transform-origin:182px 55px; animation: bd-arm 2.6s ease-in-out infinite; }
      .bd-leg { transform-origin:118px 68px; animation: bd-leg 2.6s ease-in-out infinite; }
    `}</style>
    {/* floor */}
    <line x1="20" y1="92" x2="260" y2="92" stroke="#2A2A2A" strokeWidth="2"/>
    {/* head */}
    <circle cx="215" cy="48" r="11" {...LINE}/>
    <line x1="204" y1="55" x2="196" y2="60" {...LINE}/>
    {/* torso horizontal */}
    <path d="M196,60 Q158,62 118,68" {...LINE}/>
    {/* right arm extends forward */}
    <g className="bd-arm">
      <line x1="182" y1="55" x2="210" y2="62" {...ACCENT}/>
      <circle cx="210" cy="62" r="3" fill="#E8A84B"/>
    </g>
    {/* static left arm down */}
    <line x1="182" y1="60" x2="182" y2="90" {...LINE}/>
    <circle cx="182" cy="90" r="3" {...JOINT}/>
    {/* static right leg down */}
    <line x1="118" y1="68" x2="135" y2="90" {...LINE}/>
    <circle cx="135" cy="90" r="3" {...JOINT}/>
    {/* left leg extends back */}
    <g className="bd-leg">
      <line x1="118" y1="68" x2="88" y2="75" {...ACCENT}/>
      <circle cx="88" cy="75" r="3" fill="#E8A84B"/>
    </g>
    <text x="140" y="108" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Outfit,sans-serif">Bird-Dog</text>
  </svg>
)

/* ─── Glute Bridge ───────────────────────────────────────────────────────── */
export const GluteBridgeAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 280 120" width={size} height={size * 120 / 280} style={{ background: BG, borderRadius: 12 }}>
    <style>{`
      @keyframes gb-hips { 0%,100%{transform:translateY(0)} 45%,55%{transform:translateY(-22px)} }
      .gb-hips { animation: gb-hips 2.2s ease-in-out infinite; }
    `}</style>
    <line x1="20" y1="88" x2="260" y2="88" stroke="#2A2A2A" strokeWidth="2"/>
    {/* head stays down */}
    <circle cx="220" cy="70" r="11" {...LINE}/>
    <line x1="210" y1="76" x2="198" y2="80" {...LINE}/>
    {/* upper back stays flat */}
    <path d="M198,80 Q175,82 155,82" {...LINE}/>
    {/* arms flat on floor */}
    <line x1="185" y1="82" x2="185" y2="88" {...LINE}/>
    <line x1="200" y1="82" x2="200" y2="88" {...LINE}/>
    {/* animated hips + thighs */}
    <g className="gb-hips">
      <path d="M155,82 Q140,80 125,75" {...ACCENT} strokeWidth={4}/>
      <circle cx="140" cy="80" r="5" fill="#E8A84B"/>
      {/* thighs */}
      <line x1="125" y1="75" x2="110" y2="88" {...LINE}/>
      <line x1="135" y1="75" x2="120" y2="88" {...LINE}/>
    </g>
    {/* lower legs fixed on floor */}
    <line x1="110" y1="88" x2="80" y2="88" {...LINE}/>
    <line x1="120" y1="88" x2="90" y2="88" {...LINE}/>
    {/* feet */}
    <rect x="68" y="85" width="14" height="6" rx="3" fill="#D0C8B8"/>
    <rect x="78" y="85" width="14" height="6" rx="3" fill="#D0C8B8"/>
    <text x="140" y="108" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Outfit,sans-serif">Glute Bridge</text>
  </svg>
)

/* ─── Side Plank ─────────────────────────────────────────────────────────── */
export const SidePlankAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 280 120" width={size} height={size * 120 / 280} style={{ background: BG, borderRadius: 12 }}>
    <style>{`
      @keyframes sp-body { 0%,20%,100%{transform:translateY(0)} 45%,55%{transform:translateY(-14px)} }
      .sp-body { animation: sp-body 2.5s ease-in-out infinite; }
    `}</style>
    <line x1="20" y1="88" x2="260" y2="88" stroke="#2A2A2A" strokeWidth="2"/>
    <g className="sp-body">
      {/* body diagonal line */}
      <path d="M60,88 Q140,72 210,60" {...ACCENT} strokeWidth={4}/>
      {/* head */}
      <circle cx="222" cy="52" r="11" {...LINE}/>
      {/* supporting arm (elbow on ground) */}
      <line x1="60" y1="88" x2="80" y2="78" {...LINE}/>
      {/* top arm raised */}
      <line x1="155" y1="68" x2="155" y2="50" {...LINE}/>
      <circle cx="155" cy="50" r="3" {...JOINT}/>
      {/* hip circle */}
      <circle cx="140" cy="72" r="5" fill="#E8A84B"/>
      {/* feet stacked */}
      <circle cx="60" cy="87" r="4" {...JOINT}/>
    </g>
    <text x="140" y="108" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Outfit,sans-serif">Side Plank</text>
  </svg>
)

/* ─── Goblet Squat ───────────────────────────────────────────────────────── */
export const GobletSquatAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 200 240" width={size} height={size * 240 / 200} style={{ background: BG, borderRadius: 12 }}>
    <style>{`
      @keyframes gs-squat {
        0%,100%{ transform:translateY(0); }
        45%,55%{ transform:translateY(38px); }
      }
      @keyframes gs-thigh {
        0%,100%{ transform:rotate(0deg); }
        45%,55%{ transform:rotate(48deg); }
      }
      @keyframes gs-shin {
        0%,100%{ transform:rotate(0deg); }
        45%,55%{ transform:rotate(-22deg); }
      }
      .gs-body { animation: gs-squat 2.4s ease-in-out infinite; }
      .gs-lthigh { transform-origin:78px 130px; animation: gs-thigh 2.4s ease-in-out infinite; }
      .gs-rthigh { transform-origin:122px 130px; animation: gs-thigh 2.4s ease-in-out infinite; }
      .gs-lshin { transform-origin:68px 168px; animation: gs-shin 2.4s ease-in-out infinite; }
      .gs-rshin { transform-origin:132px 168px; animation: gs-shin 2.4s ease-in-out infinite; }
    `}</style>
    {/* floor */}
    <line x1="20" y1="210" x2="180" y2="210" stroke="#2A2A2A" strokeWidth="2"/>
    {/* static shins & feet */}
    <line x1="68" y1="168" x2="55" y2="210" {...LINE}/>
    <line x1="132" y1="168" x2="145" y2="210" {...LINE}/>
    <ellipse cx="52" cy="210" rx="8" ry="4" fill="#D0C8B8"/>
    <ellipse cx="148" cy="210" rx="8" ry="4" fill="#D0C8B8"/>
    {/* animated upper body */}
    <g className="gs-body">
      {/* head */}
      <circle cx="100" cy="42" r="14" {...LINE}/>
      {/* neck */}
      <line x1="100" y1="56" x2="100" y2="66" {...LINE}/>
      {/* torso */}
      <path d="M72,66 Q100,65 128,66 L130,128 Q100,130 70,128 Z" {...LINE}/>
      {/* weight at chest */}
      <rect x="84" y="80" width="32" height="22" rx="4" fill="#2A2A2A" stroke="#E8A84B" strokeWidth="2"/>
      {/* arms holding weight */}
      <line x1="72" y1="85" x2="86" y2="88" {...LINE}/>
      <line x1="128" y1="85" x2="114" y2="88" {...LINE}/>
      {/* hip joints */}
      <circle cx="78" cy="130" r="5" {...JOINT}/>
      <circle cx="122" cy="130" r="5" {...JOINT}/>
    </g>
    {/* thighs */}
    <g className="gs-lthigh"><line x1="78" y1="130" x2="68" y2="168" {...ACCENT}/></g>
    <g className="gs-rthigh"><line x1="122" y1="130" x2="132" y2="168" {...ACCENT}/></g>
    {/* knee joints */}
    <circle cx="68" cy="168" r="4" {...JOINT}/>
    <circle cx="132" cy="168" r="4" {...JOINT}/>
    <text x="100" y="228" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Outfit,sans-serif">Goblet Squat</text>
  </svg>
)

/* ─── Romanian Deadlift / Hip Hinge ─────────────────────────────────────── */
export const HipHingeAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 200 240" width={size} height={size * 240 / 200} style={{ background: BG, borderRadius: 12 }}>
    <style>{`
      @keyframes hh-hinge {
        0%,100%{ transform:rotate(0deg); }
        45%,55%{ transform:rotate(62deg); }
      }
      @keyframes hh-knee {
        0%,100%{ transform:rotate(0deg); }
        45%,55%{ transform:rotate(-12deg); }
      }
      .hh-torso { transform-origin:100px 135px; animation: hh-hinge 2.6s ease-in-out infinite; }
      .hh-knee  { transform-origin:88px 175px; animation: hh-knee 2.6s ease-in-out infinite; }
    `}</style>
    <line x1="20" y1="215" x2="180" y2="215" stroke="#2A2A2A" strokeWidth="2"/>
    {/* static legs */}
    <line x1="88" y1="175" x2="75" y2="215" {...LINE}/>
    <line x1="112" y1="175" x2="125" y2="215" {...LINE}/>
    <ellipse cx="73" cy="215" rx="8" ry="4" fill="#D0C8B8"/>
    <ellipse cx="127" cy="215" rx="8" ry="4" fill="#D0C8B8"/>
    {/* knee joints */}
    <circle cx="88" cy="175" r="5" {...JOINT}/>
    <circle cx="112" cy="175" r="5" {...JOINT}/>
    {/* thighs */}
    <line x1="100" y1="135" x2="88" y2="175" {...LINE}/>
    <line x1="100" y1="135" x2="112" y2="175" {...LINE}/>
    <circle cx="100" cy="135" r="6" fill="#E8A84B"/>
    {/* animated torso hinging */}
    <g className="hh-torso">
      {/* spine — highlighted */}
      <path d="M100,135 Q100,108 100,80" {...ACCENT} strokeWidth={4}/>
      {/* head */}
      <circle cx="100" cy="68" r="13" {...LINE}/>
      {/* shoulders */}
      <line x1="82" y1="82" x2="118" y2="82" {...LINE}/>
      {/* arms hanging with barbell */}
      <line x1="82" y1="82" x2="72" y2="115" {...LINE}/>
      <line x1="118" y1="82" x2="128" y2="115" {...LINE}/>
      {/* bar */}
      <line x1="58" y1="115" x2="142" y2="115" stroke="#E8A84B" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="58" cy="115" r="6" fill="#444"/>
      <circle cx="142" cy="115" r="6" fill="#444"/>
    </g>
    <text x="100" y="228" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Outfit,sans-serif">Romanian Deadlift</text>
  </svg>
)

/* ─── Diaphragmatic Breathing ────────────────────────────────────────────── */
export const BreathingAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 280 120" width={size} height={size * 120 / 280} style={{ background: BG, borderRadius: 12 }}>
    <style>{`
      @keyframes br-belly { 0%,100%{rx:18;ry:10} 45%,55%{rx:24;ry:15} }
      @keyframes br-chest { 0%,100%{ry:20} 45%,55%{ry:22} }
      .br-belly { animation: br-belly 3s ease-in-out infinite; }
      .br-chest { animation: br-chest 3s ease-in-out infinite; }
    `}</style>
    <line x1="20" y1="88" x2="260" y2="88" stroke="#2A2A2A" strokeWidth="2"/>
    {/* lying figure */}
    <circle cx="225" cy="65" r="11" {...LINE}/>
    <line x1="214" y1="72" x2="200" y2="76" {...LINE}/>
    <path d="M200,76 Q165,74 130,76" {...LINE}/>
    {/* chest expanding */}
    <ellipse className="br-chest" cx="172" cy="68" rx="22" ry="20" fill="none" stroke="#5B8DB8" strokeWidth="2"/>
    {/* belly expanding */}
    <ellipse className="br-belly" cx="140" cy="72" rx="18" ry="10" fill="none" stroke="#E8A84B" strokeWidth="2.5"/>
    {/* arms */}
    <line x1="192" y1="76" x2="185" y2="88" {...LINE}/>
    <line x1="200" y1="76" x2="195" y2="88" {...LINE}/>
    {/* legs flat */}
    <line x1="130" y1="76" x2="75" y2="80" {...LINE}/>
    <line x1="120" y1="76" x2="65" y2="80" {...LINE}/>
    {/* hand on belly indicator */}
    <text x="140" y="68" textAnchor="middle" fill="#E8A84B" fontSize="9" fontFamily="Outfit,sans-serif">↕</text>
    <text x="140" y="108" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Outfit,sans-serif">Diaphragmatic Breathing</text>
  </svg>
)

/* ─── Swimming / Pool ────────────────────────────────────────────────────── */
export const SwimAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 280 120" width={size} height={size * 120 / 280} style={{ background: '#0A1628', borderRadius: 12 }}>
    <style>{`
      @keyframes sw-arm1 { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(200deg)} }
      @keyframes sw-arm2 { 0%,100%{transform:rotate(100deg)} 50%{transform:rotate(300deg)} }
      @keyframes sw-legs { 0%,100%{transform:translateY(-4px)} 50%{transform:translateY(4px)} }
      .sw-arm1 { transform-origin:150px 62px; animation: sw-arm1 1.6s linear infinite; }
      .sw-arm2 { transform-origin:150px 62px; animation: sw-arm2 1.6s linear infinite; }
      .sw-legs { animation: sw-legs 0.6s ease-in-out infinite; }
    `}</style>
    {/* water */}
    <path d="M20,75 Q70,68 120,75 Q170,82 220,75 Q250,70 260,75 L260,105 L20,105 Z" fill="#0D2040" opacity="0.8"/>
    <path d="M20,72 Q70,65 120,72 Q170,79 220,72" fill="none" stroke="#1E4080" strokeWidth="2"/>
    {/* body */}
    <path d="M90,62 Q120,60 150,62" {...LINE}/>
    <circle cx="165" cy="58" r="11" {...LINE}/>
    {/* legs kick */}
    <g className="sw-legs">
      <line x1="90" y1="62" x2="55" y2="66" {...LINE}/>
      <line x1="82" y1="62" x2="47" y2="58" {...LINE}/>
    </g>
    {/* rotating arms */}
    <g className="sw-arm1">
      <line x1="150" y1="62" x2="150" y2="38" {...ACCENT}/>
    </g>
    <g className="sw-arm2">
      <line x1="150" y1="62" x2="150" y2="38" stroke="#5B8DB8" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </g>
    <text x="140" y="116" textAnchor="middle" fill="#4A7AA8" fontSize="10" fontFamily="Outfit,sans-serif">Pool Session</text>
  </svg>
)

/* ─── Cat-Cow ────────────────────────────────────────────────────────────── */
export const CatCowAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 280 130" width={size} height={size * 130 / 280} style={{ background: BG, borderRadius: 12 }}>
    <style>{`
      @keyframes cc-spine {
        0%,100%{ d:path("M80,72 Q140,80 200,72"); }
        45%,55%{ d:path("M80,72 Q140,58 200,72"); }
      }
      @keyframes cc-head {
        0%,100%{ transform:rotate(0deg); }
        45%,55%{ transform:rotate(-20deg); }
      }
      @keyframes cc-tail {
        0%,100%{ transform:rotate(0deg); }
        45%,55%{ transform:rotate(20deg); }
      }
      .cc-spine { animation: cc-spine 2.4s ease-in-out infinite; }
      .cc-head { transform-origin:210px 62px; animation: cc-head 2.4s ease-in-out infinite; }
      .cc-tail { transform-origin:80px 62px; animation: cc-tail 2.4s ease-in-out infinite; }
    `}</style>
    <line x1="20" y1="98" x2="260" y2="98" stroke="#2A2A2A" strokeWidth="2"/>
    {/* hands on floor */}
    <line x1="200" y1="72" x2="200" y2="98" {...LINE}/>
    <line x1="185" y1="72" x2="185" y2="98" {...LINE}/>
    {/* knees on floor */}
    <line x1="80" y1="72" x2="80" y2="98" {...LINE}/>
    <line x1="95" y1="72" x2="95" y2="98" {...LINE}/>
    {/* animated spine */}
    <path className="cc-spine" d="M80,72 Q140,80 200,72" {...ACCENT} strokeWidth={5}/>
    {/* head */}
    <g className="cc-head">
      <circle cx="210" cy="62" r="10" {...LINE}/>
      <line x1="200" y1="68" x2="198" y2="72" {...LINE}/>
    </g>
    {/* tail/pelvis end */}
    <g className="cc-tail">
      <circle cx="72" cy="62" r="5" {...JOINT}/>
    </g>
    <text x="140" y="116" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Outfit,sans-serif">Cat-Cow</text>
  </svg>
)

/* ─── Generic fallback ───────────────────────────────────────────────────── */
export const GenericAnim: FC<Props> = ({ size = 280 }) => (
  <svg viewBox="0 0 200 240" width={size} height={size * 240 / 200} style={{ background: BG, borderRadius: 12 }}>
    <style>{`
      @keyframes gen-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      .gen { animation: gen-bob 2s ease-in-out infinite; }
    `}</style>
    <g className="gen">
      <circle cx="100" cy="55" r="18" {...LINE}/>
      <line x1="100" y1="73" x2="100" y2="130" {...LINE}/>
      <line x1="100" y1="85" x2="70" y2="115" {...LINE}/>
      <line x1="100" y1="85" x2="130" y2="115" {...LINE}/>
      <line x1="100" y1="130" x2="75" y2="175" {...LINE}/>
      <line x1="100" y1="130" x2="125" y2="175" {...LINE}/>
    </g>
    <text x="100" y="205" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="Outfit,sans-serif">Exercise</text>
  </svg>
)

/* ─── Main lookup component ──────────────────────────────────────────────── */
const ANIM_MAP: Record<string, FC<Props>> = {
  'prone-press':  PronePressAnim,
  'pelvic-tilt':  PelvicTiltAnim,
  'knee-chest':   KneeChestAnim,
  'nerve-glide':  NerveGlideAnim,
  'dead-bug':     DeadBugAnim,
  'bird-dog':     BirdDogAnim,
  'glute-bridge': GluteBridgeAnim,
  'side-plank':   SidePlankAnim,
  'goblet-squat': GobletSquatAnim,
  'hip-hinge':    HipHingeAnim,
  'breathing':    BreathingAnim,
  'swim':         SwimAnim,
  'pendulum':     SwimAnim,
  'cat-cow':      CatCowAnim,
  'clamshell':    SidePlankAnim,
  'pallof':       GenericAnim,
  'lat-pulldown': GenericAnim,
  'farmers-walk': GenericAnim,
}

export const ExerciseAnimation = ({ poseId, size = 280 }: { poseId: string; size?: number }) => {
  const Anim = ANIM_MAP[poseId] ?? GenericAnim
  return <Anim size={size} />
}
