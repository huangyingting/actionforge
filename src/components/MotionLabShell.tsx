import { sitePath } from '../site-path';

export function MotionLabShell() {
  return (
    <>
      <style>
        {
          "\n  /* The site's own colours and type (styles/base.css): this page's short names for them. CHARACTER_LAB_SPEC.md L9. */\n  :root { color-scheme: dark; --pri:var(--primary-color); --bg:var(--bg-dark); --bg2:var(--bg-medium); --bg3:var(--bg-light); --bd:var(--border-color); --mut:var(--text-muted); }\n  * { box-sizing: border-box; }\n  [hidden] { display:none !important; }\n  /* What a visitor doesn't need is behind one switch (Advanced, in the bar; CHARACTER_LAB_SPEC.md L1): shown only with\n     it on. It only shows and hides — what is set there stays set, and is used. */\n  html:not(.advanced) .adv { display:none !important; }\n  /* An animation that is not a walk or a run (CHARACTER_LAB_SPEC.md L13, L14) takes what any motion can: a pose, a\n     control, the posture, the follow-through, and its curves — the hips', the feet's, a control's. What only a walk has\n     a say in — a style, the gait, the trails' keys, a second step kept the same, the foot plant slid — stays where it\n     is, greyed. */\n  html.plain .walk, html.plain #curvePlantReset, html.plain label:has(#curvePlant, #curveMirror) { opacity:.35; pointer-events:none; }\n  /* \"One cycle only\" has nothing to choose on an animation that is played once: it is ticked, and greyed. */\n  label:has(#curveOne:disabled) { opacity:.35; pointer-events:none; }\n  /* One that stays where it stands has no eight to make: what makes them stays where it is, greyed. */\n  html.still .eight { opacity:.35; pointer-events:none; }\n  #curveNone { position:absolute; left:14px; top:10px; right:14px; margin:0; }\n  /* Facing: Face the travel — each of the eight is the source turned whole. What only a strafe set has a say in (how\n     each direction's legs are turned; a strafe made by hand) stays where it is, greyed. */\n  html.travel .aim { opacity:.35; pointer-events:none; }\n  html:not(.nocurve) #curveNone { display:none; }\n  html, body { margin:0; height:100%; background:var(--bg); color:#fff; overflow:hidden; }\n  body { font:12px/1.5 var(--font-heading); }\n  /* The workspace: a bar across the top; what's set on the left; the view; what's picked on the right; time and\n     curves along the bottom; and the library — the main page's own panel — down the right edge, the page's whole\n     height. Nothing moves when something is switched on: every panel keeps its place and size. */\n  body { display:grid; grid-template-columns:300px minmax(0, 1fr) 280px clamp(236px, 22vw, 360px); grid-template-rows:auto minmax(0, 1fr) var(--dock-h, min(320px, 42vh));\n         grid-template-areas:\"bar bar bar bar\" \"left view right lib\" \"dock dock dock lib\"; }\n  /* (In a window too narrow for them in one row — a laptop's, a half screen's — the bar's controls go on to a\n     second row. In one row they ran off the right edge, where nothing scrolls: under 1100 px Generate and Advanced\n     could not be reached.) */\n  #bar { grid-area:bar; display:flex; flex-wrap:wrap; gap:8px 14px; align-items:center; padding:6px 12px; background:var(--bg2); border-bottom:1px solid var(--bd); min-width:0; }\n  #bar h1 { font-size:12px; letter-spacing:.12em; text-transform:uppercase; margin:0; color:var(--pri); white-space:nowrap; }\n  /* The site's wordmark, at this bar's size: the way back to the main page. */\n  #bar .af-mark { font-size:15px; }\n  #status { flex:1; min-width:0; color:var(--mut); text-align:right; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }\n  #status.bad { color:#ff6b6b; }\n  #left, #right { overflow:auto; background:var(--bg2); padding:4px 10px 12px; min-height:0; }\n  #left { grid-area:left; border-right:1px solid var(--bd); }\n  #right { grid-area:right; border-left:1px solid var(--bd); }\n  #viewport { grid-area:view; position:relative; min-width:0; min-height:0; overflow:hidden; }\n  canvas#stage { display:block; position:absolute; inset:0; }\n  /* What's drawn in the view: switches floating in its corner. */\n  #viewOpts { position:absolute; left:8px; top:8px; display:flex; flex-wrap:wrap; gap:2px 12px; padding:4px 9px; background:rgba(10,10,10,.72); border:1px solid var(--bd); z-index:1; max-width:calc(100% - 16px); }\n  label { display:flex; align-items:center; gap:6px; color:#ccc; }\n  select, input, button { background:var(--bg3); border:1px solid var(--bd); color:#fff; font:inherit; padding:3px 6px; }\n  select { min-width:0; }\n  button { cursor:pointer; text-transform:uppercase; letter-spacing:.06em; }\n  button:hover:not(:disabled) { border-color:var(--pri); color:var(--pri); }\n  button:disabled { opacity:.4; cursor:default; }\n  /* Generate: the one button that makes something — in the site's own green (as its \"is-good\" buttons are). */\n  #generate, #generate:hover:not(:disabled) { color:#06150d; background:#2ee88a; border-color:#2ee88a; }\n  #generate:hover:not(:disabled) { background:#5cf0a6; border-color:#5cf0a6; }\n  input[type=checkbox] { accent-color:var(--pri); }\n  /* A section of a panel: its name, and what's in it — folded away or open, as it's left. */\n  details { border-bottom:1px solid var(--bd); padding:2px 0 6px; }\n  summary { font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--pri); cursor:pointer; padding:6px 0 4px; user-select:none; }\n  summary:hover { color:#fff; }\n  h3 { font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--mut); margin:8px 0 2px; font-weight:normal; }\n  .note { color:var(--mut); margin:4px 0; }\n  .note.bad { color:#ff6b6b; }\n  .polRow { display:flex; flex-wrap:wrap; gap:3px 5px; align-items:center; color:#ccc; margin:3px 0; }\n  .polRow input[type=number] { width:46px; padding:2px 3px; }\n  /* A slider with its number beside it: the number can be typed past the slider's end, which then reaches that far. */\n  .slRow > span { flex:none; width:112px; }\n  .slRow input.soft { flex:1; min-width:60px; padding:0; }\n  /* What's picked, on the right: a name and its value, one to a line. */\n  .prop { display:flex; align-items:center; justify-content:space-between; gap:8px; color:#ccc; margin:3px 0; min-height:24px; }\n  .prop > span:first-child { flex:none; }\n  .prop input[type=number] { width:70px; padding:2px 4px; }\n  .prop select { flex:1; max-width:160px; }\n  .grid2 { display:grid; grid-template-columns:1fr 1fr; gap:0 14px; }\n  .grid2 .prop input[type=number] { width:54px; }\n  .pair { display:flex; gap:6px; margin:4px 0; }\n  .pair > * { flex:1; min-width:0; }\n  #dirTable, #stRows { width:100%; border-collapse:collapse; font-size:11px; }\n  #dirTable th, #dirTable td, #stRows th, #stRows td { padding:2px 1px; text-align:left; }\n  #dirTable th, #stRows th { color:#aaa; font-weight:normal; }\n  #dirTable input, #stRows input { width:38px; padding:2px; }\n  #stRows select { padding:1px; font-size:11px; }\n  /* What Generate made: a line a direction — which, and in a few words what became of it; the whole of it under it,\n     with Advanced on (and on hover). */\n  #results .res { display:flex; gap:8px; margin:1px 0; }\n  #results .res b { flex:none; width:3ch; font-weight:normal; color:#aaa; }\n  #results .res.ok span { color:#6bdc7a; }\n  #results .res.bad span { color:#ff6b6b; }\n  #results .full { color:var(--mut); margin:0 0 5px calc(3ch + 8px); }\n  #export { display:grid; grid-template-columns:auto 1fr; gap:5px 8px; align-items:center; margin-bottom:8px; }\n  #export select { width:100%; }\n  #export .wide { grid-column:1 / -1; }\n  #exNote { min-height:3em; }\n  #gaitShare { width:70px; padding:0; }\n  #gaitOut { min-height:6em; }\n  #polGrip { width:110px; padding:0; }\n  #strafe, #mixamo { width:190px; }\n  #styleName { min-width:0; }\n  #styleNote { min-height:1.5em; }\n  #strafeNote { min-height:1.5em; }\n  /* Along the bottom: time (the cycle, and when each foot is down), then the curves — their list, and the graph. Its top edge sizes it. */\n  #curveDock { grid-area:dock; position:relative; display:flex; flex-direction:column; gap:5px; padding:7px 12px 9px; background:var(--bg2); border-top:1px solid var(--bd); min-height:0; }\n  #curveGrip { position:absolute; left:0; right:0; top:-4px; height:9px; cursor:ns-resize; z-index:2; }\n  #time { display:block; width:100%; margin:0; padding:0; flex:none; }\n  #clock { width:52px; color:#ccc; }\n  #contacts { display:block; width:100%; height:52px; flex:none; background:#111; border:1px solid #222; }\n  #curveCol { flex:1; min-width:0; min-height:0; display:flex; flex-direction:column; gap:4px; }\n  #curveBox { flex:1; min-width:0; min-height:0; display:flex; flex-direction:column; gap:4px; }\n  #curveRow2 { margin:0; }\n  #curveMain { flex:1; min-height:0; display:flex; gap:8px; }\n  #curveArea { position:relative; flex:1; min-width:0; background:#111; border:1px solid #222; }\n  #curveList { flex:none; width:190px; font-size:11px; overflow:auto; border:1px solid #222; padding:4px 6px; }\n  #curveList h3 { margin:6px 0 2px; }\n  #curveList h3:first-child { margin-top:0; }\n  #curveList div { display:flex; align-items:center; gap:5px; }\n  /* (A curve's box shows it beside the one edited: only with \"several curves\" on.) */\n  #curveList:not(.several) input { visibility:hidden; width:0; margin:0; }\n  #curveList button { flex:1; text-align:left; text-transform:none; letter-spacing:0; border-color:transparent; background:none; padding:1px 4px; }\n  #curveList button.on { border-color:currentColor; background:#1a1a1a; }\n  #curveList button.also { border-color:currentColor; border-style:dashed; }\n  #hipCurve { position:absolute; inset:0; width:100%; height:100%; display:block; touch-action:none; cursor:crosshair; }\n  #hipCurve:focus { outline:none; }\n  .sep { width:1px; align-self:stretch; background:var(--bd); margin:0 4px; }\n  .help { cursor:help; color:var(--mut); border:1px solid var(--bd); padding:0 7px; }\n  /* The graph's second row: the curve picked, the key picked, its handles as pictures. */\n  #curveRowKey { margin:0; min-height:26px; }\n  #curveRowKey select { max-width:110px; }\n  #curveName { min-width:150px; white-space:nowrap; }\n  #keyFrame, #keyValue { width:58px; }\n  button.ico { padding:2px 4px; line-height:0; color:#bbb; }\n  button.ico.on { color:var(--pri); border-color:var(--pri); background:#12282a; }\n  /* What the graph is doing (a move, a turn), what was copied: at the end of its bar, while it lasts. */\n  #curveHint { margin-left:auto; color:var(--mut); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; min-width:0; }\n  /* The outliner: a control to a line. */\n  .outRow { display:flex; align-items:center; gap:3px; margin:1px 0; }\n  .outRow button { border-color:transparent; background:none; text-transform:none; letter-spacing:0; padding:1px 5px; color:#bbb; }\n  .outRow button.name { flex:1; min-width:0; text-align:left; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n  .outRow.sel button.name { color:var(--pri); border-color:var(--pri); }\n  .outRow button.off { color:#555; }\n  .outRow button.lit { color:var(--pri); }\n  .outRow.unseen button.name { opacity:.45; }\n  /* The library: the main page's own panel — its markup, its styles (the two stylesheets above), its grid code — in a\n     column of its own (CHARACTER_LAB_SPEC.md L4, L5). What follows only sits it in this page: its type as the main\n     page's body has it; this page's own button rules kept off its tiles and tabs; and what it has no use for here\n     (the ticks that pick clips for a bundle; the mark of a clip that travels) out of sight. */\n  /* (As wide as its column, whatever the window: the main page's stylesheet gives its own panel a fixed 380 px on\n     windows under 1500 px, which is wider than this column, and the panel's right side — the Characters tab, the\n     last tiles — was cut off.) */\n  #lib { grid-area:lib; width:auto; border-left:1px solid var(--bd); min-width:0; font-family:var(--font-primary); font-size:16px; line-height:normal; color:var(--text-primary); }\n  :where(#lib) button { text-transform:none; letter-spacing:normal; }\n  #lib .lib-panel__tab:hover:not(.is-on) { color:var(--text-primary); border-color:var(--border-color); }\n  #lib .lib-tile__pick, #lib .lib-tile__rm { display:none; }\n  #lib .lib-note { grid-column:1 / -1; margin:.7rem .2rem .3rem; font-family:var(--font-heading); font-size:.66rem; color:var(--text-muted); }\n"
        }
      </style>
      {'\n\n'}
      <div id={'bar'}>
        {'\n  '}
        <a
          className={'af-mark'}
          href={sitePath()}
          title={'ActionForge: the animations, the Character tool, export'}
        >
          <b>{'Action'}</b>
          {'Forge'}
        </a>
        {'\n  '}
        <h1
          title={
            'One motion, reshaped in depth: given a style, seen on your own character, made into its eight directions, and exported.'
          }
        >
          {'Motion Lab'}
        </h1>
        {'\n  '}
        <label
          title={
            'Which clip is in the view: the animation picked in the library (on the right), the same adjusted, or one of the eight made from it.'
          }
        >
          {'Show '}
          <select id={'source'}></select>
        </label>
        {'\n  '}
        <label
          title={
            'A Mixamo FBX from this computer — an animation that loops: a walk, a run, an idle — retargeted onto our skeleton as the Import tab does. Read here, never uploaded.'
          }
        >
          {'Add a Mixamo FBX '}
          <input id={'mixamo'} type={'file'} accept={'.fbx'} />
        </label>
        {'\n  '}
        <label className={'eight'}>
          {'View '}
          <select id={'view'}>
            <option value={'single'}>{'One'}</option>
            <option value={'grid'}>{'All directions'}</option>
          </select>
        </label>
        {'\n  '}
        <label
          className={'eight'}
          title={
            'What the eight are. Aim forward: a strafe set — the body keeps looking ahead while the legs carry it to the side or backward, as a game that aims does it. Face the travel: each of the eight is the source turned whole to face the way it goes, nothing else of it changed — as a game that runs free does it.'
          }
        >
          {'Facing '}
          <select id={'facing'}>
            <option value={'aim'}>{'Aim forward'}</option>
            <option value={'travel'}>{'Face the travel'}</option>
          </select>
        </label>
        {'\n  '}
        <button
          id={'generate'}
          className={'eight'}
          type={'button'}
          title={
            'Make the other seven directions from the source, with the values in the panel. An animation that stays where it stands has none to make.'
          }
        >
          {'Generate'}
        </button>
        {'\n  '}
        <label
          title={
            'Everything there is to set. Off: what makes a set, and no more — the rest is as it stands, and still used. Remembered in this browser.'
          }
        >
          <input id={'advanced'} type={'checkbox'} />
          {' Advanced'}
        </label>
        {'\n  '}
        <div id={'status'}>{'Loading…'}</div>
        {'\n'}
      </div>
      {'\n\n'}
      <div id={'left'}>
        {'\n  '}
        <details open>
          <summary
            title={
              "Everything set here — the gait, the posture, the follow-through, every curve and every control — as one named set. Kept in this browser, saved to a file, loaded onto another cycle: its keys go where they were in the step, counted from the left foot's landing. A style is a walk's or a run's."
            }
          >
            {'Style'}
          </summary>
          {'\n    '}
          <div className={'walk'}>
            {'\n    '}
            <div className={'pair'}>
              {'\n      '}
              <select id={'styleList'} title={'The styles saved in this browser'}></select>
              {'\n      '}
              <button
                id={'styleLoad'}
                type={'button'}
                title={'The picked style, in place of everything set now'}
              >
                {'Load'}
              </button>
              {'\n    '}
            </div>
            {'\n    '}
            <div className={'pair'}>
              {'\n      '}
              <input
                id={'styleName'}
                type={'text'}
                placeholder={'name'}
                title={"The name to save what's set now under"}
              />
              {'\n      '}
              <button
                id={'styleSave'}
                type={'button'}
                title={"What's set now, saved in this browser under that name"}
              >
                {'Save'}
              </button>
              {'\n    '}
            </div>
            {'\n    '}
            <div className={'pair'}>
              {'\n      '}
              <button id={'styleFile'} type={'button'} title={"What's set now, as a file"}>
                {'To file'}
              </button>
              {'\n      '}
              <button
                id={'styleOpenBtn'}
                type={'button'}
                title={'A style from a file, in place of everything set now'}
              >
                {'From file'}
              </button>
              {'\n      '}
              <button
                id={'styleDelete'}
                type={'button'}
                title={'The picked style, out of this browser'}
              >
                {'Delete'}
              </button>
              {'\n    '}
            </div>
            {'\n    '}
          </div>
          {'\n    '}
          <input id={'styleOpen'} type={'file'} accept={'.json,application/json'} hidden />
          {'\n    '}
          <button
            id={'startOver'}
            type={'button'}
            title={
              "Everything set on this animation — its gait, its posture, the follow-through, every curve, every control and pose — back to the source's own, and no longer kept for it. (Ctrl+Z brings it back.) What is set on an animation is kept in this browser, and is there again when it is picked."
            }
          >
            {'Start over'}
          </button>
          {'\n    '}
          <div id={'styleNote'} className={'note'}></div>
          {'\n  '}
        </details>
        {'\n  '}
        <details open className={'walk'}>
          <summary
            title={
              "A walk's or a run's. The source made slower or quicker, longer or shorter in the step, heavier, lower. What it makes is a cycle like any other: it plays, Generate makes its eight, Export takes them. It uses the Polish switches below (foot lock, reach, arms)."
            }
          >
            {'Gait'}
          </summary>
          {'\n    '}
          <div className={'polRow'}>
            {'Preset '}
            <select id={'gaitPreset'}>
              <option value={''}>{'(none)'}</option>
              <option>{'Stroll'}</option>
              <option>{'Brisk'}</option>
              <option>{'Heavy'}</option>
              <option>{'Sneak'}</option>
            </select>{' '}
            <button id={'gaitReset'} type={'button'} title={"Everything back to the source's own"}>
              {'Reset'}
            </button>
          </div>
          {'\n    '}
          <div
            className={'polRow'}
            title={
              'One number for both: the speed × this, shared between longer steps and quicker ones. In the middle each takes the square root of it (speed × 1.44 is stride × 1.2 and cadence × 1.2).'
            }
          >
            {'Speed × '}
            <input
              id={'gaitSpeed'}
              type={'number'}
              min={'0.3'}
              max={'2.5'}
              step={'0.05'}
              defaultValue={'1'}
            />
            {' stride '}
            <input
              id={'gaitShare'}
              type={'range'}
              min={'0'}
              max={'1'}
              step={'0.05'}
              defaultValue={'0.5'}
            />
            {' cadence'}
          </div>
          {'\n    '}
          <div className={'grid2'}>
            {'\n      '}
            <label
              className={'prop'}
              title={'Each step longer or shorter, the steps a minute kept — the speed follows.'}
            >
              <span>{'Stride ×'}</span>
              <input
                id={'gaitStride'}
                type={'number'}
                min={'0.5'}
                max={'1.5'}
                step={'0.02'}
                defaultValue={'1'}
              />
            </label>
            {'\n      '}
            <label
              className={'prop'}
              title={'The steps a minute, the stride kept — the speed follows.'}
            >
              <span>{'Cadence ×'}</span>
              <input
                id={'gaitCadence'}
                type={'number'}
                min={'0.5'}
                max={'2'}
                step={'0.02'}
                defaultValue={'1'}
              />
            </label>
            {'\n      '}
            <label
              className={'prop'}
              title={
                "Centimetres added to each foot's lane (less to narrow; never under what keeps the legs apart)."
              }
            >
              <span>{'Width cm'}</span>
              <input
                id={'gaitWidth'}
                type={'number'}
                min={'-6'}
                max={'12'}
                step={'0.5'}
                defaultValue={'0'}
              />
            </label>
            {'\n      '}
            <label className={'prop'} title={'How high the feet go through the air.'}>
              <span>{'Lift ×'}</span>
              <input
                id={'gaitLift'}
                type={'number'}
                min={'0.5'}
                max={'2'}
                step={'0.05'}
                defaultValue={'1'}
              />
            </label>
            {'\n      '}
            <label className={'prop'} title={'Centimetres the hips sit lower.'}>
              <span>{'Lower cm'}</span>
              <input
                id={'gaitDrop'}
                type={'number'}
                min={'-3'}
                max={'20'}
                step={'0.5'}
                defaultValue={'0'}
              />
            </label>
            {'\n      '}
            <label
              className={'prop'}
              title={"The hips' up-and-down, about the cycle's own middle."}
            >
              <span>{'Bounce ×'}</span>
              <input
                id={'gaitBounce'}
                type={'number'}
                min={'0'}
                max={'2.5'}
                step={'0.05'}
                defaultValue={'1'}
              />
            </label>
            {'\n      '}
            <label
              className={'prop'}
              title={"The hips' side-to-side, about the cycle's own middle."}
            >
              <span>{'Sway ×'}</span>
              <input
                id={'gaitSway'}
                type={'number'}
                min={'0'}
                max={'2.5'}
                step={'0.05'}
                defaultValue={'1'}
              />
            </label>
            {'\n      '}
            <label className={'prop'} title={"The arms' swing, about its own middle."}>
              <span>{'Arms ×'}</span>
              <input
                id={'gaitSwing'}
                type={'number'}
                min={'0'}
                max={'2'}
                step={'0.05'}
                defaultValue={'1'}
              />
            </label>
            {'\n      '}
            <label
              className={'prop'}
              title={
                "How much the body's lean follows the speed: 1, a walk twice as fast leans twice as far; 0, it leans as the source does whatever the speed."
              }
            >
              <span>{'Lean / speed'}</span>
              <input
                id={'gaitLean'}
                type={'number'}
                min={'0'}
                max={'2'}
                step={'0.1'}
                defaultValue={'1'}
              />
            </label>
            {'\n      '}
            <label
              className={'prop'}
              title={
                "How much of the cycle each foot spends on the ground. More: a longer stance and a quicker swing — heavier. The landings stay where they are; the lift-off moves. It starts at the source's own."
              }
            >
              <span>{'On ground %'}</span>
              <input id={'gaitGround'} type={'number'} min={'30'} max={'90'} step={'1'} />
            </label>
            {'\n    '}
          </div>
          {'\n  '}
        </details>
        {'\n  '}
        <details open>
          <summary
            title={
              'A set turn of the spine, held through the whole animation: an adjustment on top of it. On any animation.'
            }
          >
            {'Posture'}
          </summary>
          {'\n    '}
          <div className={'polRow'}>
            <label
              title={
                'On: the head stays looking where it looked while the spine bends — a sneak looks ahead, not at the floor. Off: the head goes with the chest.'
              }
            >
              <input id={'gaitHeadAhead'} type={'checkbox'} defaultChecked />
              {' head looks ahead'}
            </label>
          </div>
          {'\n    '}
          <div
            className={'polRow slRow'}
            title={
              'The spine bent forward (less than 0: back), held through the whole cycle and spread up it — an adjustment on top of the animation. With the hips lower: a sneak.'
            }
          >
            <span>{'Spine forward °'}</span>
            <input
              id={'gaitPostF'}
              data-soft={''}
              type={'number'}
              min={'-30'}
              max={'60'}
              step={'1'}
              defaultValue={'0'}
            />
          </div>
          {'\n    '}
          <div
            className={'polRow slRow'}
            title={"The spine bent to the character's left (less than 0: right)."}
          >
            <span>{'Spine side °'}</span>
            <input
              id={'gaitPostS'}
              data-soft={''}
              type={'number'}
              min={'-30'}
              max={'30'}
              step={'1'}
              defaultValue={'0'}
            />
          </div>
          {'\n    '}
          <div
            className={'polRow slRow'}
            title={"The spine twisted to the character's left (less than 0: right)."}
          >
            <span>{'Spine twist °'}</span>
            <input
              id={'gaitPostT'}
              data-soft={''}
              type={'number'}
              min={'-45'}
              max={'45'}
              step={'1'}
              defaultValue={'0'}
            />
          </div>
          {'\n  '}
        </details>
        {'\n  '}
        <details open>
          <summary
            title={
              "The body above the hips arrives late: what you change on the hips, the chest follows a moment after, overshoots a little, and settles; the head and the arms after the chest. Nothing changed on the hips: nothing added. On an animation that is not a walk it follows what the hips' curves change — or, with Loosen, the animation's own hips."
            }
          >
            {'Follow-through'}
          </summary>
          {'\n    '}
          <div className={'polRow'}>
            <label
              title={
                'The body above the hips arrives late: what you change on the hips — their curves, the bounce, the sway — the chest follows a moment after, overshoots a little, and settles; the head and the arms after the chest. Nothing changed on the hips: nothing added. Holding a weapon keeps the chest and the arms out of it.'
              }
            >
              <input id={'ftOn'} type={'checkbox'} defaultChecked />
              {' on'}
            </label>{' '}
            <select id={'ftPreset'} title={'A set of values to start from'}>
              <option value={''}>{'(own)'}</option>
              <option>{'Stiff'}</option>
              <option>{'Loose'}</option>
              <option>{'Heavy'}</option>
            </select>{' '}
            <button
              id={'ftReset'}
              type={'button'}
              title={
                'The follow-through back as the page opens with it: on, and every value its own. (Ctrl+Z brings it back.)'
              }
            >
              {'Reset'}
            </button>
          </div>
          {'\n    '}
          <div
            className={'polRow slRow'}
            title={
              'How far the chest is let lag behind the hips: × what the spring gives. 0: it rides rigidly, as before.'
            }
          >
            <span>{'Chest'}</span>
            <input
              id={'ftChest'}
              data-soft={''}
              type={'number'}
              min={'0'}
              max={'2'}
              step={'0.05'}
              defaultValue={'1'}
            />
          </div>
          {'\n    '}
          <div className={'polRow slRow'} title={'How far the head is let lag behind the chest.'}>
            <span>{'Head'}</span>
            <input
              id={'ftHead'}
              data-soft={''}
              type={'number'}
              min={'0'}
              max={'2'}
              step={'0.05'}
              defaultValue={'0.5'}
            />
          </div>
          {'\n    '}
          <div
            className={'polRow slRow'}
            title={'How far the arms are let swing behind the chest.'}
          >
            <span>{'Arms'}</span>
            <input
              id={'ftArms'}
              data-soft={''}
              type={'number'}
              min={'0'}
              max={'2'}
              step={'0.05'}
              defaultValue={'1'}
            />
          </div>
          {'\n    '}
          <div
            className={'polRow slRow'}
            title={'How late they arrive: 0 close behind the hips, 1 well behind.'}
          >
            <span>{'Lag'}</span>
            <input
              id={'ftLag'}
              data-soft={'fixed'}
              type={'number'}
              min={'0'}
              max={'1'}
              step={'0.01'}
              defaultValue={'0.5'}
            />
          </div>
          {'\n    '}
          <div
            className={'polRow slRow'}
            title={'How much they overshoot before settling: 0 none, 1 a lot.'}
          >
            <span>{'Bounce'}</span>
            <input
              id={'ftBounce'}
              data-soft={'fixed'}
              type={'number'}
              min={'0'}
              max={'1'}
              step={'0.01'}
              defaultValue={'0.4'}
            />
          </div>
          {'\n    '}
          <div
            className={'polRow slRow'}
            title={
              "How much of the source's own hip movement is followed too: 0 only what you changed; more loosens a stiff walk as it is."
            }
          >
            <span>{'Loosen'}</span>
            <input
              id={'ftLoosen'}
              data-soft={''}
              type={'number'}
              min={'0'}
              max={'2'}
              step={'0.05'}
              defaultValue={'0'}
            />
          </div>
          {'\n  '}
        </details>
        {'\n  '}
        <details className={'aim eight'}>
          <summary
            title={
              "Per angle away from forward: how far the hips turn toward the travel (the chest turns back to stay on aim), how far the knees and feet point along it (0 the hips' way, 1 the travel's), the closest the legs may come (the lanes widen until it holds, shins included), how far the swinging foot bulges out past the planted leg, and the stride — shorter and quicker at once, so the speed stays and the set still blends. 135° and 180° start from the walk played backward (it lands toe first, knee bent, as backward walking does); the back diagonals turn it ±45° with the hips turned away from the travel side."
            }
          >
            {'Directions'}
          </summary>
          {'\n    '}
          <table id={'dirTable'} className={'adv'}>
            <tbody>
              <tr>
                <th></th>
                <th>{'Hips°'}</th>
                <th>{'Knees'}</th>
                <th>{'Feet'}</th>
                <th title={'The closest the legs may come to each other, centimetres.'}>
                  {'Leg gap'}
                </th>
                <th title={'How far the swinging foot goes out past the planted leg, centimetres.'}>
                  {'Swing out'}
                </th>
                <th>{'Stride'}</th>
              </tr>
              <tr data-a={'45'}>
                <td>{'45°'}</td>
                <td>
                  <input data-k={'hips'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'knees'} type={'number'} step={'0.05'} min={'0'} max={'1'} />
                </td>
                <td>
                  <input data-k={'feet'} type={'number'} step={'0.05'} min={'0'} max={'1'} />
                </td>
                <td>
                  <input data-k={'gap'} type={'number'} step={'0.5'} />
                </td>
                <td>
                  <input data-k={'bulge'} type={'number'} step={'0.5'} />
                </td>
                <td>
                  <input data-k={'stride'} type={'number'} step={'0.05'} min={'0.3'} max={'1.5'} />
                </td>
              </tr>
              <tr data-a={'90'}>
                <td>{'90°'}</td>
                <td>
                  <input data-k={'hips'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'knees'} type={'number'} step={'0.05'} min={'0'} max={'1'} />
                </td>
                <td>
                  <input data-k={'feet'} type={'number'} step={'0.05'} min={'0'} max={'1'} />
                </td>
                <td>
                  <input data-k={'gap'} type={'number'} step={'0.5'} />
                </td>
                <td>
                  <input data-k={'bulge'} type={'number'} step={'0.5'} />
                </td>
                <td>
                  <input data-k={'stride'} type={'number'} step={'0.05'} min={'0.3'} max={'1.5'} />
                </td>
              </tr>
              <tr data-a={'135'}>
                <td>{'135°'}</td>
                <td>
                  <input data-k={'hips'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'knees'} type={'number'} step={'0.05'} min={'0'} max={'1'} />
                </td>
                <td>
                  <input data-k={'feet'} type={'number'} step={'0.05'} min={'0'} max={'1'} />
                </td>
                <td>
                  <input data-k={'gap'} type={'number'} step={'0.5'} />
                </td>
                <td>
                  <input data-k={'bulge'} type={'number'} step={'0.5'} />
                </td>
                <td>
                  <input data-k={'stride'} type={'number'} step={'0.05'} min={'0.3'} max={'1.5'} />
                </td>
              </tr>
              <tr data-a={'180'}>
                <td>{'180°'}</td>
                <td>
                  <input data-k={'hips'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'knees'} type={'number'} step={'0.05'} min={'0'} max={'1'} />
                </td>
                <td>
                  <input data-k={'feet'} type={'number'} step={'0.05'} min={'0'} max={'1'} />
                </td>
                <td>
                  <input data-k={'gap'} type={'number'} step={'0.5'} />
                </td>
                <td>
                  <input data-k={'bulge'} type={'number'} step={'0.5'} />
                </td>
                <td>
                  <input data-k={'stride'} type={'number'} step={'0.05'} min={'0.3'} max={'1.5'} />
                </td>
              </tr>
            </tbody>
          </table>
          {'\n    '}
          <div
            className={'polRow'}
            title={
              'What a strafe changes, measured on reference packs against their own forward clip: each preset fills the values below. Auto: picked from how the source itself stands — square: the unarmed walk’s; turned, as with a rifle on aim: the rifle’s, a walk’s or a run’s, with the away strafe on the side it is turned from (the rifle presets are changes on top of a stance already turned: on a source that stands square, their small turns leave the legs no room). Classic: the set as it was before — the chest held exactly on the aim, both strafes toward. Chest: how much of the hips’ turn the chest goes with (0: none, the spine takes it all back; 1: all of it) — the head stays on the aim either way. Hips swing: how many degrees further the hips turn while the legs are crossed, and less while the stance is open.'
            }
          >
            {'\n      '}
            <span>{'Preset'}</span>
            <select id={'stPreset'}>
              <option value={'auto'}>{'Auto (from how it stands)'}</option>
              <option value={'unarmed'}>{'Unarmed walk'}</option>
              <option value={'rifleWalk'}>{'Rifle walk'}</option>
              <option value={'rifleRun'}>{'Rifle run'}</option>
              <option value={'classic'}>{'Classic'}</option>
            </select>
            {'\n      '}
            <span className={'adv'}>{'chest'}</span>
            <input
              className={'adv'}
              id={'stChest'}
              type={'number'}
              min={'0'}
              max={'1'}
              step={'0.05'}
            />
            <span className={'adv'}>{'hips swing°'}</span>
            <input
              className={'adv'}
              id={'stSwing'}
              type={'number'}
              min={'0'}
              max={'30'}
              step={'1'}
            />
          </div>
          {'\n    '}
          <div
            className={'polRow adv'}
            title={
              "An animation played once (a roll, a strike, a stop). An end that is kept is the source's own pose in every direction: nothing is added there, however fast it is going. Read off the clip when it is picked — an end it stands still at is kept — and overruled here. A strike or a dash: both. A stop: its last."
            }
          >
            {'\n      '}
            <span>{'Played once: keep its'}</span>
            <label>
              <input id={'shotOpens'} type={'checkbox'} disabled />
              {' first pose'}
            </label>
            <label>
              <input id={'shotCloses'} type={'checkbox'} disabled />
              {' last pose'}
            </label>
          </div>
          {'\n    '}
          <table
            id={'stRows'}
            className={'adv'}
            title={
              'Each direction’s own values. Hips: degrees they turn. Stride: × the source’s. Toes and knees: degrees toward the travel side (less than nothing: away), the lead foot’s — the travel side’s — and the trailing foot’s. Blank: the row of the table above for that angle. A diagonal takes half its strafe’s turns: what a blend of the forward clip and the strafe was measured to come to.'
            }
          >
            <tbody>
              <tr>
                <th>{'Direction'}</th>
                <th>{'Family'}</th>
                <th>{'Hips°'}</th>
                <th>{'Stride'}</th>
                <th>{'Toe lead°'}</th>
                <th>{'Toe trail°'}</th>
                <th>{'Knee lead°'}</th>
                <th>{'Knee trail°'}</th>
              </tr>
              <tr data-dir={'L'}>
                <td>{'Left 90°'}</td>
                <td>
                  <select
                    data-k={'fam'}
                    title={
                      'Toward: made from the walk, the hips turned toward the travel, the trailing foot crossing in front. Away: made from the walk reversed, the hips turned away, the trailing foot crossing behind.'
                    }
                  >
                    <option value={'toward'}>{'toward'}</option>
                    <option value={'away'}>{'away'}</option>
                  </select>
                </td>
                <td>
                  <input data-k={'hips'} type={'number'} step={'1'} min={'0'} max={'90'} />
                </td>
                <td>
                  <input data-k={'stride'} type={'number'} step={'0.05'} min={'0.3'} max={'1.5'} />
                </td>
                <td>
                  <input data-k={'toeLead'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'toeTrail'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'kneeLead'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'kneeTrail'} type={'number'} step={'1'} />
                </td>
              </tr>
              <tr data-dir={'R'}>
                <td>{'Right 90°'}</td>
                <td>
                  <select
                    data-k={'fam'}
                    title={
                      'Toward: made from the walk, the hips turned toward the travel, the trailing foot crossing in front. Away: made from the walk reversed, the hips turned away, the trailing foot crossing behind.'
                    }
                  >
                    <option value={'toward'}>{'toward'}</option>
                    <option value={'away'}>{'away'}</option>
                  </select>
                </td>
                <td>
                  <input data-k={'hips'} type={'number'} step={'1'} min={'0'} max={'90'} />
                </td>
                <td>
                  <input data-k={'stride'} type={'number'} step={'0.05'} min={'0.3'} max={'1.5'} />
                </td>
                <td>
                  <input data-k={'toeLead'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'toeTrail'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'kneeLead'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'kneeTrail'} type={'number'} step={'1'} />
                </td>
              </tr>
              <tr data-dir={'FL'}>
                <td>{'Front left 45°'}</td>
                <td>{'toward'}</td>
                <td>
                  <input data-k={'hips'} type={'number'} step={'1'} min={'0'} max={'90'} />
                </td>
                <td>
                  <input data-k={'stride'} type={'number'} step={'0.05'} min={'0.3'} max={'1.5'} />
                </td>
                <td>
                  <input data-k={'toeLead'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'toeTrail'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'kneeLead'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'kneeTrail'} type={'number'} step={'1'} />
                </td>
              </tr>
              <tr data-dir={'FR'}>
                <td>{'Front right 45°'}</td>
                <td>{'toward'}</td>
                <td>
                  <input data-k={'hips'} type={'number'} step={'1'} min={'0'} max={'90'} />
                </td>
                <td>
                  <input data-k={'stride'} type={'number'} step={'0.05'} min={'0.3'} max={'1.5'} />
                </td>
                <td>
                  <input data-k={'toeLead'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'toeTrail'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'kneeLead'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'kneeTrail'} type={'number'} step={'1'} />
                </td>
              </tr>
              <tr data-dir={'BL'}>
                <td>{'Back left 135°'}</td>
                <td>{'away'}</td>
                <td>
                  <input data-k={'hips'} type={'number'} step={'1'} min={'0'} max={'90'} />
                </td>
                <td>
                  <input data-k={'stride'} type={'number'} step={'0.05'} min={'0.3'} max={'1.5'} />
                </td>
                <td>
                  <input data-k={'toeLead'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'toeTrail'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'kneeLead'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'kneeTrail'} type={'number'} step={'1'} />
                </td>
              </tr>
              <tr data-dir={'BR'}>
                <td>{'Back right 135°'}</td>
                <td>{'away'}</td>
                <td>
                  <input data-k={'hips'} type={'number'} step={'1'} min={'0'} max={'90'} />
                </td>
                <td>
                  <input data-k={'stride'} type={'number'} step={'0.05'} min={'0.3'} max={'1.5'} />
                </td>
                <td>
                  <input data-k={'toeLead'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'toeTrail'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'kneeLead'} type={'number'} step={'1'} />
                </td>
                <td>
                  <input data-k={'kneeTrail'} type={'number'} step={'1'} />
                </td>
              </tr>
            </tbody>
          </table>
          {'\n  '}
        </details>
        {'\n  '}
        <details className={'eight'}>
          <summary
            title={
              'One switch per stage, each to judge on and off; the set is made again when one changes.'
            }
          >
            {'Polish'}
          </summary>
          {'\n    '}
          <label
            className={'adv'}
            title={
              "On: a planted foot is held where it landed — the heel as it lands, the ball once that's down. Flat, the whole foot is carried back to its place; up on its toe it rolls about the ball instead, the heel a little higher. What that moved it by is given back over the swing, in step with the foot's own travel. The hold gives way before the leg would go straighter than the clip's legs ever are."
            }
          >
            <input id={'polLock'} type={'checkbox'} />
            {' Foot lock'}
          </label>
          {'\n    '}
          <label
            className={'adv'}
            title={
              "How long a foot that's still on the floor is held once it starts to move. 1: until it has left the floor — a toe dragged along the floor before it lifts is held still. 0: only while it's still — the drag stays as the source has it."
            }
          >
            {'Grip '}
            <input
              id={'polGrip'}
              type={'range'}
              min={'0'}
              max={'1'}
              step={'0.05'}
              defaultValue={'1'}
            />{' '}
            <span id={'polGripOut'}>{'1.00'}</span>
          </label>
          {'\n    '}
          <label
            title={
              'The forward clip is the source, untouched. On: it goes through the same lock, and that is what All directions and the export use.'
            }
          >
            <input id={'polLockSource'} type={'checkbox'} />
            {" Lock the source's feet"}
          </label>
          {'\n    '}
          <label
            className={'adv'}
            title={
              "On: the body's lean goes where it travels, and its sway is laid along the travel like the feet — each bone by its share. And the hips' place over the feet is laid like the feet's, growing with the lanes, so the weight still gets over the foot that's down (as far as the legs allow)."
            }
          >
            <input id={'polLean'} type={'checkbox'} defaultChecked />
            {' Lean and weight'}
          </label>
          {'\n    '}
          <div
            className={'polRow adv'}
            title={
              "How much of the lean goes toward the travel, per angle away from forward. 1: all of it turns to where the body's going. 0: none — backward stands upright (people don't lean back)."
            }
          >
            {'Toward travel: 45° '}
            <input id={'polLean45'} type={'number'} min={'0'} max={'1.5'} step={'0.05'} />
            {' 90° '}
            <input id={'polLean90'} type={'number'} min={'0'} max={'1.5'} step={'0.05'} />
            {' 135° '}
            <input id={'polLean135'} type={'number'} min={'0'} max={'1.5'} step={'0.05'} />
            {' 180° '}
            <input id={'polLean180'} type={'number'} min={'0'} max={'1.5'} step={'0.05'} />
          </div>
          {'\n    '}
          <div
            className={'polRow adv'}
            title={
              "Each one's share of that turn, in percent: 100 its tilt goes where the travel goes, 0 it stays exactly the source's. The spine and the neck take what lies between."
            }
          >
            {'Share %: hips '}
            <input
              id={'polHips'}
              type={'number'}
              min={'0'}
              max={'100'}
              step={'5'}
              defaultValue={'100'}
            />
            {' chest '}
            <input
              id={'polChest'}
              type={'number'}
              min={'0'}
              max={'100'}
              step={'5'}
              defaultValue={'50'}
            />
            {' head '}
            <input
              id={'polHead'}
              type={'number'}
              min={'0'}
              max={'100'}
              step={'5'}
              defaultValue={'0'}
            />
          </div>
          {'\n    '}
          <label
            title={
              "On: the chest and the head keep exactly the source's tilt, whatever their share — so what the hands hold points exactly where the source pointed it."
            }
          >
            <input id={'polWeapon'} type={'checkbox'} />
            {' Holding a weapon'}
          </label>
          {'\n    '}
          <label
            className={'adv'}
            title={"Off: the hips sit over the root as before, turned with the hips' turn only."}
          >
            <input id={'polWeight'} type={'checkbox'} />
            {' Weight over the foot'}
          </label>
          {'\n    '}
          <label
            className={'adv'}
            title={
              'On: no leg past its reach. Where a leg bearing weight would be, the hips move — the least that brings it back, eased over the frames either side. A foot in the air is drawn in instead. With it on, the foot lock may ask a little more of a leg: the hips give where before the foot had to slip.'
            }
          >
            <input id={'polReach'} type={'checkbox'} defaultChecked />
            {' Reach'}
          </label>
          {'\n    '}
          <div
            className={'polRow adv'}
            title={
              "The furthest a hip may be from its ankle, as a share of the leg's length: under 100, so a knee never goes dead straight. And which ways the hips may move for it."
            }
          >
            {'Limit % '}
            <input
              id={'polReachLimit'}
              type={'number'}
              min={'90'}
              max={'100'}
              step={'0.1'}
              defaultValue={'99.5'}
            />{' '}
            <label>
              <input id={'polReachDown'} type={'checkbox'} defaultChecked />
              {' down'}
            </label>{' '}
            <label>
              <input id={'polReachSide'} type={'checkbox'} defaultChecked />
              {' sideways'}
            </label>
          </div>
          {'\n    '}
          <label
            className={'adv'}
            title={
              "On: the arms are swung clear of the body. A clip turned to a new direction swings its legs toward the travel while its arms swing as the source's did — a thigh can pass through the hand on that side. Where an arm comes too close, it swings wider from the shoulder, as far as it takes; the elbow keeps its bend. Off when holding a weapon: two hands on one thing are left alone."
            }
          >
            <input id={'polArms'} type={'checkbox'} defaultChecked />
            {' Arms kept clear'}
          </label>
          {'\n    '}
          <div
            className={'polRow adv'}
            title={
              "Gap: the least room between an arm and the body, skin to skin — or the source's own closest, where that's less. Shapes ×: the body and arm are round shapes sized off the mannequin's skin; thinner shapes ask less."
            }
          >
            {'Arm gap cm '}
            <input
              id={'polGap'}
              type={'number'}
              min={'0'}
              max={'10'}
              step={'0.5'}
              defaultValue={'2'}
            />
            {' Shapes × '}
            <input
              id={'polScale'}
              type={'number'}
              min={'0.5'}
              max={'1.5'}
              step={'0.05'}
              defaultValue={'1'}
            />{' '}
            <label title={'Draws the shapes on the character in the One view.'}>
              <input id={'polShapes'} type={'checkbox'} />
              {' show'}
            </label>
          </div>
          {'\n    '}
          <div
            className={'polRow adv'}
            title={
              "The arms' swing, bigger or smaller about its own middle, per angle away from forward. 1: as the source."
            }
          >
            {'Arm swing ×: 45° '}
            <input id={'polSwing45'} type={'number'} min={'0'} max={'1.5'} step={'0.05'} />
            {' 90° '}
            <input id={'polSwing90'} type={'number'} min={'0'} max={'1.5'} step={'0.05'} />
            {' 135° '}
            <input id={'polSwing135'} type={'number'} min={'0'} max={'1.5'} step={'0.05'} />
            {' 180° '}
            <input id={'polSwing180'} type={'number'} min={'0'} max={'1.5'} step={'0.05'} />
          </div>
          {'\n  '}
        </details>
        {'\n  '}
        <details className={'adv aim eight'}>
          <summary
            title={
              "Optional: a strafe made by hand in place of the generated one — a Mixamo FBX walking left or right. It's restarted where the set's left foot lands, so it blends; the other side is its mirror. Kept through Generate."
            }
          >
            {'Authored strafe'}
          </summary>
          {'\n    '}
          <label>
            {'Mixamo FBX '}
            <input id={'strafe'} type={'file'} accept={'.fbx'} />
          </label>
          {'\n    '}
          <div id={'strafeNote'} className={'note'}>
            {'None.'}
          </div>
          {'\n    '}
          <button id={'strafeClear'} type={'button'} disabled>
            {'Use the generated strafes'}
          </button>
          {'\n  '}
        </details>
        {'\n  '}
        <details open>
          <summary
            title={
              'What is made here, kept as an animation of your own: in this browser, with the ones you imported. It is then on the main page, under Yours. Nothing is uploaded.'
            }
          >
            {'Save'}
          </summary>
          {'\n    '}
          <input
            id={'saveName'}
            type={'text'}
            spellCheck={false}
            style={{ width: '100%' }}
            title={
              "The name it is saved under. Left empty, the one shown is used: the animation's, and its style's. Saved again under the same name, it takes the earlier one's place."
            }
          />
          {'\n    '}
          <div className={'pair'}>
            {'\n      '}
            <button
              id={'saveOne'}
              type={'button'}
              disabled
              title={
                'The clip in the view — the cycle as styled, or the one of its eight that is shown — saved as an animation of yours, with a picture of it. It needs no Generate.'
              }
            >
              {'Save this one'}
            </button>
            {'\n      '}
            <button
              id={'saveEight'}
              type={'button'}
              disabled
              title={
                'All eight, once they are made, saved as eight animations of yours: the name, and F, FL, L, BL, B, BR, R, FR.'
              }
            >
              {'Save all 8'}
            </button>
            {'\n    '}
          </div>
          {'\n    '}
          <button
            id={'toPlay'}
            type={'button'}
            disabled
            hidden
            style={{ width: '100%' }}
            title={
              "The eight as a set, kept in this browser for the playground under that name: listed there under Walk, Run and Sprint, and walked on as they were made here. Several can be kept side by side; the same name takes the earlier one's place."
            }
          >
            {'Send the 8 to the playground'}
          </button>
          {'\n    '}
          <div className={'pair'}>
            {'\n      '}
            <select id={'savedList'} title={'What was saved from here.'}></select>
            {'\n      '}
            <button
              id={'savedRemove'}
              type={'button'}
              style={{ flex: 'none' }}
              title={
                'The one picked, out of this browser. (An animation of yours can also be removed on the main page, in its Import pane.)'
              }
            >
              {'Remove'}
            </button>
            {'\n    '}
          </div>
          {'\n    '}
          <div id={'saveNote'} className={'note'} style={{ minHeight: '3em' }}></div>
          {'\n  '}
        </details>
        {'\n  '}
        <details>
          <summary
            title={
              "Through the site's own exporter. The clip in the view, by itself; or all eight at once: one file holding eight takes, or one file each in a zip, named after the source: _F, _FL, _L, _BL, _B, _BR, _R, _FR."
            }
          >
            {'Export'}
          </summary>
          {'\n    '}
          <div id={'export'}>
            {'\n      '}
            <span>{'Skeleton'}</span>
            <select id={'exSkeleton'}></select>
            {'\n      '}
            <span>{'Format'}</span>
            <select id={'exFormat'}>
              <option value={'fbx'}>{'FBX'}</option>
              <option value={'glb'}>{'GLB'}</option>
            </select>
            {'\n      '}
            <span>{'FBX for'}</span>
            <select id={'exTarget'}></select>
            {'\n      '}
            <span>{'Files'}</span>
            <select id={'exSplit'}>
              <option value={'one'}>{'One file, all takes inside'}</option>
              <option value={'zip'}>{'Zip, one file per clip'}</option>
            </select>
            {'\n      '}
            <span>{'Motion'}</span>
            <select id={'exMotion'}>
              <option value={'root'}>{'Root motion'}</option>
              <option value={'inplace'}>{'In place'}</option>
              <option value={'both'}>{'Both (16 takes)'}</option>
            </select>
            {'\n      '}
            <label className={'wide'}>
              <input id={'exMesh'} type={'checkbox'} />
              {' Include the character'}
            </label>
            {'\n    '}
          </div>
          {'\n    '}
          <div className={'pair'}>
            {'\n      '}
            <button
              id={'exOne'}
              type={'button'}
              disabled
              title={
                'The clip in the view — the cycle as it is, as adjusted, or the one of its eight that is shown — as one file. It needs no Generate.'
              }
            >
              {'Export this one'}
            </button>
            {'\n      '}
            <button
              id={'exGo'}
              type={'button'}
              disabled
              title={'All eight, once they are made: Generate first.'}
            >
              {'Export all 8'}
            </button>
            {'\n    '}
          </div>
          {'\n    '}
          <button
            id={'exRest'}
            type={'button'}
            style={{ width: '100%' }}
            title={
              'The character alone, standing in its rest pose with its skeleton — no animation in the file. Who is picked in the Characters tab, or our mannequin. Import it into your engine first, to make the character; then export the animations without the character and import them onto its skeleton.'
            }
          >
            {'Export the character (rest pose)'}
          </button>
          {'\n    '}
          <div id={'exNote'} className={'note'}>
            {'The one in the view can be exported now; all eight, after Generate.'}
          </div>
          {'\n  '}
        </details>
        {'\n'}
      </div>
      {'\n\n'}
      <div id={'viewport'}>
        {'\n  '}
        <div id={'viewOpts'}>
          {'\n    '}
          <label
            title={
              'Off: in place, the floor slides under the feet. On: travelling as the clip does, the camera following'
            }
          >
            <input id={'rootMotion'} type={'checkbox'} />
            {' Root motion'}
          </label>
          {'\n    '}
          <label className={'adv'}>
            <input id={'prints'} type={'checkbox'} />
            {' Footprints'}
          </label>
          {'\n    '}
          <label className={'adv'}>
            <input id={'lanes'} type={'checkbox'} />
            {' Foot lanes'}
          </label>
          {'\n    '}
          <label className={'adv'}>
            <input id={'trails'} type={'checkbox'} />
            {' Swing trails'}
          </label>
          {'\n    '}
          <label
            className={'adv'}
            title={
              "The hips' path, drawn like the feet's: its wave seen from the side, its sway from above"
            }
          >
            <input id={'hipTrail'} type={'checkbox'} />
            {' Hip trail'}
          </label>
          {'\n    '}
          <label className={'adv'}>
            <input id={'bones'} type={'checkbox'} />
            {' Bones'}
          </label>
          {'\n    '}
          <label
            className={'walk'}
            title={
              "Keys on the trails: a dot on the hips' path, the feet's and an aim's target at each of its keys. Drag one in the view and the motion goes there (Shift: up and down only); double-click a trail for a new key. The trails are shaded by speed: bright where it's fast. The hips' and the feet's trails are drawn for it, and go again with it."
            }
          >
            <input id={'trailEdit'} type={'checkbox'} />
            {' Edit trails'}
          </label>
          {'\n    '}
          <label
            title={
              "Pose a bone in the view: dots show on the bones that can be — click one, then turn it (or move it) with the gizmo. The turn is that bone's set pose through the whole animation, which carries on around it; or, set so on the right, a key at the playhead."
            }
          >
            <input id={'poseOn'} type={'checkbox'} />
            {' Pose'}
          </label>
          {'\n  '}
        </div>
        {'\n'}
      </div>
      {'\n\n'}
      <div id={'right'}>
        {'\n  '}
        <details open>
          <summary
            title={
              "A bone's set pose: turned once about its own axes, moved once, the same through the whole animation — which carries on around it. On any animation. Tick Pose over the view, click a bone's dot, and turn it with the gizmo; or type the numbers here. The other side of a pair takes its mirror image."
            }
          >
            <span id={'poseWho'}>{'Pose'}</span>
          </summary>
          {'\n    '}
          <div className={'pair'}>
            {'\n      '}
            <select
              id={'poseMode'}
              title={'What the gizmo does: turns the bone, or moves it (off its joint).'}
            >
              <option value={'rotate'}>{'Rotate'}</option>
              <option value={'translate'}>{'Move'}</option>
            </select>
            {'\n      '}
            <select
              id={'poseWhen'}
              title={
                "Whole cycle: what the gizmo does is the bone's set pose, the same in every frame. Key at the playhead: it becomes a key there on the bone's curves (made if there's none), easing in and out as keys do."
              }
            >
              <option value={'cycle'}>{'whole cycle'}</option>
              <option value={'key'}>{'key at the playhead'}</option>
            </select>
            {'\n    '}
          </div>
          {'\n    '}
          <label
            className={'prop'}
            title={
              "The gizmo's axes: the bone's own (as posing has it in an animation program), or the world's."
            }
          >
            <span>{'Gizmo axes'}</span>
            <select id={'poseSpace'}>
              <option value={'local'}>{"the bone's own"}</option>
              <option value={'world'}>{"the world's"}</option>
            </select>
          </label>
          {'\n    '}
          <div className={'grid2'}>
            {'\n      '}
            <label className={'prop'} title={"Turned about the bone's own X axis, degrees."}>
              <span>{'Rot X °'}</span>
              <input id={'poseRX'} type={'number'} step={'1'} defaultValue={'0'} disabled />
            </label>
            {'\n      '}
            <label
              className={'prop'}
              title={"Moved to the character's left (less than 0: right), centimetres."}
            >
              <span>{'Loc X cm'}</span>
              <input id={'poseLX'} type={'number'} step={'0.5'} defaultValue={'0'} disabled />
            </label>
            {'\n      '}
            <label
              className={'prop'}
              title={"Turned about the bone's own Y axis (along it), degrees."}
            >
              <span>{'Rot Y °'}</span>
              <input id={'poseRY'} type={'number'} step={'1'} defaultValue={'0'} disabled />
            </label>
            {'\n      '}
            <label className={'prop'} title={'Moved ahead (less than 0: back), centimetres.'}>
              <span>{'Loc Y cm'}</span>
              <input id={'poseLY'} type={'number'} step={'0.5'} defaultValue={'0'} disabled />
            </label>
            {'\n      '}
            <label className={'prop'} title={"Turned about the bone's own Z axis, degrees."}>
              <span>{'Rot Z °'}</span>
              <input id={'poseRZ'} type={'number'} step={'1'} defaultValue={'0'} disabled />
            </label>
            {'\n      '}
            <label className={'prop'} title={'Moved up (less than 0: down), centimetres.'}>
              <span>{'Loc Z cm'}</span>
              <input id={'poseLZ'} type={'number'} step={'0.5'} defaultValue={'0'} disabled />
            </label>
            {'\n    '}
          </div>
          {'\n    '}
          <div className={'pair'}>
            {'\n      '}
            <button
              id={'poseReset'}
              type={'button'}
              disabled
              title={"This bone's set pose back to none"}
            >
              {'Reset pose'}
            </button>
            {'\n      '}
            <button
              id={'poseResetAll'}
              type={'button'}
              title={"Every bone's set pose back to none"}
            >
              {'Reset all poses'}
            </button>
            {'\n    '}
          </div>
          {'\n  '}
        </details>
        {'\n  '}
        <details>
          <summary
            title={
              "A control holds a part of the body as an empty holds it in Blender: its curves join the list below the view. Here: one added, every one there is, and the settings of the aim or the pin being edited. Nothing changes until a control's curves are touched. On any animation."
            }
          >
            {'Controls'}
          </summary>
          {'\n    '}
          <h3
            title={
              'A control holds a part of the body as an empty holds it in Blender: its curves join the list below the view. Nothing changes until one of them is touched.'
            }
          >
            {'Add'}
          </h3>
          {'\n    '}
          <div className={'pair'}>
            {'\n      '}
            <select
              id={'ctlKind'}
              title={
                'The kind of control. On the bone: an empty sitting on the bone — its rotation and its location. Aim: an empty out from the bone, a set distance along one of its axes — the bone points at it, and you move the target. Pin a hand: the hand kept where it is against something else (the other hand, the hips…), the arm solved to it — an IK target with a Child Of.'
              }
            >
              <option value={'bone'}>{'On the bone'}</option>
              <option value={'aim'}>{'Aim'}</option>
              <option value={'pin'}>{'Pin a hand'}</option>
            </select>
            {'\n      '}
            <select
              id={'ctlPart'}
              title={
                'A part of the body to put a control on — what an empty does in Blender: its rotation and its location in the world, as the source has them, become six curves (Rot X, Y, Z; Loc X, Y, Z), each to be made late, bigger or smaller, or reshaped, by itself. A location changed takes the bone off its joint by that much. A run of bones (the spine, an arm) takes each bone along it later than the one before.'
              }
            ></select>
            {'\n    '}
          </div>
          {'\n    '}
          <button
            id={'ctlAdd'}
            type={'button'}
            title={
              "Add a control of that kind on that part: its curves join the list (and an aim's target shows in the view). Nothing changes until one of them is touched."
            }
          >
            {'+ Control'}
          </button>
          {'\n    '}
          <h3
            title={
              "Every control there is, in one place. The dot shows or hides its gizmo in the view (an aim's target, its path, its line); the ring shows it alone; its name picks it (its curves, in the graph); the box switches it off without losing its curves; the cross takes it away."
            }
          >
            {'Outliner'}
          </h3>
          {'\n    '}
          <label
            title={
              'On: only the gizmo of the control being edited shows in the view — the others are out of the way until one of them is picked.'
            }
          >
            <input id={'outOnly'} type={'checkbox'} />
            {' only the one picked, in the view'}
          </label>
          {'\n    '}
          <div id={'outList'}></div>
          {'\n    '}
          <h3
            title={
              "An aim's settings: those of the aim being edited — or, once the kind or the part is chosen above, those the next one added will take."
            }
          >
            <span
              id={'aimWho'}
              title={
                'Whose settings these are: the aim being edited, or the next one to be added (after the kind or the part is chosen).'
              }
            >
              {'Aim'}
            </span>
          </h3>
          {'\n    '}
          <label
            className={'prop'}
            title={
              "How far out the target is from the bone's joint, centimetres. Near, a centimetre on the target turns the bone a lot; far, a little — and the bone holds steadier than the body under it."
            }
          >
            <span>{'Distance (cm)'}</span>
            <input
              id={'aimDist'}
              type={'number'}
              min={'1'}
              step={'5'}
              defaultValue={'100'}
              disabled
            />
          </label>
          {'\n    '}
          <label
            className={'prop'}
            title={
              "Which of the bone's own axes points at the target — where it sits from the bone. (In brackets: where that axis points as the character stands at rest.)"
            }
          >
            <span>{'Axis'}</span>
            <select id={'aimAxis'} disabled></select>
          </label>
          {'\n    '}
          <label
            className={'prop'}
            title={
              "The bone's roll about the line to its target. None: left as it falls. A curve: its own curve, Roll. Up target: a second target, which one of the bone's other axes is kept toward."
            }
          >
            <span>{'Roll'}</span>
            <select id={'aimRoll'} disabled>
              <option value={'none'}>{'none'}</option>
              <option value={'curve'}>{'a curve'}</option>
              <option value={'up'}>{'up target'}</option>
            </select>
          </label>
          {'\n    '}
          <label className={'prop'} title={"The bone's axis kept toward the up target."}>
            <span>{'Up axis'}</span>
            <select id={'aimUpAxis'} disabled></select>
          </label>
          {'\n    '}
          <label className={'prop'} title={'How far out the up target is, centimetres.'}>
            <span>{'Up distance (cm)'}</span>
            <input
              id={'aimUpDist'}
              type={'number'}
              min={'1'}
              step={'5'}
              defaultValue={'30'}
              disabled
            />
          </label>
          {'\n    '}
          <label
            className={'prop'}
            title={
              "What the target rides. The world: it stays where the source put it, whatever the body now does — the bone keeps looking there. A bone: it's carried by that bone as it now moves (never the aimed bone itself, nor one hanging from it)."
            }
          >
            <span>{'Rides'}</span>
            <select id={'aimSpace'} disabled>
              <option value={''}>{'the world'}</option>
              <option value={'pelvis'}>{'the hips'}</option>
              <option value={'spine_03'}>{'the chest'}</option>
              <option value={'Head'}>{'the head'}</option>
              <option value={'hand_l'}>{'the left hand'}</option>
              <option value={'hand_r'}>{'the right hand'}</option>
            </select>
          </label>
          {'\n    '}
          <h3
            title={
              "A pin's setting: that of the pin being edited — or, once the kind or the part is chosen above, that the next one added will take."
            }
          >
            <span id={'pinWho'}>{'Pin'}</span>
          </h3>
          {'\n    '}
          <label
            className={'prop'}
            title={
              "What the hand is kept against: where it is, and how it's turned, in that thing's own frame, as the source has it. The other hand: two hands on one thing. The world: it stays where the source put it, whatever the body does."
            }
          >
            <span>{'Pinned to'}</span>
            <select id={'pinTo'} disabled>
              <option value={'other'}>{'the other hand'}</option>
              <option value={'pelvis'}>{'the hips'}</option>
              <option value={'spine_03'}>{'the chest'}</option>
              <option value={'Head'}>{'the head'}</option>
              <option value={''}>{'the world'}</option>
            </select>
          </label>
          {'\n  '}
        </details>
        {'\n  '}
        <details open>
          <summary
            title={
              "What the last change made: the adjusted cycle's figures, and what each stage had to do for it."
            }
          >
            {'Result'}
          </summary>
          {'\n    '}
          <div id={'gaitOut'} className={'note'}>
            {'Nothing changed yet.'}
          </div>
          {'\n    '}
          <h3
            title={
              'What Generate made: a line for each direction — made, or a warning and what it is about. The whole of it on hover, and under each with Advanced on.'
            }
          >
            {'The eight'}
          </h3>
          {'\n    '}
          <p id={'resultsStale'} className={'note'} hidden>
            {
              'These are of the cycle as it was before the last change. They are made again when they are next looked at (View: All directions, or one of them under Show) or exported — or with Generate.'
            }
          </p>
          {'\n    '}
          <div id={'results'}>
            <p className={'note'}>{'Press Generate.'}</p>
          </div>
          {'\n  '}
        </details>
        {'\n'}
      </div>
      {'\n\n'}
      <aside className={'lib-panel'} id={'lib'}>
        {'\n  '}
        <div className={'lib-panel__head'}>
          {'\n    '}
          <div className={'lib-panel__tabs'} role={'tablist'}>
            {'\n      '}
            <button
              className={'lib-panel__tab is-on'}
              id={'lib-tab-anims'}
              type={'button'}
              role={'tab'}
              aria-selected={'true'}
            >
              {'Animations'}
            </button>
            {'\n      '}
            <button
              className={'lib-panel__tab'}
              id={'lib-tab-chars'}
              type={'button'}
              role={'tab'}
              aria-selected={'false'}
            >
              {'Characters'}
            </button>
            {'\n    '}
          </div>
          {'\n    '}
          <input
            className={'lib-search'}
            id={'lib-search'}
            type={'search'}
            placeholder={'Search name or tag…'}
            autoComplete={'off'}
          />
          {'\n    '}
          <span className={'lib-count'} id={'lib-count'}>
            {'—'}
          </span>
          {'\n  '}
        </div>
        {'\n  '}
        <div className={'lib-grid'} id={'lib-grid'}></div>
        {'\n  '}
        <div className={'lib-grid lib-chargrid'} id={'lib-chargrid'} hidden></div>
        {'\n'}
      </aside>
      {'\n\n'}
      <div id={'curveDock'} className={'on'}>
        {'\n  '}
        <div id={'curveGrip'} title={'Drag to size'}></div>
        {'\n  '}
        <div id={'curveBox'}>
          {'\n    '}
          <div className={'polRow'} id={'curveRow2'}>
            {'\n      '}
            <button id={'play'} type={'button'}>
              {'Pause'}
            </button>
            {'\n      '}
            <label>
              {'Speed '}
              <select id={'rate'} defaultValue={''}>
                <option>{'0.1'}</option>
                <option>{'0.25'}</option>
                <option>{'0.5'}</option>
                <option>{'1'}</option>
              </select>
            </label>
            {'\n      '}
            <span id={'clock'}>{'0.00 s'}</span>
            {'\n      '}
            <span className={'sep'}></span>
            {'\n      '}
            <button
              id={'curveUndo'}
              type={'button'}
              disabled
              title={'Undo the last change to the curves (Ctrl+Z)'}
            >
              {'Undo'}
            </button>
            {'\n      '}
            <button id={'curveRedo'} type={'button'} disabled title={'Redo (Ctrl+Shift+Z)'}>
              {'Redo'}
            </button>
            {'\n      '}
            <button
              id={'curveFit'}
              type={'button'}
              title={'The whole cycle and every value back in view (Home)'}
            >
              {'Fit'}
            </button>
            {'\n      '}
            <span className={'sep'}></span>
            {'\n      '}
            <button
              id={'curveReset'}
              type={'button'}
              title={
                "Every key of this curve back where the source has it (a foot's lift-off and landing stay as they are)"
              }
            >
              {'Reset curve'}
            </button>
            {'\n      '}
            <button
              id={'curvePlantReset'}
              type={'button'}
              title={
                "Each foot's lift-off and landing back where this animation has them: its own foot plant"
              }
            >
              {'Reset foot plant'}
            </button>
            {'\n      '}
            <button
              id={'curveResetAll'}
              type={'button'}
              title={"Every curve, and the foot plant, back to the source's"}
            >
              {'Reset all'}
            </button>
            {'\n      '}
            <span className={'sep'}></span>
            {'\n      '}
            <label
              title={
                "A foot's square keys are its lift-off and landing: moving one moves when the foot is planted — the foot plant itself. Off: they can't be dragged. On: they slide."
              }
            >
              <input id={'curvePlant'} type={'checkbox'} />
              {' unlock foot plant'}
            </label>
            {'\n      '}
            <label
              title={
                "The graph as an animation program has it: every curve of the hips or the feet together, each in its colour (side to side red, forward green, up blue), a list to show, hide and pick them. Click any curve's key to edit that curve."
              }
            >
              <input id={'curveAdv'} type={'checkbox'} />
              {' several curves'}
            </label>
            {'\n      '}
            <label
              title={
                'On: only the curves of the part being edited are drawn (and any picked beside it) — the rest out of the way.'
              }
            >
              <input id={'curveOnly'} type={'checkbox'} />
              {' only this part'}
            </label>
            {'\n      '}
            <label
              title={
                'On: the graph shows the cycle once, from its first frame to its last — nothing drawn again either side of it, and the view stays on it — so it is plain where the animation itself begins and ends. It still comes round: a key near its end still shapes its start. Off: the graph carries on round the loop either side. An animation that is played once is always shown so.'
              }
            >
              <input id={'curveOne'} type={'checkbox'} />
              {' one cycle only'}
            </label>
            {'\n      '}
            <label
              id={'curveNormWrap'}
              hidden
              title={
                'On: each curve drawn to its own range, so all can be read at once. Off: all on one scale of centimetres, each about its own middle.'
              }
            >
              <input id={'curveNorm'} type={'checkbox'} defaultChecked />
              {' each to its own scale'}
            </label>
            {'\n      '}
            <span
              className={'help'}
              title={
                "As the main page's graph. A key dragged sideways: that part of the curve comes earlier or later; up or down: more or less there. Click a key to pick it (its handles show); Shift-click adds; a box picks several (Shift adds, Ctrl takes out) — on every curve shown, with \"several curves\". Alt-click: every key on that frame; Ctrl+Alt-click: every key of that curve. A handle's end: drag it (Alt: each side its own). With the pointer over the graph: G move, R turn, S scale (X or Y: time or value only; a number typed; Ctrl snaps; click or Enter keeps, Esc cancels); Shift+D copies, moved; Ctrl+C, Ctrl+V at the playhead; T interpolation, Ctrl+E easing, V handles, Shift+S snap; A all, Alt+A none, Ctrl+I the others, L the whole curve, [ ] before or after the playhead; H, Shift+H, Alt+H hide and show curves; Delete or X: the picked ones away; F the picked in view, Home all. Right-click: the menu. Double-click the curve: a new key. Wheel: zoom (Ctrl: time only, Shift: values only); middle drag: pan. Ctrl+Z undoes. A foot's square keys are its lift-off and landing — the foot plant: locked until \"unlock foot plant\" is ticked. A key on a foot's lift while it's planted raises its heel; the toe stays down."
              }
            >
              {'?'}
            </span>
            {'\n      '}
            <span id={'curveHint'} aria-live={'polite'}></span>
            {'\n      '}
            <select id={'curveChan'} hidden title={'Which curve is shown and edited'}>
              <option value={'hipY'}>{'Hips: height'}</option>
              <option value={'hipX'}>{'Hips: side to side'}</option>
              <option value={'hipZ'}>{'Hips: forward'}</option>
              <option value={'footY'}>{'Feet: lift'}</option>
              <option value={'footX'}>{'Feet: side to side'}</option>
              <option value={'footZ'}>{'Feet: forward'}</option>
            </select>
            {'\n    '}
          </div>
          {'\n    '}
          <div className={'polRow'} id={'curveRowKey'}>
            {'\n      '}
            <span
              id={'curveName'}
              title={
                'The curve being edited: picked in the list, or by a click on its line or one of its keys.'
              }
            ></span>
            {'\n      '}
            <label
              title={
                "This curve read so many frames late (less than 0: early), round the loop — the whole curve slid, its keys staying where they are. Only this curve: the part's other two stay on the source's time. (Advanced: Ctrl-click more curves in the list, and it goes to them too.) Or drag the curve's line sideways in the graph."
              }
            >
              {'Late '}
              <input id={'chLate'} type={'number'} step={'0.5'} defaultValue={'0'} />
            </label>
            {'\n      '}
            <label
              title={
                "This curve's movement about its own middle ×: 0 held still there, 1 as it is, more exaggerated."
              }
            >
              {'Amount × '}
              <input id={'chAmt'} type={'number'} min={'0'} step={'0.05'} defaultValue={'1'} />
            </label>
            {'\n      '}
            <label
              title={
                'A run of bones: this curve so many frames more for each bone along it — the chest after the spine below it, the hand after the elbow. Only this curve (or those picked): the others stay as they are.'
              }
            >
              {'Step '}
              <input id={'ctlStep'} type={'number'} step={'0.25'} defaultValue={'0'} disabled />
            </label>
            {'\n      '}
            <label
              title={
                "A run of bones: which bone's curve is shown. What's set goes to every bone of the run."
              }
            >
              {'bone '}
              <select id={'ctlBone'} disabled></select>
            </label>
            {'\n      '}
            <label
              title={
                "On: Late and Amount go to all of this part's curves together (the whole turn late, as one empty slid later). Off: only the curve being edited."
              }
            >
              <input id={'chAll'} type={'checkbox'} />
              {' all its curves'}
            </label>
            {'\n      '}
            <label
              title={
                'A walk is two steps. On: a key moved in one step (or on one foot) moves the same in the other. Off: each is its own.'
              }
            >
              <input id={'curveMirror'} type={'checkbox'} defaultChecked />
              {' both the same'}
            </label>
            {'\n      '}
            <label title={"Which foot's curve — when the two aren't kept the same"}>
              {'foot '}
              <select id={'curveFoot'} disabled>
                <option value={'l'}>{'left'}</option>
                <option value={'r'}>{'right'}</option>
              </select>
            </label>
            {'\n      '}
            <span className={'sep'}></span>
            {'\n      '}
            <label
              title={
                "The picked key's frame. Typed, the key goes there (with the others picked, by as much)."
              }
            >
              {'Frame '}
              <input id={'keyFrame'} type={'number'} step={'0.25'} disabled />
            </label>
            {'\n      '}
            <label
              title={
                "The curve's value at the picked key. Typed, the key is lifted to it (the others picked, by as much)."
              }
            >
              {'Value '}
              <input id={'keyValue'} type={'number'} step={'0.1'} disabled />
            </label>
            {'\n      '}
            <button
              id={'hAuto'}
              className={'ico'}
              type={'button'}
              disabled
              title={
                "Automatic: the curve chooses its slope here, the smoothest that doesn't overshoot (1)"
              }
            >
              <svg
                viewBox={'0 0 20 14'}
                width={'20'}
                height={'14'}
                fill={'none'}
                stroke={'currentColor'}
                strokeWidth={'1.4'}
                strokeLinecap={'round'}
              >
                <path d={'M2 11 C6 11 6 3 10 7 S14 3 18 3'}></path>
                <circle cx={'10'} cy={'7'} r={'1.9'} fill={'currentColor'} stroke={'none'}></circle>
              </svg>
            </button>
            {'\n      '}
            <button
              id={'hAligned'}
              className={'ico'}
              type={'button'}
              disabled
              title={'Aligned: your handles, the two sides in one line (2)'}
            >
              <svg
                viewBox={'0 0 20 14'}
                width={'20'}
                height={'14'}
                fill={'none'}
                stroke={'currentColor'}
                strokeWidth={'1.4'}
                strokeLinecap={'round'}
              >
                <path d={'M3 10 L17 4'}></path>
                <circle cx={'3'} cy={'10'} r={'1.1'}></circle>
                <circle cx={'17'} cy={'4'} r={'1.1'}></circle>
                <circle cx={'10'} cy={'7'} r={'1.9'} fill={'currentColor'} stroke={'none'}></circle>
              </svg>
            </button>
            {'\n      '}
            <button
              id={'hFree'}
              className={'ico'}
              type={'button'}
              disabled
              title={'Free: your handles, each side its own (3)'}
            >
              <svg
                viewBox={'0 0 20 14'}
                width={'20'}
                height={'14'}
                fill={'none'}
                stroke={'currentColor'}
                strokeWidth={'1.4'}
                strokeLinecap={'round'}
              >
                <path d={'M3 4 L10 7 L16 2'}></path>
                <circle cx={'3'} cy={'4'} r={'1.1'}></circle>
                <circle cx={'16'} cy={'2'} r={'1.1'}></circle>
                <circle cx={'10'} cy={'7'} r={'1.9'} fill={'currentColor'} stroke={'none'}></circle>
              </svg>
            </button>
            {'\n      '}
            <button
              id={'hVector'}
              className={'ico'}
              type={'button'}
              disabled
              title={'Vector: each side straight at the key next to it — no ease (4)'}
            >
              <svg
                viewBox={'0 0 20 14'}
                width={'20'}
                height={'14'}
                fill={'none'}
                stroke={'currentColor'}
                strokeWidth={'1.4'}
                strokeLinecap={'round'}
              >
                <path d={'M2 12 L10 7 L18 12'}></path>
                <circle cx={'10'} cy={'7'} r={'1.9'} fill={'currentColor'} stroke={'none'}></circle>
              </svg>
            </button>
            {'\n      '}
            <button
              id={'curveFlat'}
              className={'ico'}
              type={'button'}
              disabled
              title={'Flat: the handles level — the curve comes in and goes out flat here (5)'}
            >
              <svg
                viewBox={'0 0 20 14'}
                width={'20'}
                height={'14'}
                fill={'none'}
                stroke={'currentColor'}
                strokeWidth={'1.4'}
                strokeLinecap={'round'}
              >
                <path d={'M3 7 L17 7'}></path>
                <circle cx={'3'} cy={'7'} r={'1.1'}></circle>
                <circle cx={'17'} cy={'7'} r={'1.1'}></circle>
                <circle cx={'10'} cy={'7'} r={'1.9'} fill={'currentColor'} stroke={'none'}></circle>
              </svg>
            </button>
            {'\n      '}
            <select id={'curveHandle'} hidden disabled>
              <option value={'auto'}>{'Handles: automatic'}</option>
              <option value={'aligned'}>{'Handles: aligned'}</option>
              <option value={'free'}>{'Handles: free'}</option>
              <option value={'vector'}>{'Handles: vector'}</option>
            </select>
            {'\n    '}
          </div>
          {'\n    '}
          <div id={'curveMain'}>
            {'\n      '}
            <div id={'curveList'}></div>
            {'\n      '}
            <div id={'curveCol'}>
              {'\n        '}
              <input
                id={'time'}
                hidden
                type={'range'}
                min={'0'}
                max={'1'}
                step={'0.0005'}
                defaultValue={'0'}
                title={'Where in the cycle; drag while paused'}
              />
              {'\n        '}
              <canvas
                id={'contacts'}
                title={
                  'When each foot is down (left above, right below); ▲ where it lands. Drag in it to move through the cycle.'
                }
              ></canvas>
              {'\n        '}
              <div id={'curveArea'}>
                <canvas id={'hipCurve'} tabIndex={0}></canvas>
                <p id={'curveNone'} className={'note'}>
                  {
                    "This animation's feet are never read on the floor, so its hips' and its feet's curves have nothing to hold to. A control's curves are edited here: add one under Controls, on the right. A pose, the posture and the follow-through are set in the panels."
                  }
                </p>
              </div>
              {'\n      '}
            </div>
            {'\n    '}
          </div>
          {'\n  '}
        </div>
        {'\n'}
      </div>
      {'\n'}
      {'\n\n\n'}
    </>
  );
}
