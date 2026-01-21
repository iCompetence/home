'use client'

import { Layers, Users, Link, Upload, BarChart2, CheckCircle, LinkIcon, FileText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Carousel } from '../Carousel';

export const CTFeatures = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: t('ct.features.item1.title'),
      description: t('ct.features.item1.description')
    },
    {
      title: t('ct.features.item2.title'),
      description: t('ct.features.item2.description')
    },
    {
      title: t('ct.features.item3.title'),
      description: t('ct.features.item3.description')
    },
    {
      title: t('ct.features.item4.title'),
      description: t('ct.features.item4.description')
    },
    {
      title: t('ct.features.item5.title'),
      description: t('ct.features.item5.description')
    },
    {
      title: t('ct.features.item6.title'),
      description: t('ct.features.item6.description')
    },
    {
      title: t('ct.features.item7.title'),
      description: t('ct.features.item7.description')
    },
    {
      title: t('ct.features.item8.title'),
      description: t('ct.features.item8.description')
    }
  ];

  return (
    <div style={{ backgroundColor: '#012332' }}>
      <Carousel
        id="features-section"
        title={t('ct.features.title')}
        items={features}
        slidesToShowDesktop={3}
        slidesToShowMobile={1}
      />
    </div>
  );
};
