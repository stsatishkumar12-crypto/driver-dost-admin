import { useEffect, useState } from 'react';
import { useDebounced } from './useDebounced';
import { ListParams } from '@/api/types';

/** Shared list state: pagination + debounced search + toggle sort. Reused by every table page. */
export function useListParams(initial?: { limit?: number; sortBy?: string; order?: 'asc' | 'desc' }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initial?.limit ?? 20);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(initial?.sortBy ?? 'createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>(initial?.order ?? 'desc');

  const debouncedSearch = useDebounced(search);

  // Any change to search/sort/page-size resets to the first page.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy, order, limit]);

  const onSort = (key: string) => {
    if (sortBy === key) setOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
    else {
      setSortBy(key);
      setOrder('asc');
    }
  };

  const params: ListParams = { page, limit, search: debouncedSearch, sortBy, order };

  return { page, setPage, limit, setLimit, search, setSearch, sortBy, order, onSort, params };
}
