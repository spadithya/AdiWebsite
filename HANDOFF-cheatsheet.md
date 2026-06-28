# Cheatsheet page setup

The `/cheatsheet` page is built and wired with an Argon2id password gate. To finish setup:

1. Install the new dependency (`hash-wasm`)
2. Generate your password hash in your browser console
3. Paste it into `src/pages/cheatsheet.astro`
4. Test locally
5. Push

## 1. Install hash-wasm

```powershell
cd C:\Users\desig\OneDrive\Documents\Adi_Repositories\adi-website
npm install
```

The `package.json` already lists `hash-wasm` as a dependency, so `npm install` will pull it in. About 30 seconds.

## 2. Generate your password hash

The cleanest path is the browser console. Open any web page (your own site is fine, or a blank `about:blank` tab). Open DevTools (`F12` or `Ctrl+Shift+I`), go to the **Console** tab, paste this:

```js
await (async () => {
  const { argon2id } = await import('https://esm.sh/hash-wasm@4.11.0');
  const password = prompt('Cheatsheet password (will not leave this page):');
  if (!password) { console.log('Cancelled.'); return; }
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await argon2id({
    password,
    salt,
    parallelism: 1,
    iterations: 3,
    memorySize: 12288,
    hashLength: 32,
    outputType: 'encoded',
  });
  console.log('\n=== YOUR ENCODED HASH ===\n');
  console.log(hash);
  console.log('\n=== PASTE THE ABOVE STRING INTO cheatsheet.astro ===\n');
})();
```

(The `(async () => { ... })()` wrapper keeps `argon2id` in function scope so you can re-run the snippet multiple times without "redeclaration" errors in the console.)

Press Enter. A prompt asks for the password (use something memorable that your password manager can save). After ~200 ms, the encoded hash prints to the console. It looks like:

```
$argon2id$v=19$m=12288,t=3,p=1$<salt-base64>$<hash-base64>
```

Copy that entire string.

**Important security notes:**
- The password is hashed **entirely in your browser**. It never gets sent to any server. The `esm.sh` request loads the hashing library, not your password.
- The salt is random (16 bytes from `crypto.getRandomValues`). A new run gives a new salt.
- Don't share the encoded string anywhere except your own source code (it's not catastrophic if it leaks, but no reason to spread it around).
- If you ever forget the password, just generate a new hash and replace. You can't recover the original from the hash.

## 3. Paste the hash into the page source

Open `src/pages/cheatsheet.astro` and find this line near the top (around line 6):

```astro
const STORED_HASH = "__REPLACE_WITH_YOUR_ARGON2ID_PHC_STRING__";
```

Replace the placeholder with your encoded hash:

```astro
const STORED_HASH = "$argon2id$v=19$m=12288,t=3,p=1$YourSaltHere$YourHashHere";
```

Save.

## 4. Test locally

```powershell
npm run dev
```

Visit `http://localhost:4321/cheatsheet`. You should see a black password gate. Type your password. After ~200 ms the content reveals.

If you refresh the tab, you stay unlocked (session storage). If you close the tab and reopen, you get the password prompt again.

There's a "▸ Lock again" button at the bottom of the unlocked content if you want to manually re-lock without closing the tab.

## 5. Push

```powershell
git add .
git commit -m "Add private /cheatsheet page with Argon2id gate"
git push
```

Wait ~90 seconds for the GitHub Actions deploy. Then `https://spadida.org/cheatsheet` is live.

**Save the URL only in your password manager.** Don't bookmark in a shared browser, don't paste in chat, don't put on a sticky note. The whole point of the unlinked-plus-gate approach is that nothing on the public web points to it.

## How autofill works on your phone

The first time you visit `https://spadida.org/cheatsheet` on your phone and enter the password, your phone's password manager (iCloud Keychain on iOS, Google Password Manager / 1Password / Bitwarden on Android) will ask: "Save password for spadida.org?" Tap Save.

Every subsequent visit: the password input gets autofilled. One tap of the Unlock button and you're in. Effectively zero friction at the bar.

## Rotating the password

If you ever want to change it (or share a temporary password with someone, then revoke):

1. Re-run the browser console snippet (Step 2) with the new password.
2. Replace `STORED_HASH` in `src/pages/cheatsheet.astro`.
3. Commit and push.

The change deploys in ~90 seconds. After deploy, only the new password works.

## Security model recap

This setup protects against:
- Search engines indexing the URL (noindex + robots.txt + sitemap exclusion)
- Anyone navigating to the URL without the password (password gate)
- Source-code leaks of the hash (Argon2id with OWASP-recommended parameters makes brute-force prohibitively expensive)

This setup does NOT protect against:
- Anyone with DevTools fluency who knows the URL (they can disable the gate via DOM modification in ~30 seconds)
- A targeted attacker who has your phone unlocked

For your actual threat model (casual viewers, accidental discovery), this is the right level. For anything beyond that, see the Cloudflare Access notes in the previous workout-page conversation.
