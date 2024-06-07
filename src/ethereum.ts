import { HDNodeWallet } from "ethers";
import * as bip39 from "bip39";
import fs from 'fs'
const opt = {
  flag: 'a', // a：追加写入；w：覆盖写入
}
const main = () =>{
  let content = ''
  const mnemonic ='civil eye voyage stand satisfy feed also unusual ghost wine output razor';
  const seed = bip39.mnemonicToSeedSync(mnemonic, "123456"); // (mnemonic, password)
  const wallet = HDNodeWallet.fromSeed(seed);
  for (let i = 0; i < 1; i++) {
    const path = `m/44'/60'/0'/0/${i}`;
    const account = wallet.derivePath(path);
    content=content+`address ${i} ::`+account.address+`  priKey::`+account.privateKey+` \n`;
    console.log(`${path} private => ${ account.privateKey}`);
    console.log(`${path} public=> ${account.address}`);
  }
  fs.writeFile('./ethereum.txt', content, opt, (err:any) => {
    if (err) {
      console.error(err)
    }
  })
}
main();