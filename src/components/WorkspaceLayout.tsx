'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { containModalFocus } from '../engine/ui/modal';

type Layout = {
  resources: boolean;
  inspector: boolean;
  resourceWidth: number;
  inspectorWidth: number;
  focus: 'normal' | 'preview' | 'timeline';
};
const defaults: Layout = {
  resources: true,
  inspector: true,
  resourceWidth: 300,
  inspectorWidth: 320,
  focus: 'normal',
};
const storageKey = 'actionforge.workspace.layout.v1';
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
function changeLayout(patch: Partial<Layout>) {
  document.dispatchEvent(new CustomEvent('af:layout', { detail: patch }));
}

export function WorkspaceActions() {
  const [layout, setLayout] = useState(defaults);
  const [timeline, setTimeline] = useState(false);
  const [project, setProject] = useState({
    name: 'Untitled scene',
    status: 'Not saved',
  });
  useEffect(() => {
    let restored = {
      ...defaults,
      resources: innerWidth > 1100,
      inspector: innerWidth > 760,
    };
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (
        saved &&
        typeof saved.resources === 'boolean' &&
        typeof saved.inspector === 'boolean'
      ) {
        restored = {
          ...restored,
          resources: saved.resources,
          inspector: saved.inspector,
          resourceWidth: clamp(Number(saved.resourceWidth) || 300, 240, 500),
          inspectorWidth: clamp(Number(saved.inspectorWidth) || 320, 280, 520),
        };
      }
    } catch {
      /* Storage may be disabled. Keep a usable default layout. */
    }
    if (innerWidth <= 1100 && restored.resources && restored.inspector)
      restored.resources = false;
    setLayout(restored);
    const fitPanels = () => {
      if (innerWidth <= 1100)
        setLayout((previous) =>
          previous.resources && previous.inspector
            ? { ...previous, resources: false }
            : previous,
        );
    };
    window.addEventListener('resize', fitPanels);
    const change = (event: Event) => {
      const patch = (event as CustomEvent<Partial<Layout>>).detail;
      setLayout((previous) => {
        const next = { ...previous, ...patch };
        if (innerWidth <= 1100) {
          if (patch.resources) next.inspector = false;
          else if (patch.inspector) next.resources = false;
        }
        return next;
      });
    };
    const rail = document.getElementById('lib-rail')!;
    const projectStatus = (event: Event) =>
      setProject(
        (event as CustomEvent<{ name: string; status: string }>).detail,
      );
    const revealInspector = (event: Event) => {
      if ((event.target as Element).closest('button[data-tool]'))
        changeLayout({ inspector: true, focus: 'normal' });
    };
    const sequence = document.getElementById('lib-seq')!;
    const dismissMenu = (event: Event) => {
      const menu = document.querySelector<HTMLDetailsElement>(
        '.workspace-layout-menu',
      );
      if (
        menu &&
        (!menu.contains(event.target as Node) ||
          (event as KeyboardEvent).key === 'Escape')
      )
        menu.open = false;
    };
    const observer = new MutationObserver(() => {
      setTimeline(!sequence.hidden);
      if (sequence.hidden)
        setLayout((previous) =>
          previous.focus === 'timeline'
            ? { ...previous, focus: 'normal' }
            : previous,
        );
    });
    observer.observe(sequence, {
      attributes: true,
      attributeFilter: ['hidden'],
    });
    document.addEventListener('af:layout', change);
    document.addEventListener('af:project-status', projectStatus);
    rail.addEventListener('click', revealInspector);
    document.addEventListener('pointerdown', dismissMenu);
    document.addEventListener('keydown', dismissMenu);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', fitPanels);
      document.removeEventListener('af:layout', change);
      document.removeEventListener('af:project-status', projectStatus);
      rail.removeEventListener('click', revealInspector);
      document.removeEventListener('pointerdown', dismissMenu);
      document.removeEventListener('keydown', dismissMenu);
    };
  }, []);
  useEffect(() => {
    const workspace = document.getElementById('workspace')!;
    const apply = () => {
      const available = Math.max(520, innerWidth - 652);
      const total =
        (layout.resources ? layout.resourceWidth : 0) +
        (layout.inspector ? layout.inspectorWidth : 0);
      const minimum =
        (layout.resources ? 240 : 0) + (layout.inspector ? 280 : 0);
      const scale =
        total > available ? (available - minimum) / (total - minimum) : 1;
      workspace.style.setProperty(
        '--resource-width',
        `${Math.round(240 + (layout.resourceWidth - 240) * scale)}px`,
      );
      workspace.style.setProperty(
        '--inspector-width',
        `${Math.round(280 + (layout.inspectorWidth - 280) * scale)}px`,
      );
      workspace.dataset.resources = String(layout.resources);
      workspace.dataset.inspector = String(layout.inspector);
      workspace.dataset.focus = layout.focus;
      for (const [side, width] of [
        ['resource', layout.resourceWidth],
        ['inspector', layout.inspectorWidth],
      ] as const) {
        const divider = workspace.querySelector(`.workspace-divider--${side}`);
        divider?.setAttribute('aria-valuenow', String(width));
      }
    };
    apply();
    window.addEventListener('resize', apply);
    try {
      localStorage.setItem(storageKey, JSON.stringify(layout));
    } catch {
      /* Layout persistence is optional. */
    }
    return () => window.removeEventListener('resize', apply);
  }, [layout]);
  function toggleTimeline() {
    if (layout.focus !== 'normal') changeLayout({ focus: 'normal' });
    if (layout.focus === 'preview' && timeline) return;
    document.getElementById('lib-strips')?.click();
  }
  function focus(mode: Layout['focus']) {
    if (mode === 'timeline' && !timeline)
      document.getElementById('lib-strips')?.click();
    changeLayout({ focus: layout.focus === mode ? 'normal' : mode });
  }
  return (
    <div
      className="workspace-actions"
      role="group"
      aria-label="Workspace layout"
    >
      <button
        type="button"
        className="workspace-save"
        title={`${project.name} · ${project.status}`}
        onClick={() => document.dispatchEvent(new Event('af:save-project'))}
      >
        Save project
      </button>
      <span
        className="workspace-project-status"
        title={project.name}
        aria-live="polite"
      >
        {project.status}
      </span>
      <button
        type="button"
        aria-controls="workspace-resources"
        aria-expanded={layout.resources && layout.focus !== 'preview'}
        onClick={() =>
          changeLayout({
            resources: layout.focus === 'preview' || !layout.resources,
            focus: 'normal',
          })
        }
      >
        Resources
      </button>
      <button
        type="button"
        aria-controls="lib-left"
        aria-expanded={layout.inspector && layout.focus !== 'preview'}
        onClick={() =>
          changeLayout({
            inspector: layout.focus === 'preview' || !layout.inspector,
            focus: 'normal',
          })
        }
      >
        Inspector
      </button>
      <button
        type="button"
        aria-controls="lib-seq"
        aria-pressed={timeline && layout.focus !== 'preview'}
        onClick={toggleTimeline}
      >
        Timeline
      </button>
      <details className="workspace-layout-menu">
        <summary>Layout</summary>
        <div>
          <button
            type="button"
            aria-pressed={layout.focus === 'preview'}
            onClick={(event) => {
              focus('preview');
              event.currentTarget.closest('details')!.open = false;
            }}
          >
            Focus preview
          </button>
          <button
            type="button"
            aria-pressed={layout.focus === 'timeline'}
            onClick={(event) => {
              focus('timeline');
              event.currentTarget.closest('details')!.open = false;
            }}
          >
            Maximize timeline
          </button>
          <button
            type="button"
            onClick={(event) => {
              changeLayout({
                ...defaults,
                resources: innerWidth > 1100,
                inspector: innerWidth > 760,
              });
              const sequence = document.getElementById('lib-seq')!;
              sequence.style.height = '280px';
              event.currentTarget.closest('details')!.open = false;
              try {
                localStorage.removeItem('cgstuff.library.seqHeight');
                localStorage.removeItem('cgstuff.library.graphHeight');
              } catch {
                /* Reset still works without storage access. */
              }
            }}
          >
            Reset layout
          </button>
        </div>
      </details>
      {layout.focus !== 'normal' && (
        <button type="button" onClick={() => changeLayout({ focus: 'normal' })}>
          Back to editor
        </button>
      )}
      <button
        type="button"
        className="workspace-export-button"
        onClick={() => document.dispatchEvent(new Event('af:export'))}
      >
        Export
      </button>
    </div>
  );
}

