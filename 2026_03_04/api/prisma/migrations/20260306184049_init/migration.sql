/*
  Warnings:

  - You are about to alter the column `Kategoria` on the `Kategoria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `Opis` on the `Kategoria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `Komentarz` on the `Komentarz` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the column `KomentarzId` on the `Wpis` table. All the data in the column will be lost.
  - You are about to drop the column `Text` on the `Wpis` table. All the data in the column will be lost.
  - Added the required column `WpisId` to the `Komentarz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Body` to the `Wpis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Title` to the `Wpis` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE `Kategoria` MODIFY `Kategoria` VARCHAR(191) NOT NULL,
    MODIFY `Opis` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Komentarz` ADD COLUMN `WpisId` INTEGER NOT NULL,
    MODIFY `Komentarz` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Wpis` DROP COLUMN `KomentarzId`,
    DROP COLUMN `Text`,
    ADD COLUMN `Body` VARCHAR(191) NOT NULL,
    ADD COLUMN `Title` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_KategoriaId_fkey` FOREIGN KEY (`KategoriaId`) REFERENCES `Kategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komentarz` ADD CONSTRAINT `Komentarz_WpisId_fkey` FOREIGN KEY (`WpisId`) REFERENCES `Wpis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
