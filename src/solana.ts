import { Keypair } from "@solana/web3.js";
import { HDKey } from "micro-ed25519-hdkey";
import * as bip39 from "bip39";
import bs58 from'bs58';
import fs from 'fs'
const main = () =>{
  let content = ''
  const mnemonic ='';
  const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
  const hd = HDKey.fromMasterSeed(seed.toString("hex"));
  for (let i = 0; i < 1; i++) {
    const path = `m/44'/501'/${i}'/0'`;
    const keypair = Keypair.fromSeed(hd.derive(path).privateKey);
    content=content+`address ${i} pubkey::`+keypair.publicKey.toBase58()+`  priKey::`+bs58.encode(keypair.secretKey)+` \n`;
    console.log(`${path} private => ${bs58.encode(keypair.secretKey)  }`);
    console.log(`${path} public=> ${keypair.publicKey.toBase58()}`);
  }
  
  const opt = {
    flag: 'a', // a：追加写入；w：覆盖写入
  }
  fs.writeFile('./sol.txt', content, opt, (err:any) => {
    if (err) {
      console.error(err)
    }
  })
}
main();