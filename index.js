document.querySelector('.contact-send-btn').addEventListener('click', function() {

  // Validation
  const name = document.querySelector('input[placeholder="Your name"]').value.trim();
  const email = document.querySelector('input[placeholder="your@email.com"]').value.trim();
  const subject = document.querySelector('input[placeholder="What\'s this about?"]').value.trim();
  const message = document.getElementById('messageBox').value.trim();

  if (!name || !email || !subject || !message) {
    const warningToast = new bootstrap.Toast(document.getElementById('warningToast'));
    warningToast.show();
    return; // stop here
  }

  emailjs.send("service_axlc275", "template_w4ewcxj", {
    name: name,
    email: email,
    subject: subject,
    message: message
  }).then(() => {
    const toast = new bootstrap.Toast(document.getElementById('successToast'));
    toast.show();
  }).catch(() => {
    const errorToast = new bootstrap.Toast(document.getElementById('errorToast'));
    errorToast.show();
  });
});

const themeBtn = document.getElementById('themeBtn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀' : '☽';
});

// Project Filter Tabs
const tabs = document.querySelectorAll(".custom-nav .nav-link");
const cards = document.querySelectorAll(".project-card");

tabs.forEach(tab => {
  tab.addEventListener("click", function (e) {
    e.preventDefault();

    // Active tab change
    tabs.forEach(t => t.classList.remove("active"));
    this.classList.add("active");

    const filter = this.textContent.trim();

    cards.forEach(card => {
      const badge = card.querySelector(".card-badge");
      if (!badge) return;

      const category = badge.textContent.trim();
      const col = card.closest(".col-md-4");
      if (!col) return;

      if (filter === "All") {
        col.style.display = "block";
      } else if (filter === "IoT" && (category === "Web + IoT" || category === "IoT")) {
        col.style.display = "block";
      } else if (filter === "Web" && (category === "Web + IoT" || category === "Web")) {
        col.style.display = "block";
      } else if (filter === "Mobile" && category === "Mobile") {
        col.style.display = "block";
      } else if (filter === "Design" && category === "UI/UX Design") {
        col.style.display = "block";
      } else {
        col.style.display = "none";
      }
    });
  });
});
