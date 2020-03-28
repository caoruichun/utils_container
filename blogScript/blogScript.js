const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
    headless: false,
    slowMo:250,//slowMo选项以指定的毫秒减慢Puppeteer的操作
    defaultViewport:{width:1366,height:768}
  }); // 启动puppeteer
  const page = await browser.newPage(); // 通过浏览器对象打开一个tab
  await page.goto('https://modupantu.top/'); // 输入地址并回车访问
 
  while(true){
    await page.waitFor(2000);
    page.click('#site-name');
  }
  // await page.waitFor(1000);
  // page.click('.menu-item-categories>a');
  // await page.goto('https://onlyloveacat.com/2020/01/11/docker-dockerfile/#more'); // 输入地址并回车访问
  // await page.waitFor(1000);
  // page.click('#menu>li>a');
  // await page.goto('https://onlyloveacat.com/2019/12/09/docker-install/#more'); // 输入地址并回车访问
  // await page.type('.menu>a', musicName, {delay: 0});
  // await page.screenshot({
  //   path: 'example.png'
  // }); // 截取一个png网页截图

  // await browser.close(); // 最后关闭浏览器
})();