-- CreateTable
CREATE TABLE "ChangeType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Change" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    "frequency" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    CONSTRAINT "Change_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ChangeType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InvestmentChange" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" INTEGER NOT NULL,
    "investmentId" INTEGER NOT NULL,
    "frequency" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    CONSTRAINT "InvestmentChange_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
