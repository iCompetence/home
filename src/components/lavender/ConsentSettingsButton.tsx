'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/design-system';

type Cmp = { showSecondLayer?: () => Promise<void> | void };

/**
 * Opens the consent settings of Usercentrics (its second layer). For the
 * privacy policy: the legal pages suppress the consent tool's own interface
 * (UC_UI_SUPPRESS_CMP_DISPLAY in app/[lang]/layout.tsx), so the fingerprint
 * button the other pages have is missing exactly where the text explains how
 * to change one's choice. Opening the settings by script works there too.
 * If the consent script is not in the page (blocked by the browser), a line
 * says so.
 */
export function ConsentSettingsButton() {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);

  const open = async () => {
    try {
      const cmp = (window as unknown as { __ucCmp?: Cmp }).__ucCmp;
      if (!cmp?.showSecondLayer) throw new Error('consent script missing');
      await cmp.showSecondLayer();
      setFailed(false);
    } catch {
      setFailed(true);
    }
  };

  return (
    <div data-ds="ConsentSettingsButton" className="flex flex-col items-start gap-4">
      <Button type="button" variant="soft" onClick={open}>
        {t('privacyPolicy.consent.open')}
      </Button>
      <p role="status" className="lav-small m-0 font-normal text-lav-navy/80 empty:hidden">
        {failed && t('privacyPolicy.consent.blocked')}
      </p>
    </div>
  );
}
