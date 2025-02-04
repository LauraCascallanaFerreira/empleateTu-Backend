/*
  Warnings:

  - You are about to drop the `Offerts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Offerts" DROP CONSTRAINT "Offerts_idCategory_fkey";

-- DropForeignKey
ALTER TABLE "Offerts" DROP CONSTRAINT "Offerts_idUserCreator_fkey";

-- DropForeignKey
ALTER TABLE "Rate" DROP CONSTRAINT "Rate_idOffer_fkey";

-- DropTable
DROP TABLE "Offerts";

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "contactEmail" TEXT,
    "location" TEXT,
    "published" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "idCategory" INTEGER,
    "idUserCreator" INTEGER NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_idUserCreator_fkey" FOREIGN KEY ("idUserCreator") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_idOffer_fkey" FOREIGN KEY ("idOffer") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
