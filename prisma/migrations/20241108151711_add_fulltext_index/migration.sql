-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- CreateIndex
CREATE INDEX "Product_description_idx" ON "Product"("description");

-- Add full-text index for name and description columns
CREATE INDEX "Product_fulltext_idx" ON "Product" USING GIN (to_tsvector('english', name || ' ' || description));
