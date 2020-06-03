create table Rubbish (
	Id int not null Identity(1,1) Primary Key,
	[Name] varchar(100) not null,
	[Description] varchar(100) not null,
	CategoryId int not null,
	IsAvailable bit not null,
	UserId int not null,
	Price dec not null
)

Insert into Rubbish([Name], [Description], CategoryId, IsAvailable, UserId, Price)
Values('Flamed-Out Hawaiian Shirt', 'This hot shirt screams flavortown; it even has a stain or 2 on it.', 2, 1, 1, 45.99),
	  ('Basketball Hoop', 'This hoop was broken after being dunked on by the GOAT. What more could you want?', 7, 1, 2, 99.99),
	  ('67 El Camino', 'This pretty lady has plenty of miles on her and could use a new radiator.', 5, 1, 3, 24567.22),
	  ('94 Mac', 'This Computer is integral to the history of Mac as a prototype. Needs a new graphics card.', 3, 1, 4, 129.99),
	  ('Vintage Weight Bench', 'MJ trained on this bench before winning 6 NBA championships. Has a tear or 2 in the leather.', 1, 1, 2, 85.49)


create table [User] (
	Id int not null Identity(1,1) Primary Key,
	FirstName varchar(100) not null,
	LastName varchar(100) not null,
	[Type] varchar(100) not null,
	DateCreated date not null,
	StreetAddress varchar(100) not null,
	City varchar(100) not null,
	[State] varchar(100) not null,
	Zip int not null,
)

Insert into [User](FirstName, LastName, [Type], DateCreated, StreetAddress, City, [State], Zip)
Values('Guy','Fieri', 'Seller', '2020-05-19', '1234 Tasty Way', 'Flavortown', 'TN', 34567),
	  ('Michael', 'Jordan', 'Seller', '2020-04-02', '2323 Ballers Court', 'Chicago', 'IL', 23623),
	  ('Dale', 'Earnhard', 'BuyerAndSeller', '2020-05-01', '1649 Racers Lane', 'Daytona', 'FL', 34585),
	  ('Steve', 'Wozniak', 'BuyerAndSeller', '2020-04-15', '6576 Innovation Court', 'San Francisco', 'CA', 23859),
	  ('Arnold', 'Schwarzenegger', 'Buyer', '2020-03-03', '1234 Terminator Circle', 'Los Angeles', 'CA', 65987)

create table Category (
	Id int not null Identity(1,1) Primary Key,
	[Name] varchar(100) not null
)

Insert into Category([Name])
	Values('Furniture'),
		  ('Clothing'),
		  ('Electronics'),
		  ('Appliances'),
		  ('Cars'),
		  ('Pallets'),
		  ('Sporting Goods')	

create table [Order] (
	Id int not null Identity(1,1) Primary Key,
	UserId int not null,
	PaymentId int not null,
	IsComplete bit not null
)

Insert into [Order](UserId, PaymentId, IsComplete)
Values(3, 1, 0),
	  (4, 2, 1),
	  (5, 3, 0)

Create table PaymentType (
	Id int not null Identity(1,1) Primary Key,
	UserId int not null,
	PaymentType varchar(100) not null,
	AccountNo int not null
)

Insert into PaymentType(UserId, PaymentType, AccountNo)
Values(3,'Paypal', 65934006),
	  (4, 'Visa', 429588498),
	  (5, 'Mastercard', 30294583)

create table LineItem (
	Id int not null Identity(1,1) Primary Key,
	OrderId int not null,
	RubbishId int not null
)

Insert into LineItem(OrderId, RubbishId)
Values( 2, 1),
	  ( 1, 4),
	  ( 3, 3)

select * from Rubbish
select * from [User]
select * from Category
select * from [Order]
select * from PaymentType
select * from LineItem