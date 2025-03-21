'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    Cookies.remove('auth-token');
    toast('Logging you out...');
		router.push("/auth/login");
	};

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-white w-64 p-4 z-30 fixed h-full transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-64'}`}> 
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">AcadEx</h2>
          <button onClick={toggleSidebar} className="">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-6 space-y-4">
          <Link href="/dashboard" onClick={()=>setIsOpen(false)}>
            <span className="block p-2 rounded hover:bg-gray-700">Dashboard</span>
          </Link>
          <Link href="/dashboard/resources" onClick={()=>setIsOpen(false)}>
            <span className="block p-2 rounded hover:bg-gray-700">Resources</span>
          </Link>
          <Link href="/dashboard/upload" onClick={()=>setIsOpen(false)}>
            <span className="block p-2 rounded hover:bg-gray-700">Upload</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button onClick={toggleSidebar} className="">
            <Menu className="w-6 h-6" />
          </button>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
