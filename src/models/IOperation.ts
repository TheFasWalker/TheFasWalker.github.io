export interface IOperation {
    data: Datum[];
    sorting: Sorting;
    pagination: Pagination;
  }
  interface Pagination {
    pageSize: number;
    pageNumber: number;
    total: number;
  }
  interface Sorting {
    type: string;
    field: string;
  }
  interface Datum {
    id: string;
    name: string;
    desc?: string;
    date?: string;
    createdAt: string;
    updatedAt: string;
    type: string;
    amount: number;
    category?: Category;
  }
  interface Category {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    photo?: string;
  }
