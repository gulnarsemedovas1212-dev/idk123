const video = document.getElementById('video');
const generateInviteBtn = document.getElementById('generateInviteBtn');
const joinBtn = document.getElementById('joinBtn');
const inviteCodeText = document.getElementById('inviteCode');
const inviteInput = document.getElementById('inviteInput');
const inviteMessage = document.getElementById('inviteMessage');

let currentInviteCode = null;
let joined = false;

function makeInviteCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function showMessage(text, type = 'success') {
  inviteMessage.textContent = text;
  inviteMessage.classList.remove('success', 'error');
  inviteMessage.classList.add(type);
}

async function startCamera() {
  if (!joined) {
    showMessage('Enter a valid invite code to join first.', 'error');
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    showMessage('Camera started. You are now joined.', 'success');
  } catch (error) {
    console.error('Error accessing camera:', error);
    showMessage('Could not access camera. Allow camera permissions and try again.', 'error');
  }
}

generateInviteBtn.addEventListener('click', () => {
  currentInviteCode = makeInviteCode();
  inviteCodeText.textContent = `Invite code: ${currentInviteCode}`;
  showMessage('Invite generated. Share this code with someone who should join.');
});

joinBtn.addEventListener('click', () => {
  const enteredCode = inviteInput.value.trim().toUpperCase();

  if (!enteredCode) {
    showMessage('Please type an invite code before joining.', 'error');
    return;
  }

  if (!currentInviteCode) {
    showMessage('No invite code is active yet. Generate one first.', 'error');
    return;
  }

  if (enteredCode === currentInviteCode) {
    joined = true;
    showMessage('Invite accepted! Starting camera...', 'success');
    startCamera();
  } else {
    showMessage('Invalid invite code. Please try again.', 'error');
  }
});

inviteInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    joinBtn.click();
  }
});

showMessage('Generate an invite code and share it with people you want to join.');