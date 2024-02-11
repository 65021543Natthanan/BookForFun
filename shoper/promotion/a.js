
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





// Sample data structure for storing promotions
var promotionsData = JSON.parse(localStorage.getItem('promotionsData')) || [];

// Function to update promotions
function updatePromotion() {
    // Get data from the form
    var storeName = document.getElementById('storeName').value;
    var promotionDescription = document.getElementById('promotionDescription').value;
    var promotionImageInput = document.getElementById('promotionImage');

    // Create an object to store promotion data
    var newPromotion = {
        storeName: storeName,
        promotionDescription: promotionDescription,
        promotionImageSrc: promotionImageInput.files.length > 0 ? URL.createObjectURL(promotionImageInput.files[0]) : null
    };

    // Save the new promotion data to localStorage
    promotionsData.push(newPromotion);
    localStorage.setItem('promotionsData', JSON.stringify(promotionsData));

    // Display the updated promotions
    displayUpdatedPromotions();
}

function displayUpdatedPromotions() {
    var updatedPromotionContainer = document.getElementById('updatedPromotionContainer');
    updatedPromotionContainer.innerHTML = ''; // Clear previous content

    // Loop through promotionsData and create elements for each promotion
    promotionsData.forEach(function(promotion, index) {
        var promotionCard = document.createElement('div');
        promotionCard.className = 'card mb-3';

        var promotionCardBody = document.createElement('div');
        promotionCardBody.className = 'card-body';

        var storeNameTitle = document.createElement('h5');
        storeNameTitle.className = 'card-title text-center mt-3';
        storeNameTitle.innerText = promotion.storeName;

        // Display promotion image if available
        if (promotion.promotionImageSrc) {
            var promotionImage = document.createElement('img');
            promotionImage.className = 'card-img-top';
            promotionImage.src = promotion.promotionImageSrc;
            promotionCardBody.appendChild(promotionImage);
        }

        // Create card text for promotion description
        var promotionDescription = document.createElement('p');
        promotionDescription.className = 'card-text p-3';
        promotionDescription.innerText = promotion.promotionDescription;

        // Create delete button
        var deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger mt-2';
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function() {
            deletePromotionCard(index);
        });

        // Append elements to the card body
        promotionCardBody.appendChild(storeNameTitle);
        promotionCardBody.appendChild(promotionDescription);
        promotionCardBody.appendChild(deleteButton);

        // Append card body to the card
        promotionCard.appendChild(promotionCardBody);

        // Append card to the container
        updatedPromotionContainer.appendChild(promotionCard);
    });
}

function deletePromotionCard(index) {
    // Remove the promotion from promotionsData
    promotionsData.splice(index, 1);
    localStorage.setItem('promotionsData', JSON.stringify(promotionsData));

    // Display the updated promotions
    displayUpdatedPromotions();
}

// Call the displayUpdatedPromotions function when the page loads
window.onload = function () {
    displayUpdatedPromotions();
};

