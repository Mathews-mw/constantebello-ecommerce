/*
  Warnings:

  - You are about to drop the column `user_id` on the `user_addresses` table. All the data in the column will be lost.
  - Added the required column `user_info_id` to the `user_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_addresses" DROP CONSTRAINT "user_addresses_user_id_fkey";

-- AlterTable
ALTER TABLE "user_addresses" DROP COLUMN "user_id",
ADD COLUMN     "user_info_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_info_id_fkey" FOREIGN KEY ("user_info_id") REFERENCES "user_infos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
