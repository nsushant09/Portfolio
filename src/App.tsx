import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TerminalWindow } from './components/terminal/TerminalWindow';
import { GuiView } from './components/GuiView';
import { CustomCursor } from './components/CustomCursor';

function PortfolioApp() {
  // Always open in Terminal mode first on page open/load
  const [isGuiMode, setIsGuiMode] = useState<boolean>(false);

  const toggleGuiMode = (gui: boolean) => {
    setIsGuiMode(gui);
    // Scroll window to top on mode switch
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className={`w-full ${isGuiMode ? 'min-h-screen' : 'h-screen overflow-hidden'} bg-[var(--bg)] text-[var(--fg)] relative`}>
      <CustomCursor />
      {isGuiMode ? (
        <GuiView onSwitchToTerminal={() => toggleGuiMode(false)} />
      ) : (
        <TerminalWindow onSwitchToGui={() => toggleGuiMode(true)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PortfolioApp />} />
      </Routes>
    </Router>
  );
}