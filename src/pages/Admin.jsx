import { useState } from "react";

function Admin({ addAd, useGoogleAds, setUseGoogleAds }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [placement, setPlacement] = useState("hero");
  const [ctaText, setCtaText] = useState("Learn More");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description)
      return alert("Please fill in the required fields");

    const newAd = {
      id: Date.now(),
      title,
      description,
      image: image || "https://via.placeholder.com/800x400",
      placement,
      ctaText,
    };

    addAd(newAd);

    // Reset Form
    setTitle("");
    setDescription("");
    setImage("");
    alert("Ad created successfully!");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto min-h-screen bg-gray-50/50">
      {/* ⚡ HEADER SECTION */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-gray-900">Campaign Manager</h1>
        <p className="text-gray-500 mt-2">
          Control how your users see advertisements
        </p>
      </div>

      {/* ⚡ MODE TOGGLE CARD */}
      <div
        className={`p-6 rounded-3xl mb-8 flex items-center justify-between border-2 transition-all duration-500 ${
          useGoogleAds
            ? "bg-yellow-50 border-yellow-200 shadow-lg shadow-yellow-100"
            : "bg-blue-50 border-blue-200 shadow-lg shadow-blue-100"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${useGoogleAds ? "bg-yellow-400" : "bg-blue-600 text-white"}`}
          >
            {useGoogleAds ? "G" : "C"}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">
              Ad Delivery Mode
            </h3>
            <p className="text-sm text-gray-600">
              Switch between <span className="font-bold">Google AdSense</span>{" "}
              and <span className="font-bold">Custom Banners</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => setUseGoogleAds(!useGoogleAds)}
          className={`px-8 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-md ${
            useGoogleAds
              ? "bg-white text-yellow-700 hover:bg-yellow-100"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {useGoogleAds ? "Enable Custom Ads" : "Enable Google Ads"}
        </button>
      </div>

      {!useGoogleAds ? (
        <div className="bg-white p-8 shadow-2xl shadow-gray-200 rounded-[2.5rem] border border-gray-100 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-green-500 rounded-full inline-block"></span>
            Create Custom Ad
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ad Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Ad Campaign Title
              </label>
              <input
                type="text"
                placeholder="e.g. Summer Sale 2024"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-gray-200 border-2 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                required
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Banner Image URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border-gray-200 border-2 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Description / Subtext
              </label>
              <textarea
                placeholder="Tell your customers why they should click..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border-gray-200 border-2 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all h-32"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Placement Select */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Website Placement
                </label>
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value)}
                  className="w-full border-gray-200 border-2 p-4 rounded-2xl focus:border-blue-500 bg-white outline-none transition-all cursor-pointer"
                >
                  <option value="hero">Top Hero Banner</option>
                  <option value="sidebar">Sidebar Widget</option>
                  <option value="bottom">Bottom Grid</option>
                </select>
              </div>

              {/* CTA Select */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Button Action Text
                </label>
                <select
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  className="w-full border-gray-200 border-2 p-4 rounded-2xl focus:border-blue-500 bg-white outline-none transition-all cursor-pointer"
                >
                  <option value="Learn More">Learn More</option>
                  <option value="Buy Now">Buy Now </option>
                  <option value="Get Started">Get Started </option>
                  <option value="Download">Download Now </option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-[0.98] mt-4"
            >
              Publish Ad Campaign
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-yellow-200 text-center space-y-4">
          <div className="text-5xl"></div>
          <h2 className="text-xl font-bold text-gray-800">
            Google AdSense Mode Active
          </h2>
          <p className="text-gray-500 max-w-sm mx-auto">
            In this mode, your custom ads are hidden. Your website is currently
            configured to display dynamic ad units from your Google AdSense
            account.
          </p>
        </div>
      )}
    </div>
  );
}

export default Admin;
