/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { create } from 'zustand';

interface AdminUIState {
  searchQuery: string;
  selectedFaculty: string;
  currentPage: number;
  pageSize: number;
  setSearchQuery: (query: string) => void;
  setSelectedFaculty: (faculty: string) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  resetFilters: () => void;
}

export const useAdminStore = create<AdminUIState>((set) => ({
  searchQuery: '',
  selectedFaculty: 'ALL',
  currentPage: 1,
  pageSize: 10,
  setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
  setSelectedFaculty: (selectedFaculty) => set({ selectedFaculty, currentPage: 1 }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setPageSize: (pageSize) => set({ pageSize, currentPage: 1 }),
  resetFilters: () => set({ searchQuery: '', selectedFaculty: 'ALL', currentPage: 1 }),
}));
