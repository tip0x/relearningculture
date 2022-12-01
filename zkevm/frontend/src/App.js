import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Navbar from "./Navbar";
import WalletConnectProvider from "@maticnetwork/walletconnect-provider";
const config = require("./config.js");
const MaticPoSClient = require("@maticnetwork/maticjs").MaticPOSClient;

const App = () => {
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);
  let content;
  const [Networkid, setNetworkid] = useState(0);
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [inputValue] = useState("");
  const [burnHash, setBurnHash] = useState("");
  const [zkevmProvider, setZKevmProvider] = useState();
  const [mumbaiProvider, setMumbaiProvider] = useState();
  const [bridgeOptions] = useState([
    {
      label: "Proof of Stake",
      value: "Proof of Stake",
    },

  ]);
  const [tokenTypes, setTokenTypes] = useState([

    {
      label: "ERC20",
      value: "ERC20",
    },

  ]);
  const [selectedBridgeOption, setSelectedBridgeOption] = useState({
    label: "Proof of Stake",
  });
  const [selectedToken, setSelectedToken] = useState({
    label: "ERC20",
  });

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    setLoading(true);
    const zkevmProvider = new WalletConnectProvider({
      host: config.ZKEVM_RPC,
      callbacks: {
        onConnect: console.log("zkevm connected"),
        onDisconnect: console.log("zkevm disconnected!"),
      },
    });

    const mumbaiProvider = new WalletConnectProvider({
      host: config.MUMBAI_RPC,
      callbacks: {
        onConnect: console.log("mumbai connected"),
        onDisconnect: console.log("mumbai disconnected"),
      },
    });

    setZKevmProvider(zkevmProvider);
    setMumbaiProvider(mumbaiProvider);
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();

    setNetworkid(networkId);

    if (networkId === config.MUMBAI_CHAINID) {
      setLoading(false);
    } else if (networkId === config.ZKEVM_CHAINID) {
      setLoading(false);
    } else {
      window.alert(" switch to Polygon Mumbai or zkEVM network");
    }
  };
  // posClientGeneral facilitates the operations like approve, deposit, exit
  const posClientParent = () => {
    const maticPoSClient = new MaticPoSClient({
      network: config.NETWORK,
      version: config.VERSION,
      maticProvider: zkevmProvider,
      parentProvider: window.web3,
      parentDefaultOptions: { from: account },
      maticDefaultOptions: { from: account },
    });
    return maticPoSClient;
  };
  // posclientBurn facilitates the burning of tokens on the matic chain
  const posClientChild = () => {
    const maticPoSClient = new MaticPoSClient({
      network: config.NETWORK,
      version: config.VERSION,
      maticProvider: window.web3,
      parentProvider: mumbaiProvider,
      parentDefaultOptions: { from: account },
      maticDefaultOptions: { from: account },
    });
    return maticPoSClient;
  };

  // POS ERC20 functionality

  const depositERC20 = async () => {
    const maticPoSClient = posClientParent();
    const x = inputValue * 1000000000000000000; // 18 decimals
    const x1 = x.toString();
    await maticPoSClient.approveERC20ForDeposit(config.posRootERC20, x1, {
      from: account,
    });
    await maticPoSClient.depositERC20ForUser(config.posRootERC20, account, x1, {
      from: account,
    });
  };

  const burnERC20 = async () => {
    const maticPoSClient = posClientChild();
    const x = inputValue * 1000000000000000000;
    const x1 = x.toString();
    await maticPoSClient
      .burnERC20(config.posChildERC20, x1, {
        from: account,
      })
      .then((res) => {
        setBurnHash(res.transactionHash);
      });
  };

  const exitERC20 = async () => {
    const maticPoSClient = posClientParent();
    await maticPoSClient
      .exitERC20(inputValue, {
        from: account,
      })
      .then((res) => {
        console.log("exit o/p", res);
      });
  };

  if (loading === true) {
  } else {
    content = (
      <div>
        <div
          id="POS"
          hidden={
            selectedBridgeOption.label === "Proof of Stake" ? false : true
          }
        >
         
            <input
              id="pos-inputValue"
              type="text"
              placeholder="value"
              name="inputValue"
              value={inputValue}
              onChange={onchange}
              required
            />
            <p id="burnHash">{burnHash}</p>
          </div>
          <div
            id="ERC20"
            hidden={
              selectedToken.label === "ERC20" &&
              selectedBridgeOption.label === "Proof of Stake"
                ? false
                : true
            }
          >
            <button
              onClick={depositERC20}
              disabled={
                Networkid !== 0 && Networkid === config.ZKEVM_CHAINID
                  ? true
                  : false
              }
            >
              Deposit
            </button>

            <button
              onClick={burnERC20}
              disabled={
                Networkid !== 0 && Networkid === config.MUMBAI_CHAINID
                  ? true
                  : false
              }
            >
              burn
            </button>

            <button
              onClick={exitERC20}
              disabled={
                Networkid !== 0 && Networkid === config.MUMBAI_CHAINID
                  ? false
                  : true
              }
            >
              exit
            </button>

            
          </div>
        </div>
  
    );
  }

  return (
    <div>
      <Navbar account={account} />
      <div>
        <select
          onChange={(e) => {
            setSelectedBridgeOption({ label: e.target.value });
            if (e.target.value === "POS") {
              setTokenTypes([
                {
                  label: "ERC20",
                  value: "ERC20",
                },
              ]);
            } else {
              setTokenTypes([
                {
                  label: "ERC20",
                  value: "ERC20",
                },
              ]);
            }
          }}
        >
          {bridgeOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select onChange={(e) => setSelectedToken({ label: e.target.value })}>
          {tokenTypes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {content}
    </div>
  );
};

export default App;
