-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 16-Jan-2021 às 01:25
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
  `description` varchar(200) NOT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `authors`
--

INSERT INTO `authors` (`id`, `name`, `description`, `active`) VALUES
(2, 'aaaaww', 'testwww', 1),
(3, 'novo', 'novo\\', 1),
(4, 'Rúben Carreira', 'nvo', 1),
(5, 'novo autorw', 'novo autor decricaoq', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `favorits`
--

CREATE TABLE `favorits` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_recipes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`, `description`, `active`) VALUES
(5, 'ovos', 'ovos descricao22', 1),
(8, 'chefe sa pessoa', 'chefe sa pessoa descricao', 1),
(9, 'novo', 'novwwwww', 1),
(10, 'novo ingrediente2', 'movo ingrediente escricao2', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `id_user` int(11) NOT NULL,
  `id_recipe_type` int(11) NOT NULL,
  `id_author` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `recipes`
--

INSERT INTO `recipes` (`id`, `name`, `description`, `active`, `id_user`, `id_recipe_type`, `id_author`) VALUES
(4, 'teste', 'test descricao', 1, 54, 1, 2),
(24, 'Rúben Carreira', 'nvo', 1, 54, 1, 2),
(27, 'Rúben Carreira', 'nvo', 1, 54, 1, 2),
(28, 'Rúben Carreira', 'nvo', 1, 54, 1, 2),
(29, 'Rúben Carreira', 'nvo', 1, 54, 1, 2),
(30, 'ricardo', 'novo 2', 1, 54, 4, 4),
(31, 'my-home', 'novwwww', 1, 54, 1, 2),
(32, 'poupas97', 'novwwww', 1, 54, 1, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `recipes_ingredients`
--

CREATE TABLE `recipes_ingredients` (
  `id` int(11) NOT NULL,
  `id_recipe` int(11) NOT NULL,
  `id_ingredient` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `recipes_ingredients`
--

INSERT INTO `recipes_ingredients` (`id`, `id_recipe`, `id_ingredient`) VALUES
(1, 31, 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `recipe_types`
--

CREATE TABLE `recipe_types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `recipe_types`
--

INSERT INTO `recipe_types` (`id`, `name`, `description`, `active`) VALUES
(1, 'pastelaria2222', 'pastelaria descricao', 0),
(4, 'cozinha chinesa', 'cozinha chinesa descricao', 1),
(5, 'novo', 'nvo', 1),
(6, 'nvo ', 'novo 2', 1),
(7, 'ricardo', 'nvo', 1),
(8, 'novo tipo de receita2', 'novo tipo de receita des2cricao', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(300) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `access_token` varchar(300) DEFAULT NULL,
  `refresh_token` varchar(400) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `access_token`, `refresh_token`, `active`) VALUES
(54, 'admin', '$2b$10$AMF6TFiWio4Xx44/F7LSb.1TvXnQ/rKEWkLKs5ZG90tFORktPJ3xO', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInVzZXJuYW1lIjoiYWRtaW4iLCJuYW1lIjpudWxsLCJpYXQiOjE2MTA3NTM2MTIsImV4cCI6MTYxMDc1NzIxMn0.8rSutX2puNDn2llpooeb-6ejIjAPOGhAQnn21EH_vL4', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQsInVzZXJuYW1lIjoiYWRtaW4iLCJuYW1lIjpudWxsLCJpYXQiOjE2MTA3NTM2MTIsImV4cCI6MTYxMDc2NDQxMn0.uvqfHKVJ8pYlsfUearNq1EWYmGVFDBTfbKYAW5ZGdLk', 1),
(56, 'ruben', '$2b$10$ni83nueHKvpI.GXaFFKjeuPrr7toJGHhLHHeKHv4c65b.19uG10Gu', NULL, NULL, NULL, 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `favorits`
--
ALTER TABLE `favorits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_recipes` (`id_recipes`);

--
-- Índices para tabela `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Índices para tabela `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `recipes_ingredients`
--
ALTER TABLE `recipes_ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipes_ingredients_ibfk_1` (`id_recipe`),
  ADD KEY `recipes_ingredients_ibfk_2` (`id_ingredient`);

--
-- Índices para tabela `recipe_types`
--
ALTER TABLE `recipe_types`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `favorits`
--
ALTER TABLE `favorits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de tabela `recipes_ingredients`
--
ALTER TABLE `recipes_ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `recipe_types`
--
ALTER TABLE `recipe_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `favorits`
--
ALTER TABLE `favorits`
  ADD CONSTRAINT `favorits_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorits_ibfk_2` FOREIGN KEY (`id_recipes`) REFERENCES `recipes` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `recipes_ingredients`
--
ALTER TABLE `recipes_ingredients`
  ADD CONSTRAINT `recipes_ingredients_ibfk_1` FOREIGN KEY (`id_recipe`) REFERENCES `recipes` (`id`),
  ADD CONSTRAINT `recipes_ingredients_ibfk_2` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredients` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
