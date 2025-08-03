import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [todaylog, setTodayLog] = useState(null);
  const [logHistory, setLogHistory] = useState([]);
  const [goalInput, setGoalInput] = useState({
    type: "",
    target: "",
    unit: "",
  });
  const [healthInput, setHealthInput] = useState({
    weight: "",
    sleep: "",
    waterIntake: "",
    mood: "",
    exercise: "",
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchGoals();
    fetchTodayLog();
    fetchLogHistory();
  }, []);

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/goal", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(res.data.goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const fetchTodayLog = async () => {
    try {
      const token = localStorage.getItem("token");
      const today = new Date().toISOString().split("T")[0];
      const res = await axios.get(
        `http://localhost:5000/api/healthlog/daily/${today}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodayLog(res.data.logs[0] || null);
    } catch (error) {
      console.error("Error fetching today's log:", error);
    }
  };

  const fetchLogHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/dashboard/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const uniqueByDate = {};
      res.data.logs.forEach((log) => {
        const dateKey = new Date(log.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        });
        if (!uniqueByDate[dateKey]) {
          uniqueByDate[dateKey] = {
            date: dateKey,
            weight: log.weight,
            sleep: log.sleep,
            waterIntake: log.waterIntake,
          };
        }
      });

      setLogHistory(Object.values(uniqueByDate));
    } catch (error) {
      console.error("Error fetching log history", error);
    }
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/dashboard/goals", goalInput, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoalInput({ type: "", target: "", unit: "" });
      fetchGoals();
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  const handleHealthSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/healthlog", healthInput, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHealthInput({
        weight: "",
        sleep: "",
        waterIntake: "",
        mood: "",
        exercise: "",
      });
      fetchTodayLog();
      fetchLogHistory();
    } catch (error) {
      console.error("Error logging health stats:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 md:p-12">
      <div className="max-w-7xl mx-auto space-y-16">
        <header className="text-center relative">
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
          >
            Logout
          </button>
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Health Dashboard
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Track your progress, set goals, and stay healthy.
          </p>
        </header>

        {/* Goals */}
        <Section title="Current Goals">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.length === 0 ? (
              <p className="text-gray-500 italic">
                No goals set yet. Set one below to get started!
              </p>
            ) : (
              goals.map((goal) => (
                <Card key={goal._id}>
                  <h3 className="text-lg font-semibold text-blue-300 mb-1">
                    <span className="text-gray-200">{goal.type}</span>
                  </h3>
                  <p className="text-md text-blue-400 mb-1">
                    Target: <span className="text-gray-300">{goal.target}</span>
                  </p>
                  <p className="text-sm text-blue-500">
                    Unit: <span className="text-gray-400">{goal.unit}</span>
                  </p>
                </Card>
              ))
            )}
          </div>
        </Section>

        {/* Today's Health Log */}
        <Section title="Today's Health Log">
          {todaylog ? (
            <Card>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <LogItem label="Weight" value={`${todaylog.weight} kg`} />
                <LogItem label="Sleep" value={`${todaylog.sleep} hrs`} />
                <LogItem
                  label="Water Intake"
                  value={`${todaylog.waterIntake} L`}
                />
                <LogItem label="Mood" value={todaylog.mood} />
                <LogItem label="Exercise" value={todaylog.exercise} />
              </div>
            </Card>
          ) : (
            <p className="text-gray-500 italic">
              No health log submitted for today. Submit your stats below!
            </p>
          )}
        </Section>

        {/* Charts */}
        <Section title="Progress Charts">
          {logHistory.length < 1 ? (
            <p className="text-gray-500 italic">
              Not enough data for charts yet. Start logging your stats!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ChartCard
                title="Weight Over Time"
                data={logHistory}
                dataKey="weight"
                fill="#60A5FA"
              />
              <ChartCard
                title="Water Intake"
                data={logHistory}
                dataKey="waterIntake"
                fill="#34D399"
              />
              <ChartCard
                title="Sleep Duration"
                data={logHistory}
                dataKey="sleep"
                fill="#FBBF24"
                fullWidth
              />
            </div>
          )}
        </Section>

        {/* Goal Form */}
        <Section title="Set a New Goal">
          <Form onSubmit={handleGoalSubmit}>
            <FormInput
              placeholder="Type (e.g., weight)"
              value={goalInput.type}
              onChange={(e) =>
                setGoalInput({ ...goalInput, type: e.target.value })
              }
            />
            <FormInput
              type="number"
              placeholder="Target"
              value={goalInput.target}
              onChange={(e) =>
                setGoalInput({ ...goalInput, target: e.target.value })
              }
            />
            <FormInput
              placeholder="Unit (e.g., kg, hrs)"
              value={goalInput.unit}
              onChange={(e) =>
                setGoalInput({ ...goalInput, unit: e.target.value })
              }
            />
            <FormButton color="blue">Add Goal</FormButton>
          </Form>
        </Section>

        {/* Health Stats Form */}
        <Section title="Log Health Stats">
          <Form onSubmit={handleHealthSubmit}>
            <FormInput
              type="number"
              placeholder="Weight (kg)"
              value={healthInput.weight}
              onChange={(e) =>
                setHealthInput({ ...healthInput, weight: e.target.value })
              }
            />
            <FormInput
              type="number"
              placeholder="Sleep (hrs)"
              value={healthInput.sleep}
              onChange={(e) =>
                setHealthInput({ ...healthInput, sleep: e.target.value })
              }
            />
            <FormInput
              type="number"
              placeholder="Water Intake (L)"
              value={healthInput.waterIntake}
              onChange={(e) =>
                setHealthInput({
                  ...healthInput,
                  waterIntake: e.target.value,
                })
              }
            />
            <FormInput
              placeholder="Mood"
              value={healthInput.mood}
              onChange={(e) =>
                setHealthInput({ ...healthInput, mood: e.target.value })
              }
            />
            <FormInput
              placeholder="Exercise"
              value={healthInput.exercise}
              onChange={(e) =>
                setHealthInput({ ...healthInput, exercise: e.target.value })
              }
            />
            <FormButton color="emerald">Submit Health Stats</FormButton>
          </Form>
        </Section>
      </div>
    </div>
  );
};

// --- Reusable Components ---
const Section = ({ title, children }) => (
  <section className="space-y-6">
    <h2 className="text-3xl font-bold text-blue-400 border-b border-gray-700 pb-2">
      {title}
    </h2>
    {children}
  </section>
);

const Card = ({ children }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105 duration-200">
    {children}
  </div>
);

const LogItem = ({ label, value }) => (
  <p className="text-gray-300">
    <span className="font-semibold text-blue-300">{label}:</span> {value}
  </p>
);

const Form = ({ children, onSubmit }) => (
  <form
    onSubmit={onSubmit}
    className="bg-gray-800 p-8 rounded-xl shadow-lg grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
  >
    {children}
  </form>
);

const FormInput = ({ type = "text", ...props }) => (
  <input
    type={type}
    {...props}
    className="border border-gray-600 bg-gray-700 text-gray-200 rounded-lg px-4 py-3 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    required
  />
);

const FormButton = ({ children, color }) => (
  <button
    type="submit"
    className={`sm:col-span-2 lg:col-span-3 bg-${color}-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-${color}-600 focus:outline-none focus:ring-2 focus:ring-${color}-400 transition`}
  >
    {children}
  </button>
);

const ChartCard = ({ title, data, dataKey, fill, fullWidth = false }) => (
  <div
    className={`bg-gray-800 p-6 rounded-xl shadow-lg ${
      fullWidth ? "col-span-1 md:col-span-2" : ""
    }`}
  >
    <h3 className="text-xl font-semibold text-gray-200 mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
        <XAxis dataKey="date" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "none",
            color: "#E5E7EB",
          }}
          itemStyle={{ color: "#E5E7EB" }}
        />
        <Bar dataKey={dataKey} fill={fill} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default Dashboard;
