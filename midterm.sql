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

--Insert 5 movies into movies table 
INSERT INTO Movies (title, year, genre, director) VALUES
('The Matrix', 1999, 'Sci-Fi', 'Lana Wachowski and Lilly Wachowski'),
('The Godfather', 1972, 'Crime', 'Francis Ford Coppola'),
('Titanic', 1997, 'Romance', 'James Cameron'),
('The Dark Knight', 2008, 'Action', 'Christopher Nolan'),
('Forrest Gump', 1994, 'Drama', 'Robert Zemeckis');

--Insert 5 customers into customers table
INSERT INTO Customers (firstname, lastname, email, phonenumber) VALUES
('John', 'Doe', 'john.doe@example.com', '709-456-7890'),
('Jane', 'Smith', 'jane.smith@example.com', '709-567-8901'),
('Alice', 'Johnson', 'alice.johnson@example.com', '709-678-9012'),
('Bob', 'Brown', 'bob.brown@example.com', '709-789-0123'),
('Charlie', 'Davis', 'charlie.davis@example.com', '709-890-1234');

-- Insert 10 rentals into rentals table
INSERT INTO rentals (customer_id, movie_id, rental_date, return_date) VALUES 
(1, 1, '2024-01-02', '2024-01-08'),
(1, 2, '2024-03-02', '2024-03-08'),
(2, 3, '2024-05-04', '2024-05-10'),
(2, 5, '2024-10-10', NULL), -- not returned
(3, 4, '2024-10-01', '2024-10-08'),
(3, 1, '2024-06-20', '2024-06-28'),
(4, 5, '2024-10-02', NULL), -- not returned
(4, 2, '2024-08-02', '2024-08-08'),
(5, 1, '2024-10-05', NULL), --not returned
(5, 5, '2024-04-02', '2024-04-08')