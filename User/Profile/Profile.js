function saveDataAndDisplay() {
    // ดึงค่าจากฟอร์ม
    var storeName = document.getElementById('storeName').value;
    var storePhoneNumber = document.getElementById('storePhoneNumber').value;
    var storeEmail = document.getElementById('storeEmail').value;
    var profileImageInput = document.getElementById('profileImage');

    // สร้างตัวแปรเพื่อเก็บข้อมูล
    var data = {
        storeName: storeName,
        storePhoneNumber: storePhoneNumber,
        storeEmail: storeEmail,
        profileImageSrc: profileImageInput.files.length > 0 ? URL.createObjectURL(profileImageInput.files[0]) : null
    };

    // แสดงข้อมูลที่บันทึกในคอนเทนเนอร์
    saveImageToLocalStorage(data.profileImageSrc);

    // บันทึกข้อมูลใน localStorage
    localStorage.setItem('storedData', JSON.stringify(data));


    // แสดงข้อมูลที่บันทึกในคอนเทนเนอร์
    displayData(data);
}

function saveImageToLocalStorage(imageSrc) {
    localStorage.setItem('uploadedImageSrc', imageSrc);
}



function displayData(data) {
    // แสดงข้อมูลที่บันทึกในคอนเทนเนอร์
    document.getElementById('resultStoreName').innerHTML = '<strong>ชื่อผู้ใช้:</strong> ' + data.storeName;
    document.getElementById('resultStorePhoneNumber').innerHTML = '<strong>เบอร์โทรศัพท์:</strong> ' + data.storePhoneNumber;
    document.getElementById('resultStoreEmail').innerHTML = '<strong>อีเมล:</strong> ' + data.storeEmail;

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
    var storedImageSrc = localStorage.getItem('uploadedImageSrc');
    if (storedData) {
        displayData(storedData);
    }

    if (storedImageSrc) {
        // แสดงรูปภาพที่ถูกบันทึกใน Local Storage
        document.getElementById('resultProfileImage').src = storedImageSrc;
        document.getElementById('resultProfileImageContainer').style.display = 'block';
    }
}