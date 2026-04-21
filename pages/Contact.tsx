
import React, { useState } from 'react';
import { motion as motionLib, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Phone, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

// Fix: Use a casted version of motion to avoid type errors with motion-specific props
const motion = motionLib as any;

interface GlassInputBlockProps {
  label: string;
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  error?: string;
}

const GlassInputBlock: React.FC<GlassInputBlockProps> = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  isTextArea = false, 
  onFocus, 
  onBlur, 
  isFocused,
  error 
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center px-5">
        <span className="text-[11px] uppercase tracking-[0.4em] text-black font-bold drop-shadow-sm">{label}</span>
        <AnimatePresence>
          {error && (
            <motion.span 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-[10px] text-red-500 font-bold uppercase tracking-widest flex items-center gap-1"
            >
              <AlertCircle size={10} /> {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        animate={{
          backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.45)',
          borderColor: error ? 'rgba(239, 68, 68, 0.4)' : (isFocused ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.15)'),
          y: isFocused ? -2 : 0,
          boxShadow: isFocused 
            ? '0 25px 50px -15px rgba(0,0,0,0.15), inset 0 0 25px rgba(255,255,255,0.6)' 
            : '0 8px 20px -4px rgba(0,0,0,0.08), inset 0 0 15px rgba(255,255,255,0.4)'
        }}
        className="backdrop-blur-3xl rounded-[32px] overflow-hidden border transition-all duration-500"
      >
        {isTextArea ? (
          <textarea
            rows={4}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className="w-full bg-transparent px-8 py-5 outline-none text-black font-semibold placeholder:text-neutral-600 resize-none text-base"
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className="w-full bg-transparent px-8 py-5 outline-none text-black font-semibold placeholder:text-neutral-600 text-base"
          />
        )}
      </motion.div>
    </div>
  );
};

const Contact: React.FC = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Email validation helper
  const validateEmailFormat = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!validateEmailFormat(formData.email)) {
      newErrors.email = "Invalid format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Required";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Min 10 digits";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Too short";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error as user types
    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleBlurEmail = () => {
    setFocusedField(null);
    if (formData.email.trim() && !validateEmailFormat(formData.email)) {
      setErrors(prev => ({ ...prev, email: "Invalid format" }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    handleInputChange('phone', numericValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset form after success
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      message: ''
    });
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="pt-40 px-8 pb-32 min-h-screen bg-[#f5f7f5]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        
        {/* Contact Info */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl serif mb-10 leading-tight text-neutral-900">Start the <br /> <span className="italic">Dialogue.</span></h1>
            
            <div className="space-y-12 mt-16">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-lg flex items-center justify-center flex-shrink-0 border border-black/20 shadow-lg">
                  <MapPin size={24} className="text-black" />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-black mb-2 text-black">Our Studio</h4>
                  <p className="text-neutral-900 font-bold text-sm">Suite 402, The Obsidian Plaza<br />Design District, NY 10011</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-lg flex items-center justify-center flex-shrink-0 border border-black/20 shadow-lg">
                  <Mail size={24} className="text-black" />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-black mb-2 text-black">Inquiries</h4>
                  <p className="text-neutral-900 font-bold text-sm">hello@studioshar.com<br />press@studioshar.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-lg flex items-center justify-center flex-shrink-0 border border-black/20 shadow-lg">
                  <Phone size={24} className="text-black" />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-black mb-2 text-black">Call Us</h4>
                  <p className="text-neutral-900 font-bold text-sm">+1 (212) 555-0198</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Form Card */}
        <div className="flex-1 w-full max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-white/40 backdrop-blur-[80px] p-8 md:p-14 rounded-[60px] border border-black/10 shadow-[0_50px_150px_-30px_rgba(0,0,0,0.2)] relative overflow-hidden"
          >
            {/* Matte depth overlay */}
            <div className="absolute inset-0 bg-white/20 pointer-events-none mix-blend-overlay" />
            
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="relative z-10 flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 border border-green-200">
                    <CheckCircle2 size={48} className="text-green-500" />
                  </div>
                  <h3 className="text-4xl serif mb-4 text-neutral-900">Message Received.</h3>
                  <p className="text-neutral-600 font-light max-w-xs mx-auto">Thank you for reaching out. Sharon will be in touch shortly to discuss your vision.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-12 text-[10px] uppercase tracking-[0.4em] font-black text-neutral-400 hover:text-black transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8 relative z-10"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <GlassInputBlock 
                      label="First Name" 
                      placeholder="Sharon" 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      onFocus={() => setFocusedField('fn')}
                      onBlur={() => setFocusedField(null)}
                      isFocused={focusedField === 'fn'}
                      error={errors.firstName}
                    />
                    <GlassInputBlock 
                      label="Last Name" 
                      placeholder="Sethi" 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      onFocus={() => setFocusedField('ln')}
                      onBlur={() => setFocusedField(null)}
                      isFocused={focusedField === 'ln'}
                      error={errors.lastName}
                    />
                  </div>

                  <GlassInputBlock 
                    label="Contact Number" 
                    type="text"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter numbers only" 
                    onFocus={() => setFocusedField('tel')}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === 'tel'}
                    error={errors.phone}
                  />

                  <GlassInputBlock 
                    label="Email Address" 
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="sharon@example.com" 
                    onFocus={() => setFocusedField('email')}
                    onBlur={handleBlurEmail}
                    isFocused={focusedField === 'email'}
                    error={errors.email}
                  />

                  <GlassInputBlock 
                    label="Tell us about your project" 
                    placeholder="Describe your vision..." 
                    isTextArea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onFocus={() => setFocusedField('msg')}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === 'msg'}
                    error={errors.message}
                  />

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 30px 70px -15px rgba(255, 40, 100, 0.7)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 py-7 rounded-[35px] flex items-center justify-center gap-4 text-sm uppercase tracking-[0.5em] font-black text-white relative overflow-hidden group shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 50, 120, 1) 0%, rgba(220, 0, 70, 1) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    <span className="relative z-10 drop-shadow-lg">
                      {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                    </span>
                    {!isSubmitting && <Send size={20} className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 drop-shadow-lg" />}
                    
                    {/* Enhanced Liquid Light Sweep Animation */}
                    <motion.div 
                      animate={{ 
                        x: ['-250%', '250%'],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2.5, 
                        ease: "easeInOut" 
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent skew-x-[-35deg] pointer-events-none"
                    />

                    {/* Shimmer Pulse */}
                    <motion.div
                      animate={{ opacity: [0.4, 0.6, 0.4] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="absolute inset-0 bg-white/20 pointer-events-none"
                    />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
