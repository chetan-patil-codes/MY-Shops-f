import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { chromium } from "playwright";

const APP_BASE_URL = process.env.APP_BASE_URL || "http://127.0.0.1:3000";
const API_BASE_URL = process.env.API_BASE_URL || "http://127.0.0.1:8000";
const OUT_DIR = process.env.SMOKE_OUT_DIR || path.join(process.cwd(), "smoke-artifacts");

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Fetch failed ${res.status} ${url}\n${body.slice(0, 400)}`);
  }
  return res.json();
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const products = await fetchJson(`${API_BASE_URL}/products`);
  const firstSlug = products?.products?.[0]?.slug;
  if (!firstSlug) {
    throw new Error("No products returned from backend; cannot verify product detail page.");
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const targets = [
    { name: "home", url: `${APP_BASE_URL}/` },
    { name: "products", url: `${APP_BASE_URL}/products` },
    { name: "product-detail", url: `${APP_BASE_URL}/products/${encodeURIComponent(firstSlug)}` }
  ];

  const results = [];
  for (const target of targets) {
    const response = await page.goto(target.url, { waitUntil: "networkidle" });
    const status = response?.status() ?? null;
    await page.setViewportSize({ width: 1365, height: 768 });
    await page.waitForTimeout(300);

    const screenshotPath = path.join(OUT_DIR, `${target.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const title = await page.title();
    results.push({ ...target, status, title, screenshotPath });
  }

  await browser.close();

  const reportPath = path.join(OUT_DIR, "report.json");
  await writeFile(reportPath, JSON.stringify({ appBaseUrl: APP_BASE_URL, results }, null, 2), "utf8");

  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ ok: true, reportPath, results }, null, 2));
}

await main();

