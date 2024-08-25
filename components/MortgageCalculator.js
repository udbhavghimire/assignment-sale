"use client";
import { useState } from "react";

const MortgageCalculator = () => {
  const [amount, setAmount] = useState(800000);
  const [interest, setInterest] = useState(1.85);
  const [years, setYears] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Perform calculation logic here (you can use a library like 'mortgage-calculator' or implement your own logic)
    // For simplicity, I'll just set a timeout to simulate calculation
    setTimeout(() => {
      const calculatedPayment = amount / (years * 12);
      setMonthlyPayment(calculatedPayment.toFixed(2));
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="" id="mortgage">
      <section className="position-relative">
        <div className="container bg-light py-5">
          <div className="row row-cols-1 row-cols-md-2 justify-content-center align-items-center">
            <div className="col-md-6">
              <h3 className="fw-bold d-block d-md-none px-2 mb-3">
                Calculate your{" "}
                <span className="text-mine2">Monthly Mortgage Payment</span>
              </h3>
              <div className="card card-body border-0 shadow-sm text-start px-4 py-2">
                <form id="loan-form" onSubmit={handleSubmit}>
                  <label htmlFor="amount" className="form-label">
                    Loan Amount
                  </label>
                  <div className="input-group mb-3 mt-2">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      id="amount"
                      placeholder="Loan amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="row row-cols-2">
                    <div className="col">
                      <label htmlFor="interest" className="form-label">
                        Interest Rate
                      </label>
                      <div className="input-group mb-3 mt-2">
                        <input
                          type="text"
                          className="form-control"
                          id="interest"
                          placeholder="Interest"
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                    <div className="col">
                      <label htmlFor="years" className="form-label">
                        Period
                      </label>
                      <div className="input-group mb-3 mt-2">
                        <input
                          type="number"
                          className="form-control"
                          id="years"
                          placeholder="Years To Repay"
                          value={years}
                          onChange={(e) => setYears(e.target.value)}
                        />
                        <span className="input-group-text">Yrs</span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      className="btn bg-dark text-white btn-md w-100 mb-3"
                      value="Calculate"
                      disabled={loading}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-5">
              <h3 className="fw-bold d-md-block d-none fs-4">
                Calculate your{" "}
                <span className="text-mine2">Monthly Mortgage Payment</span>
              </h3>
              <div id="loading">
                {loading && (
                  <img src="/loading.gif" className="loading-img" alt="" />
                )}
              </div>
              <div id="results" className="py-4 center-sm text-danger">
                {!loading && monthlyPayment && (
                  <p className="fs-2 fw-bold">${monthlyPayment} / Mo</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MortgageCalculator;
