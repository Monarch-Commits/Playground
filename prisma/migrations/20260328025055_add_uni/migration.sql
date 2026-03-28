/*
  Warnings:

  - A unique constraint covering the columns `[userId,status]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId,productId]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OrderItem_productId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Order_userId_status_key" ON "Order"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_orderId_productId_key" ON "OrderItem"("orderId", "productId");
