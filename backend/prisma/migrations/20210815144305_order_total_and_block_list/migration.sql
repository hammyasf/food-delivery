-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "UserOnRestaurant" (
    "userId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,

    PRIMARY KEY ("userId","restaurantId")
);

-- AddForeignKey
ALTER TABLE "UserOnRestaurant" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnRestaurant" ADD FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
