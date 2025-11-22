from playwright.sync_api import sync_playwright

def scrape_amazon(url: str):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, timeout=60000)

        # title
        try:
            title = page.locator("#productTitle").inner_text().strip()
        except:
            title = "Unknown Product"

        # price
        price = None
        selectors = [
            "#priceblock_ourprice",
            "#priceblock_dealprice",
            ".a-price .a-offscreen",
        ]
        for s in selectors:
            try:
                txt = page.locator(s).first.inner_text().strip()
                price = float(txt.replace("₹", "").replace(",", ""))
                break
            except:
                pass

        # image
        try:
            image = page.locator("#landingImage").get_attribute("src")
        except:
            image = None

        browser.close()

        return {
            "platform": "Amazon",
            "title": title,
            "price": price,
            "image": image,
            "url": url,
        }
