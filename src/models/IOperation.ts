export interface IOperation {
  data: Operation[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
  };
}

export interface Operation {
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
type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  photo?: string;
};

export interface OperationCreate {
  name: string;
  desc?: string;
  amount: number;
  date: string; // дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  type: string;
  categoryId: string;
}
