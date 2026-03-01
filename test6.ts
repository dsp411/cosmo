import https from 'https';

const req = https.request('https://example.com', { method: 'HEAD', rejectUnauthorized: false }, (response) => {
  const cert = (response.socket as any).getPeerCertificate?.();
  console.log(cert?.subject);
});
req.on('error', console.error);
req.end();
