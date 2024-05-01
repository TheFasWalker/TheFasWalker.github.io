export const  generateComandId =(length:number):string => {
    let result = '';
    const hexChars = '0123456789ABCDEF';

    for (let i = 0; i < length; i++) {
      result += hexChars[Math.floor(Math.random() * hexChars.length)];
    }

    return result;
  }