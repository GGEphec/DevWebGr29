-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  Dim 01 mars 2020 à 16:28
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `ecole`
--
CREATE DATABASE IF NOT EXISTS `ecole` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ecole`;

-- --------------------------------------------------------

--
-- Structure de la table `classes`
--

DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `idClasse` int(11) NOT NULL,
  `annee` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONS POUR LA TABLE `classes`:
--

-- --------------------------------------------------------

--
-- Structure de la table `eleves`
--

DROP TABLE IF EXISTS `eleves`;
CREATE TABLE `eleves` (
  `idEleve` int(11) NOT NULL COMMENT 'L''id de l''élève',
  `nomEleve` varchar(50) NOT NULL COMMENT 'Le nom de l''élève',
  `prenomEleve` varchar(50) NOT NULL COMMENT 'Le prénom de l''élève',
  `naissance` date NOT NULL COMMENT 'La date de naissance de l''élève',
  `nationalité` varchar(25) NOT NULL DEFAULT 'BELGIUM' COMMENT 'La nationalité de l''élève',
  `classeId` int(11) NOT NULL COMMENT 'La classe de l''élève',
  `parent1Id` int(11) NOT NULL COMMENT 'L''id du parent 1',
  `parent2Id` int(11) NOT NULL COMMENT 'L''id du parent 2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONS POUR LA TABLE `eleves`:
--   `classeId`
--       `classes` -> `idClasse`
--   `parent1Id`
--       `parents` -> `idParent`
--   `parent2Id`
--       `parents` -> `idParent`
--

-- --------------------------------------------------------

--
-- Structure de la table `garderie`
--

DROP TABLE IF EXISTS `garderie`;
CREATE TABLE `garderie` (
  `idGarderie` int(11) NOT NULL COMMENT 'L''id de la transaction',
  `eleveId` int(11) NOT NULL COMMENT 'L''id de l''élève arrivant/repartant',
  `date` date NOT NULL DEFAULT current_timestamp() COMMENT 'La date de la transaction',
  `heure` time NOT NULL DEFAULT current_timestamp() COMMENT 'L''heure de la transaction',
  `in/out` varchar(3) NOT NULL COMMENT 'Si l''elève est arrivé/partit'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONS POUR LA TABLE `garderie`:
--   `eleveId`
--       `eleves` -> `idEleve`
--

-- --------------------------------------------------------

--
-- Structure de la table `parents`
--

DROP TABLE IF EXISTS `parents`;
CREATE TABLE `parents` (
  `idParent` int(11) NOT NULL COMMENT 'L''id du parent',
  `nomParent` varchar(50) NOT NULL COMMENT 'Le nom du parent',
  `prenomParent` varchar(50) NOT NULL COMMENT 'Le prénom du parent',
  `adresse` varchar(200) NOT NULL COMMENT 'L''adresse du parent',
  `telephonne` varchar(11) NOT NULL COMMENT 'Le téléphonne du parent',
  `GSM` varchar(12) NOT NULL COMMENT 'Le GSM du parent',
  `email` varchar(100) NOT NULL COMMENT 'Le mail du parent'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONS POUR LA TABLE `parents`:
--

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE `utilisateurs` (
  `idUtilisateur` int(11) NOT NULL COMMENT 'L''id de l''utilisateur',
  `login` varchar(50) NOT NULL COMMENT 'Le login',
  `motDePasse` varchar(50) NOT NULL COMMENT 'Le mot de passe de login',
  `nomUtilisateur` varchar(50) NOT NULL COMMENT 'Le nom de l''utilisateur',
  `prenomUtilisateur` varchar(50) NOT NULL COMMENT 'Le prénom de l''utilisateur',
  `role` varchar(50) NOT NULL COMMENT 'Nom de la fonction au sein de l''école',
  `droits` int(11) NOT NULL COMMENT 'Les droits auquels l''utilisateur peut accéder'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONS POUR LA TABLE `utilisateurs`:
--

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`idClasse`);

--
-- Index pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD PRIMARY KEY (`idEleve`),
  ADD KEY `classe` (`classeId`),
  ADD KEY `parent1` (`parent1Id`),
  ADD KEY `parent2` (`parent2Id`);

--
-- Index pour la table `garderie`
--
ALTER TABLE `garderie`
  ADD PRIMARY KEY (`idGarderie`),
  ADD KEY `eleve` (`eleveId`);

--
-- Index pour la table `parents`
--
ALTER TABLE `parents`
  ADD PRIMARY KEY (`idParent`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`idUtilisateur`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD CONSTRAINT `classe` FOREIGN KEY (`classeId`) REFERENCES `classes` (`idClasse`),
  ADD CONSTRAINT `parent1` FOREIGN KEY (`parent1Id`) REFERENCES `parents` (`idParent`),
  ADD CONSTRAINT `parent2` FOREIGN KEY (`parent2Id`) REFERENCES `parents` (`idParent`);

--
-- Contraintes pour la table `garderie`
--
ALTER TABLE `garderie`
  ADD CONSTRAINT `eleve` FOREIGN KEY (`eleveId`) REFERENCES `eleves` (`idEleve`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
