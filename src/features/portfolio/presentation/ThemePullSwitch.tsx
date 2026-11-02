interface ThemePullSwitchProps {
  readonly isLightMode: boolean;
  readonly onToggle: () => void;
}

export function ThemePullSwitch({ isLightMode, onToggle }: ThemePullSwitchProps) {
  return (
    <button
      aria-label={`Pull to switch to ${isLightMode ? 'dark' : 'light'} mode`}
      aria-pressed={isLightMode}
      className={`theme-pull-switch ${isLightMode ? 'theme-pull-switch--light' : ''}`}
      onClick={onToggle}
      type="button"
    >
      <span aria-hidden="true" className="theme-pull-switch__shade" />
      <span aria-hidden="true" className="theme-pull-switch__cord" />
      <span aria-hidden="true" className="theme-pull-switch__handle" />
      <span className="sr-only">{isLightMode ? 'Light mode is on' : 'Dark mode is on'}</span>
    </button>
  );
}
