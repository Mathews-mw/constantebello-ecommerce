-- CreateEnum
CREATE TYPE "ProductDepartment" AS ENUM ('GENERICO', 'COZINHA', 'QUARTO', 'SALA', 'SALA_JANTA');

-- AlterTable
ALTER TABLE "product_details" ADD COLUMN     "department" "ProductDepartment" NOT NULL DEFAULT 'GENERICO';
