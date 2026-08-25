import fs from "fs";
import https from "https";

const ICONS = [
  "google-analytics",
  "google-tag-manager",
  "google-search-console",
  "google-ads",
  "meta",
  "line",
  "google-maps",
  "supabase",
  "apple",
  "microsoft",
  "android"
];

function fetchSvg(name) {
  return new Promise((resolve) => {
    const url = `https://thesvg.org/icons/${name}/default.svg`;
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ name, svg: data }));
      } else {
        resolve({ name, error: res.statusCode });
      }
    }).on("error", (err) => resolve({ name, error: err.message }));
  });
}

async function run() {
  const results = {};
  for (const name of ICONS) {
    const res = await fetchSvg(name);
    results[name] = res;
    console.log(`Fetched ${name}: ${res.svg ? "SUCCESS (" + res.svg.length + " bytes)" : "ERROR: " + res.error}`);
  }
  fs.writeFileSync("scripts/fetched-svgs.json", JSON.stringify(results, null, 2));
}

run();
