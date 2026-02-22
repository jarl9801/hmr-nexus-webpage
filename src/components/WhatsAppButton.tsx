import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WhatsAppButton() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = '+4917631524448';

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Quick Actions Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-[#0a1220] border border-white/10 rounded-xl p-3 mb-2 min-w-[180px]"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium text-sm">{t('whatsapp.helpTitle')}</span>
              <button onClick={() => setIsOpen(false)} className="text-[#64748b]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {[
                { key: 'fiber', text: t('whatsapp.options.fiber') },
                { key: 'bot', text: t('whatsapp.options.bot') },
                { key: 'custom', text: t('whatsapp.options.custom') },
              ].map((option, index) => (
                <motion.a
                  key={option.key}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(t(`whatsapp.messages.${option.key}`))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 rounded-lg bg-white/5 text-[#94a3b8] text-sm hover:bg-white/10 transition-colors"
                >
                  {option.text}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative overflow-hidden w-12 h-12 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg transition-colors"
        aria-label="WhatsApp"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.4, 1.4], opacity: [0.4, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        <MessageCircle className="w-6 h-6 text-white fill-white" />
      </button>
    </div>
  );
}
