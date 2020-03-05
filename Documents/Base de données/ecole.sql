-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  jeu. 05 mars 2020 à 01:43
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
  `nationalité` varchar(25) NOT NULL DEFAULT 'BELGIUM' COMMENT 'La nationalité de l''élève',
  `classeId` int(11) NOT NULL COMMENT 'La classe de l''élève',
  `parent1Id` int(11) NOT NULL COMMENT 'L''id du parent 1',
  `parent2Id` int(11) NOT NULL COMMENT 'L''id du parent 2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `eleves`
--

INSERT INTO `eleves` (`idEleve`, `nomEleve`, `prenomEleve`, `naissance`, `nationalité`, `classeId`, `parent1Id`, `parent2Id`) VALUES
(1, 'Colur', 'Pierre', '2011-05-26', 'BELGIUM', 1, 1, 2),
(2, 'Delporte', 'Aloïs', '2011-03-03', 'BELGIUM', 2, 3, 4),
(3, 'Grany', 'Talia', '2010-02-08', 'BELGIUM', 3, 5, 6),
(4, 'Greve', 'Daniel', '2010-08-19', 'BELGIUM', 4, 7, 8),
(5, 'Greve', 'Tom', '2008-07-15', 'BELGIUM', 5, 7, 8),
(6, 'Tombor', 'Soraya', '2008-01-02', 'BELGIUM', 6, 9, 10),
(7, 'Baudin', 'Arthur', '2007-02-22', 'BELGIUM', 7, 11, 12),
(8, 'Carl', 'Emilie', '2007-05-15', 'BELGIUM', 8, 13, 14),
(9, 'Latte', 'Ali', '2009-10-10', 'BELGIUM', 9, 15, 16),
(10, 'Yilmaz', 'Itsvan', '2009-04-17', 'BELGIUM', 10, 17, 18),
(11, 'Van de Vele', 'Yannis', '2007-12-03', 'BELGIUM', 11, 19, 20);

-- --------------------------------------------------------

--
-- Structure de la table `garderie`
--

CREATE TABLE `garderie` (
  `idGarderie` int(11) NOT NULL COMMENT 'L''id de la transaction',
  `eleveId` int(11) NOT NULL COMMENT 'L''id de l''élève arrivant/repartant',
  `date` date NOT NULL DEFAULT current_timestamp() COMMENT 'La date de la transaction',
  `heure` time NOT NULL DEFAULT current_timestamp() COMMENT 'L''heure de la transaction',
  `in/out` varchar(3) NOT NULL COMMENT 'Si l''elève est arrivé/partit'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, 'Colur', 'Michael', 'Rue du port 8 7804 Ath', '068335225', '0478252400', 'm.colur@gmail.com'),
(2, 'Dekon', 'Patricia', 'Rue du port 8 7804 Ath', '068335225', '0456241230', 'p.dekon@hotmail.fr'),
(3, 'Delporte', 'Pierre', 'Chaussée de Bruneault 26 7800 Ath', '068245621', '0475262626', 'pierre.delporte@skynet.be'),
(4, 'Laplace', 'Emilie', 'Chaussée de Bruneault 26 7800 Ath', '068245621', '0489561515', 'emi22laplace@gmail.com'),
(5, 'Grany', 'Jacques', 'Impasse verte 3 7812 Houtaing', '068549878', '0478141625', 'j.grany@gmail.com'),
(6, 'Oriban', 'Annie', 'Chaussée de Bruxelles 25 7800 Ath', '068529471', '0478785612', 'annie.oriban@hotmail.com'),
(7, 'Greve', 'Olivier', 'Route d\'Hacquegnies 10\r\n7911 Frasnes-lez-Anvaing', '069178631', '0478564132', 'o.greve@ibm.fr'),
(8, 'Ovide', 'Marie', 'Route d\'Hacquegnies 10\r\n7911 Frasnes-lez-Anvaing', '069178631', '0476815462', 'marieovide@gmail.com'),
(9, 'Tombor', 'Victor', 'Rue du 7 juillet 24 7804 Rebaix', '068794556', '0477451532', 'v.tombor@gmail.com'),
(10, 'Paul', 'Anna', 'Rue du 7 juillet 24 7804 Rebaix', '068794556', '0477154859', 'a.paul@gmail.com'),
(11, 'Baudin', 'Michael', 'Chemin des Crolites 47 7800 Ath', '', '0478254948', 'm.baudin@hotmail.fr'),
(12, 'Druar', 'Pauline', 'Chemin des Crolites 47 7800 Ath', '', '0475124589', 'p.druar@gmail.com'),
(13, 'Carl', 'Sacha', 'Rue du Trieu Périlleux 29 7810 Ath', '068741245', '0478154923', 's.carl@hotmail.com'),
(14, 'Party', 'Zélie', 'Rue du Trieu Périlleux 29 7810 Ath', '068741245', '0476321459', 'zelie.party@skynet.be'),
(15, 'Latte', 'Kevin', 'Clos des Comtes du Hainaut 2 7800 Ath', '068179354', '0476324875', 'k.latte@gmail.com'),
(16, 'Hubert', 'Camille', 'Clos des Comtes du Hainaut 2 7800 Ath', '068179354', '0478149765', 'camille.hubert@gmail.com'),
(17, 'Yilmaz', 'Maxence', 'Place de Villers-Notre-Dame 20 7812 Ath', '068473214', '0471598746', 'm.yilmaz@gmail.ru'),
(18, 'Perez', 'Katty', 'Place de Villers-Notre-Dame 20 7812 Ath', '068473214', '0471587648', 'kattyperez@hotmail.fr'),
(19, 'Van de Vele', 'Dorian', 'Rue de Moulbaix 4 7903 Leuze-en-Hainaut', '068714987', '0472654897', 'd.vandevele@hotmail.fr'),
(20, 'Slager', 'Christine', 'Rue de Moulbaix 4 7903 Leuze-en-Hainaut', '068714987', '0478214598', 'c.slager@gmail.com');

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
(1, 'dir01', 'dir01', 'Leleux', 'Sylvie', 'Directrice', 1),
(2, 'secretariat01', 'secretariat', 'Mandosa', 'Lucas', 'Secrétaire', 2),
(3, 'secretariat02', 'secretariat', 'Mendez', 'Charlotte', 'Secrétaire', 2),
(4, 'garderie01', 'garderie', 'Perez', 'Martine', 'Garderie', 3);

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
