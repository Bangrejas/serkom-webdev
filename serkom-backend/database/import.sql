-- Active: 1698086516727@@127.0.0.1@3306@serkom

CREATE DATABASE serkom;
USE serkom;

-- CREATE USER 'eja'@'localhost' IDENTIFIED BY '123456';
-- GRANT ALL PRIVILEGES ON serkom.* TO 'eja'@'localhost';
-- FLUSH PRIVILEGES;


-- Buat tabel
CREATE TABLE pendaftaran (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    semester INT,
    ipk DECIMAL(4,2),
    scholarship VARCHAR(255),
    document VARCHAR(255)
);

-- Tambah dummy data
INSERT INTO pendaftaran (name, email, phone, semester, ipk, scholarship, document) VALUES
('Budi Santoso', 'budi.santoso@example.com', '081234567890', 3, 3.75, 'Prestasi', 'document.pdf'),
('Dewi Lestari', 'dewi.lestari@example.com', '082345678901', 5, 3.90, 'Akademik', 'document.pdf'),
('Eko Prasetyo', 'eko.prasetyo@example.com', '083456789012', 2, 3.20, NULL, 'document.pdf'),
('Fajar Nugroho', 'fajar.nugroho@example.com', '084567890123', 4, 3.50, 'Prestasi', 'document.pdf'),
('Gita Permata', 'gita.permata@example.com', '085678901234', 6, 3.80, 'Akademik', 'document.pdf');

-- Lihat data
SELECT * FROM pendaftaran;