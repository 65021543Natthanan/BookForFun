document.addEventListener('DOMContentLoaded', function () {
    var addressModal = new bootstrap.Modal(document.getElementById('addressModal'));

    // Event listener สำหรับปิด Modal จากปุ่มปิด
    var closeModalButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');
    closeModalButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            addressModal.hide();
        });
    });
});

function saveDataAndCloseModal() {
    var password = document.getElementById('storePassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var passwordMismatch = document.getElementById('passwordMismatch');

    if (password === confirmPassword) {
        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
        var addressModal = new bootstrap.Modal(document.getElementById('addressModal'));
        addressModal.hide();
        document.getElementById('addressForm').reset();
        passwordMismatch.style.display = 'none';
        window.location.href = '../After login.html/index.html';
    } else {
        // เมื่อรหัสผ่านไม่ตรงกันแสดงป้อปอัพ
        alert('รหัสผ่านไม่ตรงกัน');
        passwordMismatch.style.display = 'block';
    }
}
