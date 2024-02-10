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





// โค้ดที่ใช้เก็บข้อมูลบอร์ดเกมใน Local Storage
var boardsData = JSON.parse(localStorage.getItem('boardsData')) || [];

// ฟังก์ชันที่ใช้เพิ่มข้อมูลบอร์ดเกม
function saveBoard() { 
    // ดึงข้อมูลจากฟอร์ม
    var boardName = document.getElementById("boardName").value;
    

    // สร้าง Object ข้อมูลบอร์ดเกม
    var newBoard = { name: boardName };

    // เพิ่มข้อมูลใน Local Storage
    boardsData.push(newBoard);
    localStorage.setItem('boardsData', JSON.stringify(boardsData));

    // เรียกฟังก์ชันสร้างคอนเทนเนอร์
    
    // เรียกฟังก์ชันสร้างคอนเทนเนอร์
    createBoardContainer(newBoard);

    // ปิด Modal
    var modal = new bootstrap.Modal(document.getElementById("addBoardModal"));
    modal.hide();

    // อัปเดตจำนวนบอร์ดเกม
    updateBoardCount();
}

function updateBoardCount() {
    // นับจำนวนบอร์ดเกมทั้งหมด
    var totalBoards = boardsData.length;

    // แสดงจำนวนบอร์ดเกมใหม่
    document.getElementById('totalBoardsCount').innerText = totalBoards;
}

// ฟังก์ชันที่ใช้สร้างคอนเทนเนอร์
// ฟังก์ชันที่ใช้สร้างคอนเทนเนอร์
function createBoardContainer(board) {
    var newBoardContainer = document.createElement("div");
    newBoardContainer.className = "col-md-4";
    newBoardContainer.setAttribute("data-board-name", board.name); // เพิ่ม Attribute เก็บชื่อบอร์ด

    var newBoardCard = document.createElement("div");
    newBoardCard.className = "card";

    var newBoardCardBody = document.createElement("div");
    newBoardCardBody.className = "card-body";

    var newBoardTitle = document.createElement("h5");
    newBoardTitle.className = "card-title";
    newBoardTitle.innerText = board.name;

    // ปุ่มแก้ไข
    var editButton = document.createElement("button");
    editButton.className = "btn btn-warning";
    editButton.innerText = "แก้ไข";
    editButton.addEventListener("click", function() {
        // เรียกใช้ฟังก์ชันแก้ไขบอร์ดเกม
        editBoard(board);
    });

    // ปุ่มลบ
    var deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.innerText = "ลบ";
    deleteButton.addEventListener("click", function() {
        // เรียกใช้ฟังก์ชันลบบอร์ดเกม
        deleteBoard(newBoardContainer, board);
    });

    // เพิ่มคอนเทนเนอร์ใหม่ลงในหน้าโปรไฟล์
    newBoardCardBody.appendChild(newBoardTitle);
    newBoardCardBody.appendChild(editButton);
    newBoardCardBody.appendChild(deleteButton);
    newBoardCard.appendChild(newBoardCardBody);
    newBoardContainer.appendChild(newBoardCard);

    // เพิ่มคอนเทนเนอร์ใหม่ลงในส่วนของบอร์ดเกม
    var boardsContainer = document.getElementById("boardsContainer");
    boardsContainer.appendChild(newBoardContainer);

     return newBoardContainer;
}

// ฟังก์ชันที่ใช้แก้ไขบอร์ดเกม
// ฟังก์ชันที่ใช้แก้ไขบอร์ดเกม
function editBoard(board) {
    // สร้าง Modal สำหรับแก้ไขข้อมูลบอร์ดเกม
    var modalContent = `
        <div class="modal fade" id="editBoardModal" tabindex="-1" aria-labelledby="editBoardModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editBoardModalLabel">แก้ไขบอร์ดเกม</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Form สำหรับกรอกข้อมูลใหม่ -->
                        <form id="editBoardForm">
                            <div class="mb-3">
                                <label for="editBoardName" class="form-label">ชื่อบอร์ดเกม</label>
                                <input type="text" class="form-control" id="editBoardName" value="${board.name}" required>
                            </div>
                            <!-- เพิ่มฟิลด์ข้อมูลอื่น ๆ ตามต้องการ -->
                            <!-- เช่น <div class="mb-3">...</div> -->
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                        <button type="button" class="btn btn-primary" onclick="saveEditedBoard('${board.name}')">บันทึก</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // แทรก HTML ของ Modal ลงในหน้าเว็บ
    document.body.insertAdjacentHTML('beforeend', modalContent);

    // เรียก Modal
    var editBoardModal = new bootstrap.Modal(document.getElementById('editBoardModal'));
    editBoardModal.show();

    var closeButton = document.querySelector("#editBoardModal .btn-close");
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            editBoardModal.hide();
        });
    }
   
 
}
// ฟังก์ชันที่ใช้สำหรับบันทึกข้อมูลที่แก้ไข
function saveEditedBoard(oldBoardName) {
    // ดึงข้อมูลจากฟอร์ม
    var editedBoardName = document.getElementById('editBoardName').value;

    // ทำตามต้องการเพื่อบันทึกข้อมูลที่แก้ไข
    // เช่น อัพเดทข้อมูลใน Local Storage หรือทำการ Ajax Request

    // ปิด Modal
  

    // ทำการอัปเดตข้อมูลในคอนเทนเนอร์
    var boardContainer = document.getElementById('boardsContainer').querySelector(`[data-board-name="${oldBoardName}"]`);
    if (boardContainer) {
        var boardTitle = boardContainer.querySelector('.card-title');
        if (boardTitle) {
            boardTitle.innerText = editedBoardName;
            boardContainer.setAttribute("data-board-name", editedBoardName); // อัปเดต Attribute ชื่อบอร์ด
        }
    }

    // อัปเดตข้อมูลใน Local Storage
    var index = boardsData.findIndex(b => b.name === oldBoardName);
    if (index !== -1) {
        boardsData[index].name = editedBoardName;
        localStorage.setItem('boardsData', JSON.stringify(boardsData));
    }
}





// ฟังก์ชันที่ใช้ลบบอร์ดเกม
function deleteBoard(boardContainer, board) {
    // ใส่โค้ดที่ต้องการให้เกิดขึ้นเมื่อกดปุ่มลบ
    // เช่น แสดง Pop-up ยืนยันการลบ หรือทำการลบข้อมูล
    var confirmDelete = confirm("คุณแน่ใจหรือไม่ที่ต้องการลบบอร์ดเกม: " + board.name + " ?");
    if (confirmDelete) {
        boardContainer.remove(); // ลบคอนเทนเนอร์
        // ใส่โค้ดที่ต้องการให้เกิดขึ้นเมื่อบอร์ดถูกลบ
        // เช่น ทำการลบข้อมูลใน Local Storage
        var index = boardsData.findIndex(b => b.name === board.name);
        if (index !== -1) {
            boardsData.splice(index, 1);
            localStorage.setItem('boardsData', JSON.stringify(boardsData));
        }
    }
    updateBoardCount();
}

// ฟังก์ชันที่ใช้เรียกข้อมูลบอร์ดเกมและสร้างคอนเทนเนอร์
function loadBoards() {
    // ดึงข้อมูลจาก Local Storage
    boardsData.forEach(function(board) {
        createBoardContainer(board);
    });
      updateBoardCount();
}

// เรียกใช้งานเมื่อหน้าโปรไฟล์โหลดเสร็จ
document.addEventListener("DOMContentLoaded", function() {
    loadBoards();
});


