var puppeteer       = require('puppeteer');  
 
    takeDashSnapshot("https://amazon.com", "poc.png", {height: 600, width: 1000})

function takeDashSnapshot(url, fileName, dim){
    (async() => {
        try{ 
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            // Get the "viewport" of the page, as reported by the page.
            if(!dim){
                dim = await page.evaluate(() => {
                    return {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight,
                    deviceScaleFactor: window.devicePixelRatio
                    };
                });
            }
            await page.setViewport({width: dim.width, height: dim.height, deviceScaleFactor: dim.deviceScaleFactor});
            //await page.goto('file:///'+filepath+filename', {"waitUntil" : "networkidle0",timeout: 300000});
            await page.goto(url, {"waitUntil" : "networkidle0",timeout: 300000});
            await page.screenshot({path: fileName});
            browser.close();
            //var res = fs.existsSync(fnPngPath); 
        }catch(e){
            console.log(e);
        }
    })();
}