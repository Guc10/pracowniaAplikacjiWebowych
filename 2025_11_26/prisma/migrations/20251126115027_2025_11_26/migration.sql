/*
  Warnings:

  - You are about to drop the column `kategoria` on the `Kategoria` table. All the data in the column will be lost.
  - You are about to drop the column `komentarz` on the `Komentarz` table. All the data in the column will be lost.
  - You are about to drop the column `kategoriaId` on the `Wpis` table. All the data in the column will be lost.
  - You are about to drop the column `komentarzId` on the `Wpis` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Wpis` table. All the data in the column will be lost.
  - Added the required column `Kategoria` to the `Kategoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Opis` to the `Kategoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Komentarz` to the `Komentarz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `KategoriaId` to the `Wpis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `KomentarzId` to the `Wpis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Text` to the `Wpis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Wpis` DROP FOREIGN KEY `Wpis_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Wpis` DROP FOREIGN KEY `Wpis_ibfk_2`;

-- DropIndex
DROP INDEX `kategoriaId` ON `Wpis`;

-- DropIndex
DROP INDEX `komentarzId` ON `Wpis`;

-- AlterTable
ALTER TABLE `Kategoria` DROP COLUMN `kategoria`,
    ADD COLUMN `Kategoria` ENUM('fajne', 'niefajne', 'cool', 'disgusting', 'freaky', 'insane') NOT NULL,
    ADD COLUMN `Opis` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Komentarz` DROP COLUMN `komentarz`,
    ADD COLUMN `Komentarz` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Wpis` DROP COLUMN `kategoriaId`,
    DROP COLUMN `komentarzId`,
    DROP COLUMN `text`,
    ADD COLUMN `KategoriaId` INTEGER NOT NULL,
    ADD COLUMN `KomentarzId` INTEGER NOT NULL,
    ADD COLUMN `Text` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE INDEX `kategoriaId` ON `Wpis`(`KategoriaId`);

-- CreateIndex
CREATE INDEX `komentarzId` ON `Wpis`(`KomentarzId`);

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_ibfk_1` FOREIGN KEY (`KomentarzId`) REFERENCES `Komentarz`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_ibfk_2` FOREIGN KEY (`KategoriaId`) REFERENCES `Kategoria`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
