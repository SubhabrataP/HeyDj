import React, { useState, useEffect } from "react";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";

const initialState = {
  totalHoursSubscribed: 0,
  revenueEarned: 0,
  revenuePaid: 0,
  lastPaid: 0,
  outstandingAmount: 0,
};

export default function DjMetric({ id }) {
  const [metric, setMetric] = useState(initialState);

  // /api/admin/user/f788b6e2-f51c-4d0c-9e2a-a4a2e812fc3a/metrics

  const fetchMetric = () => {
    return apiAxios.get(`/api/admin/user/${id}/metrics`, {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    });
  };
  useEffect(() => {
    fetchMetric().then((res) => setMetric(res.data));
  }, [id]);

  return (
    <>
      <td>{metric.totalHoursSubscribed}</td>
      <td>{metric.revenueEarned}</td>
      <td>{metric.revenuePaid}</td>
      <td>{metric.lastPaid}</td>
      <td>{metric.outstandingAmount}</td>
    </>
  );
}
