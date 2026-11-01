import { useCustomCursorFacade } from './useCustomCursorFacade';

export function CustomCursor() {
  const cursorRef = useCustomCursorFacade();

  return (
    <div aria-hidden="true" className="custom-cursor" ref={cursorRef}>
      <span className="custom-cursor__shadow" />
      <span className="custom-cursor__pixel" />
    </div>
  );
}
