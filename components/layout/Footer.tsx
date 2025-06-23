'use client';

import { motion } from 'framer-motion';
import { socialLinks } from '@/config/social';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            className="flex items-center space-x-1 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by Aaron A. Perez</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;