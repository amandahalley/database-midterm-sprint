-- CREATING TABLES

--Movies Table
CREATE TABLE Movies (
    Movie_ID SERIAL PRIMARY KEY,
    Title TEXT NOT NULL,
    Year INT,
    Genre TEXT NOT NULL,
    Director TEXT NOT NULL
   );

--Customerse Table
CREATE TABLE Customers (
    Customer_ID SERIAL PRIMARY KEY,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT UNIQUE NOT NULL,
    PhoneNumber VARCHAR(15)
    );

--Rentals Table
CREATE TABLE Rentals (
    Rental_ID SERIAL PRIMARY KEY,
    Customer_ID INT NOT NULL,
    Movie_ID INT NOT NULL,
    Rental_Date DATE NOT NULL,
    Return_Date DATE,
    FOREIGN KEY (Customer_ID) REFERENCES Customers(Customer_ID), -- link customers table using foreign key
    FOREIGN KEY (Movie_ID) REFERENCES Movies(Movie_ID) -- link movies table using foreign key
    );


-- INSERT DATA INTO TABLES

