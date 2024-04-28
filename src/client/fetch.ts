import { URL } from "./config";



export const fetchData = <T = Response>(input: string, init?: RequestInit): Promise<T> =>
    fetch(`${URL}${input}`, init).then(async (res) => {
        console.log('Обращение сюда  => ' + `${URL}${input}`)
            if (res.status == 200)return res.json();
            return Promise.reject(await res.json())
        })