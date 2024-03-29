import { FormControl, MenuItem, Select } from "@mui/material";
import { UseGroupFilterInterface } from "usecase/useGroupFilter";

interface Props extends Pick<UseGroupFilterInterface, 'filter' | 'filterOptions' | 'handleFilterChange'>, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const GroupFilter = ({ children, filter, filterOptions, handleFilterChange, ...otherProps }: Props) => {
  const { className, ...rest } = otherProps;

  return (
    <div className={`flex items-center flex-wrap justify-start gap-2 ${className}`} {...rest}>
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
      {children}
    </div>
  );
}

export default GroupFilter;