export function WorkspaceDividers() {
  const [notice, setNotice] = useState('');
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const show = (event: Event) => {
      setNotice((event as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setNotice(''), 7000);
    };
    document.addEventListener('af:project-notice', show);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('af:project-notice', show);
    };
  }, []);
  return (
    <>
      {(['resource', 'inspector'] as const).map((side) => (
        <div
          key={side}
          className={`workspace-divider workspace-divider--${side}`}
          role="separator"
          aria-label={`${side === 'resource' ? 'Resources' : 'Inspector'} width`}
          aria-orientation="vertical"
          aria-valuemin={side === 'resource' ? 240 : 280}
          aria-valuemax={500}
          tabIndex={0}
          onKeyDown={(event) => {
            if (!['ArrowLeft', 'ArrowRight', 'Home'].includes(event.key))
              return;
            event.preventDefault();
            event.stopPropagation();
            const element = document.querySelector(
              side === 'resource' ? '.lib-panel' : '.lib-left',
            )!;
            const direction = side === 'resource' ? 1 : -1;
            const width =
              event.key === 'Home'
                ? side === 'resource'
                  ? 300
                  : 320
                : element.getBoundingClientRect().width +
                  (event.key === 'ArrowRight' ? 16 : -16) * direction;
            changeLayout({
              [`${side}Width`]: clamp(
                width,
                side === 'resource' ? 240 : 280,
                500,
              ),
            });
          }}
          onDoubleClick={() =>
            changeLayout({ [`${side}Width`]: side === 'resource' ? 300 : 320 })
          }
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            event.preventDefault();
            const target = event.currentTarget;
            target.setPointerCapture(event.pointerId);
            const start = event.clientX;
            const panel = document.querySelector(
              side === 'resource' ? '.lib-panel' : '.lib-left',
            )!;
            const width = panel.getBoundingClientRect().width;
            const move = (pointer: PointerEvent) =>
              changeLayout({
                [`${side}Width`]: clamp(
                  width +
                    (pointer.clientX - start) * (side === 'resource' ? 1 : -1),
                  side === 'resource' ? 240 : 280,
                  500,
                ),
              });
            const end = () => {
              target.removeEventListener('pointermove', move);
              target.removeEventListener('lostpointercapture', end);
            };
            target.addEventListener('pointermove', move);
            target.addEventListener('lostpointercapture', end);
          }}
        />
      ))}
      <footer className="workspace-status">
        <span role="status">
          {notice || 'Local workspace · Files stay in this browser'}
        </span>
        <span>Space: play / pause · Ctrl+Z: undo · Ctrl+S: save project</span>
      </footer>
    </>
  );
}

