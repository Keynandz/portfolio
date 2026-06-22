import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-teal/10 border border-teal/20 flex items-center justify-center">
            <span className="text-teal font-mono text-[10px] font-bold">A</span>
          </div>
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} Ananda Purnomo. Crafted with care.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Keynandz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted hover:text-teal transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:nanpurnanda@gmail.com"
            className="text-sm text-text-muted hover:text-teal transition-colors"
          >
            Email
          </a>
          <a
            href="#"
            className="flex items-center gap-1 text-sm text-text-muted hover:text-teal transition-colors"
          >
            Top
            <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
