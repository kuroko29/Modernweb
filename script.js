// script.js
// ฟังก์ชันเปิดลิงก์ทั้งหมดในแท็บใหม่เมื่อกดปุ่ม "Run All"
function runAllLinks() {
  const links = document.querySelectorAll('.category a');
  links.forEach(link => {
    window.open(link.href, '_blank');
  });
}

function showCode(url, title) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`ไม่สามารถโหลดไฟล์: ${response.statusText}`);
      }
      return response.text();
    })
    .then(code => {
      const modal = getOrCreateCodeModal();
      modal.querySelector('.modal-title').textContent = `Code: ${title}`;
      modal.querySelector('.modal-body').textContent = code;
      modal.classList.add('visible');
    })
    .catch(err => {
      alert(`เกิดข้อผิดพลาด: ${err.message}\n\nหากเปิดไฟล์ผ่าน file:// ให้รัน local web server แล้วเปิด http://localhost:8000/index.html`);
    });
}

function getOrCreateCodeModal() {
  let modal = document.getElementById('code-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'code-modal';
    modal.className = 'code-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title"></span>
          <button class="modal-close" type="button">×</button>
        </div>
        <pre class="modal-body"></pre>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.classList.remove('visible');
    });
    modal.addEventListener('click', event => {
      if (event.target === modal) {
        modal.classList.remove('visible');
      }
    });
  }
  return modal;
}

function addViewCodeButtons() {
  const listItems = document.querySelectorAll('.category li');
  listItems.forEach(item => {
    const link = item.querySelector('a');
    if (!link) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'view-code-button';
    button.textContent = 'ดูโค้ด';
    button.addEventListener('click', () => showCode(link.getAttribute('href'), link.textContent));
    item.appendChild(button);
  });
}

// เชื่อมปุ่ม Run All และปุ่มดูโค้ดเข้ากับหน้าเมื่อโหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
  const runAllButton = document.getElementById('run-all-button');
  if (runAllButton) {
    runAllButton.addEventListener('click', runAllLinks);
  }
  addViewCodeButtons();
});
