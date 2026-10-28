'use client';

import { useEffect, useState } from 'react';
import { installPagesCompatibility } from '../pages-compatibility';

export type AppPage = 'workspace' | 'motion-lab' | 'support';
const loaders = {
  workspace: () => import('../engine/workspace.js').then((module) => module.ready),
  'motion-lab': () => import('../engine/motion-lab.js'),
  support: () => import('../engine/support-page.js'),
};
const pending = new Map<AppPage, Promise<unknown>>();

export function EngineBootstrap({ page }: { page: AppPage }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    installPagesCompatibility(`${process.env.NEXT_PUBLIC_BASE_PATH ?? '/actionforge'}/`);
    if (!pending.has(page)) pending.set(page, loaders[page]());
    pending.get(page)!.catch((error) => {
      console.error(`ActionForge ${page} startup failed`, error);
      if (active) setFailed(true);
    });
    return () => {
      active = false;
    };
  }, [page]);
  return failed ? (
    <div
      role="alert"
      style={{
        position: 'fixed',
        inset: '30% 20%',
        zIndex: 10000,
        background: '#111',
        border: '1px solid #09c5cc',
        padding: 24,
      }}
    >
      <h1>ActionForge could not start</h1>
      <p>Your saved projects have not been deleted. Check your connection, then reload.</p>
      <button type="button" onClick={() => location.reload()}>
        Reload application
      </button>
    </div>
  ) : null;
}
