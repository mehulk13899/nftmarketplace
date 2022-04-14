import React from 'react';
import Loader from '../Common/Loader';
const ActivityArea = ({ activity = [], isLoading }) => {

  return (
    <>
      <div class="activitySec mt-5">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2 class="headingWh mb-2 mb-md-4">Activity</h2>
            </div>
          </div>
          {/* <div class="row">
            <div class="col-md-12 col-lg-6">
              <div class="row">
                <div class="col-md-6 col-xl-4  mb-3 mt-2 mb-md-0 mt-md-0">
                  <div class="btn-group">
                    <button class="filterbtn dropdown-toggle text-start" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      Event type
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a class="dropdown-item" href="#">Listings</a></li>
                      <li><a class="dropdown-item" href="#">Sales</a></li>
                      <li><a class="dropdown-item" href="#">Bids</a></li>
                      <li><a class="dropdown-item" href="#">Transfers</a></li>
                    </ul>
                  </div>
                </div>


                <div class="col-md-6 col-xl-4">
                  <div class="btn-group">
                    <button class="filterbtn dropdown-toggle text-start" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      All chains
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a class="dropdown-item" href="#">Ethereum</a></li>
                      <li><a class="dropdown-item" href="#">Polygon</a></li>
                      <li><a class="dropdown-item" href="#">Klaytn</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12 col-lg-6 activityTags 1d-flex justify-content-end d-none d-lg-flex">
              <button class="btn btndarkblue">Bids</button>
              <button class="btn btndarkblue">Listings</button>
              <button class="btn btnlightblue">Clear All <img src="../images/closeicon.svg" alt="img" /></button>
            </div>
          </div> */}
          <div class="row mt-3 mt-md-5">
            <div class="col-md-12">
              <div class="activityTable">
                <table>
                  <tbody><tr>
                    <th>EVENT TYPE</th>
                    <th>ITEM</th>
                    <th class=" text-end">PRICE</th>
                    <th class="text-center">QUANTITY</th>
                    <th class=" text-end">FROM</th>
                    <th class=" text-end">TO</th>
                    <th class=" text-end">VIEW</th>
                    <th class=" text-end">TIME</th>
                  </tr>
                    {
                      isLoading ?
                        <div className="text-center">
                          <Loader />
                        </div> :
                        <>
                          {activity && activity?.map((act) => {
                            return (
                              <tr>
                                <td class="textwhitecolor offericon">
                                  <img src="../images/handicon.svg" alt="img" /> Offer
                                </td>
                                <td class="textwhitecolor">
                                  {act?.token_id}
                                  {/* <div class="actiCollect">
                              <div class="activitItem"><img class="img-fluid" src="../images/activityItem01.svg" alt="img" /></div>
                              <div class="actiCnt">
                                <span class="textgraycolor">Jungle Freaks</span>
                                Jungle Freaks by Trosley
                                <div class="actiCntSm"><img class="img-fluid" src="../images/priceicon.svg" alt="img" /> 0,002</div>
                              </div>
                            </div> */}
                                </td>
                                <td class="textwhitecolor text-end">{act?.price && <img class="img-fluid" src="../images/priceicon.svg" alt="img" />}{act?.price ? act?.price : "---"}</td>
                                <td class="textwhitecolor text-center">{act?.amount}</td>
                                <td class="textbluecolor text-end">{act?.from_address == "0x0000000000000000000000000000000000000000" ? "null" : act?.from_address?.substring(1, 5) + "...."}</td>
                                <td class="textbluecolor text-end"><a
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  href={`/author/${act?.to_address}`}
                                >{act?.to_address?.substring(1, 5) + "...."}</a></td>
                                <td class="textbluecolor text-end"><a
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  href={`https://mumbai.polygonscan.com/tx/${act?.transaction_hash}`}>View On Blockchain</a></td>
                                <td class="textbluecolor text-end"><div class="offericonSm"><img src="../images/handicon.svg" alt="img" /> Offer</div>{new Date(act?.block_timestamp)?.toDateString()}</td>
                              </tr>
                            )
                          })}
                        </>
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='activity-area pt-100 pb-70'>
        <div className='container'>
          <div className='section-title'>
            <h2>Activity</h2>
          </div>

          <div className='row pt-45'>
            <div className='col-lg-9'>
              <div className='row justify-content-center'>
                <div className='col-lg-12'>
                  <div className='activity-card'>
                    <div className='activity-img'>
                      <img
                        src='../images/activity/activity-img1.jpg'
                        alt='Images'
                      />
                    </div>

                    <div className='activity-content'>
                      <p>
                        <i className='ri-calendar-2-line'></i> 5 June, 2021
                      </p>
                      <span>
                        <i className='ri-time-line'></i> 11:49 AM
                      </span>
                    </div>

                    <div className='activity-into'>
                      <h3>Supper Nuemorphism</h3>
                      <span>
                        Listed By <b>@Jackon</b> For <b>230 ETH</b> Each
                      </span>
                    </div>

                    <div className='activity-btn'>
                      <i className='ri-delete-bin-4-line'></i>
                    </div>
                  </div>
                </div>

                <div className='col-lg-12'>
                  <div className='activity-card'>
                    <div className='activity-img'>
                      <img
                        src='../images/activity/activity-img2.jpg'
                        alt='Images'
                      />
                    </div>

                    <div className='activity-content'>
                      <p>
                        <i className='ri-calendar-2-line'></i> 7 June, 2021
                      </p>
                      <span>
                        <i className='ri-time-line'></i> 10:49 AM
                      </span>
                    </div>

                    <div className='activity-into'>
                      <h3>Walking On Air</h3>
                      <span>
                        Listed By <b>@Henry </b> For <b>130 ETH</b> Each
                      </span>
                    </div>

                    <div className='activity-btn'>
                      <i className='ri-delete-bin-4-line'></i>
                    </div>
                  </div>
                </div>

                <div className='col-lg-12'>
                  <div className='activity-card'>
                    <div className='activity-img'>
                      <img
                        src='../images/activity/activity-img3.jpg'
                        alt='Images'
                      />
                    </div>

                    <div className='activity-content'>
                      <p>
                        <i className='ri-calendar-2-line'></i> 9 June, 2021
                      </p>
                      <span>
                        <i className='ri-time-line'></i> 07:49 AM
                      </span>
                    </div>

                    <div className='activity-into'>
                      <h3>Exe Dream Hight</h3>
                      <span>
                        Listed By <b>@Henry </b> For <b>230 ETH</b> Each
                      </span>
                    </div>

                    <div className='activity-btn'>
                      <i className='ri-delete-bin-4-line'></i>
                    </div>
                  </div>
                </div>

                <div className='col-lg-12'>
                  <div className='activity-card'>
                    <div className='activity-img'>
                      <img
                        src='../images/activity/activity-img4.jpg'
                        alt='Images'
                      />
                    </div>

                    <div className='activity-content'>
                      <p>
                        <i className='ri-calendar-2-line'></i> 11 June, 2021
                      </p>
                      <span>
                        <i className='ri-time-line'></i> 08:49 AM
                      </span>
                    </div>

                    <div className='activity-into'>
                      <h3>Become One With Nature</h3>
                      <span>
                        Listed By <b>@Martina </b> For <b>270 ETH</b> Each
                      </span>
                    </div>

                    <div className='activity-btn'>
                      <i className='ri-delete-bin-4-line'></i>
                    </div>
                  </div>
                </div>

                <div className='col-lg-12'>
                  <div className='activity-card'>
                    <div className='activity-img'>
                      <img
                        src='../images/activity/activity-img5.jpg'
                        alt='Images'
                      />
                    </div>

                    <div className='activity-content'>
                      <p>
                        <i className='ri-calendar-2-line'></i> 15 June, 2021
                      </p>
                      <span>
                        <i className='ri-time-line'></i> 09:49 AM
                      </span>
                    </div>

                    <div className='activity-into'>
                      <h3>Les Immortals</h3>
                      <span>
                        Listed By <b>@Evelyn </b> For <b>290 ETH</b> Each
                      </span>
                    </div>

                    <div className='activity-btn'>
                      <i className='ri-delete-bin-4-line'></i>
                    </div>
                  </div>
                </div>
                <Pagination />
              </div>
            </div>

            <div className='col-lg-3'>
                  <ActivitySidebar/>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default ActivityArea;
