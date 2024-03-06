import { useMemo, useState } from "react";

interface Item {
  item_id: string | number;
  item_label: string;
}

interface Group {
  group_id: string;
  group_label: string;
  items: Item[];
}

interface FilterState {
  [key: Group['group_id']]: Item['item_id'] | undefined;
}

interface FilterItem extends Item {
  checked: boolean;
}

interface FilterOption extends Group {
  items: FilterItem[];
}

interface Deps {
  groups: Group[];
  defaultValue?: Item['item_id'];
}

export interface UseGroupFilterInterface {
  filter: FilterState;
  filterOptions: FilterOption[];
  handleFilterChange: (group: Group['group_id'], val: Item['item_id']) => void;
  handleFilterRemove: (group: Group['group_id']) => void;
  handleFilterClear: () => void;
}

function useGroupFilter({ groups, defaultValue = "0" }: Deps): UseGroupFilterInterface {
  const keys = groups.map(dt => dt.group_id);
  const [filter, setFilter] = useState<FilterState>(() => {
    const f = {};
    keys.forEach(key => { f[key] = defaultValue });
    return f;
  });

  const handleFilterChange = (group: Group['group_id'], val: Item['item_id']) => {
    setFilter(prev => ({
      ...prev,
      [group]: val,
    }));
  }

  const handleFilterRemove = (group: Group['group_id']) => {
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
          checked: filter[dt.group_id] === item.item_id,
        }))
      }
    })
  }, [groups, filter]);

  return {
    filter,
    filterOptions,
    handleFilterChange,
    handleFilterClear,
    handleFilterRemove,
  }
}

export default useGroupFilter;
