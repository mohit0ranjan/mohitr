-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Capability" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Capability" ("description", "icon", "id", "order", "title") SELECT "description", "icon", "id", "order", "title" FROM "Capability";
DROP TABLE "Capability";
ALTER TABLE "new_Capability" RENAME TO "Capability";
CREATE TABLE "new_TimelineEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_TimelineEntry" ("description", "id", "order", "title", "type", "year") SELECT "description", "id", "order", "title", "type", "year" FROM "TimelineEntry";
DROP TABLE "TimelineEntry";
ALTER TABLE "new_TimelineEntry" RENAME TO "TimelineEntry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
