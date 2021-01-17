-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17-Jan-2021 às 23:12
-- Versão do servidor: 10.4.14-MariaDB
-- versão do PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `culinary_recipes_portfolio`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `authors`
--

INSERT INTO `authors` (`id`, `name`, `description`, `active`, `created`, `modified`) VALUES
(1, 'Sá Pessoa', 'descricao de sa pessoa', 1, '2021-01-17 22:10:46', '2021-01-17 22:10:46');

-- --------------------------------------------------------

--
-- Estrutura da tabela `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_recipe` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `favorites`
--

INSERT INTO `favorites` (`id`, `id_user`, `id_recipe`, `active`, `created`, `modified`) VALUES
(2, 1, 1, 1, '2021-01-17 22:12:46', '2021-01-17 22:12:46');

-- --------------------------------------------------------

--
-- Estrutura da tabela `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`, `description`, `active`, `created`, `modified`) VALUES
(1, 'Ovos', 'descricao de ovos', 1, '2021-01-17 22:11:10', '2021-01-17 22:11:10');

-- --------------------------------------------------------

--
-- Estrutura da tabela `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `id_recipe_type` int(11) NOT NULL,
  `id_author` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `recipes`
--

INSERT INTO `recipes` (`id`, `name`, `description`, `id_user`, `id_recipe_type`, `id_author`, `created`, `modified`, `active`) VALUES
(1, 'Pastel', 'pastel de belem', 1, 1, 1, '2021-01-17 22:11:49', '2021-01-17 22:11:49', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `recipes_ingredients`
--

CREATE TABLE `recipes_ingredients` (
  `id` int(11) NOT NULL,
  `id_ingredient` int(11) NOT NULL,
  `id_recipe` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `recipes_ingredients`
--

INSERT INTO `recipes_ingredients` (`id`, `id_ingredient`, `id_recipe`, `active`, `created`, `modified`) VALUES
(1, 1, 1, 1, '2021-01-17 22:11:49', '2021-01-17 22:11:49');

-- --------------------------------------------------------

--
-- Estrutura da tabela `recipe_types`
--

CREATE TABLE `recipe_types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `recipe_types`
--

INSERT INTO `recipe_types` (`id`, `name`, `description`, `active`, `created`, `modified`) VALUES
(1, 'Cozinha', 'descricao de cozinha', 1, '2021-01-17 22:11:25', '2021-01-17 22:11:25');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `access_token` varchar(400) DEFAULT NULL,
  `refresh_token` varchar(400) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `access_token`, `refresh_token`, `active`, `created`, `modified`) VALUES
(1, 'admin', '$2b$10$AMF6TFiWio4Xx44/F7LSb.1TvXnQ/rKEWkLKs5ZG90tFORktPJ3xO', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsIm5hbWUiOm51bGwsImlhdCI6MTYxMDkyMTQzMiwiZXhwIjoxNjEwOTI1MDMyfQ.KzYrQn2nhgtd6WbUQRMM5SYn8URCq-obWgj89rh0r_w', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsIm5hbWUiOm51bGwsImlhdCI6MTYxMDkyMTQzMiwiZXhwIjoxNjEwOTMyMjMyfQ.GBLZApP4dokW__yLEuZUB75GD93C_878eiWEjti7hwo', 1, '2021-01-17 22:09:00', '2021-01-17 22:09:00');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `recipes_ingredients`
--
ALTER TABLE `recipes_ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `recipe_types`
--
ALTER TABLE `recipe_types`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `recipes_ingredients`
--
ALTER TABLE `recipes_ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `recipe_types`
--
ALTER TABLE `recipe_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
