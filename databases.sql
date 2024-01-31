select * from otp;CREATE TABLE `admintable` (
  `email` varchar(45) NOT NULL,
  `password` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `boaccount` (
  `BOAccountNo` varchar(20) NOT NULL,
  `AccountType` varchar(45) NOT NULL,
  `Operator` varchar(45) DEFAULT NULL,
  `StatementCycle` varchar(45) NOT NULL,
  `FirstHolderName` varchar(100) NOT NULL,
  `FirstHolderFatherHusband` varchar(100) NOT NULL,
  `FirstHolderMother` varchar(100) NOT NULL,
  `FirstHolderSex` varchar(45) NOT NULL,
  `FirstHolderDOB` date NOT NULL,
  `FirstHolderNID` varchar(45) NOT NULL,
  `FirstHolderPassport` varchar(45) DEFAULT NULL,
  `FirstHolderPassportIssuePlace` varchar(45) DEFAULT NULL,
  `FirstHolderPassportIssueDate` date DEFAULT NULL,
  `FirstHolderPassportExpiryDate` date DEFAULT NULL,
  `FirstHolderOccupation` varchar(45) NOT NULL,
  `FirstHolderTIN` varchar(45) DEFAULT NULL,
  `FirstHolderAddress` varchar(45) NOT NULL,
  `FirstHolderCity` varchar(45) NOT NULL,
  `FirstHolderDivision` varchar(45) NOT NULL,
  `FirstHolderZip` varchar(45) NOT NULL,
  `FirstHolderPhone` varchar(45) NOT NULL,
  `FirstHolderEmail` varchar(45) NOT NULL,
  `FirstHolderPhoto` varchar(200) NOT NULL,
  `FirstHolderSign` varchar(200) NOT NULL,
  `SecondHolderName` varchar(100) DEFAULT NULL,
  `SecondHolderFatherHusband` varchar(100) DEFAULT NULL,
  `SecondHolderMother` varchar(100) DEFAULT NULL,
  `SecondHolderSex` varchar(45) DEFAULT NULL,
  `SecondHolderDOB` date DEFAULT NULL,
  `SecondHolderNID` varchar(45) DEFAULT NULL,
  `SecondHolderPassport` varchar(45) DEFAULT NULL,
  `SecondHolderPassportIssuePlace` varchar(45) DEFAULT NULL,
  `SecondHolderPassportIssueDate` date DEFAULT NULL,
  `SecondHolderPassportExpiryDate` date DEFAULT NULL,
  `SecondHolderOccupation` varchar(45) DEFAULT NULL,
  `SecondHolderTIN` varchar(45) DEFAULT NULL,
  `SecondHolderAddress` varchar(45) DEFAULT NULL,
  `SecondHolderCity` varchar(45) DEFAULT NULL,
  `SecondHolderDivision` varchar(45) DEFAULT NULL,
  `SecondHolderZip` varchar(45) DEFAULT NULL,
  `SecondHolderPhone` varchar(45) DEFAULT NULL,
  `SecondHolderEmail` varchar(45) DEFAULT NULL,
  `SecondHolderPhoto` varchar(200) DEFAULT NULL,
  `SecondHolderSign` varchar(200) DEFAULT NULL,
  `RoutingNo` varchar(45) NOT NULL,
  `BankName` varchar(45) NOT NULL,
  `BranchName` varchar(45) NOT NULL,
  `BankAccountNo` varchar(45) NOT NULL,
  `NumberOfNominee` int NOT NULL,
  `ChequebookPhoto` varchar(200) NOT NULL,
  `PaymentStatus` varchar(45) NOT NULL,
  PRIMARY KEY (`BOAccountNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `deposit` (
  `transID` varchar(100) NOT NULL,
  `bo` varchar(45) NOT NULL,
  `bkash` varchar(45) NOT NULL,
  `amount` double NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`transID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `executions` (
  `trxID` varchar(45) NOT NULL,
  `orderID` varchar(45) NOT NULL,
  `bo` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `commission` float NOT NULL,
  `total` float NOT NULL,
  `type` varchar(45) NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`trxID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `investors` (
  `BoAccountNo` varchar(45) NOT NULL,
  `PhoneNumber` varchar(45) NOT NULL,
  `Password` varchar(1024) NOT NULL,
  `Balance` float DEFAULT NULL,
  `Loan` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `ipo` (
  `ipoID` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`ipoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `iporeq` (
  `ipoID` varchar(45) NOT NULL,
  `reqID` varchar(45) NOT NULL,
  `bo` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `applied` int NOT NULL,
  `allocated` int NOT NULL,
  `date` datetime NOT NULL,
  `status` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `notifications` (
  `title` varchar(500) NOT NULL,
  `body` varchar(2000) NOT NULL,
  `date` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `orders` (
  `orderID` varchar(40) NOT NULL,
  `type` varchar(45) NOT NULL,
  `bo` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `remaining` int NOT NULL,
  `status` varchar(45) NOT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`orderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `otp` (
  `otp` varchar(4) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `expiration` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `portfolio` (
  `bo` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL,
  `date` date NOT NULL,
  `price` float NOT NULL,
  `volume` int NOT NULL,
  `transID` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `watchlist` (
  `bo` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL,
  PRIMARY KEY (`code`,`bo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `withdraw_request` (
  `reqid` varchar(10) NOT NULL,
  `bo` varchar(45) NOT NULL,
  `amount` int NOT NULL,
  `date` date NOT NULL,
  `status` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



