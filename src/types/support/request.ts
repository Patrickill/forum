export type PagingData<T> = {
  pageNum: number;
  pageSize: number;
  list: T[];
  total?: number;
};

export type RequestPaging = { pageNum: number; pageSize: number };

export type PaginationProps<T = {}> = T & {
  pageNum: number;
  pageSize: number;
};
export type PaginationResponse<T = any> = {
  total: number;
  list: T[];
};
