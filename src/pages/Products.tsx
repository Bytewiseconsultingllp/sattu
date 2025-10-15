import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === "All Products" || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const stockMatch = !inStockOnly || product.inStock;
    return categoryMatch && priceMatch && stockMatch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="bg-gradient-hero py-12 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">Our Products</h1>
            <p className="text-lg text-primary-foreground/90">Discover our range of premium sattu products</p>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-card rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Filters</h2>

                {/* Categories */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    step={50}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="font-semibold mb-4">Availability</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="inStock" 
                      checked={inStockOnly}
                      onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                    />
                    <Label htmlFor="inStock" className="cursor-pointer">In Stock Only</Label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="animate-fade-in">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
