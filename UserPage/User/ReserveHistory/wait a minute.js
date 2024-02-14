// ฟังก์ชันสำหรับลบแถว
function deleteRow(index) {
    if (confirm("Are you sure you want to delete this data?")) {
        // Remove the row from the bookingHistoryData array
        bookingHistoryData.splice(index, 1);

        // Update the displayed booking history
        displayBookingHistory();
    }
}

// Function to create and display booking history
function displayBookingHistory() {
    // Get the element where we will display the booking history
    const tableBody = document.getElementById('booking-history-body');

    // Clear any existing content in the table body
    tableBody.innerHTML = '';

    // Loop through the booking history data
    bookingHistoryData.forEach((booking, index) => {
        // Create a new row element
        const row = tableBody.insertRow();

        // Insert cells into the row
        row.insertCell(0).textContent = booking.Date;
        row.insertCell(1).textContent = booking.Time;
        row.insertCell(2).textContent = booking.Name;
        row.insertCell(3).textContent = booking.Phonenumber;
        row.insertCell(4).textContent = booking.Table;
        row.insertCell(5).textContent = booking.Number;

        // Create delete button in the last cell
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteRow(index);
        });

        // Insert delete button into the last cell
        row.insertCell(6).appendChild(deleteButton);
    });
}
