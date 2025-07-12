'use client';

import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useRef } from 'react';

type Props = {
  fps?: number;
  qrbox?: number;
  disableFlip?: boolean;
  aspectRatio?: number;
  verbose?: boolean;
  qrCodeSuccessCallback: (decodedText: string) => void;
  qrCodeErrorCallback?: (errorMessage: string) => void;
};

const divId = 'html5qr-code-full-region';

export const Html5QrcodePlugin = ({
  fps,
  qrbox,
  disableFlip,
  aspectRatio,
  verbose,
  qrCodeSuccessCallback,
  qrCodeErrorCallback,
}: Props) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const config: any = {};
    if (fps !== undefined) config.fps = fps;
    if (qrbox !== undefined) config.qrbox = qrbox;
    if (disableFlip !== undefined) config.disableFlip = disableFlip;
    if (aspectRatio !== undefined) config.aspectRatio = aspectRatio;

    const scanner = new Html5QrcodeScanner(divId, config, verbose === true);
    scannerRef.current = scanner;

    scanner.render(
      (decodedText: string) => {
        scanner.clear().then(() => {
          qrCodeSuccessCallback(decodedText);
        }).catch(console.error);
      },
      qrCodeErrorCallback,
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [
    fps,
    qrbox,
    disableFlip,
    aspectRatio,
    verbose,
    qrCodeSuccessCallback,
    qrCodeErrorCallback,
  ]);

  return <div id={divId} />;
};
