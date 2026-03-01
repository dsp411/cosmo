import { createServer } from 'vite';

async function test() {
  const vite = await createServer({
    server: { port: 3001 },
  });
  await vite.listen();
  
  const res = await fetch('http://localhost:3001/api/analyze', {
    method: 'POST',
    body: JSON.stringify({ url: 'https://example.com', feature: 'response_time' })
  });
  
  console.log(res.status);
  console.log(await res.text());
  await vite.close();
}

test();
