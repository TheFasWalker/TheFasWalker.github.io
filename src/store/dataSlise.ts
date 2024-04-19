import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type obj = {
  operationName: string;
  category: string;
  total: string;
  description: string;
  operationId: string;
};
interface T {
  Array: obj;
}

const dataSlice = createSlice({
  name: 'data',
  initialState: [
    {
      operationId: '01',
      total: '100500',
      category: 'мизерные траты',
      operationName: 'First operation',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsam vel qui quae repellat quasi, maxime quos aliquid dicta doloremque laudantium similique perferendis dolores itaque! Molestiae impedit quaerat deserunt nobis non iste perferendis aut velit sapiente molestias ea, corrupti illum dolorem veritatis minima, explicabo mollitia necessitatibus, maiores in doloribus eius quibusdam sunt ipsum. Exercitationem, incidunt praesentium deleniti magni blanditiis tenetur ipsam distinctio voluptatem hic. Optio assumenda numquam ad architecto natus ex aspernatur, earum, facere perspiciatis quidem voluptates fugiat saepe illo sed. Recusandae corporis sint esse sequi cupiditate laboriosam culpa eaque, quod voluptate ut nesciunt eos? Itaque debitis nesciunt accusantium esse!',
      date: '20-10-2020',
    },
    {
      operationId: '02',
      total: '100501',
      category: 'траты',
      operationName: 'SecondOperation',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsam vel qui quae repellat quasi, maxime quos aliquid dicta doloremque laudantium similique perferendis dolores itaque! Molestiae impedit quaerat deserunt nobis non iste perferendis aut velit sapiente molestias ea, corrupti illum dolorem veritatis minima, explicabo mollitia necessitatibus, maiores in doloribus eius quibusdam sunt ipsum. Exercitationem, incidunt praesentium deleniti magni blanditiis tenetur ipsam distinctio voluptatem hic. Optio assumenda numquam ad architecto natus ex aspernatur, earum, facere perspiciatis quidem voluptates fugiat saepe illo sed. Recusandae corporis sint esse sequi cupiditate laboriosam culpa eaque, quod voluptate ut nesciunt eos? Itaque debitis nesciunt accusantium esse!',
      date: '20-10-2020',
    },
    {
      operationId: '03',
      total: '100503',
      category: 'Болшьшие траты',
      operationName: 'third operation',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsam vel qui quae repellat quasi, maxime quos aliquid dicta doloremque laudantium similique perferendis dolores itaque! Molestiae impedit quaerat deserunt nobis non iste perferendis aut velit sapiente molestias ea, corrupti illum dolorem veritatis minima, explicabo mollitia necessitatibus, maiores in doloribus eius quibusdam sunt ipsum. Exercitationem, incidunt praesentium deleniti magni blanditiis tenetur ipsam distinctio voluptatem hic. Optio assumenda numquam ad architecto natus ex aspernatur, earum, facere perspiciatis quidem voluptates fugiat saepe illo sed. Recusandae corporis sint esse sequi cupiditate laboriosam culpa eaque, quod voluptate ut nesciunt eos? Itaque debitis nesciunt accusantium esse!',
      date: '20-10-2020',
    },
    {
      operationId: '04',
      total: '100504',
      category: 'Очень большие траты',
      operationName: 'lastOperation',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsam vel qui quae repellat quasi, maxime quos aliquid dicta doloremque laudantium similique perferendis dolores itaque! Molestiae impedit quaerat deserunt nobis non iste perferendis aut velit sapiente molestias ea, corrupti illum dolorem veritatis minima, explicabo mollitia necessitatibus, maiores in doloribus eius quibusdam sunt ipsum. Exercitationem, incidunt praesentium deleniti magni blanditiis tenetur ipsam distinctio voluptatem hic. Optio assumenda numquam ad architecto natus ex aspernatur, earum, facere perspiciatis quidem voluptates fugiat saepe illo sed. Recusandae corporis sint esse sequi cupiditate laboriosam culpa eaque, quod voluptate ut nesciunt eos? Itaque debitis nesciunt accusantium esse!',
      date: '20-10-2020',
    },
  ],
  reducers: {
    addOperartion: (state, action) => {
      state.push(action.payload);
    },
    removeOperation: (state, action: PayloadAction<{ operationId: string }>) => {
      return state.filter((elem) => elem.operationId !== action.payload.operationId);
    },
    getSingleOperation: (state, action: PayloadAction<{ operationId: string }>) => {
      console.log(state.filter((elem) => elem.operationId === action.payload.operationId));
      console.log(state)
    },
    editOperetion: (state) => {},
  },
});
export const { addOperartion, removeOperation, editOperetion, getSingleOperation } = dataSlice.actions;
export default dataSlice.reducer;
