import React, { useEffect, useState } from 'react';
import { XBlock, XMasonry } from 'react-xmasonry';
import InvolvedArea from '../components/Common/InvolvedArea';
import Loader from '../components/Common/Loader';
import Layout from '../components/Layout/Layout'
import { useMoralis } from 'react-moralis';
import { useWeb3 } from '../providers/Web3Context';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useIPFS } from '../hooks/Web3/useIPFS';

const Collection = () => {
  const { Moralis, isWeb3Enabled, isAuthenticated } = useMoralis();
  const { state: { walletAddress, networkId } } = useWeb3();
  const router = useRouter()
  const { resolveLink } = useIPFS();
  const nftBalanceJson = async (data) => {
    let NFTs = data;
    for (let NFT of NFTs) {
      try {
        await fetch(NFT?.token_uri)
          .then(async (response) => await response.json())
          .then((data) => {
            NFT.image_url = resolveLink(data.image);
          });
      } catch (error) {
      }
    }
    return NFTs;
  };
  const setData = async () => {
    const options = { chain: networkId, address: walletAddress };
    const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
    var dataArr = polygonNFTs?.result?.map(item => {
      return [item.token_address, {
        token_address: item?.token_address,
        name: item?.name,
        symbol: item?.symbol,
        contract_type: item?.contract_type,
        token_uri: item?.token_uri,
      }]
    });
    var maparr = new Map(dataArr); // create key value pair from array of array
    var finalArray = [...maparr.values()];
    await nftBalanceJson(finalArray)
    return finalArray;
  };
  const { data: collections, isLoading, refetch } = useQuery(['usercollection'], setData, {
    keepPreviousData: true,
    enabled: false
  });


  useEffect(() => {
    if (isWeb3Enabled && isAuthenticated)
      refetch()
  }, [isWeb3Enabled, networkId, walletAddress]);

  if (isLoading) {
    return (
      <Loader />
    )
  }


  return (

    <Layout>
      <div className='container'>
        <div className='row justify-content-center  pt-70'>
          {collections?.map((collection) => (
            <>
              <div class="col-md-6 col-xl-3 mb-4">
                <div class="aboutitem">
                  <div class="aboutitemImg">
                    <img
                      src={collection?.image_url}
                      style={{
                        width: "100%",
                        "object-fit": "cover",
                        height: "250px",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        router.push(`/nft/${collection?.token_id}`)
                      }
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "../images/notfoundimage.png";
                      }}
                    />
                    <button type='button' className='default-btn border-radius-5' onClick={() =>
                      router.push(`/collection-nft-details/${collection?.token_address}`)}>
                      Open Collection
                    </button>
                  </div>
                  <div class="bgdarkbluecolor aboutitemcnt">
                    <div class="itemtitlecode">
                      <h2 class="textgraycolor">{collection?.name}</h2>
                    </div>
                    <div class="itemtitlePrice">
                      <h2 class="textgraycolor">{collection?.contract_type}</h2>
                    </div>
                  </div>
                </div>
              </div >
            </>
          ))}
          {/* <XMasonry>
            {collections?.map((collection) => (
              <XBlock key={collection?.token_address}>
                {
                  <div className="article">
                    <div className='featured-card box-shadow'>
                      <div className='featured-card-img'>
                        <a href='#'>
                          <img
                            src={collection?.image_url}
                            style={{ width: "100%", display: "block" }}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = "../images/notfoundimage.png";
                            }}
                          />
                        </a>
                        <button type='button' className='default-btn border-radius-5' onClick={() =>
                          router.push(`/collection-nft-details/${collection?.token_address}`)}>
                          Open Collection
                        </button>
                      </div>
                      <div className='content'>
                        <h3>
                          <span>{collection?.name}</span>
                        </h3>
                        <p>{collection?.contract_type}</p>
                      </div>
                    </div>
                  </div >
                }
              </XBlock>
            ))}
          </XMasonry> */}
        </div>
      </div>
    </Layout>
  );
};

export default Collection;
