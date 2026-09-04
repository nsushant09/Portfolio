import React, { useState, useEffect, useRef } from 'react';
import { COMMANDS, THEMES } from '../../utils/commandParser';
import { PROJECTS } from '../../constants/data';
import { BLOGS } from '../../constants/blogData';
import { Search, Terminal, FolderGit2, BookOpen, Palette, X, CornerDownLeft } from 'lucide-react';
import { playEnterSound } from '../../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteCommand: (cmd: string) => void;
}

interface PaletteItem {
  id: string;
  title: string;
  description: string;
  command: string;
  category: 'Commands' | 'Projects' | 'Articles' | 'Themes';
  icon: React.ReactNode;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onExecuteCommand }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Build items list
  const allItems: PaletteItem[] = [
    ...COMMANDS.map(c => ({
      id: `cmd-${c.name}`,
      title: c.name,
      description: c.description,
      command: c.name,
      category: 'Commands' as const,
      icon: <Terminal size={14} className="text-[var(--accent)]" />
    })),
    ...PROJECTS.map(p => ({
      id: `proj-${p.title}`,
      title: p.title,
      description: p.tags.join(', '),
      command: `projects ${p.title.split(' ')[0].toLowerCase()}`,
      category: 'Projects' as const,
      icon: <FolderGit2 size={14} className="text-[var(--accent-2)]" />
    })),
    ...BLOGS.map(b => ({
      id: `blog-${b.slug}`,
      title: b.title,
      description: `${b.category} • ${b.date}`,
      command: `blog ${b.slug}`,
      category: 'Articles' as const,
      icon: <BookOpen size={14} className="text-[var(--warning)]" />
    })),
    ...THEMES.map(t => ({
      id: `theme-${t}`,
      title: `Theme: ${t}`,
      description: `Switch terminal palette to ${t}`,
      command: `theme ${t}`,
      category: 'Themes' as const,
      icon: <Palette size={14} className="text-[var(--cursor)]" />
    }))
  ];

  const filteredItems = allItems.filter(item => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.command.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Auto-scroll selected item into view during keyboard navigation
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        playEnterSound();
        onExecuteCommand(filteredItems[selectedIndex].command);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-[10vh] px-4 font-mono"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[var(--card-bg)] border border-[var(--border)] rounded-lg shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[75vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="flex items-center px-3.5 py-3 border-b border-[var(--border)] gap-2 bg-[var(--term-header)] flex-shrink-0">
          <Search size={16} className="text-[var(--accent)] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, project, article, or theme..."
            className="w-full bg-transparent text-sm text-[var(--fg)] placeholder-[var(--muted)]/60 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-[var(--muted)] hover:text-[var(--fg)] p-1 rounded cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results list */}
        <div
          ref={listContainerRef}
          className="overflow-y-auto p-2 space-y-1 flex-1"
        >
          {filteredItems.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={item.id}
                ref={el => {
                  itemRefs.current[idx] = el;
                }}
                onClick={() => {
                  playEnterSound();
                  onExecuteCommand(item.command);
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[var(--accent)] text-[var(--bg)] font-bold'
                    : 'text-[var(--fg)] hover:bg-[var(--highlight)]'
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span className={isSelected ? 'text-[var(--bg)]' : ''}>{item.icon}</span>
                  <div className="truncate">
                    <div className="text-xs truncate">{item.title}</div>
                    <div className={`text-[10px] truncate ${isSelected ? 'opacity-90' : 'text-[var(--muted)]'}`}>
                      {item.description}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 text-[10px]">
                  <span className={`px-1.5 py-0.5 rounded border text-[9px] ${
                    isSelected ? 'border-[var(--bg)]/50 bg-[var(--bg)]/20' : 'border-[var(--border)] text-[var(--muted)]'
                  }`}>
                    {item.category}
                  </span>
                  {isSelected && <CornerDownLeft size={12} />}
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="p-6 text-center text-xs text-[var(--muted)]">
              No matching commands or resources found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-3.5 py-2 border-t border-[var(--border)] bg-[var(--term-header)] text-[10px] text-[var(--muted)] flex justify-between items-center flex-shrink-0">
          <span>Navigate: <kbd className="px-1 bg-black/40 border border-[var(--border)] rounded">↑</kbd> <kbd className="px-1 bg-black/40 border border-[var(--border)] rounded">↓</kbd></span>
          <span>Select: <kbd className="px-1 bg-black/40 border border-[var(--border)] rounded">Enter</kbd></span>
          <span>Close: <kbd className="px-1 bg-black/40 border border-[var(--border)] rounded">Esc</kbd></span>
        </div>
      </div>
    </div>
  );
};
