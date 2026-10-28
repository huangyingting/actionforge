export function WorkspaceShell() {
  return (
    <>
      {'\n\n'}
      <header className={'af-bar'}>
        {'\n    '}
        <a className={'af-mark'} href={'/'}>
          <b>{'Action'}</b>
          {'Forge '}
          <span className={'af-beta'}>{'Beta'}</span>
        </a>
        {'\n    \n    '}
        <a
          className={'af-lab'}
          href={'motion-lab.html'}
          title={
            'Reshape one animation in depth: its curves, its controls, a style — and its eight directions. What you save there is here under Yours.'
          }
        >
          {'Motion Lab '}
          <span className={'af-lab__new'}>{'New'}</span>
        </a>
        {'\n    '}
        <span className={'af-tag'}>
          {'Adjust, pose and export character animation in the browser'}
        </span>
        {'\n    '}
        <span className={'af-spacer'}></span>
        {'\n    \n    '}
        <span className={'af-licence'}>
          {'\n        '}
          <a
            href={'https://creativecommons.org/publicdomain/zero/1.0/'}
            rel={'noopener'}
            title={
              'The animations here are in the public domain (CC0): use them anywhere, commercially, with no attribution required. Hover an animation to see who made it. Those by Quaternius are from the free versions of his Universal Animation Library packs.'
            }
          >
            {'Animations CC0'}
          </a>
          {'\n        '}
          <i aria-hidden={'true'}>{'·'}</i>
          {'\n        '}
          <span title={'The application and its source are not open. All rights reserved.'}>
            {'Code © CGstuff'}
          </span>
          {'\n        '}
          <i aria-hidden={'true'}>{'·'}</i>
          {'\n        \n        '}
          <a
            href={'/THIRD-PARTY-NOTICES.txt'}
            title={
              'Licences in full, including the MIT notices for the libraries this tool is built on.'
            }
          >
            {'Licences'}
          </a>
          {'\n    '}
        </span>
        {'\n\n    '}
        <nav className={'af-links'} id={'af-links'}>
          {'\n        \n        '}
          <button
            className={'af-lab af-supportlink'}
            id={'af-support'}
            type={'button'}
            title={'Support ActionForge'}
          >
            {'Support '}
            <span aria-hidden={'true'}>{'❤'}</span>
          </button>
          {'\n        \n        '}
          <button
            className={'af-news'}
            id={'af-faq'}
            type={'button'}
            title={'Frequently asked questions'}
          >
            {'FAQ'}
          </button>
          {'\n        \n        '}
          <button
            className={'af-news'}
            id={'af-news'}
            type={'button'}
            title={'What’s new on ActionForge'}
          >
            {'What’s new'}
          </button>
          {'\n        \n        '}
          <a
            className={'af-discord'}
            href={'https://discord.gg/uwWgHYKFNq'}
            target={'_blank'}
            rel={'noopener noreferrer'}
            title={'ActionForge on Discord'}
            aria-label={'ActionForge on Discord'}
          >
            {'\n            '}
            <svg
              viewBox={'0 0 640 512'}
              width={'20'}
              height={'20'}
              aria-hidden={'true'}
              focusable={'false'}
            >
              {'\n                '}
              <path
                fill={'currentColor'}
                d={
                  'M524.5 69.8a1.5 1.5 0 0 0-.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0-1.9.9 337.5 337.5 0 0 0-14.9 30.6 447.5 447.5 0 0 0-134.4 0 309.5 309.5 0 0 0-15.1-30.6 1.9 1.9 0 0 0-1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0-.8.7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 480.1a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0-1-2.6 321.2 321.2 0 0 1-45.9-21.9 1.9 1.9 0 0 1-.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9.2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1-.2 3.1 301.4 301.4 0 0 1-45.9 21.8 1.9 1.9 0 0 0-1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1.7A486 486 0 0 0 610.7 405.8a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z'
                }
              ></path>
              {'\n            '}
            </svg>
            {'\n        '}
          </a>
          {'\n        \n        '}
          <a
            className={'af-discord af-youtube'}
            href={'https://www.youtube.com/@cgstuff87'}
            target={'_blank'}
            rel={'noopener noreferrer'}
            title={'CGstuff on YouTube'}
            aria-label={'CGstuff on YouTube'}
          >
            {'\n            '}
            <svg
              viewBox={'0 0 24 24'}
              width={'22'}
              height={'22'}
              aria-hidden={'true'}
              focusable={'false'}
            >
              {'\n                '}
              <path
                fill={'currentColor'}
                d={
                  'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z'
                }
              ></path>
              {'\n                '}
              <path fill={'#fff'} d={'M9.545 15.568V8.432L15.818 12l-6.273 3.568z'}></path>
              {'\n            '}
            </svg>
            {'\n        '}
          </a>
          {'\n        '}
          <a href={'https://cgstuff.xyz'} rel={'noopener'}>
            {'CGstuff'}
          </a>
          {'\n    '}
        </nav>
        {'\n'}
      </header>
      {'\n\n'}
      <main className={'lib'}>
        {'\n\n    \n    \n    '}
        <aside className={'lib-left'} id={'lib-left'}>
          {'\n        \n        \n        '}
          <div
            className={'lib-rail'}
            id={'lib-rail'}
            role={'group'}
            aria-label={'Tools'}
            aria-expanded={'true'}
          >
            {'\n            \n            '}
            <button
              className={'lib-rail__btn'}
              data-tool={'rig'}
              type={'button'}
              title={'Character — which body the clips play on, yours included'}
            >
              {'\n                '}
              <span className={'lib-rail__icon'} aria-hidden={'true'}>
                {'☖'}
              </span>
              {'\n                '}
              <span className={'lib-rail__label'}>{'Character'}</span>
              {'\n            '}
            </button>
            {'\n            \n            '}
            <button
              className={'lib-rail__btn'}
              data-tool={'camera'}
              type={'button'}
              title={"Camera — the rig's own camera, and the side view"}
            >
              {'\n                '}
              <span className={'lib-rail__icon'} aria-hidden={'true'}>
                {'▣'}
              </span>
              {'\n                '}
              <span className={'lib-rail__label'}>{'Camera'}</span>
              {'\n            '}
            </button>
            {'\n            '}
            <button
              className={'lib-rail__btn'}
              data-tool={'stage'}
              type={'button'}
              title={
                'Stage — a camera for the scene: look at your work from the angle it is meant to be seen from'
              }
            >
              {'\n                '}
              <span className={'lib-rail__icon'} aria-hidden={'true'}>
                {'◪'}
              </span>
              {'\n                '}
              <span className={'lib-rail__label'}>{'Stage'}</span>
              {'\n            '}
            </button>
            {'\n            '}
            <button
              className={'lib-rail__btn'}
              data-tool={'compose'}
              type={'button'}
              title={'Compose — layer clips by body region'}
            >
              {'\n                '}
              <span className={'lib-rail__icon'} aria-hidden={'true'}>
                {'▤'}
              </span>
              {'\n                '}
              <span className={'lib-rail__label'}>{'Compose'}</span>
              {'\n            '}
            </button>
            {'\n            '}
            <button
              className={'lib-rail__btn'}
              data-tool={'adjust'}
              type={'button'}
              title={'Adjust — reshape the clip with named sliders'}
            >
              {'\n                '}
              <span className={'lib-rail__icon'} aria-hidden={'true'}>
                {'◈'}
              </span>
              {'\n                '}
              <span className={'lib-rail__label'}>{'Adjust'}</span>
              {'\n            '}
            </button>
            {'\n            '}
            <button
              className={'lib-rail__btn'}
              data-tool={'props'}
              type={'button'}
              title={"Props — put something in the character's hands"}
            >
              {'\n                '}
              <span className={'lib-rail__icon'} aria-hidden={'true'}>
                {'⚔'}
              </span>
              {'\n                '}
              <span className={'lib-rail__label'}>{'Props'}</span>
              {'\n            '}
            </button>
            {'\n            '}
            <button
              className={'lib-rail__btn'}
              data-tool={'ik'}
              type={'button'}
              title={'IK — move a hand or foot off the animated pose'}
            >
              {'\n                '}
              <span className={'lib-rail__icon'} aria-hidden={'true'}>
                {'⟟'}
              </span>
              {'\n                '}
              <span className={'lib-rail__label'}>{'IK'}</span>
              {'\n            '}
            </button>
            {'\n            '}
            <button
              className={'lib-rail__btn'}
              data-tool={'pose'}
              type={'button'}
              title={'Pose — click a joint and turn it; letting go keys it'}
            >
              {'\n                '}
              <span className={'lib-rail__icon'} aria-hidden={'true'}>
                {'✥'}
              </span>
              {'\n                '}
              <span className={'lib-rail__label'}>{'Pose'}</span>
              {'\n            '}
            </button>
            {'\n            '}
            <button
              className={'lib-rail__btn'}
              data-tool={'picker'}
              type={'button'}
              title={'Picker — pick joints on a picture of the body, or of a hand'}
            >
              {'\n                '}
              <span className={'lib-rail__icon'} aria-hidden={'true'}>
                {'⌖'}
              </span>
              {'\n                '}
              <span className={'lib-rail__label'}>{'Picker'}</span>
              {'\n            '}
            </button>
            {'\n            '}
            <button
              className={'lib-rail__btn'}
              data-tool={'import'}
              type={'button'}
              title={'Import — bring in a Mixamo FBX. Read on this machine, never uploaded'}
            >
              {'\n                '}
              <span className={'lib-rail__icon'} aria-hidden={'true'}>
                {'⇥'}
              </span>
              {'\n                '}
              <span className={'lib-rail__label'}>{'Import'}</span>
              {'\n            '}
            </button>
            {'\n            '}
            <button
              className={'lib-rail__btn'}
              data-tool={'presets'}
              type={'button'}
              title={'Projects — save, open and download scenes (Ctrl+S)'}
            >
              {'\n                '}
              <span className={'lib-rail__icon'} aria-hidden={'true'}>
                {'★'}
              </span>
              {'\n                '}
              <span className={'lib-rail__label'}>{'Projects'}</span>
              {'\n            '}
            </button>
            {'\n        '}
          </div>
          {'\n\n        '}
          <div className={'lib-toolpanel'} id={'lib-toolpanel'}>
            {'\n            \n            '}
            <div className={'lib-toolpane'} data-tool={'rig'}>
              {'\n                '}
              <div className={'lib-comp'} id={'lib-rig-panel'}></div>
              {'\n            '}
            </div>
            {'\n            '}
            <div className={'lib-toolpane'} data-tool={'camera'}>
              {'\n                '}
              <div className={'lib-comp'} id={'lib-camera-panel'}></div>
              {'\n            '}
            </div>
            {'\n            \n            '}
            <div className={'lib-toolpane'} data-tool={'stage'}>
              {'\n                '}
              <div className={'lib-comp'} id={'lib-stage-panel'}></div>
              {'\n            '}
            </div>
            {'\n            '}
            <div className={'lib-toolpane'} data-tool={'compose'}>
              {'\n                '}
              <div className={'lib-comp'} id={'lib-composer'}></div>
              {'\n            '}
            </div>
            {'\n            \n            '}
            <div className={'lib-toolpane'} data-tool={'adjust'}>
              {'\n                '}
              <div className={'lib-comp'} id={'lib-adjust'}></div>
              {'\n            '}
            </div>
            {'\n            \n            '}
            <div className={'lib-toolpane'} data-tool={'props'}>
              {'\n                '}
              <div className={'lib-comp'} id={'lib-props-panel'}></div>
              {'\n            '}
            </div>
            {'\n            \n            '}
            <div className={'lib-toolpane'} data-tool={'ik'}>
              {'\n                '}
              <div className={'lib-comp'} id={'lib-ik-panel'}></div>
              {'\n            '}
            </div>
            {'\n            \n            '}
            <div className={'lib-toolpane'} data-tool={'pose'}>
              {'\n                '}
              <div className={'lib-comp'} id={'lib-pose-panel'}></div>
              {'\n            '}
            </div>
            {'\n            \n            '}
            <div className={'lib-toolpane'} data-tool={'picker'}>
              {'\n                '}
              <div className={'lib-comp'} id={'lib-picker-panel'}></div>
              {'\n            '}
            </div>
            {'\n            \n            '}
            <div className={'lib-toolpane'} data-tool={'import'}>
              {'\n                '}
              <div className={'lib-comp'} id={'lib-import-panel'}></div>
              {'\n            '}
            </div>
            {'\n\n            \n            '}
            <div className={'lib-toolpane'} data-tool={'presets'}>
              {'\n                '}
              <div className={'lib-comp'} id={'lib-presets-panel'}></div>
              {'\n            '}
            </div>
            {'\n        '}
          </div>
          {'\n    '}
        </aside>
        {'\n\n    \n    '}
        <section className={'lib-viewport'}>
          {'\n        '}
          <div className={'lib-stage'} id={'lib-stage'}>
            {'\n            '}
            <p className={'lib-hint'}>{'drag to orbit · scroll to zoom · space to play/pause'}</p>
            {'\n            \n            \n            '}
            <p className={'lib-credit'} id={'lib-credit'}>
              {'rig by\n                '}
              <a href={'https://quaternius.com/'} target={'_blank'} rel={'noopener noreferrer'}>
                {'Quaternius'}
              </a>
              {'\n                '}
              <span>{'·'}</span>
              {' animation by\n                '}
              <a href={'https://quaternius.com/'} target={'_blank'} rel={'noopener noreferrer'}>
                {'Quaternius'}
              </a>
              {'\n                '}
              <span>{'CC0'}</span>
            </p>
            {'\n            \n            '}
            <div className={'lib-status'} id={'lib-status'} role={'status'} aria-live={'polite'}>
              <p>{'Loading ActionForge…'}</p>
            </div>
            {'\n            '}
            <noscript
              dangerouslySetInnerHTML={{
                __html:
                  '<div class="lib-status"><p>ActionForge runs in your browser and needs JavaScript turned on.</p></div>',
              }}
            />
            {'\n            \n            '}
            <div className={'lib-viewtools'} id={'lib-viewtools'} hidden>
              {'\n                '}
              <button
                className={'lib-btn lib-btn--svg'}
                id={'lib-skeleton'}
                type={'button'}
                title={'Bones: show the bones'}
                aria-label={'Bones'}
              >
                <svg aria-hidden={'true'}>
                  <use href={'#ic-bones'}></use>
                </svg>
              </button>
              {'\n                '}
              <button
                className={'lib-btn lib-btn--svg'}
                id={'lib-wireframe'}
                type={'button'}
                title={'Wireframe'}
                aria-label={'Wireframe'}
              >
                <svg aria-hidden={'true'}>
                  <use href={'#ic-wire'}></use>
                </svg>
              </button>
              {'\n                '}
              <span className={'lib-viewtools__gap'}></span>
              {'\n                '}
              <span className={'lib-axes'} role={'group'} aria-label={'Shading'}>
                {'\n                    '}
                <button
                  className={'lib-btn lib-btn--svg is-on'}
                  id={'lib-shade-colour'}
                  type={'button'}
                  aria-pressed={'true'}
                  title={'Colour: the character in its own colours'}
                  aria-label={'Colour'}
                >
                  <svg aria-hidden={'true'} viewBox={'0 0 16 16'}>
                    <path d={'M8 8 8 2.5A5.5 5.5 0 0 1 12.76 10.75Z'} fill={'#09c5cc'}></path>
                    <path d={'M8 8 12.76 10.75A5.5 5.5 0 0 1 3.24 10.75Z'} fill={'#e8a33c'}></path>
                    <path d={'M8 8 3.24 10.75A5.5 5.5 0 0 1 8 2.5Z'} fill={'#d9506b'}></path>
                  </svg>
                </button>
                {'\n                    '}
                <button
                  className={'lib-btn lib-btn--svg'}
                  id={'lib-shade-grey'}
                  type={'button'}
                  aria-pressed={'false'}
                  title={'Grey: one plain grey — the forms, without colour'}
                  aria-label={'Grey'}
                >
                  <svg aria-hidden={'true'} viewBox={'0 0 16 16'}>
                    <circle cx={'8'} cy={'8'} r={'5.5'} fill={'#b9bcc1'}></circle>
                  </svg>
                </button>
                {'\n                '}
              </span>
              {'\n            '}
            </div>
            {'\n        '}
          </div>
          {'\n\n        \n        '}
          <svg
            className={'lib-icons'}
            width={'0'}
            height={'0'}
            aria-hidden={'true'}
            focusable={'false'}
          >
            {'\n            '}
            <defs>
              {'\n                '}
              <symbol id={'ic-strips'} viewBox={'0 0 16 16'}>
                <g fill={'none'} stroke={'currentColor'} strokeWidth={'1.3'}>
                  <path d={'M1.5 2.5h7v2.5h-7Z'}></path>
                  <path d={'M5.5 6.75h9v2.5h-9Z'}></path>
                  <path d={'M3 11h6.5v2.5H3Z'}></path>
                </g>
              </symbol>
              {'\n                '}
              <symbol id={'ic-share'} viewBox={'0 0 16 16'}>
                <g fill={'none'} stroke={'currentColor'} strokeWidth={'1.5'}>
                  <circle cx={'12'} cy={'3.5'} r={'1.8'}></circle>
                  <circle cx={'4'} cy={'8'} r={'1.8'}></circle>
                  <circle cx={'12'} cy={'12.5'} r={'1.8'}></circle>
                  <path d={'M5.6 7.1 10.4 4.4M5.6 8.9 10.4 11.6'}></path>
                </g>
              </symbol>
              {'\n                '}
              <symbol id={'ic-loop'} viewBox={'0 0 16 16'}>
                <g
                  fill={'none'}
                  stroke={'currentColor'}
                  strokeWidth={'1.5'}
                  strokeLinecap={'square'}
                  strokeLinejoin={'miter'}
                >
                  <path d={'M3 9.5v-5h9'}></path>
                  <path d={'M10 2.5 12 4.5 10 6.5'}></path>
                  <path d={'M13 6.5v5H4'}></path>
                  <path d={'M6 9.5 4 11.5 6 13.5'}></path>
                </g>
              </symbol>
              {'\n                '}
              <symbol id={'ic-bones'} viewBox={'0 0 16 16'}>
                <path
                  d={'M3.5 12.5 7.3 11.8 12.5 3.5 4.2 8.7Z'}
                  fill={'none'}
                  stroke={'currentColor'}
                  strokeWidth={'1.5'}
                  strokeLinejoin={'miter'}
                ></path>
                <circle
                  cx={'3.2'}
                  cy={'12.8'}
                  r={'1.4'}
                  fill={'none'}
                  stroke={'currentColor'}
                  strokeWidth={'1.3'}
                ></circle>
                <circle
                  cx={'12.8'}
                  cy={'3.2'}
                  r={'1.4'}
                  fill={'none'}
                  stroke={'currentColor'}
                  strokeWidth={'1.3'}
                ></circle>
              </symbol>
              {'\n                '}
              <symbol id={'ic-wire'} viewBox={'0 0 16 16'}>
                <g
                  fill={'none'}
                  stroke={'currentColor'}
                  strokeWidth={'1.3'}
                  strokeLinecap={'square'}
                >
                  <path d={'M2 5.5h8.5V14H2Z'}></path>
                  <path d={'M5.5 2H14v8.5H5.5Z'}></path>
                  <path d={'M2 5.5 5.5 2M10.5 5.5 14 2M10.5 14 14 10.5M2 14 5.5 10.5'}></path>
                </g>
              </symbol>
              {'\n                '}
              <symbol id={'ic-onion'} viewBox={'0 0 16 16'}>
                <g fill={'none'} stroke={'currentColor'} strokeWidth={'1.5'}>
                  <circle cx={'4.5'} cy={'8'} r={'3.4'} opacity={'0.35'}></circle>
                  <circle cx={'8'} cy={'8'} r={'3.4'} opacity={'0.65'}></circle>
                  <circle cx={'11.5'} cy={'8'} r={'3.4'}></circle>
                </g>
              </symbol>
              {'\n                '}
              <symbol id={'ic-follow'} viewBox={'0 0 16 16'}>
                <g
                  fill={'none'}
                  stroke={'currentColor'}
                  strokeWidth={'1.5'}
                  strokeLinecap={'square'}
                >
                  <circle cx={'8'} cy={'8'} r={'4.6'}></circle>
                  <path d={'M8 1v2M8 13v2M1 8h2M13 8h2'}></path>
                </g>
                <circle cx={'8'} cy={'8'} r={'1.6'} fill={'currentColor'}></circle>
              </symbol>
              {'\n                '}
              <symbol id={'ic-mirror'} viewBox={'0 0 16 16'}>
                <g
                  fill={'none'}
                  stroke={'currentColor'}
                  strokeWidth={'1.5'}
                  strokeLinejoin={'miter'}
                >
                  <path d={'M6 3.5 1.5 12.5H6Z'}></path>
                  <path d={'M10 3.5 14.5 12.5H10Z'}></path>
                  <path d={'M8 1.5v13'} strokeDasharray={'1.6 1.6'} strokeWidth={'1.2'}></path>
                </g>
              </symbol>
              {'\n                '}
              <symbol id={'ic-reverse'} viewBox={'0 0 16 16'}>
                <g
                  fill={'none'}
                  stroke={'currentColor'}
                  strokeWidth={'1.5'}
                  strokeLinecap={'square'}
                  strokeLinejoin={'miter'}
                >
                  <path d={'M12.5 2.5v8H4'}></path>
                  <path d={'M6.5 7.5 3.5 10.5 6.5 13.5'}></path>
                </g>
              </symbol>
              {'\n                '}
              <symbol id={'ic-inplace'} viewBox={'0 0 16 16'}>
                <g
                  fill={'none'}
                  stroke={'currentColor'}
                  strokeWidth={'1.5'}
                  strokeLinecap={'square'}
                >
                  <circle cx={'8'} cy={'3.2'} r={'1.7'}></circle>
                  <path d={'M8 5.5v4.5M8 10 6 12.5M8 10l2 2.5'}></path>
                  <ellipse cx={'8'} cy={'14'} rx={'5.5'} ry={'1.3'} strokeWidth={'1.2'}></ellipse>
                </g>
              </symbol>
              {'\n                '}
              <symbol id={'ic-reframe'} viewBox={'0 0 16 16'}>
                <g
                  fill={'none'}
                  stroke={'currentColor'}
                  strokeWidth={'1.5'}
                  strokeLinecap={'square'}
                >
                  <path d={'M2 5.5V2h3.5M10.5 2H14v3.5M14 10.5V14h-3.5M5.5 14H2v-3.5'}></path>
                  <path d={'M6 6h4v4H6Z'}></path>
                </g>
              </symbol>
              {'\n            '}
            </defs>
            {'\n        '}
          </svg>
          {'\n        \n        '}
          <div className={'lib-transport'} id={'lib-transport'} hidden>
            {'\n            '}
            <button
              className={'lib-btn lib-btn--play'}
              id={'lib-playpause'}
              type={'button'}
              aria-label={'Play'}
            >
              {'▶'}
            </button>
            {'\n            '}
            <input
              className={'lib-scrub'}
              id={'lib-scrub'}
              type={'range'}
              min={'0'}
              max={'1'}
              step={'0.001'}
              defaultValue={'0'}
              aria-label={'Scrub'}
            />
            {'\n            '}
            <span className={'lib-time'} id={'lib-time'}>
              {'0.00s'}
            </span>
            {'\n            '}
            <button
              className={'lib-btn lib-btn--unit'}
              id={'lib-unit'}
              type={'button'}
              title={'Switch between seconds and frames'}
            >
              {'SEC'}
            </button>
            {'\n            \n            '}
            <button
              className={'lib-btn lib-btn--svg'}
              id={'lib-strips'}
              type={'button'}
              title={'Strips: arrange on a timeline'}
              aria-label={'Strips'}
              hidden
            >
              <svg aria-hidden={'true'}>
                <use href={'#ic-strips'}></use>
              </svg>
            </button>
            {'\n            \n            '}
            <button
              className={'lib-btn lib-btn--undo'}
              id={'lib-undo'}
              type={'button'}
              title={'Undo (Ctrl+Z)'}
              aria-label={'Undo'}
              disabled
            >
              {'↶'}
            </button>
            {'\n            '}
            <button
              className={'lib-btn lib-btn--undo'}
              id={'lib-redo'}
              type={'button'}
              title={'Redo (Ctrl+Shift+Z)'}
              aria-label={'Redo'}
              disabled
            >
              {'↷'}
            </button>
            {'\n            \n            '}
            <button
              className={'lib-btn lib-btn--share lib-btn--svg'}
              id={'lib-share'}
              type={'button'}
              title={'Share: copy a short link to exactly this'}
              aria-label={'Share'}
            >
              <svg aria-hidden={'true'}>
                <use href={'#ic-share'}></use>
              </svg>
            </button>
            {'\n\n            '}
            <select
              className={'lib-select'}
              id={'lib-speed'}
              aria-label={'Playback speed'}
              defaultValue={'1'}
            >
              {'\n                '}
              <option value={'0.25'}>{'0.25×'}</option>
              {'\n                '}
              <option value={'0.5'}>{'0.5×'}</option>
              {'\n                '}
              <option value={'1'}>{'1×'}</option>
              {'\n                '}
              <option value={'1.5'}>{'1.5×'}</option>
              {'\n                '}
              <option value={'2'}>{'2×'}</option>
              {'\n            '}
            </select>
            {'\n\n            \n            '}
            <label className={'lib-check lib-check--icon'} title={'Loop'}>
              <input id={'lib-loop'} type={'checkbox'} defaultChecked aria-label={'Loop'} />
              <svg aria-hidden={'true'}>
                <use href={'#ic-loop'}></use>
              </svg>
            </label>
            {'\n            \n            '}
            <button
              className={'lib-btn lib-btn--svg lib-btn--rec'}
              id={'lib-autokey'}
              type={'button'}
              aria-pressed={'false'}
              aria-label={'Auto-key'}
              disabled
            >
              <svg aria-hidden={'true'} viewBox={'0 0 16 16'}>
                <circle
                  cx={'8'}
                  cy={'8'}
                  r={'4.75'}
                  stroke={'currentColor'}
                  strokeWidth={'1.5'}
                ></circle>
              </svg>
            </button>
            {'\n\n            \n            '}
            <span className={'lib-axes'} id={'lib-onion-group'}>
              {'\n                '}
              <button
                className={'lib-btn lib-btn--svg'}
                id={'lib-onion'}
                type={'button'}
                aria-pressed={'false'}
                title={'Onion skin: ghosts of the frames before and after this one'}
                aria-label={'Onion skin'}
              >
                <svg aria-hidden={'true'}>
                  <use href={'#ic-onion'}></use>
                </svg>
              </button>
              {'\n                '}
              <button
                className={'lib-btn lib-btn--axis'}
                id={'lib-onion-more'}
                type={'button'}
                aria-expanded={'false'}
                aria-label={'Onion skin settings'}
                title={'Onion skin settings'}
              >
                {'▾'}
              </button>
              {'\n            '}
            </span>
            {'\n            '}
            <button
              className={'lib-btn lib-btn--svg'}
              id={'lib-follow'}
              type={'button'}
              title={'Follow: the camera follows the character as it travels'}
              aria-label={'Follow'}
            >
              <svg aria-hidden={'true'}>
                <use href={'#ic-follow'}></use>
              </svg>
            </button>
            {'\n            \n            '}
            <button
              className={'lib-btn lib-btn--svg'}
              id={'lib-mirror'}
              type={'button'}
              title={'Mirror: swap left and right'}
              aria-label={'Mirror'}
            >
              <svg aria-hidden={'true'}>
                <use href={'#ic-mirror'}></use>
              </svg>
            </button>
            {'\n            \n            '}
            <span className={'lib-axes'} id={'lib-reverse-group'}>
              {'\n                '}
              <button
                className={'lib-btn lib-btn--svg'}
                id={'lib-reverse'}
                type={'button'}
                title={'Reverse: play it backwards — the keys flipped, the root with them'}
                aria-label={'Reverse'}
              >
                <svg aria-hidden={'true'}>
                  <use href={'#ic-reverse'}></use>
                </svg>
              </button>
              {'\n                '}
              <button
                className={'lib-btn lib-btn--axis'}
                id={'lib-reverse-origin'}
                type={'button'}
                disabled
                title={
                  'Start the reversed clip on the origin, where the clip itself started — off, it starts where the clip ended (a true reverse)'
                }
              >
                {'Origin'}
              </button>
              {'\n            '}
            </span>
            {'\n            \n            '}
            <span className={'lib-axes'} id={'lib-axes-group'}>
              {'\n                '}
              <button
                className={'lib-btn lib-btn--svg'}
                id={'lib-inplace-view'}
                type={'button'}
                title={'In Place: preview with root motion locked'}
                aria-label={'In Place'}
              >
                <svg aria-hidden={'true'}>
                  <use href={'#ic-inplace'}></use>
                </svg>
              </button>
              {'\n                '}
              <button
                className={'lib-btn lib-btn--axis is-on'}
                data-axis={'x'}
                type={'button'}
                title={'Lock sideways travel'}
              >
                {'X'}
              </button>
              {'\n                '}
              <button
                className={'lib-btn lib-btn--axis'}
                data-axis={'y'}
                type={'button'}
                title={"Lock height — off keeps a jump's rise"}
              >
                {'Y'}
              </button>
              {'\n                '}
              <button
                className={'lib-btn lib-btn--axis is-on'}
                data-axis={'z'}
                type={'button'}
                title={'Lock forward travel'}
              >
                {'Z'}
              </button>
              {'\n                '}
              <button
                className={'lib-btn lib-btn--axis'}
                data-axis={'yaw'}
                type={'button'}
                title={'Lock turning: an animation that ends up turned faces one way throughout'}
              >
                {'YAW'}
              </button>
              {'\n            '}
            </span>
            {'\n            \n            '}
            <button
              className={'lib-btn lib-btn--svg'}
              id={'lib-reframe'}
              type={'button'}
              title={'Reframe: put the character back in view'}
              aria-label={'Reframe'}
            >
              <svg aria-hidden={'true'}>
                <use href={'#ic-reframe'}></use>
              </svg>
            </button>
            {'\n        '}
          </div>
          {'\n    '}
        </section>
        {'\n\n    \n    '}
        <div className={'lib-right'}>
          {'\n\n        \n    '}
          <aside className={'lib-drawer'} id={'lib-drawer'}>
            {'\n        '}
            <div className={'lib-drawer__block'}>
              {'\n            '}
              <h2 className={'lib-drawer__title'} id={'lib-title'}>
                {'ActionForge'}
              </h2>
              {'\n            '}
              <p className={'lib-drawer__meta'} id={'lib-meta'}>
                {'Select a clip to play it on the rig.'}
              </p>
              {'\n            '}
              <div className={'lib-drawer__tags'} id={'lib-current-tags'}></div>
              {'\n        '}
            </div>
            {'\n\n        '}
            <div className={'lib-drawer__block'}>
              {'\n            '}
              <h3 className={'lib-drawer__head'}>{'Filter by tag'}</h3>
              {'\n            '}
              <div className={'lib-chips'} id={'lib-chips'}></div>
              {'\n            '}
              <p className={'lib-drawer__hint'} id={'lib-chips-empty'}>
                {'No tags authored yet.'}
              </p>
              {'\n        '}
            </div>
            {'\n\n        '}
            <div className={'lib-drawer__block'}>
              {'\n            '}
              <h3 className={'lib-drawer__head'}>{'Display'}</h3>
              {'\n            '}
              <label className={'lib-check'}>
                <input id={'lib-group'} type={'checkbox'} />
                {' Group by category'}
              </label>
              {'\n        '}
            </div>
            {'\n\n    '}
          </aside>
          {'\n\n        '}
          <button
            className={'lib-handle'}
            id={'lib-handle'}
            type={'button'}
            aria-controls={'lib-drawer'}
            aria-expanded={'true'}
            title={'Toggle details panel'}
          >
            {'‹'}
          </button>
          {'\n\n    '}
          <aside className={'lib-panel'}>
            {'\n        '}
            <div className={'lib-panel__head'}>
              {'\n            \n            '}
              <div className={'lib-panel__tabs'} role={'tablist'}>
                {'\n                '}
                <button
                  className={'lib-panel__tab is-on'}
                  id={'lib-tab-anims'}
                  type={'button'}
                  role={'tab'}
                  aria-selected={'true'}
                >
                  {'Animations'}
                </button>
                {'\n                '}
                <button
                  className={'lib-panel__tab'}
                  id={'lib-tab-poses'}
                  type={'button'}
                  role={'tab'}
                  aria-selected={'false'}
                >
                  {'Poses'}
                </button>
                {'\n                '}
                <button
                  className={'lib-panel__tab'}
                  id={'lib-tab-chars'}
                  type={'button'}
                  role={'tab'}
                  aria-selected={'false'}
                >
                  {'Characters'}
                </button>
                {'\n            '}
              </div>
              {'\n            '}
              <input
                className={'lib-search'}
                id={'lib-search'}
                type={'search'}
                placeholder={'Search name or tag…'}
                autoComplete={'off'}
              />
              {'\n            '}
              <span className={'lib-count'} id={'lib-count'}>
                {'—'}
              </span>
              {'\n        '}
            </div>
            {'\n\n        '}
            <div className={'lib-grid'} id={'lib-grid'}></div>
            {'\n        \n        '}
            <div className={'lib-poses'} id={'lib-poses'} hidden></div>
            {'\n        '}
            <div className={'lib-grid lib-chargrid'} id={'lib-chargrid'} hidden></div>
            {'\n\n        \n        '}
            <div className={'lib-dock'} id={'lib-bundle'}>
              {'\n            '}
              <div className={'lib-dock__row'}>
                {'\n                '}
                <span className={'lib-dock__count'} id={'lib-bundle-count'}>
                  {'Nothing selected'}
                </span>
                {'\n                '}
                <button className={'lib-btn lib-btn--sm'} id={'lib-bundle-all'} type={'button'}>
                  {'All'}
                </button>
                {'\n                '}
                <button className={'lib-btn lib-btn--sm'} id={'lib-bundle-clear'} type={'button'}>
                  {'Clear'}
                </button>
                {'\n            '}
              </div>
              {'\n            '}
              <label className={'lib-check'}>
                <input id={'lib-bundle-rig'} type={'checkbox'} defaultChecked />
                {' Include character mesh'}
              </label>
              {'\n            \n            '}
              <label className={'lib-check'} id={'lib-inplace-row'}>
                <input id={'lib-inplace'} type={'checkbox'} />
                {' In place '}
                <span className={'lib-axes-tag'} id={'lib-axes-tag'}></span>
              </label>
              {'\n            \n            '}
              <label
                className={'lib-check is-disabled'}
                id={'lib-split-row'}
                title={'Select two or more clips to get one file per clip'}
              >
                <input id={'lib-split'} type={'checkbox'} disabled />
                {' One file per clip (.zip)'}
              </label>
              {'\n            \n            '}
              <div className={'lib-dock__row lib-dock__row--fmt'}>
                {'\n                '}
                <label className={'lib-dock__fmt'}>
                  {'Format\n                    '}
                  <select id={'lib-bundle-format'}>
                    {'\n                        '}
                    <option value={'glb'}>{'GLB'}</option>
                    {'\n                        '}
                    <option value={'fbx'}>{'FBX'}</option>
                    {'\n                    '}
                  </select>
                  {'\n                '}
                </label>
                {'\n                \n                '}
                <label className={'lib-dock__fmt'} id={'lib-fbx-target-row'}>
                  {'Units\n                    '}
                  <select id={'lib-bundle-target'}></select>
                  {'\n                '}
                </label>
                {'\n                \n                \n                '}
                <div className={'lib-dock__stack'}>
                  {'\n                    '}
                  <label className={'lib-dock__fmt'} id={'lib-mannequin-row'} hidden>
                    {'Mannequin\n                        '}
                    <select id={'lib-bundle-mannequin'}>
                      {'\n                            '}
                      <option value={'ue5'}>{'Manny'}</option>
                      {'\n                            '}
                      <option value={'ue5-quinn'}>{'Quinn'}</option>
                      {'\n                        '}
                    </select>
                    {'\n                    '}
                  </label>
                  {'\n                    '}
                  <label className={'lib-dock__fmt'}>
                    {'Skeleton\n                        '}
                    <select id={'lib-bundle-skeleton'}>
                      {'\n                            '}
                      <option value={'default'}>{'Default'}</option>
                      {'\n                            '}
                      <option value={'ue5'}>{'Unreal Engine 5'}</option>
                      {'\n                            '}
                      <option value={'ue4'}>{'Unreal Engine 4'}</option>
                      {'\n                            '}
                      <option value={'reallusion'}>{'Reallusion (CC / ActorCore)'}</option>
                      {'\n                            '}
                      <option value={'mixamo'}>{'Mixamo'}</option>
                      {'\n                        '}
                    </select>
                    {'\n                    '}
                  </label>
                  {'\n                '}
                </div>
                {'\n            '}
              </div>
              {'\n            '}
              <button
                className={'lib-btn lib-btn--go'}
                id={'lib-bundle-go'}
                type={'button'}
                disabled
              >
                {'↓ Download bundle'}
              </button>
              {'\n            \n            '}
              <button
                className={'lib-btn'}
                id={'lib-save-mine'}
                type={'button'}
                title={'Keep what is on screen with your animations, under a name'}
              >
                {'Save to my animations'}
              </button>
              {'\n            \n            '}
              <button className={'lib-btn'} id={'lib-bundle-rest'} type={'button'}>
                {'↓ Character only (rest pose)'}
              </button>
              {'\n        '}
            </div>
            {'\n    '}
          </aside>
          {'\n    '}
        </div>
        {'\n\n    \n    \n    '}
        <section
          className={'lib-seq'}
          id={'lib-seq'}
          hidden
          aria-label={'Strips timeline'}
        ></section>
        {'\n\n'}
      </main>
      {'\n\n'}
      {'\n\n\n\n'}
    </>
  );
}
