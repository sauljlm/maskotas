const generatePassword = () => {
  let caracteres = "Aa0BbCc1DdEe2FfGgHh3IiJj4KkLl5MmNn6OoPp7QqRr8SsTt9UuVv*WwXxYyZz$";
  let clave = '';
  let number = null;

  for(let i = 0; i <= 11; i++) {
      number = getNumber( 0, caracteres.length );
      clave += caracteres.substring( number, number + 1 );
  }
  return clave;
}

const getNumber = (min,max) => {
  return Math.floor( Math.random() * ( max - min ) ) + min;
}
