// import * as functions from 'firebase-functions';

import { App as OctokitApp } from '@octokit/app';
import { request } from '@octokit/request';

const APP_ID = 45145;
const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAqsZlQNIIwJKUVgyUCiX99QltXPpPifSOyMlsNTdKe4vwS4uw
9MM6QM0YkEbDiiMduUJjDO0y1pbTXuXrTbTrUjXipZ816HU41LF42K4d/KxEkPwp
mSDH+MdhOFASABEe57WOs5CunQmysXft2yR+JH02/38XECKt8T5U7tFlCrH5478c
WIMYmEsl5nSAQLKjoxoWMaPyZR0xGHtxv+YfCBwmd3A5EaRFrTdrPP/fotxu081G
jwAyAhEvsPD5ulmLNYhzaSnl4yizYeh+yf7s2RRko4RyHOQ34dduq3kvwDWicBx9
Wdr087Qw4pS9rNI2HD1Eusbw7z1Beq4SoIOcHwIDAQABAoIBAQCRDacfYceRWm+o
j1KHNDH7miBMY0iAEzvcjEnfAbHAMuLOKD8MB29Jb2u30INyp9UtcJgVeLw/zSiI
aJ5vCIcA80gqCYuOgVLeRkgxM+PApMowpB7pNBDm3ONVI53GdMRdZ7doCjJmrMAd
QZLFGsASWlEGv3pleC9qw9j8aNt8MsBse4xI0Gzf88/NCZu16w3fSGK4XU70Z6kD
BWcTlcRELg1ktMK4FL+Kx95V80PL6xOJUZO1yx6F5u+qONvnjXJWEqG/tbBxh01G
NNjAI37fASyxB45+r7js9ueBRPBX7HXVohH/d4Lzi3dECubFnmQJHNYpgxiffshE
wVfyCvPhAoGBANkmVGVBQF/vov1h2yFQdXcbc4iqsLTRtY5JNp+Y40Ac2c1IlMII
hHASASk9TDwLcgE325yF1QBTeNEy9Ooc9whGLAgouLxvvvrnH6yuGwXfYVolaAHE
JJymXMfljj2OZB4FAyUYtPOLZrcHEU1Xd2+lGBytPLaxjrzS/nDUUmTHAoGBAMlU
DqIjBXA5nm/69UCpZ2Ia4u03e1VC4EHq87lllFL52r9NQUlM/M+tCjIUE5Tg/lIb
Lhj//E/WLOoI1xE0P6vIxatSScbPFnfp90PJxZwKD9jqfu4f0qNjNsne7J8wwcpP
tWnL8blIhco2AkyUWoTxc8zdeeHuU5mQRT0kAgXpAoGBALojwyBwyK/0CTFOWrq5
75dD7stuFb9KLGlllO9F7TceBA2Wc/3Hs08l/9zL8Ldf0D//E7+ecTGwW9Zn6c1t
Osza6g+saH8PAxSsXlh1fjCQhTDy867f5cpqSQoJWt6lWmjpPwLjpOlHy6qE4m37
1iPbz0l1rp+koIh4DSfGuUItAoGAQ5CsIIm0R4duvpHwQLUZdvki8w1NnL2G2Vhq
VuvaLUagvNbGdD0cEu41n7zRHYOslg19GPK/0GNGS3yQALwSKiqE/AvvqoLRPYkN
bHiIkudljhyUYIHZhO/E8VaY/ou0XZsGfOzuwImwLL6XYu/euQL3I+eoAcSj1cNv
GSe+bhECgYAaKv8ERnz/IYfuF1x3bVUWsL/HtFBXCdVuZDbnoOB0O/75WNfg9qx8
60Mc2Q3WuyAqtcZKFiMQd9pxY9c5e/ydiG+j8nHPPdFurwgBwc/aTfMiGvMfBPZV
TyOR/wPk7R0ckAclGHECkFuMMd+/cFd7jjq877Oq0PO1n/lQecwkUg==
-----END RSA PRIVATE KEY-----
`;


async function getPRContents(installationId: number, url: string): Promise<string> {
  const app = new OctokitApp({ id: APP_ID, privateKey: PRIVATE_KEY });
  const installationAccessToken = await app.getInstallationAccessToken({ installationId });

  console.log(installationAccessToken);
  const result = await request(`POST ${url}`, {
    headers: {
      authorization: `token ${installationAccessToken}`,
      accept: "application/vnd.github.machine-man-preview+json"
    }
  });

  return result.data;
}

const url = '/repos/david-thebasic/basic-workspace/pulls/8';
const installationId = 4889924;

getPRContents(installationId, url)
.then((data) => {
  console.log(data);
})
.catch((error) => {
  console.error(error);
});


/*
curl -i \
-H "Authorization: token v1.4c23c006ae1b96e6c9a2d75d864e97505a06f147" \
-H "Accept: application/vnd.github.machine-man-preview+json" \
https://api.github.com/repos/david-thebasic/basic-workspace/pulls/8
*/
/*
url -i \
-H "Authorization: token v1.4c23c006ae1b96e6c9a2d75d864e97505a06f147" \
-H "Accept: application/vnd.github.machine-man-preview+json" \
https://api.github.com/repos/david-thebasic/basic-workspace/pulls/8/files
*/
