export const getCookie = (name:string) => {
    let cookies = document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return cookies ? cookies.split('=')[1]:null
}