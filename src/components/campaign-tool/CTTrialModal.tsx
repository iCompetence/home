'use client'

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CTTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'trial' | 'demo';
}

export const CTTrialModal = ({ isOpen, onClose, mode = 'trial' }: CTTrialModalProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset and close after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
      onClose();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 9999 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '40px',
          backgroundColor: '#012332',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          animation: 'modalFadeIn 0.3s ease-out'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-all duration-300 hover:bg-white/10 cursor-pointer"
          style={{ background: 'transparent', border: 'none' }}
        >
          <X size={20} style={{ color: 'var(--gray-white)' }} />
        </button>

        {/* Header */}
        <h2
          style={{
            color: 'var(--gray-white)',
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}
        >
          {mode === 'demo' ? t('ct.demo.modal.title') : t('ct.trial.modal.title')}
        </h2>
        <p
          style={{
            color: 'var(--gray-light)',
            fontSize: '16px',
            marginBottom: '2rem'
          }}
        >
          {mode === 'demo' ? t('ct.demo.modal.subtitle') : t('ct.trial.modal.subtitle')}
        </p>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(11, 153, 204, 0.2)' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0b99cc" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p style={{ color: 'var(--gray-white)', fontSize: '18px', fontWeight: '500' }}>
              {t('ct.trial.modal.success')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  color: 'var(--gray-white)',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}
              >
                {t('ct.trial.modal.name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--gray-white)',
                  fontSize: '16px',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#0b99cc';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  color: 'var(--gray-white)',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}
              >
                {t('ct.trial.modal.email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--gray-white)',
                  fontSize: '16px',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#0b99cc';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* Company Field */}
            <div className="mb-4">
              <label
                htmlFor="company"
                style={{
                  display: 'block',
                  color: 'var(--gray-white)',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}
              >
                {t('ct.trial.modal.company')} *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--gray-white)',
                  fontSize: '16px',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#0b99cc';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* Message Field (Optional) */}
            <div className="mb-6">
              <label
                htmlFor="message"
                style={{
                  display: 'block',
                  color: 'var(--gray-white)',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}
              >
                {t('ct.trial.modal.message')} ({t('ct.trial.modal.optional')})
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg transition-all duration-300 resize-none"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--gray-white)',
                  fontSize: '16px',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#0b99cc';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: isSubmitting ? '#b87d5c' : '#e19b74',
                color: 'var(--gray-white)',
                fontSize: '16px',
                fontWeight: '500',
                border: 'none',
                opacity: isSubmitting ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) e.currentTarget.style.backgroundColor = '#d18a63';
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) e.currentTarget.style.backgroundColor = '#e19b74';
              }}
            >
              {isSubmitting ? t('ct.trial.modal.submitting') : (mode === 'demo' ? t('ct.demo.modal.submit') : t('ct.trial.modal.submit'))}
            </button>
          </form>
        )}
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
