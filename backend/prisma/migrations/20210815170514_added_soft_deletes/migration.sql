-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
