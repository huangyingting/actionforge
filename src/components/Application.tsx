'use client';

import { EngineBootstrap, type AppPage } from './EngineBootstrap';
import { WorkspaceShell } from './WorkspaceShell';
import { MotionLabShell } from './MotionLabShell';
import { SupportShell } from './SupportShell';

const shells = {
  workspace: WorkspaceShell,
  'motion-lab': MotionLabShell,
  support: SupportShell,
};

export function Application({ page }: { page: AppPage }) {
  const Shell = shells[page];
  return (
    <>
      <Shell />
      <EngineBootstrap page={page} />
    </>
  );
}
