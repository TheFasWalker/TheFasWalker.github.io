/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Нужно создать тип Category, он будет использоваться ниже.
 * Категория содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка, необязательно)
 *
 * Продукт (Product) содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - oldPrice (число, необязательно)
 * - price (число)
 * - category (Категория)
 *
 **/
type Category = {
    id: string,
    name: string,
    photo?:string
}
type Product = {
    id: string,
    name: string,
    photo: string,
    desc?: string,
    createdAt: string,
    oldPrice: string,
    price: number,
    category: Category
}

/**
 * Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit)
 *
 * Трата (Cost) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Cost')
 *
 * Доход (Profit) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Profit')
 * */
type Operation = Cost | Profit

type Profit = {
    id: string,
    name: string,
    desc?: string,
    createdAt: string,
    amount: number,
    category: Category,
    type: Profit
}
type Cost = {
    id: string,
    name: string,
    desc?: string,
    createdAt: string,
    amount: number,
    category: Category,
    type: Cost
}
/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
// export const createRandomProduct = (createdAt: string) => {};
export const createRandomProduct = (createdAt: string) :Product => {
    const id = Math.floor(Math.random() * 100 + 1).toString();
    const name = 'RandomProduct';
    const photo = 'https://media.istockphoto.com/id/1283712032/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BA%D0%B0%D1%80%D1%82%D0%BE%D0%BD%D0%BD%D0%B0%D1%8F-%D0%BA%D0%BE%D1%80%D0%BE%D0%B1%D0%BA%D0%B0-%D0%BD%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F-%D0%BD%D0%B5-%D1%81%D0%BA%D0%BE%D1%80%D0%BE%D0%BF%D0%BE%D1%80%D1%82%D1%8F%D1%89%D0%B8%D0%BC%D0%B8%D1%81%D1%8F-%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%B0%D0%BC%D0%B8-%D0%BD%D0%B0-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D1%8F%D0%BD%D0%BD%D0%BE%D0%BC-%D1%81%D1%82%D0%BE%D0%BB%D0%B5-%D0%B2%D0%B8%D0%B4-%D0%BF%D0%BE%D0%B4.jpg?s=2048x2048&w=is&k=20&c=6V9Huxz_riBsdJmZy7PPhZ-X71cFU2P7U18cIi0s_c8=';
    const price = 100500;
    const desc = 'description for random product';
    const oldPrice = (Number(price) - 10504).toString();
    const category: Category = {
        id: "001",
        name: "Category for random product",
    };
    return {
        id,
        name,
        photo,
        createdAt,
        price,
        category,
        desc,
        oldPrice
    }


};
/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
    let randomOperationIndex = Math.floor(Math.random() * 100 % 2)
    let id;
    let name;
    let amount ;
    let type;
    let categoryName;

    if (randomOperationIndex == 0) {
        id = '001';
        name = "Покупка";
        amount = 12
        categoryName = "Products"
    } else {
        id = '002';
        name = 'Продажа';
        amount = 123;
        categoryName = 'Not Products'
    }
    const category: Category = {
        id: id,
        name: 'categoryName'
    }

    return {
        id,
        name,
        createdAt,
        amount,
        category,
        type
    }

}
