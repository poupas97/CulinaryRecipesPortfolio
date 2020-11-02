-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02-Nov-2020 às 23:32
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

-- --------------------------------------------------------

--
-- Estrutura da tabela `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `recipes_ingredients`
--

CREATE TABLE `recipes_ingredients` (
  `id` int(11) NOT NULL,
  `id_recipe` int(11) NOT NULL,
  `id_ingredient` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(300) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `accessToken` varchar(300) NOT NULL,
  `refreshToken` varchar(400) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `accessToken`, `refreshToken`, `active`) VALUES
(39, 'admin', '$2b$10$OwE92x7252nXwgyBIOzrAu20wD1VAD21huex.OdMbnDzX/e7otjjG', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQxMCRPd0U5Mng3MjUyblh3Z3lCSU96ckF1MjB3RDFWQUQyMWh1ZXguT2RNYm5EelgvZTdvdGpqRyIsIm5hbWUiOm51bGwsImlhdCI6MTYwNDM1NTE4NywiZXhwIjoxNjA0MzU2OTg3fQ.PZot67T5GgSI6RDun6GTbryQMecrmjpEd2Qh_HU1zJk', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQxMCRPd0U5Mng3MjUyblh3Z3lCSU96ckF1MjB3RDFWQUQyMWh1ZXguT2RNYm5EelgvZTdvdGpqRyIsIm5hbWUiOm51bGwsImlhdCI6MTYwNDM1NTE4NywiZXhwIjoxNjA0MzYyMzg3fQ._MvXLELrJRNx6xdU5LV0BY1MhNDtsQJKpYp3x9fUGHE', 1),
(40, 'test', '$2b$10$ql5s6vvOUSRi9np8aVbX2eYaymxuvk5KoaBEVl2RFxdKeARsw4Id.', NULL, '', '', 1),
(41, 'test2', '$2b$10$BgDo7V.e3kN4EKSJfLmcJOpvM3ohPLKwvJnv2fwAGXy7.r0S8G.fy', NULL, '', '', 1),
(43, 'test3', '$2b$10$j4L.SjyINFAUemD5hNNW9.UoRIR.2wazRlWHLibFoOFl8iKFJI5UC', NULL, '', '', 1),
(44, 'test4', '$2b$10$TvnB7OkTzs2IRni7oJHzpegaP9N2nmYuTV.vMvXjtiEegwJb6IhS.', NULL, '', '', 1),
(46, 'test5', '$2b$10$kzWxEYub9i.wW.CV1L7OP.bmSRLx0l.kJuq6OlvDjd933EqkIvu4C', NULL, '', '', 0);

--
-- Índices para tabelas despejadas
--

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Índices para tabela `recipes_ingredients`
--
ALTER TABLE `recipes_ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_recipe` (`id_recipe`),
  ADD KEY `id_ingredient` (`id_ingredient`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_username` (`username`) USING BTREE;

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `favorits`
--
ALTER TABLE `favorits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `recipes_ingredients`
--
ALTER TABLE `recipes_ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `favorits`
--
ALTER TABLE `favorits`
  ADD CONSTRAINT `favorits_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorits_ibfk_2` FOREIGN KEY (`id_recipes`) REFERENCES `recipes` (`id`);

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
