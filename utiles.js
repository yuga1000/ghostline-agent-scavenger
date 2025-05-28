import Web3 from 'web3';

const web3 = new Web3(process.env.ETH_RPC_URL);

export async function checkKey(privateKey) {
  try {
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    const balanceWei = await web3.eth.getBalance(account.address);
    const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

    return {
      address: account.address,
      balance: parseFloat(balanceEth),
    };
  } catch (e) {
    return null;
  }
}
