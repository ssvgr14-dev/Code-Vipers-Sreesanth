import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Leaf, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { t } from '@/lib/translations';
import heroImage from '@/assets/hero-farm.jpg';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Leaf,
    titleEn: 'Farm Fresh',
    titleTa: 'பண்ணை புத்தம்',
    descEn: 'Produce harvested within 24 hours, delivered straight from verified farms.',
    descTa: 'சரிபார்க்கப்பட்ட பண்ணைகளிலிருந்து நேரடியாக.',
  },
  {
    icon: Users,
    titleEn: 'Direct Connection',
    titleTa: 'நேரடி இணைப்பு',
    descEn: 'No middlemen. Fair prices for farmers, savings for consumers.',
    descTa: 'இடைத்தரகர்கள் இல்லை. விவசாயிகளுக்கு நியாயமான விலை.',
  },
  {
    icon: Shield,
    titleEn: 'Quality Assured',
    titleTa: 'தரம் உறுதி',
    descEn: 'Every farm is verified. Full traceability from farm to your table.',
    descTa: 'ஒவ்வொரு பண்ணையும் சரிபார்க்கப்பட்டது.',
  },
  {
    icon: Truck,
    titleEn: 'Quick Delivery',
    titleTa: 'விரைவான விநியோகம்',
    descEn: 'Distance-based sorting ensures you get the freshest, nearest produce.',
    descTa: 'தூரம் சார்ந்த வரிசையாக்கம்.',
  },
];

export default function Index() {
  const { state } = useApp();
  const lang = state.language;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Fresh farm produce" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-hero-gradient" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight">
              {t('hero.title', lang)}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 font-body leading-relaxed">
              {t('hero.subtitle', lang)}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8">
                <Link to="/marketplace">
                  {t('hero.cta', lang)}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8">
                <Link to="/farmer">{t('hero.cta2', lang)}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: '500+', label: 'Verified Farmers' },
            { val: '10K+', label: 'Happy Customers' },
            { val: '50+', label: 'Districts Covered' },
            { val: '₹2Cr+', label: 'Farmer Earnings' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">{s.val}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-foreground">
          Why Choose AgriDirect?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.titleEn}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                {lang === 'en' ? f.titleEn : f.titleTa}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {lang === 'en' ? f.descEn : f.descTa}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-earth-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-earth-foreground mb-4">
            Ready to go farm-fresh?
          </h2>
          <p className="text-earth-foreground/80 mb-8 max-w-lg mx-auto">
            Join thousands of families already enjoying fresh, traceable produce directly from local farms.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-10">
            <Link to="/marketplace">
              {t('hero.cta', lang)} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
