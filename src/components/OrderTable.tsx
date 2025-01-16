import React, { useEffect, useState } from "react";
import ResponsivePaginationComponent from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

interface Order {
	orderId: number;
	customerName: string;
	amount: number;
	status: string;
}

interface OrderTableProps {
	data: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const totalPages = Math.ceil(data.length / 10);

	const [orders, setOrders] = useState<Order[]>(data);
	const [sortColumn, setSortColumn] = useState<keyof Order | null>(null);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	const handleSort = (column: keyof Order) => {
		const isSameColumn = column === sortColumn;
		const newDirection =
			isSameColumn && sortDirection === "asc" ? "desc" : "asc";

		setSortColumn(column);
		setSortDirection(newDirection);

		const sortedOrders = [...orders].sort((a, b) => {
			if (a[column] < b[column]) return newDirection === "asc" ? -1 : 1;
			if (a[column] > b[column]) return newDirection === "asc" ? 1 : -1;
			return 0;
		});

		setOrders(sortedOrders);
	};

	const getSortIndicator = (column: keyof Order) => {
		if (column === sortColumn) {
			return sortDirection === "asc" ? "▲" : "▼";
		}
		return "";
	};

	return (
		<div className="p-10">
			<table className="w-full">
				<thead>
					<tr>
						<th
							onClick={() => handleSort("orderId")}
							className="border border-black cursor-pointer"
						>
							Order Id {getSortIndicator("orderId")}
						</th>
						<th
							onClick={() => handleSort("customerName")}
							className="border border-black cursor-pointer"
						>
							Customer Name {getSortIndicator("customerName")}
						</th>
						<th
							onClick={() => handleSort("amount")}
							className="border border-black cursor-pointer"
						>
							Amount {getSortIndicator("amount")}
						</th>
						<th
							onClick={() => handleSort("status")}
							className="border border-black cursor-pointer"
						>
							Status {getSortIndicator("status")}
						</th>
					</tr>
				</thead>
				<tbody>
					{orders
						.slice(10 * currentPage - 1, 10 * currentPage - 1 + 10)
						.map((row) => {
							return (
								<tr>
									<td className="align-center border-black border">
										{row.orderId}
									</td>
									<td className="align-center border-black border">
										{row.customerName}
									</td>
									<td className="align-center border-black border">
										{row.amount}
									</td>
									<td className="align-center border-black border">
										{row.status}
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			<ResponsivePaginationComponent
				current={currentPage}
				total={totalPages}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
};

export default OrderTable;
