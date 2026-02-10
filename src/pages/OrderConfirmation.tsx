import { CheckCircle2, BadgeCheck, QrCode, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function OrderConfirmation() {
  const { state } = useApp();
  const lang = state.language;

  return (
    <div className="container mx-auto px-4 py-16 max-w-lg text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.5 }}>
        <CheckCircle2 className="h-20 w-20 text-primary mx-auto mb-6" />
      </motion.div>

      <h1 className="text-3xl font-display font-bold text-foreground mb-2">{t('order.confirmed', lang)}</h1>
      <p className="text-muted-foreground mb-8">Order #AGR-2026-00847</p>

      <Card className="shadow-card mb-6 text-left">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="gap-1 bg-primary text-primary-foreground border-0">
              <BadgeCheck className="h-3 w-3" />
              {t('order.verifiedFarm', lang)}
            </Badge>
            <span className="text-sm text-muted-foreground">Ravi Kumar · Kanchipuram</span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">🍅 Organic Tomatoes × 2 kg</span>
              <span className="font-medium text-foreground">₹80</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">🥕 Organic Carrots × 1 kg</span>
              <span className="font-medium text-foreground">₹45</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-semibold">
              <span>{t('checkout.total', lang)}</span>
              <span className="text-primary">₹125</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Traceability */}
      <Card className="shadow-card mb-8">
        <CardContent className="pt-6 flex flex-col items-center">
          <p className="text-sm font-medium text-foreground mb-3">{t('order.traceability', lang)}</p>
          <div className="bg-foreground p-4 rounded-lg inline-block">
            <QrCode className="h-24 w-24 text-background" />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Track your produce from farm to doorstep
          </p>
        </CardContent>
      </Card>

      <Button asChild size="lg" className="w-full">
        <Link to="/marketplace">
          Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
