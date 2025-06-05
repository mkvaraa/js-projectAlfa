document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    btn.classList.add('active');
    const selectedTab = btn.dataset.tab;
    document.getElementById(selectedTab).classList.add('active');

    //show hide btns if we in profile  M.K
    const buttonRow = document.querySelector('.button-row');
    if (selectedTab === 'profile') {
      buttonRow.style.display = 'flex';
    } else {
      buttonRow.style.display = 'none';
    }
  });
});

// // show modal M.K
// document.querySelector('.btn.blue').addEventListener('click', () => {
//   document.getElementById('voucher-modal').classList.remove('hidden');
// });

// // close button click M.K
// document.querySelector('.close-button').addEventListener('click', () => {
//   document.getElementById('voucher-modal').classList.add('hidden');
// });

// // close if click outside content M.K
// document.getElementById('voucher-modal').addEventListener('click', (e) => {
//   if (e.target.id === 'voucher-modal') {
//     document.getElementById('voucher-modal').classList.add('hidden');
//   }
// });



