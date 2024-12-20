-- CreateTable
CREATE TABLE "customers_infos" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "policy_consent" BOOLEAN NOT NULL DEFAULT false,
    "advertising_consent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_infos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_infos_cpf_key" ON "customers_infos"("cpf");

-- AddForeignKey
ALTER TABLE "customers_infos" ADD CONSTRAINT "customers_infos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
