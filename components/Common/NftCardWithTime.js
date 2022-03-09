import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import formatDate from "../../utils/formatDate";
import AuthorLink from "../SmallComponent/AuthorLink";

const NftCardWithTime = ({ data }) => {
	const router = useRouter();
	const [days, setDays] = useState("");
	const [hours, setHours] = useState("");
	const [minutes, setMinutes] = useState("");
	const [seconds, setSeconds] = useState("");

	const isFirstRun = useRef(true);

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}
		comingSoonTime();
	}, [data]);

	const comingSoonTime = () => {
		let endTime = new Date(formatDate(data?.auctionEnds));
		if (data?.id == 10)
			endTime = new Date('2022-03-10')
		let endTimeParse = Date.parse(endTime) / 1000;
		let now = new Date();
		let nowParse = Date.parse(now) / 1000;
		let timeLeft = endTimeParse - nowParse;
		let countdays = Math.floor(timeLeft / 86400);
		let counthours = Math.floor((timeLeft - countdays * 86400) / 3600);
		let countminutes = Math.floor(
			(timeLeft - countdays * 86400 - counthours * 3600) / 60
		);
		let countseconds = Math.floor(
			timeLeft - countdays * 86400 - counthours * 3600 - countminutes * 60
		);
		if (counthours < "10") {
			counthours = "0" + counthours;
		}
		if (countminutes < "10") {
			countminutes = "0" + countminutes;
		}
		if (countseconds < "10") {
			countseconds = "0" + countseconds;
		}

		setDays(countdays);
		setHours(counthours);
		setMinutes(countminutes);
		setSeconds(countseconds);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			comingSoonTime();
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="col-lg-3 col-md-6">
			<div className="featured-item">
				<div className="featured-item-img">
					<Link href="/nft/[slug]" as={`/nft/${data?.id}`}>
						<a>
							<img src={data?.image_url} alt="Images" />
						</a>
					</Link>

					<div className="featured-user">
						<AuthorLink
							data={
								{
									"created_by": data?.created_by,
									"profile_photo": data?.profile_photo
								}}
							classNameData={"featured-user-option"}
						/>
					</div>
					<button
						type="button"
						className="default-btn border-radius-5"
						onClick={() => router.push("/add-wallet")}
					>
						Place Bid
					</button>
					<div
						className="featured-item-clock"
						data-countdown="2021/09/09"
					>
						{days}:{hours}:{minutes}:{seconds}
					</div>
				</div>

				<div className="content">
					<h3>
						<Link href="/nft/[slug]" as={`/nft/${data?.id}`}>
							<a>{data.name}</a>
						</Link>
					</h3>
					<div className="content-in">
						<span>
							{data.cryptoCost} {data.cryptoType} 12/14
						</span>
						<h4>Bid 80 ETH </h4>
					</div>
					<div className="featured-content-list">
						<ul>
							<li>
								<img
									src="../images/featured/featured-user1.jpg"
									alt="Images"
								/>
							</li>
							<li>
								<img
									src="../images/featured/featured-user2.jpg"
									alt="Images"
								/>
							</li>
							<li className="title">
								{data?.bids?.length} People Placed Bid
							</li>
						</ul>
						<p>
							<i className="ri-heart-line"></i> 122
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NftCardWithTime;
