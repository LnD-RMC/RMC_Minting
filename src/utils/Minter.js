import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT } from "./interact.js";

const Minter = (props) => {

    //State variables
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(async () => {
        //const { address, status } = await getCurrentWalletConnected();
        //setWallet(address)
        //setStatus(status);

        addWalletListener();
    }, []);

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWallet(walletResponse.address);
    };

    const onMintPressed = async () => {
        const { status } = await mintNFT( amount );
        setStatus(status);
    };

    function addWalletListener() {
        if (window.klaytn) {
            window.klaytn.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                    setStatus("👆🏽 Write a message in the text-field above.");
                } else {
                    setWallet("");
                    setStatus(" Connect to Kaikas using the top right button.");
                }
            });
        } else {
            setStatus(
                <p>
                    {" "}
                    {" "}
                    <a target="_blank" href={`https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi`}>
                        You must install Kaikas, a virtual Klaytn wallet, in your
                        browser.
                    </a>
                </p>
            );
        }
    }

    return (
        <div className="Minter">
            <button id="walletButton" onClick={connectWalletPressed}>
                {walletAddress.length > 0 ? (
                    "Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                ) : (
                    <span>Connect Wallet</span>
                )}
            </button>

            <br></br>
            <h1 id="title">RMC Minting Test</h1>
            <p>
                Put the amount you want to mint. Max 5 per transaction.
            </p>
            <form>
                <h2>🖼 Amount Mint: </h2>
                <input
                    type="text"
                    placeholder="1-5"
                    onChange={(event) => setAmount(event.target.value)}
                />
            </form>
            <button id="mintButton" onClick={onMintPressed}>
                Mint NFT
            </button>
            <p id="status">
                {status}
            </p>
        </div>
    );
};

export default Minter;