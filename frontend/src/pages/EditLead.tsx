import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLeadById,
  updateLead,
} from "../services/leadService";

function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    source: "",
    status: "New",
    notes: "",
    assignedTo: "",
  });

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    try {
      const data = await getLeadById(id!);

      setFormData({
        name: data.name || "",
        company: data.company || "",
        email: data.email || "",
        phone: data.phone || "",
        source: data.source || "",
        status: data.status || "New",
        notes: data.notes || "",
        assignedTo: data.assignedTo || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await updateLead(id!, formData);

      alert("Lead Updated Successfully");

      navigate("/leads");
    } catch (error) {
      console.log(error);
      alert("Failed to Update Lead");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-blue-600 text-white flex justify-between items-center px-8 py-4 shadow">

        <h1 className="text-2xl font-bold">
          Edit Lead
        </h1>

        <button
          onClick={() => navigate("/leads")}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          Back to Leads
        </button>

      </div>

      {/* Form */}

      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="source"
            placeholder="Source"
            value={formData.source}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={formData.assignedTo}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="border rounded-lg p-3 h-32 md:col-span-2 resize-none"
          />

          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Update Lead
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditLead;