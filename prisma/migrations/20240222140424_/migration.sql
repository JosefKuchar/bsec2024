-- CreateTable
CREATE TABLE "Investment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "bic" TEXT NOT NULL,
    "isin" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "min" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,
    "negative" REAL NOT NULL,
    "neutral" REAL NOT NULL,
    "positive" REAL NOT NULL
);
