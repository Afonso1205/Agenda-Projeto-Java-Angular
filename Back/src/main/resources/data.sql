INSERT INTO CATEGORIES (name, color)
VALUES 
('Familia', 'bg-red-900'),
('Amigos', 'bg-green-900'),
('Trabalho', 'bg-blue-900'),
('Faculdade', 'bg-yellow-900'),
('Futebol', 'bg-purple-900'),
('Academia', 'bg-indigo-900');

INSERT INTO ADDRESSES (STREET, CITY, STATE, ZIP, COUNTRY) VALUES
('Rua 1', 'Sao Paulo', 'SP', '12345-678', 'Brasil'),
('Rua 2', 'Sao Paulo', 'SP', '12345-678', 'Brasil'),
('Rua 3', 'Sao Paulo', 'SP', '12345-678', 'Brasil'),
('Rua 4', 'Sao Paulo', 'SP', '12345-678', 'Brasil'),
('Rua 5', 'Sao Paulo', 'SP', '12345-678', 'Brasil'),
('Rua 6', 'Sao Paulo', 'SP', '12345-678', 'Brasil'),
('Rua 7', 'Sao Paulo', 'SP', '12345-678', 'Brasil'),
('Rua 8', 'Sao Paulo', 'SP', '12345-678', 'Brasil'),
('Rua 9', 'Sao Paulo', 'SP', '12345-678', 'Brasil'),
('Rua 10', 'Sao Paulo', 'SP', '12345-678', 'Brasil');

INSERT INTO CONTACTS (NAME, PHONE, EMAIL, BIRTHDATE, IMAGE, THEME, INITIAL)
VALUES 
('Amauri', '(11) 97203230', 'malmas@gmail', '1997-10-15', 'https://randomuser.me/api/portraits/men/1.jpg', 'bg-blue-900', 'A'),
('Joana', '(11) 987654321', 'joana@example.com', '1995-08-20', 'https://randomuser.me/api/portraits/women/2.jpg', 'bg-green-900', 'J'),
('Pedro', '(11) 912345678', 'pedro@example.com', '1990-04-03', 'https://randomuser.me/api/portraits/men/3.jpg', 'bg-red-900', 'P'),
('Mariana', '(11) 923456789', 'mariana@example.com', '1988-12-12', 'https://randomuser.me/api/portraits/women/4.jpg', 'bg-yellow-900', 'M'),
('Rafael', '(11) 934567890', 'rafael@example.com', '1987-06-25', 'https://randomuser.me/api/portraits/men/5.jpg', 'bg-purple-900', 'R'),
('Carla', '(11) 945678901', 'carla@example.com', '1985-09-30', 'https://randomuser.me/api/portraits/women/6.jpg', 'bg-indigo-900', 'C'),
('Lucas', '(11) 956789012', 'lucas@example.com', '1983-11-18', 'https://randomuser.me/api/portraits/men/7.jpg', 'bg-blue-900', 'L'),
('Isabela', '(11) 967890123', 'isabela@example.com', '1981-03-07', 'https://randomuser.me/api/portraits/women/8.jpg', 'bg-green-900', 'I'),
('Rodrigo', '(11) 978901234', 'rodrigo@example.com', '1979-07-14', 'https://randomuser.me/api/portraits/men/9.jpg', 'bg-red-900', 'R'),
('Juliana', '(11) 989012345', 'juliana@example.com', '1976-10-01', 'https://randomuser.me/api/portraits/women/10.jpg', 'bg-yellow-900', 'J'),
('Paulo', '(11) 900123456', 'paulo@example.com', '1974-04-22', 'https://randomuser.me/api/portraits/men/11.jpg', 'bg-purple-900', 'P'),
('Camila', '(11) 911234567', 'camila@example.com', '1972-08-09', 'https://randomuser.me/api/portraits/women/12.jpg', 'bg-indigo-900', 'C'),
('Gustavo', '(11) 922345678', 'gustavo@example.com', '1970-12-17', 'https://randomuser.me/api/portraits/men/13.jpg', 'bg-blue-900', 'G'),
('Fernanda', '(11) 933456789', 'fernanda@example.com', '1968-02-24', 'https://randomuser.me/api/portraits/women/14.jpg', 'bg-green-900', 'F'),
('Andre', '(11) 944567890', 'andre@example.com', '1965-05-11', 'https://randomuser.me/api/portraits/men/15.jpg', 'bg-red-900', 'A'),
('Patricia', '(11) 955678901', 'patricia@example.com', '1963-09-28', 'https://randomuser.me/api/portraits/women/16.jpg', 'bg-yellow-900', 'P'),
('Marcos', '(11) 966789012', 'marcos@example.com', '1960-11-05', 'https://randomuser.me/api/portraits/men/17.jpg', 'bg-purple-900', 'M'),
('Renata', '(11) 977890123', 'renata@example.com', '1958-03-12', 'https://randomuser.me/api/portraits/women/18.jpg', 'bg-indigo-900', 'R'),
('Fabio', '(11) 988901234', 'fabio@example.com', '1955-07-29', 'https://randomuser.me/api/portraits/men/19.jpg', 'bg-blue-900', 'F'),
('Simone', '(11) 900123456', 'simone@example.com', '1953-12-06', 'https://randomuser.me/api/portraits/women/20.jpg', 'bg-green-900', 'S');


INSERT INTO CONTACTS_CATEGORIES (CONTACT_ID, CATEGORY_ID) VALUES
(1, 1), (1, 2),
(2, 2), (2, 3),
(3, 1), (3, 4),
(4, 4), (4, 5),
(5, 3), (5, 6),
(6, 1), (6, 6),
(7, 2), (7, 3),
(8, 4), (8, 5),
(9, 3), (9, 6),
(10, 1), (10, 2),
(11, 2), (11, 3),
(12, 4), (12, 5),
(13, 1), (13, 6),
(14, 2), (14, 4),
(15, 1), (15, 5),
(16, 3), (16, 6),
(17, 2), (17, 4),
(18, 1), (18, 5),
(19, 3), (19, 6),
(20, 2), (20, 4);

INSERT INTO CONTACTS_ADDRESSES (CONTACT_ID, ADDRESS_ID) VALUES
(1, 1), (1, 9),
(2, 2), (2, 8),
(3, 3), (3, 7),
(4, 4), (4, 6),
(5, 5), (5, 10),
(6, 6), (6, 1),
(7, 7), (7, 2),
(8, 8), (8, 3),
(9, 9), (9, 4),
(10, 10), (10, 5),
(11, 1), (11, 6),
(12, 2), (12, 7),
(13, 3), (13, 8),
(14, 4), (14, 9),
(15, 5), (15, 10),
(16, 6), (16, 1),
(17, 7), (17, 2),
(18, 8), (18, 3),
(19, 9), (19, 4),
(20, 10), (20, 5);