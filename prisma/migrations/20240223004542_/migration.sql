/*
  Warnings:

  - Added the required column `from` to the `InvestmentChange` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `InvestmentChange` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InvestmentChange" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" INTEGER NOT NULL,
    "investmentId" INTEGER NOT NULL,
    "frequency" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    CONSTRAINT "InvestmentChange_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InvestmentChange" ("amount", "frequency", "id", "investmentId", "type") SELECT "amount", "frequency", "id", "investmentId", "type" FROM "InvestmentChange";
DROP TABLE "InvestmentChange";
ALTER TABLE "new_InvestmentChange" RENAME TO "InvestmentChange";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
