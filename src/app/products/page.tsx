import { ProductGrid } from "@/components/product-grid";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  // Fetch products and categories
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: true,
      },
    }),
    prisma.category.findMany(),
  ]);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Our Products
      </h1>
      <ProductGrid
        products={products.map((product) => ({
          id: product.id,
          title: product.title,
          description: product.description,
          image: product.image,
          price: product.price,
          amazonLink: product.amazonLink,
          affiliateId: product.affiliateId,
          categoryId: product.categoryId,
        }))}
        categories={categories.map((category) => ({
          id: category.id,
          name: category.name,
        }))}
      />
    </div>
  );
} 