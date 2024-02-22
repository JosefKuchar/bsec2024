/*
  Warnings:

  - Added the required column `dir` to the `Change` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Change" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    "dir" INTEGER NOT NULL,
    "frequency" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    CONSTRAINT "Change_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ChangeType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Change" ("amount", "frequency", "from", "id", "to", "typeId") SELECT "amount", "frequency", "from", "id", "to", "typeId" FROM "Change";
DROP TABLE "Change";
ALTER TABLE "new_Change" RENAME TO "Change";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
