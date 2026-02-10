import { ShoppingCart, MapPin, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { toast } from 'sonner';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { state, dispatch } = useApp();
  const lang = state.language;

  const handleAdd = () => {
    dispatch({ type: 'ADD_TO_CART', product, quantity: 1 });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Card className="group overflow-hidden border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      {/* Image area */}
      <div className="relative h-40 bg-muted flex items-center justify-center text-6xl">
        {product.image}
        {product.isVerified && (
          <Badge className="absolute top-2 left-2 gap-1 bg-primary text-primary-foreground border-0 text-xs">
            <BadgeCheck className="h-3 w-3" />
            {t('order.verifiedFarm', lang)}
          </Badge>
        )}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg font-display">{t('farmer.soldOut', lang)}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground font-display text-lg leading-tight">{product.name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <MapPin className="h-3 w-3" />
            {product.farmerName} · {product.farmLocation} · {product.distance}km
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">₹{product.pricePerKg}</span>
            <span className="text-sm text-muted-foreground">{t('market.perKg', lang)}</span>
          </div>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={!product.isAvailable}
            className="gap-1"
          >
            <ShoppingCart className="h-4 w-4" />
            {t('market.addToCart', lang)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
