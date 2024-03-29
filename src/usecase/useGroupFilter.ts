import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

interface Item {
  itemId: string | number;
  itemLabel: string;
}

interface Group {
  groupId: string;
  groupLabel: string;
  defaultValue?: Item['itemId'];
  items: Item[];
}

interface FilterState {
  [key: Group['groupId']]: Item['itemId'] | undefined;
}

interface FilterItem extends Item {
  checked: boolean;
}

interface FilterOption extends Group {
  items: FilterItem[];
}

interface Deps {
  groups: Group[];
  defaultValue?: Item['itemId'];
}

export interface UseGroupFilterInterface {
  filter: FilterState;
  filterKeys: string[];
  filterOptions: FilterOption[];
  hasFilter: boolean;
  handleFilterChange: (group: Group['groupId'], val: Item['itemId']) => void;
  handleFilterRemove: (group: Group['groupId']) => void;
  handleFilterClear: () => void;
}

function useGroupFilter({ groups, defaultValue = "0" }: Deps): UseGroupFilterInterface {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const keys = groups.map(dt => dt.groupId);
  const [filter, setFilter] = useState<FilterState>(() => {
    const f = {};
    keys.forEach(key => { f[key] = searchParams.get(key) || groups[key]?.defaultValue || defaultValue });
    return f;
  });

  const handleFilterChange = (group: Group['groupId'], val: Item['itemId']) => {
    setFilter(prev => ({
      ...prev,
      [group]: val,
    }));
  }

  const handleFilterRemove = (group: Group['groupId']) => {
    setFilter(prev => ({
      ...prev,
      [group]: defaultValue
    }))
  }

  const handleFilterClear = () => {
    setFilter(() => {
      const f = {};
      keys.forEach(key => { f[key] = defaultValue });
      return f;
    })
  }

  const filterOptions = useMemo(() => {
    return groups.map(dt => {
      return {
        ...dt,
        items: dt.items.map(item => ({
          ...item,
          checked: filter[dt.groupId] === item.itemId,
        }))
      }
    })
  }, [groups, filter]);

  const filterKeys = useMemo(() => {
    return Object.keys(filter).filter(key => filter[key] !== defaultValue);
  }, [filter, defaultValue]);

  const hasFilter = filterKeys.length > 0;

  return {
    filter,
    filterKeys,
    filterOptions,
    hasFilter,
    handleFilterChange,
    handleFilterClear,
    handleFilterRemove,
  }
}

export default useGroupFilter;
