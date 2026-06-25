import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaHome } from "react-icons/fa";
import { getLeads, deleteLead } from "../services/leadService";
import type { Lead } from "../types/Lead";

function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this lead?")) return;

    try {
      await deleteLead(id);
      fetchLeads();
    } catch (error) {
      alert("Failed to delete lead");
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const badgeColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";
      case "Contacted":
        return "bg-yellow-100 text-yellow-700";
      case "Qualified":
        return "bg-green-100 text-green-700";
      case "Won":
        return "bg-emerald-100 text-emerald-700";
      case "Lost":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-blue-600 text-white flex justify-between items-center px-8 py-4 shadow">

        <h1 className="text-2xl font-bold">
          Lead Management
        </h1>

        <div className="space-x-3">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200"
          >
            <FaHome />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/add-lead")}
            className="bg-green-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
          >
            <FaPlus />
            Add Lead
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow m-8 p-6">

        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">

          <div className="flex items-center border rounded-lg px-3 w-full md:w-96">

            <FaSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Search Lead..."
              className="w-full p-3 outline-none"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
            />

          </div>

          <select
            className="border rounded-lg p-3"
            value={statusFilter}
            onChange={(e)=>setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Won</option>
            <option>Lost</option>
          </select>

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Assigned</th>
                <th className="p-3 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredLeads.map((lead)=>(

                <tr
                  key={lead._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">{lead.name}</td>

                  <td className="p-3">{lead.company}</td>

                  <td className="p-3">{lead.email}</td>

                  <td className="p-3">{lead.phone}</td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(lead.status)}`}
                    >
                      {lead.status}
                    </span>

                  </td>

                  <td className="p-3">{lead.assignedTo}</td>

                  <td className="p-3 flex justify-center gap-2">

                    <button
                      onClick={()=>navigate(`/edit-lead/${lead._id}`)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                      <FaEdit/>
                    </button>

                    <button
                      onClick={()=>handleDelete(lead._id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      <FaTrash/>
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Leads;