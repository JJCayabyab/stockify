import React, { useEffect } from "react";
import { useItemStore } from "../store/useItemsStore";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const { getItemsCount, itemsCount, itemsLoading } = useItemStore();

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      await getItemsCount();
    };
    fetchData();
  }, [getItemsCount]);

  if (!itemsCount.itemsCountByCategory) {
    return <div>Loading...</div>;
  }

  const categories = itemsCount.itemsCountByCategory.map(
    (item) => item.category
  );

  const counts = itemsCount.itemsCountByCategory.map((item) => item.count);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Items per Category",
        data: counts,
        backgroundColor: "rgba(37, 99, 235, 0.5)",
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Items Count by Category",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      {itemsLoading ? (
        <div className="mt-2 flex justify-center items-center h-[300px] sm:h-[350px] lg:h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      ) : (
        <div className="relative h-[300px] sm:h-[350px] lg:h-[400px]">
          <Bar data={chartData} options={options} />
        </div>
      )}
    </>
  );
};

export default BarChart;
