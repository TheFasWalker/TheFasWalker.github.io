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