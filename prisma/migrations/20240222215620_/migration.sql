-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChangeType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dir" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_ChangeType" ("id", "name") SELECT "id", "name" FROM "ChangeType";
DROP TABLE "ChangeType";
ALTER TABLE "new_ChangeType" RENAME TO "ChangeType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
