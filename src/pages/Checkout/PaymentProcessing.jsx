import React, { useEffect, useState } from "react";

const STAGES = {
  card: ["Connecting to your bank…", "Verifying card details…", "Authorising payment…"],
  upi: ["Sending request to your UPI app…", "Waiting for approval…", "Confirming payment…"],
  cod: ["Confirming your order…", "Notifying the restaurant…", "Assigning a rider…"],
};
const STAGE_MS = 900;

// Simulated payment gateway: cycles through stages, then reports success.
const PaymentProcessing = ({ method, amount, onDone }) => {
  const stages = STAGES[method];
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = stages.map((_, i) => setTimeout(() => setStage(i), i * STAGE_MS));
    timers.push(setTimeout(onDone, stages.length * STAGE_MS + 300));
    return () => timers.forEach(clearTimeout);
    // Run once: onDone places the order exactly one time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="co-processing" role="status" aria-live="polite">
      <div className="co-processing-card">
        <div className="co-spinner">
          <span />
          <span />
        </div>
        <strong>${amount.toFixed(2)}</strong>
        <p key={stage}>{stages[stage]}</p>
        <div className="co-processing-bar">
          <span style={{ width: `${((stage + 1) / stages.length) * 100}%` }} />
        </div>
        <small>Please don&apos;t close this window</small>
      </div>
    </div>
  );
};

export default PaymentProcessing;
