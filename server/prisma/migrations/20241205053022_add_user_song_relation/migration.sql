/*
  Warnings:

  - Added the required column `subscriptionPeriod` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subscription` ADD COLUMN `subscriptionPeriod` ENUM('DAY', 'WEEK', 'MONTH', 'YEAR') NOT NULL;
