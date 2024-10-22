const { Pool } = require('pg');

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres', //This _should_ be your username, as it's the default one Postgres uses
  host: 'localhost',
  database: 'midterm-sprint', //This should be changed to reflect your actual database
  password: 'password', //This should be changed to reflect the password you used when setting up Postgres
  port: 5432,
});

/**
 * Creates the database tables, if they do not already exist.
 */
async function createTable() {
  // TODO: Add code to create Movies, Customers, and Rentals tables

  //create movies table
  await pool.query (`
    CREATE TABLE IF NOT EXISTS Movies (
    Movie_ID SERIAL PRIMARY KEY,
    Title TEXT NOT NULL,
    Year INT,
    Genre TEXT NOT NULL,
    Director TEXT NOT NULL
   ) `)
  
  //create customers table
  await pool.query (`
    CREATE TABLE IF NOT EXISTS Customers (
    Customer_ID SERIAL PRIMARY KEY,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT UNIQUE NOT NULL,
    PhoneNumber VARCHAR(15)
    )`
  )

  //create rentals table using foreign keys to link customers table and movies table
  await pool.query (`
    CREATE TABLE IF NOT EXISTS Rentals (
    Rental_ID SERIAL PRIMARY KEY,
    Customer_ID INT NOT NULL,
    Movie_ID INT NOT NULL,
    Rental_Date DATE NOT NULL,
    Return_Date DATE,
    FOREIGN KEY (Customer_ID) REFERENCES Customers(Customer_ID),
    FOREIGN KEY (Movie_ID) REFERENCES Movies(Movie_ID)
    )`)
};

/**
 * Inserts a new movie into the Movies table.
 * 
 * @param {string} title Title of the movie
 * @param {number} year Year the movie was released
 * @param {string} genre Genre of the movie
 * @param {string} director Director of the movie
 */
async function insertMovie(title, year, genre, director) {
  // TODO: Add code to insert a new movie into the Movies table
  await pool.query (`
    INSERT INTO movies (title, year, genre, director) VALUES ($1, $2, $3, $4)`,
  [title, year, genre, director]
);
  console.log(`Movie successfully added to the database: ${Title} Directed by: ${director}`)
};

/**
 * Prints all movies in the database to the console
 */
async function displayMovies() {
  // TODO: Add code to retrieve and print all movies from the Movies table
  const response = await pool.query('SELECT * FROM movies');

  console.log();
  console.log('                      Movies')
  console.log('--------------------------------------------------')

  response.rows.forEach((row) => {
    console.log(`${row.movie_id}: ${row.title} , Directed by: ${row.director}]`)
  });
};

/**
 * Updates a customer's email address.
 * 
 * @param {number} customer_id ID of the customer
 * @param {string} newEmail New email address of the customer
 */
async function updateCustomerEmail(customer_id, newEmail) {
  // TODO: Add code to update a customer's email address
  const query = `UPDATE customers SET email = $1 WHERE customer_id = $2`;
   const result = await pool.query(query, [newEmail, customer_id]);
   console.log(`Email successfully update for customer ID ${customer_id} TO ${newEmail}`, result.rowCount);
};

/**
 * Removes a customer from the database along with their rental history.
 * 
 * @param {number} customerId ID of the customer to remove
 */
async function removeCustomer(customerId) {
  // TODO: Add code to remove a customer and their rental history
};

/**
 * Prints a help message to the console
 */
function printHelp() {
  console.log('Usage:');
  console.log('  insert <title> <year> <genre> <director> - Insert a movie');
  console.log('  show - Show all movies');
  console.log('  update <customer_id> <new_email> - Update a customer\'s email');
  console.log('  remove <customer_id> - Remove a customer from the database');
}

/**
 * Runs our CLI app to manage the movie rentals database
 */
async function runCLI() {
  await createTable();

  const args = process.argv.slice(2);
  switch (args[0]) {
    case 'insert':
      if (args.length !== 5) {
        printHelp();
        return;
      }
      await insertMovie(args[1], parseInt(args[2]), args[3], args[4]);
      break;
    case 'show':
      await displayMovies();
      break;
    case 'update':
      if (args.length !== 3) {
        printHelp();
        return;
      }
      await updateCustomerEmail(parseInt(args[1]), args[2]);
      break;
    case 'remove':
      if (args.length !== 2) {
        printHelp();
        return;
      }
      await removeCustomer(parseInt(args[1]));
      break;
    default:
      printHelp();
      break;
  }
};

runCLI();
