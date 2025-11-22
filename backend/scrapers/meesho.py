from playwright.async_api import async_playwright

async def scrape_meesho(url: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        await page.goto(url, timeout=60000)

        # Title
        try:
            title = await page.locator("h1").first.inner_text()
            title = title.strip()
        except:
            title = "Unknown Product"

        # Price
        try:
            txt = await page.locator("h4").first.inner_text()
            price = float(txt.replace("₹", "").replace(",", ""))
        except:
            price = None

        # Image
        try:
            image = await page.locator("img").first.get_attribute("src")
        except:
            image = None

        await browser.close()

        return {
            "platform": "Meesho",
            "title": title,
            "price": price,
            "image": image,
            "url": url,
        }
