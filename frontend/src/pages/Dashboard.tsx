import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeads } from "../services/leadService";
import type { Lead } from "../types/Lead";

import {
  FaUsers,
  FaUserPlus,
  FaPhone,
  FaCheckCircle,
  FaTimesCircle,
  FaListAlt,
} from "react-icons/fa";

function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const contacted = leads.filter((l) => l.status === "Contacted").length;
  const qualified = leads.filter((l) => l.status === "Qualified").length;
  const lost = leads.filter((l) => l.status === "Lost").length;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-blue-600 text-white flex justify-between items-center px-10 py-4 shadow-lg">
        <h1 className="text-2xl font-bold">
          Lead Management Dashboard
        </h1>

        <div className="space-x-3">
          <button
            onClick={() => navigate("/leads")}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
          >
            View Leads
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-8">

        <DashboardCard
          title="Total Leads"
          value={total}
          color="bg-blue-500"
          icon={<FaUsers />}
        />

        <DashboardCard
          title="New"
          value={newLeads}
          color="bg-green-500"
          icon={<FaUserPlus />}
        />

        <DashboardCard
          title="Contacted"
          value={contacted}
          color="bg-yellow-500"
          icon={<FaPhone />}
        />

        <DashboardCard
          title="Qualified"
          value={qualified}
          color="bg-purple-500"
          icon={<FaCheckCircle />}
        />

        <DashboardCard
          title="Lost"
          value={lost}
          color="bg-red-500"
          icon={<FaTimesCircle />}
        />
      </div>

      {/* Recent Leads */}
      <div className="mx-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaListAlt />
          Recent Leads
        </h2>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Assigned To</th>
            </tr>
          </thead>

          <tbody>
            {leads.slice(0, 5).map((lead) => (
              <tr
                key={lead._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{lead.name}</td>
                <td className="p-3">{lead.company}</td>
                <td className="p-3">{lead.status}</td>
                <td className="p-3">{lead.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className={`${color} text-white rounded-xl shadow-lg p-6`}>
      <div className="text-4xl mb-3">
        {icon}
      </div>

      <h2 className="text-lg">{title}</h2>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}

export default Dashboard;