import { fetchData } from "./fetch";

export type SignUpBody = {
    email: string;
    password: string;
    commandId?:string
};
export type AuthResult = {
    token: string;
};
  export type Params = {
    name: string;
    desc?: string;
    amount: number;
    date: string; // дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    type: 'Profit' | 'Cost';
    categoryId: string;
    id: string;
  };
export type fetchDataFromServer  = {
    data: Array<Params>;
    pagination: {
      pageSize: number;
      pageNumber: number;
      total: number;
    };
    sorting: {
      type: 'ASC' | 'DESC';
      field: 'id' | 'createdAt' | 'updatedAt' | 'name';
    }
}
  export type Filters = {
    name?: string;
    ids?: string[];
    pagination?: {
      pageSize?: number;
      pageNumber?: number;
    };
    createdAt?: {
      gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
      lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    }
    updatedAt?: {
      gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
      lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    }
    sorting?: {
      type: 'ASC' | 'DESC';
      field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
    };
  };

export type CategoryItem = {
  id: string,
  name: string,
  photo?: string,
  createdAt: string,
  updatedAt:string
  }

  export interface fetchCategoriesFromServer {
    data: Array<CategoryItem>;
    pagination: {
      pageSize: number;
      pageNumber: number;
      total: number;
    };
    sorting: {
      type: 'ASC' | 'DESC';
      field: 'id' | 'createdAt' | 'updatedAt' | 'name';
    }
  }

