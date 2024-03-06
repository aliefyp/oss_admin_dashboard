import { FormControl, MenuItem, Select } from "@mui/material";
import { UseGroupFilterInterface } from "../../../usecase/useGroupFilter";

type Props = Pick<UseGroupFilterInterface, 'filter' | 'filterOptions' | 'handleFilterChange'>;

const Filter = ({ filter, filterOptions, handleFilterChange }: Props) => {
  return (
    <div className="flex items-center flex-wrap justify-start gap-2">
      {filterOptions.map((opt) => (
        <FormControl key={opt.group_id} sx={{ minWidth: 180 }} size="small">
          <Select
            id={`filter-${opt.group_id}`}
            value={filter[opt.group_id]}
            defaultValue="0"
            onChange={e => handleFilterChange(opt.group_id, e.target.value)}
          >
            <MenuItem value="0">{`All ${opt.group_label}`}</MenuItem>
            {opt.items.map((svc) => (
              <MenuItem key={svc.item_id} value={svc.item_id}>{svc.item_label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </div>
  );
}

export default Filter;
