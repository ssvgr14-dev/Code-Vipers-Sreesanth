import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mandiPrices } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';

interface Props {
  cropName: string;
  yourPrice: number;
}

export default function MandiPriceWidget({ cropName, yourPrice }: Props) {
  const { state } = useApp();
  const lang = state.language;

  const mandiPrice = mandiPrices[cropName] || null;

  if (!mandiPrice) return null;

  const diff = yourPrice - mandiPrice;
  const pct = ((diff / mandiPrice) * 100).toFixed(1);

  return (
    <Card className="border-accent/30 bg-accent/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-body font-medium text-muted-foreground">
          {t('farmer.mandiPrice', lang)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold text-accent-foreground">₹{mandiPrice}/kg</span>
          <span className="text-xs text-muted-foreground">(Mandi Avg.)</span>
        </div>
        {yourPrice > 0 && (
          <div className="flex items-center gap-2 text-sm">
            {diff > 0 ? (
              <>
                <TrendingUp className="h-4 w-4 text-destructive" />
                <span className="text-destructive">Your price is {pct}% above market</span>
              </>
            ) : diff < 0 ? (
              <>
                <TrendingDown className="h-4 w-4 text-primary" />
                <span className="text-primary">Your price is {Math.abs(Number(pct))}% below market</span>
              </>
            ) : (
              <>
                <Minus className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">At market price</span>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
