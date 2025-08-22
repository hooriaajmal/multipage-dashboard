import { NavLink } from "react-router-dom";
import { createPortal } from "react-dom";
import { LayoutDashboard, FolderKanban, UserRound, X } from "lucide-react";

function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile drawer via portal to avoid layout issues */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 md:hidden" aria-hidden={!open}>
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="absolute inset-y-0 left-0 w-64 transform transition-transform translate-x-0">
              <div
                className="flex h-full flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex items-center justify-between p-4">
                  <div className="text-xl font-semibold">Admin</div>
                  <button
                    className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Close sidebar"
                    onClick={onClose}
                  >
                    <X size={18} />
                  </button>
                </div>
                <Nav onNavigate={onClose} />
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Desktop sidebar (fixed) */}
      <aside className="hidden md:flex md:flex-col fixed top-0 left-0 h-screen w-64 border-r border-gray-200 bg-white/90 backdrop-blur dark:bg-gray-900/60 dark:border-gray-800 z-40">
        <div className="p-4 text-xl font-semibold">Admin</div>
        <Nav />
      </aside>
    </>
  );
}

export default Sidebar;

function Nav({ onNavigate }) {
  return (
    <nav className="flex-1 px-2 py-2 space-y-1">
      <NavLink
        to="/"
        end
        onClick={onNavigate}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
            isActive
              ? "text-indigo-600 dark:text-indigo-400 bg-gray-100 dark:bg-gray-800"
              : "text-gray-700 dark:text-gray-200"
          }`
        }
      >
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/projects"
        onClick={onNavigate}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
            isActive
              ? "text-indigo-600 dark:text-indigo-400 bg-gray-100 dark:bg-gray-800"
              : "text-gray-700 dark:text-gray-200"
          }`
        }
      >
        <FolderKanban size={18} />
        <span>Projects</span>
      </NavLink>

      <NavLink
        to="/profile"
        onClick={onNavigate}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
            isActive
              ? "text-indigo-600 dark:text-indigo-400 bg-gray-100 dark:bg-gray-800"
              : "text-gray-700 dark:text-gray-200"
          }`
        }
      >
        <UserRound size={18} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}
