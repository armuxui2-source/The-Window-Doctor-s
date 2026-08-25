"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

interface ActiveIntegration {
  provider: string;
  public_id: string;
  is_active: boolean;
}

export default function DynamicIntegrationsLoader() {
  const [integrations, setIntegrations] = useState<ActiveIntegration[]>([]);

  useEffect(() => {
    async function loadActiveIntegrations() {
      try {
        const res = await fetch("/api/admin/integrations");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setIntegrations(json.data.filter((item: ActiveIntegration) => item.is_active && item.public_id));
        }
      } catch {
        // Silent catch in case of offline or local build
      }
    }
    loadActiveIntegrations();
  }, []);

  const ga4 = integrations.find((i) => i.provider === "ga4" && i.public_id);
  const gtm = integrations.find((i) => i.provider === "gtm" && i.public_id);
  const metaPixel = integrations.find((i) => i.provider === "meta_pixel" && i.public_id);
  const gsc = integrations.find((i) => i.provider === "gsc" && i.public_id);

  return (
    <>
      {/* 1. Google Search Console Verification Meta Tag */}
      {gsc && gsc.public_id && (
        <meta name="google-site-verification" content={gsc.public_id} />
      )}

      {/* 2. Google Analytics 4 */}
      {ga4 && ga4.public_id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4.public_id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4.public_id}', {
                page_path: window.location.pathname,
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      )}

      {/* 3. Google Tag Manager */}
      {gtm && gtm.public_id && (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtm.public_id}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtm.public_id}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* 4. Meta Pixel (Facebook) */}
      {metaPixel && metaPixel.public_id && (
        <>
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixel.public_id}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixel.public_id}&ev=PageView&noscript=1`}
              alt="meta-pixel"
            />
          </noscript>
        </>
      )}
    </>
  );
}
