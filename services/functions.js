//insert json data to database
const json = require('./models/customer.json')
// alter json to array values
const values = (users) => {
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const result = [];
  if (users) {

    users.forEach(user => {
      result.push([
        capatalize_word(user.first_name),
        capatalize_word(user.last_name),
        user.email.toLocaleLowerCase(),
        user.address,
        user.postal_code,
        user.phone,
        user.city,
        user.country,
        date
      ])
    });

    return result;
  }
  return
}

const transferJSONData = () => {

  const connection = connectDB()
  const query = 'INSERT INTO user(firstname,lastname,email,address,postal_code,phone,city,country,created_date) VALUES ?';

  connection.query(query, [values(json)], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(`${result.affectedRows} record/s inserted`);
  })
}
// Capitalize every first letter of every word
const capatalize_word = (words) => {
  if (words) {
    // split string 
    const wordsArray = words.toLocaleLowerCase().split(' ');

    const capitalizeArray = wordsArray.map(word => {
      return word[0].toUpperCase().concat(word.slice(1));
    });

    return capitalizeArray.join(' ');
  }
  return
}