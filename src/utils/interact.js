const fs = require('fs');
const Caver = require('caver-js');
//const caver = new Caver('https://api.baobab.klaytn.net:8651/');
const caver = new Caver(window.klaytn);

const contractAddress = '0x57dC70d3E74b362Fc64Bc9801F705736b0c0B237';

// caver.klay.getCode(contractAddress).then(console.log);

const Contract_RMC = require('C:/Users/hodu/Documents/klaytn/react-minting-page/src/contracts/artifacts/RhythmicMonkeyClub.json');
const contract_RMC = new caver.klay.Contract(Contract_RMC.abi, contractAddress);
let RMC_price;
contract_RMC.methods.price().call().then(function (result) {
    RMC_price = result;
});




export const connectWallet = async () => {
    if (window.klaytn) {
        try {
            const addressArray = await window.klaytn.enable({
                method: "klay_requestAccounts",
            });
            const obj = {
                status: "👆🏽 Write a message in the text-field above.",
                address: addressArray[0],
            };
            return obj;
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            };
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        {" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Kaikas, a virtual Klaytn wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};

export const getCurrentWalletConnected = async () => {
    if (window.klaytn) {
        try {
            const addressArray = await window.klaytn.enable({
                method: "klay_accounts",
            });
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: "👆🏽 Write a message in the text-field above.",
                };
            } else {
                return {
                    address: "",
                    status: " Connect to Kaikas using the top right button.",
                };
            }
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            };
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        {" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Kaikas, a virtual Klaytn wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};

export const mintNFT = async (amount) => {
    let price = (RMC_price * amount);
    price = caver.utils.toBN(price);
    console.log(window.klaytn.selectedAddress);
    contract_RMC.methods.mainMint(amount
    ).send({ from: window.klaytn.selectedAddress, gas: 3000000, value: price },
        function (error, transactionHash) {
            console.log(error, transactionHash);
        });

    /*contract_RMC.methods.baseURI().call({from: window.klaytn.selectedAddress}, function(error, result) {
        console.log(result);
    });*/


    /*caver.klay.sendTransaction({
        type: 'VALUE_TRANSFER',
        from: window.klaytn.selectedAddress,
        to: contractAddress,
        value: price2,
        gas: 8000000,
        'data': contract_RMC.methods.mainMint(amount),
    })
        .once('transactionHash', transactionHash => {
            console.log('txHash', transactionHash)
        })
        .once('receipt', receipt => {
            console.log('receipt', receipt)
        })
        .once('error', error => {
            console.log('error', error)
        })
    
    //sign transaction via Kaikas
    /*try {
        console.log(RMC_price);
        const txHash = await window.klaytn
            .enable({
                method: 'klay_sendTransaction',
                params: [transactionParameters],
                from: window.klaytn.selectedAddress
            });
        return {
            success: true,
            status: "✅ Check out your transaction on Kaikas: https://baobab.scope.klaytn.com/account/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }
    }*/

}