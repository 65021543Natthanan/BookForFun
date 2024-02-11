var bookingData = {
    name: "John",
    lastName: "Doe",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    gameBoard: "Monopoly",
    dateTime: "2024-02-15 15:00-16:00", // Format: YYYY-MM-DD HH:mm
};

function populateBookingContent() {
    var container = document.querySelector(".booking-details");

    var content = `
        <p><strong>ชื่อ-นามสกุล:</strong> ${bookingData.name} ${bookingData.lastName}</p>
        <p><strong>เบอร์โทรศัพท์:</strong> ${bookingData.phoneNumber}</p>
        <p><strong>อีเมล:</strong> ${bookingData.email}</p>
        <p><strong>บอร์ดเกมที่จอง:</strong> ${bookingData.gameBoard}</p>
        <p><strong>วันเวลาที่จอง:</strong> ${bookingData.dateTime}</p>
    `;

    container.innerHTML = content;
}

function confirmBooking() {
    // Add your logic to handle booking confirmation
    alert("ยืนยันการจองเรียบร้อยแล้ว");

    // Hide the container
    document.querySelector(".booking-details").style.display = "none";
}

function rejectBooking() {
    // Add your logic to handle booking rejection
    alert("ปฏิเสธการจอง");

    // Hide the container
    document.querySelector(".booking-details").style.display = "none";
}

// Populate content when the page loads
document.addEventListener("DOMContentLoaded", populateBookingContent);
