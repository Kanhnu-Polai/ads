import React, { useMemo, useEffect } from "react";

/* ===============================
   Real Google AdSlot Component
================================= */
const GoogleAdSlot = ({ adSlotId }) => {
  useEffect(() => {
    if (!window.adsbygoogle) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [adSlotId]);

  return (
    <div className="ad-container overflow-hidden my-4 flex justify-center min-h-[100px] w-full bg-gray-50 rounded-xl">
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-8189716382630994"   
        data-ad-slot={adSlotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

/* ===============================
   Custom Ad Card Component
================================= */
const AdCard = ({ ad, variant }) => {
  const imageUrl = ad.image || "https://via.placeholder.com/600x400";

  if (variant === "sidebar") {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border p-2 transition hover:shadow-lg">
        <img
          src={imageUrl}
          alt=""
          className="w-full h-32 object-cover rounded-xl"
        />
        <div className="p-3">
          <h3 className="font-bold text-gray-800">{ad.title}</h3>
          <p className="text-xs text-gray-500 line-clamp-2">{ad.description}</p>
          <button className="mt-3 w-full bg-blue-50 text-blue-600 py-2 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white transition">
            {ad.ctaText || "Learn More"}
          </button>
        </div>
      </div>
    );
  }

  if (variant === "bottom") {
    return (
      <div className="bg-white rounded-2xl shadow-lg flex overflow-hidden border transition hover:scale-[1.01]">
        <img src={imageUrl} alt="" className="w-1/3 object-cover" />
        <div className="p-6 flex-1">
          <h3 className="text-xl font-bold text-gray-800">{ad.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{ad.description}</p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition">
            {ad.ctaText || "Shop Now"}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

/* ===============================
   Main Home Page
================================= */
function Home({ ads = [], useGoogleAds }) {
  const groupedAds = useMemo(() => {
    return ads.reduce((acc, ad) => {
      acc[ad.placement] = acc[ad.placement] || [];
      acc[ad.placement].push(ad);
      return acc;
    }, {});
  }, [ads]);

  const { hero = [], sidebar = [], bottom = [] } = groupedAds;

  // ✅ USE YOUR REAL SLOT ID HERE
  const ADSENSE_IDS = {
    HERO: "9637993193",
    SIDEBAR: "9637993193",
    BOTTOM: "9637993193",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-12">

      {/* HERO SECTION */}
      <section>
        {useGoogleAds ? (
          <GoogleAdSlot adSlotId={ADSENSE_IDS.HERO} />
        ) : (
          hero.map((ad) => (
            <div
              key={ad.id}
              className="relative w-full h-[400px] rounded-3xl overflow-hidden bg-black text-white shadow-xl"
            >
              <img
                src={ad.image || "https://via.placeholder.com/1200x400"}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                alt={ad.title}
              />
              <div className="relative p-12 flex flex-col justify-center h-full">
                <h2 className="text-4xl font-bold mb-2">{ad.title}</h2>
                <p className="max-w-xl text-gray-200">{ad.description}</p>
                <button className="mt-6 bg-blue-600 px-8 py-3 rounded-full w-fit font-bold hover:bg-blue-500 transition shadow-lg">
                  {ad.ctaText || "Learn More"}
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* MAIN + SIDEBAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <main className="md:col-span-3 bg-white p-10 rounded-3xl shadow-sm border border-gray-100 min-h-[400px]">
          <h1 className="text-3xl font-black text-gray-900 mb-6">
            Main Website Feed
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Welcome to your dashboard. This area represents your actual website
            content, while the ads are injected dynamically around it.
          </p>
        </main>

        <aside className="space-y-6">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">
            Sponsored
          </h4>
          {useGoogleAds ? (
            <GoogleAdSlot adSlotId={ADSENSE_IDS.SIDEBAR} />
          ) : (
            sidebar.map((ad) => (
              <AdCard key={ad.id} ad={ad} variant="sidebar" />
            ))
          )}
        </aside>
      </div>

      {/* BOTTOM SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {useGoogleAds ? (
          <>
            <GoogleAdSlot adSlotId={ADSENSE_IDS.BOTTOM} />
            <GoogleAdSlot adSlotId={ADSENSE_IDS.BOTTOM} />
          </>
        ) : (
          bottom.map((ad) => (
            <AdCard key={ad.id} ad={ad} variant="bottom" />
          ))
        )}
      </section>
    </div>
  );
}

export default Home;
