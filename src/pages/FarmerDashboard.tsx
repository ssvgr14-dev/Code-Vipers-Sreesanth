import { useState } from 'react';
import { Plus, IndianRupee, Package, TrendingUp, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import MandiPriceWidget from '@/components/MandiPriceWidget';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import { mockProducts, mandiPrices } from '@/data/mockData';
import { toast } from 'sonner';

export default function FarmerDashboard() {
  const { state } = useApp();
  const lang = state.language;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cropName, setCropName] = useState('');
  const [category, setCategory] = useState('Vegetables');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [harvestDate, setHarvestDate] = useState('');

  const myProducts = mockProducts.filter(p => p.farmerName === 'Ravi Kumar');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Produce listed successfully! Awaiting admin approval.');
    setDialogOpen(false);
    setCropName('');
    setPrice('');
    setQuantity('');
  };

  // Find matching crop name for mandi price
  const matchedCrop = Object.keys(mandiPrices).find(k => cropName.toLowerCase().includes(k.toLowerCase()));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">{t('farmer.title', lang)}</h1>
          <p className="text-muted-foreground">Welcome back, Ravi Kumar</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t('farmer.addProduce', lang)}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">{t('farmer.addProduce', lang)}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>{t('farmer.cropName', lang)}</Label>
                <Input value={cropName} onChange={e => setCropName(e.target.value)} placeholder="e.g. Tomato" required />
              </div>
              <div>
                <Label>{t('farmer.category', lang)}</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vegetables">{t('market.vegetables', lang)}</SelectItem>
                    <SelectItem value="Fruits">{t('market.fruits', lang)}</SelectItem>
                    <SelectItem value="Grains">{t('market.grains', lang)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('farmer.price', lang)}</Label>
                  <Input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="₹" required />
                </div>
                <div>
                  <Label>{t('farmer.quantity', lang)}</Label>
                  <Input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="KG" required />
                </div>
              </div>
              <div>
                <Label>{t('farmer.harvestDate', lang)}</Label>
                <Input type="date" value={harvestDate} onChange={e => setHarvestDate(e.target.value)} required />
              </div>
              <div>
                <Label>{t('farmer.image', lang)}</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag image here</p>
                </div>
              </div>

              {/* Mandi Price Widget */}
              {matchedCrop && (
                <MandiPriceWidget cropName={matchedCrop} yourPrice={Number(price) || 0} />
              )}

              <Button type="submit" className="w-full">{t('farmer.submit', lang)}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Earnings Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium text-muted-foreground">{t('farmer.earnings', lang)}</CardTitle>
            <IndianRupee className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display text-foreground">₹24,500</div>
            <p className="text-xs text-primary mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium text-muted-foreground">Active Listings</CardTitle>
            <Package className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display text-foreground">{myProducts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Products on marketplace</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium text-muted-foreground">Orders This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-leaf" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display text-foreground">18</div>
            <p className="text-xs text-primary mt-1">+5 from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* My Products */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display">My Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price/KG</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myProducts.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    <span className="mr-2">{p.image}</span>{p.name}
                  </TableCell>
                  <TableCell>₹{p.pricePerKg}</TableCell>
                  <TableCell>{p.availableQty} kg</TableCell>
                  <TableCell>
                    <Badge variant={p.isApproved ? 'default' : 'secondary'}>
                      {p.isApproved ? 'Approved' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch checked={p.isAvailable} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
