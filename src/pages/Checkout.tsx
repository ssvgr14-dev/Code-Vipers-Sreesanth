import { useState } from 'react';
import { Minus, Plus, Trash2, CreditCard, Smartphone, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { state, dispatch } = useApp();
  const { cart, language: lang } = state;
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const total = cart.reduce((s, i) => s + i.product.pricePerKg * i.quantity, 0);

  const steps = [
    t('checkout.cartReview', lang),
    t('checkout.shipping', lang),
    t('checkout.payment', lang),
  ];

  const handlePlaceOrder = () => {
    dispatch({ type: 'CLEAR_CART' });
    navigate('/order-confirmation');
  };

  if (cart.length === 0 && step === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-display font-bold text-foreground mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some fresh produce from the marketplace!</p>
        <Button onClick={() => navigate('/marketplace')}>Browse Marketplace</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-display font-bold text-foreground mb-8">{t('checkout.title', lang)}</h1>

      {/* Step indicator */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
              i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {i + 1}
            </div>
            <span className={`ml-2 text-sm hidden sm:inline ${i <= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              {s}
            </span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-3 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      {/* Step 0: Cart Review */}
      {step === 0 && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display">{t('checkout.cartReview', lang)}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="flex items-center gap-4">
                <span className="text-3xl">{item.product.image}</span>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground">₹{item.product.pricePerKg}/kg · {item.product.farmerName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8"
                    onClick={() => dispatch({ type: 'UPDATE_QTY', productId: item.product.id, quantity: Math.max(1, item.quantity - 1) })}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8"
                    onClick={() => dispatch({ type: 'UPDATE_QTY', productId: item.product.id, quantity: item.quantity + 1 })}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="font-semibold w-20 text-right text-foreground">₹{item.product.pricePerKg * item.quantity}</span>
                <Button variant="ghost" size="icon" className="text-destructive"
                  onClick={() => dispatch({ type: 'REMOVE_FROM_CART', productId: item.product.id })}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center text-lg">
              <span className="font-display font-semibold">{t('checkout.total', lang)}</span>
              <span className="font-bold text-primary text-2xl">₹{total}</span>
            </div>
            <Button className="w-full mt-4" onClick={() => setStep(1)}>
              Continue to Shipping <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 1: Shipping */}
      {step === 1 && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display">{t('checkout.shipping', lang)}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Full Name</Label><Input placeholder="Your name" /></div>
              <div><Label>Phone</Label><Input placeholder="+91 " /></div>
            </div>
            <div><Label>Address</Label><Input placeholder="Street address" /></div>
            <div className="grid grid-cols-3 gap-4">
              <div><Label>City</Label><Input placeholder="City" /></div>
              <div><Label>State</Label><Input placeholder="State" /></div>
              <div><Label>PIN Code</Label><Input placeholder="600001" /></div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
              <Button className="flex-1" onClick={() => setStep(2)}>
                Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display">{t('checkout.payment', lang)}</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              <div className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-border'
              }`}>
                <RadioGroupItem value="upi" id="upi" />
                <Smartphone className="h-5 w-5 text-primary" />
                <Label htmlFor="upi" className="cursor-pointer flex-1">
                  <div className="font-medium">UPI Payment</div>
                  <div className="text-sm text-muted-foreground">Pay via Google Pay, PhonePe, Paytm</div>
                </Label>
              </div>
              <div className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border'
              }`}>
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="h-5 w-5 text-accent" />
                <Label htmlFor="card" className="cursor-pointer flex-1">
                  <div className="font-medium">Credit/Debit Card</div>
                  <div className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</div>
                </Label>
              </div>
            </RadioGroup>

            <Separator />
            <div className="flex justify-between items-center text-lg">
              <span className="font-display font-semibold">{t('checkout.total', lang)}</span>
              <span className="font-bold text-primary text-2xl">₹{total}</span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1" onClick={handlePlaceOrder}>
                {t('checkout.placeOrder', lang)} · ₹{total}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
