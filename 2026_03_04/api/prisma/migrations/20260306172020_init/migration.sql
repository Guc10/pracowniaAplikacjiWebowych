-- CreateTable
CREATE TABLE `Wpis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Text` VARCHAR(255) NOT NULL,
    `KategoriaId` INTEGER NOT NULL,
    `KomentarzId` INTEGER NOT NULL,

    INDEX `kategoriaId`(`KategoriaId`),
    INDEX `komentarzId`(`KomentarzId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Kategoria` VARCHAR(255) NOT NULL,
    `Opis` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komentarz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Komentarz` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_ibfk_1` FOREIGN KEY (`KomentarzId`) REFERENCES `Komentarz`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_ibfk_2` FOREIGN KEY (`KategoriaId`) REFERENCES `Kategoria`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
