from playwright.async_api import async_playwright

async def scrape_flipkart(url: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        await page.goto(url, timeout=60000)

        # Title
        try:
            title = await page.locator("span.B_NuCI").inner_text()
            title = title.strip()
        except:
            title = "Unknown Product"

        # Price
        try:
            txt = await page.locator("._30jeq3._16Jk6d").inner_text()
            price = float(txt.replace("₹", "").replace(",", ""))
        except:
            price = None

        # Image
        try:
            image = await page.locator("._396cs4._2amPTt").get_attribute("src")
        except:
            image = None

        await browser.close()

        return {
            "platform": "Flipkart",
            "title": title,
            "price": price,
            "image": image,
            "url": url,
        }
