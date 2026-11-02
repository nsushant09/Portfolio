import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

export interface WebsiteViewerSelection {
  readonly title: string;
  readonly url: string;
}

interface WebsiteViewerFacade {
  readonly selection: WebsiteViewerSelection | null;
  readonly dialogRef: RefObject<HTMLDialogElement | null>;
  readonly openViewer: (selection: WebsiteViewerSelection, trigger: HTMLAnchorElement) => void;
  readonly closeViewer: () => void;
}

export function useWebsiteViewerFacade(): WebsiteViewerFacade {
  const [selection, setSelection] = useState<WebsiteViewerSelection | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (selection && !dialog.open) dialog.showModal();
    else if (!selection && dialog.open) dialog.close();
    return undefined;
  }, [selection]);

  useEffect(() => {
    if (!selection) return undefined;
    document.body.classList.add('website-viewer-active');
    return () => document.body.classList.remove('website-viewer-active');
  }, [selection]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const restoreFocus = () => {
      const trigger = triggerRef.current;
      triggerRef.current = null;
      setSelection(null);
      window.dispatchEvent(new Event('portfolio:website-viewer-close'));
      requestAnimationFrame(() => trigger?.focus());
    };

    dialog.addEventListener('close', restoreFocus);
    return () => dialog.removeEventListener('close', restoreFocus);
  }, []);

  const openViewer = useCallback((nextSelection: WebsiteViewerSelection, trigger: HTMLAnchorElement) => {
    triggerRef.current = trigger;
    setSelection(nextSelection);
  }, []);

  const closeViewer = useCallback(() => setSelection(null), []);

  return { selection, dialogRef, openViewer, closeViewer };
}
