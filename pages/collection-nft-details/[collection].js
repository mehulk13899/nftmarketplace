import React, { useEffect, useState } from 'react';
import Loader from '../../components/Common/Loader';
import Layout from '../../components/Layout/Layout';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useWeb3 } from '../../providers/Web3Context';
import { useIPFS } from '../../hooks/Web3/useIPFS';
import { useQuery } from 'react-query';

const Collection = ({ collection }) => {

  const { Moralis, isWeb3Enabled, isAuthenticated } = useMoralis();
  const { state: { walletAddress, networkId } } = useWeb3();
  const { resolveLink } = useIPFS();
  const [collectionData, setCollectionData] = useState({
    totalItems: 0,
    totalOwners: 0,
    totalvolumes: 0,
    floorprice: 0
  })
  const nftBalanceJson = async (data) => {
    if (data?.result) {
      let NFTs = data?.result;
      for (let NFT of NFTs) {
        if (NFT?.metadata) {
          NFT.metadata = JSON.parse(NFT.metadata);
          NFT.image_url = resolveLink(NFT.metadata?.image);
        } else if (NFT?.token_uri) {
          try {
            await fetch(NFT.token_uri)
              .then(async (response) => await response.json())
              .then((data) => {
                NFT.image_url = resolveLink(data.image);
              });
          } catch (error) {
          }
        }
      }
      return NFTs;
    }
  };

  const setData = async () => {
    const options = { chain: networkId, address: walletAddress, token_address: collection };
    const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
    const data = await nftBalanceJson(polygonNFTs);
    var dataTemp = [...data];
    var finalObjec = {
      totalItems: data?.length ? data.length : 0,
      totalvolumes: 0,
      floorprice: 0
    }
    var ownerList = [];
    dataTemp.map((nft) => {
      if (!ownerList.includes(nft?.owner_of)) {
        ownerList.push(nft?.owner_of)
      }

    })
    finalObjec.totalOwners = ownerList.length;
    setCollectionData(finalObjec);
    return data;
  };
  const { data: nftBalance, isLoading, refetch } = useQuery([`collectionnft_${collection}`], setData, {
    keepPreviousData: true,
    enabled: false
  });
  useEffect(() => {
    if (isWeb3Enabled && isAuthenticated)
    {
      refetch()
    }
  }, [isWeb3Enabled, networkId, walletAddress]);

  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <Layout>
      <div className='container'>
        <div class="authoreprofile authoSm mt-0 mt-md-5 pt-0 pt-md-2">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="authoreproimg">
                  <div class="authoreproimgBox">
                    <img class="img-fluid d-none d-md-block"

                      src="../images/authoprofilebannerimg.jpeg" alt="img" />
                    <img class="img-fluid d-block d-md-none"
                      src="../images/authprobannersm01.jpeg" alt="img" />
                  </div>
                  <div class="authoreproicon"><img class="img-fluid"
                    style={{
                      borderRadius: "50%"
                    }}
                    src="../images/authorproicon01.jpeg" alt="img" /></div>
                </div>
                <div class="auProfileDetail">
                  <div class="joincommunity auSocial">
                    <ul>
                      <li><a href="#"><img class="img-fluid" src="../images/activityicon.svg" alt="img" /></a></li>
                      <li><a href="#"><img class="img-fluid" src="../images/discordbutton.svg" alt="img" /></a></li>
                      <li><a href="#"><img class="img-fluid" src="../images/insta.svg" alt="img" /></a></li>
                      <li><a href="#"><img class="img-fluid" src="../images/twitter.svg" alt="img" /></a></li>
                    </ul>

                  </div>
                  <div class="prCnt">
                    <h2 class="textwhitecolor">{
                      nftBalance && nftBalance[0]?.name
                    }</h2>
                    <h3 class="textgraycolor mt-3 mb-4"><span class="textbluecolor">Last updated:</span> October 21st,  2021 at 3 AM</h3>
                    <p class="textgraycolor">There are many variations of passages of Lorem Ipsum available, but<br /> the majority have suffered alteration in some form, by injected</p>
                  </div>

                </div>
                <div class="showResultTop">
                  <ul>
                    <li>
                      <span class="textgraycolor">Items</span>
                      <strong class="textwhitecolor">{collectionData?.totalItems}</strong>
                    </li>

                    <li>
                      <span class="textgraycolor">Owners</span>
                      <strong class="textwhitecolor">{collectionData?.totalOwners}</strong>
                    </li>

                    <li>
                      <span class="textgraycolor">Floor Price</span>
                      <strong class="textwhitecolor">
                        <img class="img-fluid" src="../images/priceicon.svg" alt="img" />
                        {collectionData?.floorprice}</strong>
                    </li>

                    <li>
                      <span class="textgraycolor">Volume Traded</span>
                      <strong class="textwhitecolor">
                        <img class="img-fluid" src="../images/priceicon.svg" alt="img" />
                        {collectionData?.totalvolumes}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="popularCollection mt-3 pt-3 mt-md-4 pt-md-4">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="row d-none d-md-flex">
                  <div class="col-md-6 col-xl-3 mb-3 mb-xl-0">
                    <button class="filterbtn dropdown-toggle text-start" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      Price
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a class="dropdown-item" href="#">Highest price</a></li>
                      <li><a class="dropdown-item" href="#">Lowest Price</a></li>
                    </ul>
                  </div>

                  <div class="col-md-6 col-xl-3 mb-3 mb-xl-0">
                    <button class="filterbtn dropdown-toggle text-start" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      Newest
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a class="dropdown-item" href="#">Newest</a></li>
                      <li><a class="dropdown-item" href="#">Oldest</a></li>
                    </ul>
                  </div>

                  <div class="col-md-6 col-xl-3">
                    <button class="filterbtn dropdown-toggle text-start" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      All items
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a class="dropdown-item" href="#">Single items</a></li>
                      <li><a class="dropdown-item" href="#">Bundles</a></li>
                    </ul>
                  </div>

                  <div class="col-md-6 col-xl-3">
                    <button class="filterbtn dropdown-toggle text-start" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      Currency
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a class="dropdown-item" href="#">USD</a></li>
                      <li><a class="dropdown-item" href="#">Ethereum</a></li>
                    </ul>
                  </div>
                </div>
                <div class="row mt-2 mt-md-5">
                  {
                    nftBalance?.map((nft) => (
                      <>
                        <div class="col-md-6 col-xl-3 mb-4" key={nft?.token_uri}>
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
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { collection } = ctx.query;
  return {
    props: { collection }, // will be passed to the page component as props
  };
}
export default Collection;
{/* <>
                <div className='row justify-content-left'>
                  <div className='border border-red'>
                    <div className='row justify-content-ceneter'>
                      <div className='pt-4'></div>
                      <RenderNFTInTabs
                        openDialogTitle={"Open Now"}
                        editOrDelete={false}
                        user={users?.user}
                        formCollection={true}
                        nfts={data?.nfts ? data?.nfts : []}
                        message="This Collection Don't Have Any NFT"
                      />
                    </div>
                  </div>

                </div>
              </> */}