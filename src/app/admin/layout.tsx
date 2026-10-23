/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
'use client';

import * as React from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminTopbar } from '@/components/admin/admin-topbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col">
        <AdminTopbar collapsed={sidebarCollapsed} />
        <main
          className={`flex-1 p-6 transition-all duration-200 ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          {children}
        </main>
        <footer
          className={`py-3 px-6 border-t border-border text-xs text-muted-foreground flex items-center justify-between transition-all duration-200 ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          <span>Panel Administrasi PMB Universitas Sari Mulia</span>
          <span>Sistem E-Katalog & Admisi v1.0</span>
        </footer>
      </div>
    </div>
  );
}
