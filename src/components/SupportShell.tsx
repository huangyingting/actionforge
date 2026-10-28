export function SupportShell() {
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
        {'\n    '}
        <span className={'af-spacer'}></span>
        {'\n    '}
        <a
          className={'af-lab'}
          href={'/'}
          title={'Adjust, pose and export character animation in the browser'}
        >
          {'Open ActionForge'}
        </a>
        {'\n'}
      </header>
      {'\n\n'}
      <main className={'af-supportpage'}>
        {'\n    '}
        <h1 className={'af-supportpage__title'}>{'Support ActionForge'}</h1>
        {'\n    '}
        <div className={'af-support af-supportpage__box'} id={'af-support-here'}>
          {'\n        '}
          <p className={'af-newsbox__empty'}>{'Loading…'}</p>
          {'\n    '}
        </div>
        {'\n    '}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<p class="af-newsbox__empty">This page is shown by a script: it has to be allowed to run here.</p>',
          }}
        />
        {'\n'}
      </main>
      {'\n\n'}
      {'\n\n\n'}
    </>
  );
}
