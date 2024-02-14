document.getElementById('addressForm').addEventListener('submit', function (event) {
    event.preventDefault();
    saveDataAndCloseModal();
});

function saveDataAndCloseModal() {
    var phoneNumber = document.getElementById('storePhoneNumber').value;
    var password = document.getElementById('storePassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var passwordMismatch = document.getElementById('passwordMismatch');

    if (password === confirmPassword) {
        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
        var addressModal = new bootstrap.Modal(document.getElementById('addressModal'));
        addressModal.hide(); // ซ่อน modal ก่อนที่จะทำการเปลี่ยนเส้นทาง
        document.getElementById('addressForm').reset();
        passwordMismatch.style.display = 'none';
    } else {
        passwordMismatch.style.display = 'block';
    }
}

// เมื่อ modal ถูกซ่อนไป จะทำการเปลี่ยนเส้นทางไปยังหน้าที่ต้องการ
var myModal = document.getElementById('addressModal');
myModal.addEventListener('hidden.bs.modal', function (event) {
    window.location.href = "../ProFileStore/index.html";
});
