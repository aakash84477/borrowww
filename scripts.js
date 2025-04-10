// Shared JavaScript functions
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Initialize calculators if present
  if (document.getElementById('loan-amount')) {
    calculateEMI();
  }
  if (document.getElementById('current-loan')) {
    calculateSavings();
  }
});

// Enhanced EMI Calculator function
function calculateEMI() {
  const principal = parseFloat(document.getElementById('loan-amount').value);
  const rate = parseFloat(document.getElementById('interest-rate').value) / 1200;
  const tenure = parseFloat(document.getElementById('loan-tenure').value) * 12;
  
  const emi = principal * rate * Math.pow(1 + rate, tenure) / (Math.pow(1 + rate, tenure) - 1);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - principal;
  
  document.getElementById('emi-result').textContent = isNaN(emi) ? '0' : emi.toFixed(0);
  document.getElementById('total-interest').textContent = isNaN(totalInterest) ? '0' : totalInterest.toFixed(0);
  document.getElementById('total-payment').textContent = isNaN(totalPayment) ? '0' : totalPayment.toFixed(0);
}

// Savings Calculator for Balance Transfer
function calculateSavings() {
  const principal = parseFloat(document.getElementById('current-loan').value);
  const currentRate = parseFloat(document.getElementById('current-rate').value) / 1200;
  const newRate = parseFloat(document.getElementById('new-rate').value) / 1200;
  const tenure = parseFloat(document.getElementById('remaining-tenure').value) * 12;
  
  // Calculate current EMI
  const currentEMI = principal * currentRate * Math.pow(1 + currentRate, tenure) / (Math.pow(1 + currentRate, tenure) - 1);
  const currentTotal = currentEMI * tenure;
  
  // Calculate new EMI
  const newEMI = principal * newRate * Math.pow(1 + newRate, tenure) / (Math.pow(1 + newRate, tenure) - 1);
  const newTotal = newEMI * tenure;
  
  // Calculate savings
  const monthlySavings = currentEMI - newEMI;
  const totalSavings = currentTotal - newTotal;
  
  document.getElementById('savings-result').textContent = isNaN(totalSavings) ? '0' : totalSavings.toFixed(0);
  document.getElementById('emi-reduction').textContent = isNaN(monthlySavings) ? '0' : monthlySavings.toFixed(0);
  document.getElementById('interest-savings').textContent = isNaN(currentTotal - principal - (newTotal - principal)) ? '0' : (currentTotal - principal - (newTotal - principal)).toFixed(0);
}

// CIBIL Score Checker placeholder
function checkCIBIL() {
  const phone = document.getElementById('cibil-phone').value;
  if (phone.length === 10) {
    alert('CIBIL check request received! Our representative will contact you shortly.');
  } else {
    alert('Please enter a valid 10-digit phone number');
  }
}
