import axios, { AxiosResponse } from 'axios';

export interface Transaction_count {
  result: number;
}

export interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string | null; // Include method name
}

export const getTransactionCount = async (address: string): Promise<number> => {
  try {
    const response = await axios.get(`https://scan.lorenzo-protocol.xyz/api/v2/addresses/${address}/counters`);
    const hexTransactionCount = response.data.transactions_count;
    const parsedCount = parseInt(hexTransactionCount, 16);

    if (isNaN(parsedCount)) {
      console.error('Invalid transaction count:', hexTransactionCount);
      throw new Error('Invalid transaction count');
    }

    return parsedCount;
  } catch (error) {
    console.error('Error fetching transaction count:', error);
    throw error;
  }
};

export const getEtheriumCount = async (address: string): Promise<number> => {
  try {
    const response = await axios.get(`https://scan.lorenzo-protocol.xyz/api/v2/addresses/${address}`);
    const weiEtheriumCount = response.data.coin_balance;
    const ether = parseInt(weiEtheriumCount, 10) / 1e18; // Convert wei to Ether

    if (isNaN(ether)) {
      console.error('Invalid Ethereum count:', weiEtheriumCount);
      throw new Error('Invalid Ethereum count');
    }

    return ether;
  } catch (error) {
    console.error('Error fetching Ethereum count:', error);
    throw error;
  }
};

export const getTransactionList = async (address: string): Promise<Transaction[]> => {
  const apiUrl = `https://scan.lorenzo-protocol.xyz/api/v2/addresses/${address}/transactions`;

  try {
    const response: AxiosResponse = await axios.get(apiUrl);
    if (response.status === 200) {
      const data = response.data;
      const transactions: Transaction[] = data.items.map((transaction: any) => ({
        blockNumber: transaction.block.toString(),
        timeStamp: transaction.timestamp,
        hash: transaction.hash,
        nonce: transaction.nonce.toString(),
        blockHash: transaction.blockHash || 'N/A', // Handle optional blockHash
        transactionIndex: transaction.position.toString(),
        from: transaction.from.hash,
        to: transaction.to.hash,
        value: (parseInt(transaction.value, 10) / 1e18).toString(), // Convert value from wei
        gas: parseInt(transaction.gas_limit, 10).toString(), // Gas limit
        gasPrice: (parseInt(transaction.gas_price, 10) / 1e9).toString(), // Convert gas price to gwei
        isError: transaction.has_error_in_internal_txs ? '1' : '0',
        txreceipt_status: transaction.result === 'success' ? '1' : '0',
        input: transaction.raw_input,
        contractAddress: transaction.to.is_contract ? transaction.to.hash : 'N/A',
        cumulativeGasUsed: parseInt(transaction.gas_used, 10).toString(),
        gasUsed: parseInt(transaction.gas_used, 10).toString(),
        confirmations: transaction.confirmations.toString(),
        methodId: transaction.decoded_input ? transaction.decoded_input.method_id : 'N/A',
        functionName: transaction.decoded_input ? transaction.decoded_input.method_call : null, // Include function name
      }));

      return transactions;
    } else {
      console.error('Error occurred while retrieving transactions.');
      return [];
    }
  } catch (error) {
    console.error('Error occurred while making the request:', error);
    return [];
  }
};
