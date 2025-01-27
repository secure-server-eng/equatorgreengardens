window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = '#f4f4f4';
        header.style.color = '#8B0000';
    } else {
        header.style.backgroundColor = '#FFFFFF';
        header.style.color = '#8B0000';
    }
});
// Disable Right-Click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Disable Key Shortcuts (F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S)
document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === "F12") {
        e.preventDefault();
    }
    // Ctrl+Shift+I or Ctrl+Shift+J (DevTools)
    if (e.ctrlKey && (e.key === 'I' || e.key === 'J') && e.shiftKey) {
        e.preventDefault();
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'U') {
        e.preventDefault();
    }
    // Ctrl+S (Save Page)
    if (e.ctrlKey && e.key === 'S') {
        e.preventDefault();
    }
});
// Select the form and attach a submit event listener
const form = document.getElementById("mpesaForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Get the input values
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const amount = document.getElementById("amount").value.trim();

  // Basic validation
  if (!validatePhoneNumber(phoneNumber)) {
    alert("Please enter a valid phone number in the format 2547XXXXXXXX");
    return;
  }
  if (!validateAmount(amount)) {
    alert("Please enter a valid amount greater than 0");
    return;
  }

  try {
    // Send the data to the backend
    const response = await fetch("http://localhost:5000/stkpush", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, amount }),
    });

    const result = await response.json();

    // Handle the API response
    if (response.ok && result.ResponseCode === "0") {
      alert("Payment initiated successfully! Check your phone to complete the transaction.");
    } else {
      console.error(result);
      alert(
        `Payment failed: ${result.errorMessage || "An unexpected error occurred"}`
      );
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while processing the payment. Please try again.");
  }
});

// Helper function to validate the phone number format
function validatePhoneNumber(phoneNumber) {
  // Kenyan phone number format: 2547XXXXXXXX
  const regex = /^2547\d{8}$/;
  return regex.test(phoneNumber);
}

// Helper function to validate the amount
function validateAmount(amount) {
  return !isNaN(amount) && amount > 0;
}
