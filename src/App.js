import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const latestBlockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(latestBlockNumber);

      const latestBlock = await alchemy.core.getBlock(latestBlockNumber);
      setBlock(latestBlock);
      const latestTransactions = latestBlock.transactions;
      setTransactions(latestTransactions);
    }

    fetchData();
  }, []);

  const handleBlockClick = async (blockNumber) => {
    const selectedBlock = await alchemy.core.getBlockWithTransactions(
      blockNumber
    );
    setBlock(selectedBlock);
    setTransactions(selectedBlock.transactions);
  };

  const handleTransactionClick = async (transactionHash) => {
    const transaction = await alchemy.core.getTransactionReceipt(
      transactionHash
    );
    // Handle displaying transaction details
    console.log(transaction);
  };

  return (
    <div className="bg-gray-600 h-screen w-full flex items-center">
      <div className="w-full md:max-w-3xl mx-auto p-5">
        <div className="shadow rounded bg-white p-10 max-h-[500px] overflow-auto">
          <div>
            <h2 className="text-3xl font-bold pb-3">Block Explorer</h2>
            <p>Current Block Number: {blockNumber}</p>
          </div>
          <div>
            <h3>Latest Block</h3>
            {block && (
              <div>
                <p>Block Number: {block.number}</p>
                <p>
                  Timestamp: {new Date(block.timestamp * 1000).toLocaleString()}
                </p>
                {/* Display more block details as needed */}
              </div>
            )}
          </div>
          <div className="">
            <h3>Transactions</h3>
            {transactions.length > 0 ? (
              <ul>
                {transactions.map((transaction) => (
                  <li
                    key={transaction}
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    Transaction Hash:{" "}
                    <span className="text-blue-600 cursor-pointer">
                      {transaction}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions found.</p>
            )}
          </div>
          <div>
            <h3>Blocks</h3>
            {/* Implement block list and handle block click */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