export function ResourceView() {
  const [list, setList] = useState(false);
  useEffect(() => {
    try {
      setList(
        localStorage.getItem('actionforge.workspace.resourceView') === 'list',
      );
    } catch {
      /* Keep thumbnails when preferences are unavailable. */
    }
  }, []);
  useEffect(() => {
    document.getElementById('workspace-resources')!.dataset.view = list
      ? 'list'
      : 'grid';
  }, [list]);
  return (
    <button
      type="button"
      className="workspace-view-button"
      aria-pressed={list}
      onClick={() => {
        setList(!list);
        try {
          localStorage.setItem(
            'actionforge.workspace.resourceView',
            !list ? 'list' : 'grid',
          );
        } catch {
          /* Changing the view does not require persistent storage. */
        }
      }}
    >
      {list ? 'Thumbnails' : 'Compact list'}
    </button>
  );
}

export function ExportDialog({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current!;
    let release: (() => void) | null = null;
    let trigger: HTMLElement | null = null;
    const open = () => {
      if (element.open) return;
      trigger = document.activeElement as HTMLElement;
      element.showModal();
      release = containModalFocus(element);
    };
    const close = () => {
      release?.();
      release = null;
      trigger?.focus();
    };
    document.addEventListener('af:export', open);
    element.addEventListener('close', close);
    return () => {
      release?.();
      document.removeEventListener('af:export', open);
      element.removeEventListener('close', close);
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      id="workspace-export"
      className="workspace-export"
      aria-labelledby="workspace-export-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }}
    >
      <div className="workspace-export-content">
        <div className="workspace-export-heading">
          <div>
            <h2 id="workspace-export-title">Export animation</h2>
            <p>Current animation or selected clips from Resources.</p>
          </div>
          <button
            type="button"
            aria-label="Close export"
            onClick={() => dialog.current?.close()}
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
