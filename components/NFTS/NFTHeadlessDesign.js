import React from 'react'
import { useRouter } from 'next/router';
import { useWeb3 } from '../../providers/Web3Context';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import http from '../../utils/http';
export default function NFTHeadlessDesign({ nft, title: openDialogTitle }) {
    const router = useRouter()
    const { state: { nftTokenAddress } } =
        useWeb3();
    const queryClient = useQueryClient();
    const { state: { nftTokenABI } } = useWeb3()
    const { Moralis, isAuthenticated } = useMoralis();
    const contractProcessor = useWeb3ExecuteFunction();
    async function mintNFTHandle() {

        const { attributes, created_at, created_by,
            cryptoCost, cryptoType, description,
            edition, image, name, unique_string } = nft;

        const nftDataJson = {
            attributes, created_at, created_by,
            cryptoCost, cryptoType, description,
            edition, image, name, unique_string,
            image: nft?.image_url,
        };
        if (!isAuthenticated) {
            toast.success("Please Connect Web3.0 Wallet")
            return;
        }
        const file = new Moralis.File("file.json", {
            base64: btoa(JSON.stringify(nftDataJson, undefined, 1)),
            type: 'json'
        });
        const moralisFileJson = await file.saveIPFS();
        await mintNFT(moralisFileJson._ipfs);
    }
    async function mintNFT(tokenURI) {
        let options = {
            contractAddress: nftTokenAddress,
            functionName: "createToken",
            abi: nftTokenABI,
            params: {
                tokenURI: tokenURI,
            },
        };
        await contractProcessor.fetch({
            params: options,
            onSuccess: async (res) => {
                queryClient.invalidateQueries('USER')
                queryClient.invalidateQueries('USERBlockChainNFTs')
                await http.put(`/nfts/update_nft/${nft?.id}`, {
                    "nft_is_minted": true
                }).then((res) => {

                    if (res.data.status_code == 200)
                        toast.success("Your NFT is Created.")

                }).catch((err) => {
                    console.log(err)
                })
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }
    return (
        <div class="col-md-6 col-xl-3 mb-4">
            <div class="aboutitem">
                <div class="aboutitemImg">
                    <img
                        src={nft?.image_url}
                        style={{
                            width: "100%",
                            "object-fit": "cover",
                            height: "250px",
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            router.push(`/nft/${nft?.token_id}`)
                        }
                        }
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "../images/notfoundimage.png";
                        }}
                    />
                    <button type='button' className='default-btn border-radius-5' onClick={() => {
                        if (openDialogTitle == "Open NFT") {
                            router.push(`/nft/${nft?.id}`)
                        }
                        else if (openDialogTitle == "Mint NFT") {
                            mintNFTHandle()
                        }
                    }
                    }
                    >
                        {openDialogTitle ? openDialogTitle : "Open NFT"}
                    </button>
                </div>
                <div class="bgdarkbluecolor aboutitemcnt">
                    <div class="itemtitlecode">
                        <h2 class="textgraycolor">{nft?.name}</h2>
                        <h3 class="textwhitecolor">
                            {
                                nft?.metadata?.name ? nft?.metadata?.name :
                                    nft?.token_id ? nft?.token_id : ""
                            }
                        </h3>
                    </div>
                    <div class="itemtitlePrice">
                        <h2 class="textgraycolor">Price</h2>
                        <h3 class="textwhitecolor">
                            <img src="../images/priceicon.svg" /> <strong>0,006</strong></h3>
                        <h4 class="textgraycolor"><span>
                            <img src="../images/hearticon.svg" /></span> 0</h4>
                    </div>
                </div>
            </div>
        </div >
    )
}
