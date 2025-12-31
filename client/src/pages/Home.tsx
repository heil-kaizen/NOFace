import { useState } from "react";
import { useCreateCard, useRecentCards } from "@/hooks/use-cards";
import { Marquee } from "@/components/Marquee";
import { TerminalButton } from "@/components/TerminalButton";
import { TerminalCard } from "@/components/TerminalCard";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  Terminal, 
  ShieldAlert, 
  Ghost, 
  Lock, 
  Globe, 
  Wallet,
  ArrowRight,
  Wifi,
  Cpu
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CARD_OPTIONS = [
  { value: 10, tokens: 9000 },
  { value: 25, tokens: 22500 },
  { value: 50, tokens: 45000 },
];

export default function Home() {
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const { mutate: generateCard } = useCreateCard();
  const { data: recentCards } = useRecentCards();
  const { toast } = useToast();

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate terminal delay
    setTimeout(() => {
      generateCard(
        { 
          amount: selectedAmount, 
          tokenAmount: CARD_OPTIONS.find(c => c.value === selectedAmount)?.tokens || 0 
        },
        {
          onSuccess: (data) => {
            setIsGenerating(false);
            toast({
              title: "SEQUENCE COMPLETE",
              description: `VIRTUAL CARD GENERATED. ID: ${data.id}`,
              className: "bg-background border-primary text-primary font-mono",
            });
          },
          onError: (error) => {
            setIsGenerating(false);
            toast({
              title: "SEQUENCE FAILED",
              description: error.message,
              variant: "destructive",
            });
          }
        }
      );
    }, 2000);
  };

  const selectedOption = CARD_OPTIONS.find(opt => opt.value === selectedAmount);

  return (
    <div className="min-h-screen flex flex-col font-mono selection:bg-primary selection:text-background">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <Marquee text="NO HISTORY • NO NAME • $NOFACE • ADULT CONTENT • 秘密 • VIRTUAL CARD • ANONYMOUS PAYMENTS • " />
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Ghost className="w-6 h-6 animate-pulse" />
            <h1 className="text-2xl font-bold tracking-tighter text-glitch" data-text="NOFACE">NOFACE</h1>
          </div>
          
          <nav className="hidden md:flex gap-8 text-sm font-bold tracking-wider">
            {["ABOUT", "HOW IT WORKS", "FAQ", "STAKING", "DOCS"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`} className="hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4">
                {item}
              </a>
            ))}
          </nav>

          <TerminalButton variant="outline" className="hidden sm:flex text-xs py-2 px-4">
            <Wallet className="w-4 h-4 mr-2" />
            SELECT WALLET
          </TerminalButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:pt-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 text-xs font-bold border border-primary/30 px-3 py-1 mb-6 text-primary">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                SYSTEM ONLINE
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
                NO NAME.<br />
                <span className="text-primary text-glitch" data-text="NO SHAME.">NO SHAME.</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed">
                The decentralized privacy layer for the digital underworld. 
                Generate disposable virtual cards instantly. No KYC. No history.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              {["ADULT SITES", "GAMES", "STREAMING", "VPN"].map((tag) => (
                <div key={tag} className="border border-border px-4 py-2 text-xs font-bold bg-muted/20">
                  [{tag}]
                </div>
              ))}
            </div>
            
            <div className="h-px w-full bg-border/50" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
               <div>
                 <p className="font-bold text-primary">TOTAL VOLUME</p>
                 <p>$4,204,921</p>
               </div>
               <div>
                 <p className="font-bold text-primary">ACTIVE CARDS</p>
                 <p>12,492</p>
               </div>
            </div>
          </div>

          {/* Right Content - Interactive Portal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <TerminalCard title="PAYMENT_PORTAL_V1.0" className="bg-black border-primary/50 shadow-[0_0_30px_rgba(255,248,223,0.1)]">
              {isGenerating ? (
                <div className="h-[400px] flex flex-col items-center justify-center space-y-6 text-center">
                  <Cpu className="w-16 h-16 animate-spin text-primary" />
                  <div className="space-y-2">
                    <p className="text-lg font-bold animate-pulse">INITIATING SEQUENCE...</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      ENCRYPTING METADATA<br/>
                      MASKING ORIGIN IP<br/>
                      GENERATING BIN
                    </p>
                  </div>
                  <div className="w-full max-w-[200px] h-1 bg-muted overflow-hidden">
                    <div className="h-full bg-primary animate-progress" />
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold">GENERATE CARD</h3>
                    <p className="text-xs text-muted-foreground">SELECT DENOMINATION</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {CARD_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedAmount(opt.value)}
                        className={`
                          py-4 border-2 font-bold text-xl transition-all relative
                          ${selectedAmount === opt.value 
                            ? "border-primary bg-primary text-background shadow-[4px_4px_0_0_rgba(255,255,255,0.5)]" 
                            : "border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary"}
                        `}
                      >
                        ${opt.value}
                        {selectedAmount === opt.value && (
                          <div className="absolute top-1 right-1 w-2 h-2 bg-background rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="bg-muted/30 p-4 border border-border space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>COST IN $NOFACE:</span>
                      <span className="font-bold">{selectedOption?.tokens.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>GAS ESTIMATE:</span>
                      <span>~0.002 ETH</span>
                    </div>
                    <div className="w-full h-px bg-border my-2" />
                    <div className="flex justify-between text-lg font-bold text-primary">
                      <span>TOTAL:</span>
                      <span>${selectedAmount} USD</span>
                    </div>
                  </div>

                  <TerminalButton 
                    className="w-full py-4 text-lg" 
                    onClick={handleGenerate}
                  >
                    INITIATE SEQUENCE <ArrowRight className="w-5 h-5 ml-2" />
                  </TerminalButton>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase">
                    <Lock className="w-3 h-3" />
                    256-BIT ENCRYPTION • ZERO KNOWLEDGE PROOF
                  </div>
                </div>
              )}
            </TerminalCard>
          </motion.div>
        </div>
        
        {/* Background Grid Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-border/20 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-t border-border bg-muted/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-4">
                <Terminal className="w-8 h-8" />
                SYSTEM_LOGS
              </h2>
              <p className="text-lg leading-relaxed">
                Traditional finance leaves a trail. Every purchase is tracked, categorized, and sold to advertisers.
                <br /><br />
                <strong className="text-primary">NOFACE</strong> obliterates the trail. We provide a decentralized bridge between your crypto wallet and the fiat world.
              </p>
              <ul className="space-y-4 mt-8">
                {[
                  "No Personal Information Required",
                  "Instant Generation & Activation",
                  "Works Globally on All Major Gateways",
                  "Burner Cards Automatically Destroyed"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-primary font-bold">{`>`}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <TerminalCard title="RECENT_ACTIVITY_FEED" className="relative z-10 h-full">
                <div className="space-y-4 font-mono text-sm overflow-hidden">
                  <div className="flex justify-between text-muted-foreground border-b border-border pb-2 mb-4">
                    <span>TIME</span>
                    <span>TYPE</span>
                    <span>STATUS</span>
                  </div>
                  {recentCards?.map((card) => (
                    <motion.div 
                      key={card.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-muted-foreground">{new Date(card.createdAt).toLocaleTimeString()}</span>
                      <span>GENERATE_CARD_${card.amount}</span>
                      <span className="text-primary">CONFIRMED</span>
                    </motion.div>
                  )) || (
                     // Fallback/loading rows
                     Array.from({length: 5}).map((_, i) => (
                       <div key={i} className="flex justify-between items-center opacity-50">
                         <span>--:--:--</span>
                         <span>INITIALIZING...</span>
                         <span>PENDING</span>
                       </div>
                     ))
                  )}
                </div>
              </TerminalCard>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="how-it-works" className="py-24 px-4 bg-background relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">EXECUTION_PROTOCOL</h2>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { icon: Wallet, title: "HOLD TOKENS", desc: "Acquire $NOFACE" },
              { icon: Wifi, title: "CONNECT", desc: "Link Web3 Wallet" },
              { icon: ShieldAlert, title: "SELECT", desc: "Choose Amount" },
              { icon: Cpu, title: "GENERATE", desc: "Compute Hash" },
              { icon: CreditCard, title: "ACTIVATE", desc: "Spend Freely" },
            ].map((step, index) => (
              <div key={index} className="group relative">
                <div className="border border-border p-6 h-full hover:bg-muted/30 transition-colors flex flex-col items-center text-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-primary text-background flex items-center justify-center font-bold text-xl mb-2">
                    {index + 1}
                  </div>
                  <step.icon className="w-8 h-8 text-primary" />
                  <h3 className="font-bold text-lg">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
                {/* Connector Line */}
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-muted/5 border-t border-border">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-2">
            <span className="text-primary">?</span> KNOWLEDGE_BASE
          </h2>
          
          {[
            { q: "IS THIS REALLY ANONYMOUS?", a: "Yes. We do not collect names, emails, or phone numbers. The card is issued against a generic corporate bin." },
            { q: "WHERE CAN I USE THE CARD?", a: "Any merchant that accepts prepaid VISA/Mastercard globally, excluding specific restricted countries." },
            { q: "HOW DO I TOP UP?", a: "Cards are non-reloadable for security. Simply generate a new card sequence when depleted." },
            { q: "WHAT IF THE CARD FAILS?", a: "Funds are automatically returned to your wallet smart contract minus gas fees." }
          ].map((faq, i) => (
            <div key={i} className="border border-border p-6 hover:border-primary transition-colors cursor-pointer group">
              <h3 className="text-lg font-bold mb-2 flex items-center justify-between">
                {faq.q}
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">+</span>
              </h3>
              <p className="text-muted-foreground max-w-2xl">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-black pt-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-glitch" data-text="NOFACE">NOFACE</h2>
            <p className="text-muted-foreground text-sm">
              The last bastion of privacy in a surveillance economy.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-primary">PROTOCOL</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Audit Report</a></li>
              <li><a href="#" className="hover:text-primary">Whitepaper</a></li>
              <li><a href="#" className="hover:text-primary">Tokenomics</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">SOCIAL</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Twitter / X</a></li>
              <li><a href="#" className="hover:text-primary">Telegram</a></li>
              <li><a href="#" className="hover:text-primary">Discord</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">LEGAL</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <Marquee direction="right" text="END OF LINE • SYSTEM STANDBY • ENCRYPTION ACTIVE • " className="py-2 text-xs" />
      </footer>
    </div>
  );
}
