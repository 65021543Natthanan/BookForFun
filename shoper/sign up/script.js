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
    var userName = document.getElementById('userUserName').value;
    var name = document.getElementById('userName').value;
    var lastName = document.getElementById('userLastName').value;
    var genderOptions = document.querySelector('input[name="genderOptions"]:checked').value;
    var smokeOptions = document.querySelector('input[name="smokeOptions"]:checked').value;
    var email = document.getElementById('userEmail').value;
    var phoneNumber = document.getElementById('userPhoneNumber').value;
    var password = document.getElementById('storePassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var passwordMismatch = document.getElementById('passwordMismatch');

    if (password === confirmPassword) {
        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
        var addressModal = new bootstrap.Modal(document.getElementById('addressModal'));
        addressModal.hide();
        document.getElementById('addressForm').reset();
        passwordMismatch.style.display = 'none';
    } else {
        passwordMismatch.style.display = 'block';
    }
}
