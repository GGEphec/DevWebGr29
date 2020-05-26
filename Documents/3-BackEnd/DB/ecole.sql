-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 26 mai 2020 à 21:59
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ecole`
--

-- --------------------------------------------------------

--
-- Structure de la table `classes`
--

CREATE TABLE `classes` (
  `idClasse` int(11) NOT NULL,
  `annee` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `classes`
--

INSERT INTO `classes` (`idClasse`, `annee`) VALUES
(0, ''),
(1, 'Première A'),
(2, 'Première B'),
(3, 'Deuxième A'),
(4, 'Deuxième B'),
(5, 'Troisième A'),
(6, 'Troisième B'),
(7, 'Quatrième A'),
(8, 'Quatrième B'),
(9, 'Cinquième A'),
(10, 'Cinquième B'),
(11, 'Sixième A'),
(12, 'Sixième B');

-- --------------------------------------------------------

--
-- Structure de la table `eleves`
--

CREATE TABLE `eleves` (
  `idEleve` int(11) NOT NULL COMMENT 'L''id de l''élève',
  `nomEleve` varchar(50) NOT NULL COMMENT 'Le nom de l''élève',
  `prenomEleve` varchar(50) NOT NULL COMMENT 'Le prénom de l''élève',
  `naissance` date NOT NULL COMMENT 'La date de naissance de l''élève',
  `nationalite` varchar(25) NOT NULL DEFAULT 'BELGIUM' COMMENT 'La nationalité de l''élève',
  `idClasse` int(11) NOT NULL COMMENT 'L''id de la classe de l''élève',
  `parent1Id` int(11) NOT NULL COMMENT 'L''id du parent 1',
  `parent2Id` int(11) NOT NULL COMMENT 'L''id du parent 2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `eleves`
--

INSERT INTO `eleves` (`idEleve`, `nomEleve`, `prenomEleve`, `naissance`, `nationalite`, `idClasse`, `parent1Id`, `parent2Id`) VALUES
(0, '', '', '2000-01-01', 'BELGIUM', 0, 0, 0),
(1, 'Colur', 'Pierre', '2011-05-26', 'BELGIUM', 1, 1, 2),
(2, 'Delporte', 'Aloïs', '2011-03-03', 'BELGIUM', 2, 3, 4),
(3, 'Grany', 'Talia', '2010-02-08', 'BELGIUM', 3, 5, 6),
(4, 'Greve', 'Daniel', '2010-08-19', 'BELGIUM', 4, 7, 8),
(5, 'Greve', 'Tom', '2008-07-15', 'BELGIUM', 5, 7, 8),
(6, 'Tombor', 'Soraya', '2008-01-02', 'BELGIUM', 6, 9, 10),
(7, 'Baudin', 'Arthur', '2008-02-22', 'BELGIUM', 7, 11, 12),
(8, 'Carl', 'Emilie', '2007-05-15', 'BELGIUM', 8, 13, 14),
(9, 'Latte', 'Ali', '2009-10-10', 'BELGIUM', 9, 15, 16),
(10, 'Yilmaz', 'Itsvan', '2009-04-17', 'BELGIUM', 10, 17, 18),
(11, 'Van de Vele', 'Yannis', '2007-12-03', 'BELGIUM', 11, 19, 20),
(12, 'Delporte', 'Raphael', '2004-10-18', 'BELGIUM', 3, 10, 3);

-- --------------------------------------------------------

--
-- Structure de la table `garderie`
--

CREATE TABLE `garderie` (
  `idGarderie` int(11) NOT NULL COMMENT 'L''id de la transaction',
  `idEleve` int(11) NOT NULL COMMENT 'L''id de l''élève arrivant/repartant',
  `dateoutin` date NOT NULL COMMENT 'La date de la transaction',
  `heure` time NOT NULL COMMENT 'L''heure de la transaction',
  `outin` varchar(3) NOT NULL COMMENT 'Si l''elève est arrivé/partit',
  `jour` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `garderie`
--

INSERT INTO `garderie` (`idGarderie`, `idEleve`, `dateoutin`, `heure`, `outin`, `jour`) VALUES
(1, 1, '2020-02-11', '07:35:00', 'In', 2),
(2, 1, '2020-02-11', '17:40:00', 'Out', 2),
(3, 11, '2020-02-11', '16:06:00', 'Out', 2),
(4, 7, '2020-02-11', '07:35:00', 'In', 2),
(5, 5, '2020-02-11', '07:35:00', 'Out', 2),
(6, 2, '2020-02-11', '06:55:00', 'In', 2),
(7, 9, '2020-02-11', '07:26:00', 'In', 2),
(8, 10, '2020-02-11', '07:59:00', 'In', 2),
(9, 4, '2020-02-11', '07:54:00', 'In', 2),
(10, 5, '2020-02-11', '07:54:00', 'In', 2),
(11, 1, '2020-02-12', '07:35:00', 'In', 3),
(12, 2, '2020-02-12', '07:40:00', 'In', 3),
(13, 3, '2020-02-12', '07:45:00', 'In', 3),
(14, 2, '2020-02-12', '16:35:00', 'Out', 3),
(15, 2, '2020-02-12', '17:35:00', 'Out', 3),
(16, 1, '2020-02-12', '16:35:00', 'Out', 3),
(17, 6, '2020-04-27', '19:29:00', 'In', 1),
(18, 5, '2020-04-27', '19:29:00', 'In', 1),
(19, 10, '2020-04-27', '19:33:00', 'Out', 1),
(20, 10, '2020-04-27', '19:34:00', 'Out', 1),
(21, 8, '2020-04-27', '21:46:00', 'In', 1),
(22, 4, '2020-04-27', '21:46:00', 'In', 1),
(23, 10, '2020-04-27', '21:46:00', 'Out', 1);

-- --------------------------------------------------------

--
-- Structure de la table `parents`
--

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
-- Déchargement des données de la table `parents`
--

INSERT INTO `parents` (`idParent`, `nomParent`, `prenomParent`, `adresse`, `telephonne`, `GSM`, `email`) VALUES
(0, '', '', '', '', '', ''),
(1, 'Colur', 'Michael', 'Rue du port 8 7804 Ath', '068335225', '0478252400', 'm.colur@yopmail.com'),
(2, 'Dekon', 'Patricia', 'Rue du port 8 7804 Ath', '068335226', '0456241230', 'p.dekon@yopmail.com'),
(3, 'Delporte', 'Pierre', 'Chaussée de Bruneault 26 7800 Ath', '068245622', '0475262626', 'pierre.delporte@yopmail.com'),
(4, 'Laplace', 'Emilie', 'Chaussée de Bruneault 26 7800 Ath', '068245621', '0489561515', 'emi22laplace@yopmail.com'),
(5, 'Grany', 'Jacques', 'Impasse verte 3 7812 Houtaing', '068549878', '0478141625', 'j.grany@yopmail.com'),
(6, 'Oriban', 'Annie', 'Chaussée de Bruxelles 25 7800 Ath', '068529471', '0478785612', 'annie.oriban@yopmail.com'),
(7, 'Greve', 'Olivier', 'Route d\'Hacquegnies 10\r\n7911 Frasnes-lez-Anvaing', '069178631', '0478564132', 'o.greve@yopmail.com'),
(8, 'Ovide', 'Marie', 'Route d\'Hacquegnies 107911 Frasnes-lez-Anvaing', '069178632', '0476815464', 'marieovide@yopmail.com'),
(9, 'Tombor', 'Victor', 'Rue du 7 juillet 24 7804 Rebaix', '068794556', '0477451532', 'v.tombor@yopmail.com'),
(10, 'Paul', 'Annae', 'Rue du 7 juillet 24 7804 Rebaix', '068794557', '0477154859', 'a.paul@yopmail.com'),
(11, 'Baudin', 'Michael', 'Chemin des Crolites 47 7800 Ath', '', '0478254948', 'm.baudin@yopmail.com'),
(12, 'Druar', 'Pauline', 'Chemin des Crolites 47 7800 Ath', '', '0475124589', 'p.druar@yopmail.com'),
(13, 'Carl', 'Sacha', 'Rue du Trieu Périlleux 29 7810 Ath', '068741245', '0478154923', 's.carl@yopmail.com'),
(14, 'Party', 'Zélie', 'Rue du Trieu Périlleux 29 7810 Ath', '068741245', '0476321459', 'zelie.party@yopmail.com'),
(15, 'Latte', 'Kevin', 'Clos des Comtes du Hainaut 2 7800 Ath', '068179354', '0476324875', 'k.latte@yopmail.com'),
(16, 'Hubert', 'Camille', 'Clos des Comtes du Hainaut 2 7800 Ath', '068179354', '0478149765', 'camille.hubert@yopmail.com'),
(17, 'Yilmaz', 'Maxence', 'Place de Villers-Notre-Dame 20 7812 Ath', '068473214', '0471598746', 'm.yilmaz@yopmail.com'),
(18, 'Perez', 'Katty', 'Place de Villers-Notre-Dame 20 7812 Ath', '068473214', '0471587648', 'kattyperez@yopmail.com'),
(19, 'Van de Vele', 'Dorian', 'Rue de Moulbaix 4 7903 Leuze-en-Hainaut', '068714987', '0472654897', 'd.vandevele@yopmail.com'),
(20, 'Slager', 'Christine', 'Rue de Moulbaix 4 7903 Leuze-en-Hainaut', '068714987', '0478214598', 'c.slager@yopmail.com'),
(23, 'Balori', 'Jean-Michel', 'Rue du tilleul 42, 7803 Lessines', '068335222', '0477688810', 'jm.balori@yopmail.com'),
(25, 'Balori', 'Jean-Michel', 'Rue du tilleul 42, 7803 Lessines', '068335222', '0477688809', 'jm.balori@yopmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `token`
--

CREATE TABLE `token` (
  `token` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `token`
--

INSERT INTO `token` (`token`) VALUES
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjE2ODEwMzc2MDYiLCJ1c2VybmFtZSI6InNlY3JldGFyaWF0MDEiLCJpYXQiOjE1OTA1MjI5MzEsImV4cCI6MTU5MDUyMzA1MX0.Y_9YFlAho03o9-R89SBJrRvG39aJN0OgS1k_NZzHD4s');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

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
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`idUtilisateur`, `login`, `motDePasse`, `nomUtilisateur`, `prenomUtilisateur`, `role`, `droits`) VALUES
(0, 'root', 'toor', 'root', 'root', 'Administrateur', 0),
(1, 'dir01', '-183658400', 'Leleux', 'Sylvie', 'Directrice', 1),
(2, 'secretariat01', '1981680038', 'Mandosa', 'Lucas', 'Secrétaire', 2),
(3, 'secretariat02', '1981680038', 'Mendez', 'Charlotte', 'Secrétaire', 2),
(4, 'garderie01', '-1173500352', 'Perez', 'Martine', 'Garderie', 3);

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
  ADD KEY `parent1Id` (`parent1Id`,`parent2Id`),
  ADD KEY `parent2Id` (`parent2Id`),
  ADD KEY `idClasse` (`idClasse`);

--
-- Index pour la table `garderie`
--
ALTER TABLE `garderie`
  ADD PRIMARY KEY (`idGarderie`),
  ADD KEY `idEleve` (`idEleve`);

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
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `eleves`
--
ALTER TABLE `eleves`
  MODIFY `idEleve` int(11) NOT NULL AUTO_INCREMENT COMMENT 'L''id de l''élève', AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `garderie`
--
ALTER TABLE `garderie`
  MODIFY `idGarderie` int(11) NOT NULL AUTO_INCREMENT COMMENT 'L''id de la transaction', AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `parents`
--
ALTER TABLE `parents`
  MODIFY `idParent` int(11) NOT NULL AUTO_INCREMENT COMMENT 'L''id du parent', AUTO_INCREMENT=26;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD CONSTRAINT `eleves_ibfk_1` FOREIGN KEY (`parent1Id`) REFERENCES `parents` (`idParent`),
  ADD CONSTRAINT `eleves_ibfk_2` FOREIGN KEY (`parent2Id`) REFERENCES `parents` (`idParent`),
  ADD CONSTRAINT `eleves_ibfk_3` FOREIGN KEY (`idClasse`) REFERENCES `classes` (`idClasse`) ON UPDATE NO ACTION;

--
-- Contraintes pour la table `garderie`
--
ALTER TABLE `garderie`
  ADD CONSTRAINT `garderie_ibfk_1` FOREIGN KEY (`idEleve`) REFERENCES `eleves` (`idEleve`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
