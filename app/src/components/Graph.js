import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DummyGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"];
    const data = [10, 15, 5, 8, 12, 9];

    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      chartRef.current.chart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Dummy Data",
              data: data,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, []);

  return (
    <div className="mt-6">
      <canvas ref={chartRef} id="myGraph" width="400" height="200"></canvas>
    </div>
  );
};

const Graph = ({ product }) => {
  return (
    <div className="p-3">
      <div>
        <DummyGraph />
      </div>
    </div>
  );
};

export default Graph;
