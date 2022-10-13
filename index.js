const Bundlr = require('@bundlr-network/client')
const fs = require('fs')
const wallet = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))

async function main() {
  const bundlr = new Bundlr.default("https://node2.bundlr.network", "arweave", wallet);
  const tags = getTags('Fair Forks: Towards Incentivized Protocol Governance', 'First research towards fork-based and incentivized governance. Synthesized from observations and discussions of the crypto space between January and September 2022.', 'pdf')
  const data = fs.readFileSync("./fair-forks.pdf");

  const transaction = bundlr.createTransaction(data, { tags: tags });

  await transaction.sign();
  console.log('txId: ', transaction.id)
  await transaction.upload();
  console.log('success')
}

async function getTags(name, description, type) {
  return {
    tags: [
      { name: 'Content-Type', value: 'application/pdf' },
      { name: 'App-Name', value: 'SmartWeaveContract' },
      { name: 'App-Version', value: '0.3.0' },
      { name: 'Contract-Src', value: 'BzNLxND_nJEMfcLWShyhU4i9BnzEWaATo6FYFsfsO0Q' },
      {
        name: 'Init-State', value: JSON.stringify({
          ticker: "ATOMIC-PDF",
          balances: {
            'nDNofBkdEJDteCmSJcVJxxAAJz5UEHAXze1hU2GBn-A': 5000,
            'vLRHFqCw1uHu75xqB4fCDW-QxpkpJxBtFD9g4QYUbfw': 5000
          },
          claimable: [],
          claims: [],
          contentType: 'application/pdf',
          emergencyHaltWallet: 'vLRHFqCw1uHu75xqB4fCDW-QxpkpJxBtFD9g4QYUbfw',
          pairs: [],
          invocations: [],
          foreignCalls: [],
          settings: [["isTradeable", true]]
        })
      },
      { name: 'Title', value: name },
      { name: 'Description', value: description },
      { name: 'Type', value: type }
    ]
  }
}

main()

