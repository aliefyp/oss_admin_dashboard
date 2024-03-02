import { Pagination, PaginationItem, Typography } from "@mui/material";
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

function CustomTablePagination() {
  const { t } = useTranslation();
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <div className="space-y-4 mx-auto py-8">
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        shape="rounded"
        showFirstButton
        showLastButton
        onChange={(_, value) => apiRef.current.setPage(value - 1)}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: FiChevronLeft,
              next: FiChevronRight,
              first: FiChevronsLeft,
              last: FiChevronsRight,
            }}
            {...item}
          />
        )}
      />
      <Typography variant="body2" className="text-gray-600 block text-center">
        {t('pagination', { page: page + 1, total: pageCount })}
      </Typography>
    </div>
  );
}

export default CustomTablePagination;
