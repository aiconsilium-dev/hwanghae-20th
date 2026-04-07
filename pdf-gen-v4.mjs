import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.goto('http://localhost:8998/index.html', { waitUntil: 'networkidle0', timeout: 30000 });

// 폰트 로딩 대기
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1500));

await page.pdf({
  path: '/tmp/hwanghae-20th/hwanghae-20th-v4.pdf',
  format: 'A4',
  margin: { top: '15mm', bottom: '15mm', left: '14mm', right: '14mm' },
  printBackground: true
});

await browser.close();
console.log('PDF 생성 완료: /tmp/hwanghae-20th/hwanghae-20th-v4.pdf');
