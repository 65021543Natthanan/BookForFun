var boardsData = JSON.parse(localStorage.getItem('boardsData')) || [];

// ฟังก์ชันที่ใช้เพิ่มข้อมูลบอร์ดเกม
function saveBoardGame() {
    // ดึงข้อมูลจากฟอร์ม
    var boardName = document.getElementById("boardName").value;
    var boardRules = document.getElementById("boardRules").value;
    var playersCount = document.getElementById("playersCount").value;
    var boardPrice = document.getElementById("boardPrice").value;
    var boardImageInput = document.getElementById("boardImage");

    // ตรวจสอบว่าผู้ใช้ได้เลือกรูปภาพหรือไม่
    var boardImage = null;
    if (boardImageInput.files.length > 0) {
        boardImage = URL.createObjectURL(boardImageInput.files[0]);
    }

    // ตรวจสอบว่าข้อมูลกรอกครบหรือไม่
    if (!boardName || !boardRules || !playersCount || !boardPrice) {
        alert("Please fill in all required fields.");
        return;
    }

    // สร้าง Object ข้อมูลบอร์ดเกม
    var newBoard = {
        name: boardName,
        rules: boardRules,
        playersCount: playersCount,
        price: boardPrice,
        image: boardImage
    };

    boardsData.push(newBoard);
    localStorage.setItem('boardsData', JSON.stringify(boardsData));

    // เรียกฟังก์ชันสร้างคอนเทนเนอร์
    createBoardContainer(newBoard);

    // ปิด Modal
    var modal = new bootstrap.Modal(document.getElementById("addBoardModal"));
    modal.hide();

    // อัพเดตจำนวนบอร์ดเกม
    updateBoardCount();
}

// ฟังก์ชันที่ใช้สร้างคอนเทนเนอร์บอร์ดเกม
function createBoardContainer(board) {
    var boardsContainer = document.getElementById("boardsContainer");

    // สร้าง Element สำหรับคอนเทนเนอร์
    var boardContainer = document.createElement("div");
    boardContainer.classList.add("col-md-15");

    // กำหนดข้อมูลบอร์ดเกมใน Attribute
    boardContainer.setAttribute("data-board-name", board.name);

    // HTML สำหรับคอนเทนเนอร์
    boardContainer.innerHTML = `
        <div class="card">
            <div class="card-header">
                ${board.name}
            </div>
            <div class="card-body">
                <img src="${board.image}" alt="${board.name}"  class="img-thumbnail mx-auto d-block" style width = 40% height= 40%>
                <p class="card-text">Players Count: ${board.playersCount}</p>
                <p class="card-text">Price: ${board.price}</p>
                <p class="card-text">Rules: ${board.rules}</p>
                <button type="button" class="btn btn-primary" onclick="editBoard('${board.name}')">Edit</button>
                <button type="button" class="btn btn-danger" onclick="deleteBoard(this.parentElement.parentElement, '${board.name}')">Delete</button>
            </div>
        </div>
    `;

    // เพิ่มคอนเทนเนอร์ลงในคอนเทนเนอร์หลัก
    boardsContainer.appendChild(boardContainer);
}

