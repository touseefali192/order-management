import React, { useEffect, useState } from "react";
import { companies, sampleOrders } from "../utils/data.ts";
import OrderTable from "../components/OrderTable.tsx";
import ResponsivePaginationComponent from "react-responsive-pagination";

const Home = () => {
	const [company, setCompany] = useState<{ name: string; logo: string } | null>(
		null
	);
  const [currentPage, setCurrentPage] = useState<number>(1);

	useEffect(() => {
		const hostname = window.location.hostname;
		console.log("Hostname is: ", hostname);
		const domainName = hostname.split(".")[0];
		setCompany(companies[domainName] || null);
	}, []);

	console.log("Company details are: ", company);

	if (!company) {
		return <div>Company not found or unsupported domain.</div>;
	}

	return (
		<div>
			<img src={company.logo} alt={company.name} />
			<OrderTable data={sampleOrders[company.name]} />
		</div>
	);
};

export default Home;
