'use client';

import { useState } from 'react';

const panels = [
  ['viewport', 'Preview'],
  ['left', 'Edit'],
  ['right', 'Results'],
  ['lib', 'Library'],
  ['curveDock', 'Curves'],
] as const;

export function MotionLabNavigation() {
  const [panel, setPanel] = useState<string>('viewport');
  return (
    <nav className="lab-mobile-nav" aria-label="Motion Lab panels" data-panel={panel}>
      {panels.map(([id, label]) => (
        <button key={id} type="button" aria-controls={id} aria-pressed={panel === id}
          onClick={() => setPanel(id)}>{label}</button>
      ))}
    </nav>
  );
}
