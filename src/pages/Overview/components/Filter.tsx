import { FormControl, MenuItem, Select } from "@mui/material";
import { UseGroupFilterInterface } from "../../../usecase/useGroupFilter";

type Props = Pick<UseGroupFilterInterface, 'filter' | 'filterOptions' | 'handleFilterChange'>;

const Filter = ({ filter, filterOptions, handleFilterChange }: Props) => {
  return (
    <div className="flex items-center flex-wrap justify-start gap-2">
      {filterOptions.map((opt) => (
        <FormControl key={opt.groupId} sx={{ minWidth: 180 }} size="small">
          <Select
            id={`filter-${opt.groupId}`}
            value={filter[opt.groupId]}
            defaultValue="0"
            onChange={e => handleFilterChange(opt.groupId, e.target.value)}
          >
            <MenuItem value="0">{`All ${opt.groupLabel}`}</MenuItem>
            {opt.items.map((svc) => (
              <MenuItem key={svc.itemId} value={svc.itemId}>{svc.itemLabel}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </div>
  );
}

export default Filter;
