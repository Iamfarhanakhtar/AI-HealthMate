import React, { useRef } from 'react';
import Button from './UI/Button';

function CertificateCard({
  userName = "Aura Champion",
  quizTitle = "General Hygiene & Prevention Assessment",
  score = 100,
  date = new Date().toLocaleDateString()
}) {
  const printAreaRef = useRef(null);

  const generateHash = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let hash = 'HM-';
    for (let i = 0; i < 8; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
  };

  const certificateHash = generateHash();

  const handlePrint = () => {
    const printContent = printAreaRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    // Create a simple printing template
    const style = `
      <style>
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .cert-container {
            border: 15px double #004f54 !important;
            background: #f4fbfb !important;
            padding: 40px !important;
            width: 800px !important;
            height: 500px !important;
            box-sizing: border-box !important;
            position: relative !important;
            text-align: center !important;
            font-family: 'Inter', sans-serif !important;
          }
        }
      </style>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>AI HealthMate Certificate - ${userName}</title>
          ${style}
        </head>
        <body>
          <div class="cert-container">
            ${printContent}
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    // Short delay to allow fonts/styles to load before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-2xl mx-auto">
      {/* Visual representation in dark mode */}
      <div 
        ref={printAreaRef}
        className="w-full relative rounded-2xl border-4 border-double border-primary/40 bg-[#0f1422] p-8 md:p-12 text-center overflow-hidden shadow-2xl"
      >
        {/* Decorative corner glows */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/10 filter blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-secondary-container/10 filter blur-xl"></div>

        {/* Certificate Frame Content */}
        <div className="border border-white/5 p-6 md:p-8 rounded-xl flex flex-col items-center relative z-10 gap-6">
          <span className="material-symbols-outlined text-primary text-5xl animate-pulse">
            workspace_premium
          </span>

          <div className="flex flex-col gap-1">
            <h2 className="font-display-lg text-2xl md:text-3xl font-extrabold text-primary tracking-wider uppercase text-glow">
              Certificate of Achievement
            </h2>
            <span className="text-[10px] font-mono-data text-outline uppercase tracking-widest">
              AWARENESS CHAMPION PORTAL
            </span>
          </div>

          <p className="text-body-sm text-on-surface-variant text-[14px] italic leading-normal">
            This certifies that the community member
          </p>

          <h3 className="font-display-lg text-3xl font-bold text-secondary border-b-2 border-primary/20 pb-2 px-8 min-w-[200px]">
            {userName}
          </h3>

          <p className="text-body-sm text-on-surface-variant text-[13px] max-w-md mx-auto leading-relaxed">
            has successfully completed the public healthcare awareness assessment on <strong className="text-primary">{quizTitle}</strong> with a score of <strong className="text-secondary-container">{score}%</strong>.
          </p>

          <div className="grid grid-cols-2 gap-8 w-full mt-6 text-left max-w-lg mx-auto">
            <div className="flex flex-col border-t border-white/10 pt-3">
              <span className="text-[9px] uppercase tracking-wider text-outline">Date of Issue</span>
              <span className="text-xs text-on-surface font-semibold">{date}</span>
            </div>
            <div className="flex flex-col border-t border-white/10 pt-3 text-right">
              <span className="text-[9px] uppercase tracking-wider text-outline">Verification Code</span>
              <span className="text-xs text-primary font-mono font-semibold">{certificateHash}</span>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handlePrint}
        variant="primary"
        className="w-full sm:w-auto"
        iconLeft={<span className="material-symbols-outlined text-sm">print</span>}
      >
        Print Certificate
      </Button>
    </div>
  );
}

export default CertificateCard;
