function saveDataAndDisplay() {
    // ดึงค่าจากฟอร์ม
    var storeName = document.getElementById('storeName').value;
    var storeDescription = document.getElementById('storeDescription').value;
    var storePhoneNumber = document.getElementById('storePhoneNumber').value;
    var storeEmail = document.getElementById('storeEmail').value;
    var profileImageInput = document.getElementById('profileImage');

    // สร้างตัวแปรเพื่อเก็บข้อมูล
    var data = {
        storeName: storeName,
        storeDescription: storeDescription,
        storePhoneNumber: storePhoneNumber,
        storeEmail: storeEmail,
        profileImageSrc: profileImageInput.files.length > 0 ? URL.createObjectURL(profileImageInput.files[0]) : null
    };

    // บันทึกข้อมูลใน localStorage
    localStorage.setItem('storedData', JSON.stringify(data));

    // แสดงข้อมูลที่บันทึกในคอนเทนเนอร์
    displayData(data);
}

function displayData(data) {
    // แสดงข้อมูลที่บันทึกในคอนเทนเนอร์
    document.getElementById('resultStoreName').innerHTML = '<strong>ชื่อร้านค้า:</strong> ' + data.storeName;
    document.getElementById('resultStoreDescription').innerHTML = '<strong>รายละเอียดร้านค้า:</strong> ' + data.storeDescription;
    document.getElementById('resultStorePhoneNumber').innerHTML = '<strong>เบอร์โทรศัพท์ร้านค้า:</strong> ' + data.storePhoneNumber;
    document.getElementById('resultStoreEmail').innerHTML = '<strong>อีเมลร้านค้า:</strong> ' + data.storeEmail;

    // แสดงรูปภาพในคอนเทนเนอร์ (ถ้ามี)
    var resultProfileImageContainer = document.getElementById('resultProfileImageContainer');
    var resultProfileImage = document.getElementById('resultProfileImage');
    
    if (data.profileImageSrc) {
        resultProfileImage.src = data.profileImageSrc;
        resultProfileImageContainer.style.display = 'block';
    } else {
        resultProfileImageContainer.style.display = 'none';
    }
}

// โหลดและแสดงข้อมูลจาก localStorage เมื่อโหลดหน้าเว็บ
window.onload = function () {
    var storedData = JSON.parse(localStorage.getItem('storedData'));
    if (storedData) {
        displayData(storedData);
    }
};