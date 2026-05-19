import { useState, useCallback } from 'react';
import { copyText } from '@/lib/utils';
export function useCopy(ms = 2000) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback((text: string) => {
    copyText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), ms);
  }, [ms]);
  return { copied, copy };
}
