-- DropForeignKey
ALTER TABLE `item_images` DROP FOREIGN KEY `item_images_item_id_fkey`;

-- AddForeignKey
ALTER TABLE `item_images` ADD CONSTRAINT `item_images_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
