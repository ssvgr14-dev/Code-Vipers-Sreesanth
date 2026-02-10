import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';

const categories = ['All', 'Vegetables', 'Fruits', 'Grains'] as const;
const categoryKeys: Record<string, string> = {
  All: 'market.all',
  Vegetables: 'market.vegetables',
  Fruits: 'market.fruits',
  Grains: 'market.grains',
};

export default function Marketplace() {
  const { state } = useApp();
  const lang = state.language;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [sortByDistance, setSortByDistance] = useState(false);

  const products = useMemo(() => {
    let filtered = mockProducts.filter(p => p.isApproved);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) || p.farmerName.toLowerCase().includes(q)
      );
    }
    if (category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }
    if (sortByDistance) {
      filtered = [...filtered].sort((a, b) => a.distance - b.distance);
    }
    return filtered;
  }, [search, category, sortByDistance]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
        {t('market.title', lang)}
      </h1>
      <p className="text-muted-foreground mb-8">Browse fresh produce from verified farmers near you.</p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('market.search', lang)}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <Button
              key={c}
              variant={category === c ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategory(c)}
            >
              {t(categoryKeys[c], lang)}
            </Button>
          ))}
          <Button
            variant={sortByDistance ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortByDistance(!sortByDistance)}
            className="gap-1"
          >
            <SlidersHorizontal className="h-3 w-3" />
            {t('market.sortDistance', lang)}
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No produce found matching your search.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