// ฟังก์ชันที่ใช้แก้ไขบอร์ดเกม
function editBoard(boardName) {
    // ค้นหาข้อมูลบอร์ดเกมที่ต้องการแก้ไข
    var board = boardsData.find(b => b.name === boardName);

    // สร้าง Modal สำหรับแก้ไขข้อมูลบอร์ดเกม
    var modalContent = `
        <div class="modal fade" id="editBoardModal" tabindex="-1" aria-labelledby="editBoardModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editBoardModalLabel">Edit Board Game</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Form for editing board game -->
                        <form id="editBoardForm">
                            <div class="mb-3">
                                <label for="editBoardName" class="form-label">Board Game Name</label>
                                <input type="text" class="form-control" id="editBoardName" value="${board.name}" required>
                            </div>
                            <div class="mb-3">
                                <label for="editBoardRules" class="form-label">Basic Rules</label>
                                <textarea type="text" class="form-control" id="editBoardRules" required>${board.rules}</textarea>
                            </div>
                            <div class="mb-3">
                                <label for="editPlayersCount" class="form-label">Number of Players</label>
                                <input type="number" class="form-control" id="editPlayersCount" value="${board.playersCount}" required>
                            </div>
                            <div class="mb-3">
                                <label for="editBoardPrice" class="form-label">Price</label>
                                <input type="text" class="form-control" id="editBoardPrice" value="${board.price}" required>
                            </div>
                            <div class="mb-3">
                                <label for="editBoardImage" class="form-label">Board Game Image</label>
                                <input type="file" class="form-control" id="editBoardImage">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="saveEditedBoard('${board.name}')">Save</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insert the HTML of the modal into the webpage
    document.body.insertAdjacentHTML('beforeend', modalContent);

    // Call the Modal
    var editBoardModal = new bootstrap.Modal(document.getElementById('editBoardModal'));
    editBoardModal.show();
    // Clear the existing edit modal if it exists

    var closeButton = document.querySelector("#editBoardModal .btn-close");
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            editBoardModal.hide();
        });
    }
}

// ฟังก์ชันที่ใช้สำหรับบันทึกข้อมูลที่แก้ไข
function saveEditedBoard(oldBoardName) {
    // Get data from the form
    var editedBoardName = document.getElementById('editBoardName').value;
    var editedBoardRules = document.getElementById('editBoardRules').value;
    var editedPlayersCount = document.getElementById('editPlayersCount').value;
    var editedBoardPrice = document.getElementById('editBoardPrice').value;
    var editedBoardImageInput = document.getElementById('editBoardImage');

    // Check if the user selected a new image
    var editedBoardImage = null;
    if (editedBoardImageInput.files.length > 0) {
        editedBoardImage = URL.createObjectURL(editedBoardImageInput.files[0]);
    }

    // Update data in the local storage
    var index = boardsData.findIndex(b => b.name === oldBoardName);
    if (index !== -1) {
        boardsData[index].name = editedBoardName;
        boardsData[index].rules = editedBoardRules;
        boardsData[index].playersCount = editedPlayersCount;
        boardsData[index].price = editedBoardPrice;
        if (editedBoardImage) {
            boardsData[index].image = editedBoardImage;
        }
        localStorage.setItem('boardsData', JSON.stringify(boardsData));
    }

    // Close the modal
    var editBoardModal = new bootstrap.Modal(document.getElementById("editBoardModal"));
    editBoardModal.hide();

    // Update the data in the container
    var boardContainer = document.getElementById('boardsContainer').querySelector(`[data-board-name="${oldBoardName}"]`);
    if (boardContainer) {
        var boardTitle = boardContainer.querySelector('.card-header');
        if (boardTitle) {
            boardTitle.innerText = editedBoardName;
            boardContainer.setAttribute("data-board-name", editedBoardName); // Update the board name attribute

            // Update other information in the container
            var rulesElement = boardContainer.querySelector('.card-text:nth-child(2)');
            var playersCountElement = boardContainer.querySelector('.card-text:nth-child(3)');
            var priceElement = boardContainer.querySelector('.card-text:nth-child(4)');
            var imageElement = boardContainer.querySelector('.img-fluid');

            if (rulesElement) {
                rulesElement.innerText = "Rules: " + editedBoardRules;
            }
            if (playersCountElement) {
                playersCountElement.innerText = "Players Count: " + editedPlayersCount;
            }
            if (priceElement) {
                priceElement.innerText = "Price: " + editedBoardPrice;
            }
            if (imageElement && editedBoardImage) {
                imageElement.src = editedBoardImage;
                imageElement.alt = editedBoardName;
            }
        }
    }
}


// Function to delete a board game
function deleteBoard(boardContainer, boardName) {
    // Code to execute when the delete button is clicked
    var confirmDelete = confirm("Are you sure you want to delete the board game: " + boardName + " ?");
    if (confirmDelete) {
        boardContainer.remove(); // Remove the container
        // Code to execute when the board is deleted
        var index = boardsData.findIndex(b => b.name === boardName);
        if (index !== -1) {
            boardsData.splice(index, 1);
            localStorage.setItem('boardsData', JSON.stringify(boardsData));
        }
    }
    updateBoardCount();
}

// Function to load board game data and create containers
function loadBoards() {
    // Retrieve data from local storage
    boardsData.forEach(function(board) {
        createBoardContainer(board);
    });
    updateBoardCount();
}

// Call the function when the profile page has finished loading
document.addEventListener("DOMContentLoaded", function() {
    loadBoards();
});

// Function to update the displayed board count
function updateBoardCount() {
    // Count the total number of boards
    var totalBoards = boardsData.length;

    // Display the new number of boards
    document.getElementById('totalBoardsCount').innerText = totalBoards;
}
